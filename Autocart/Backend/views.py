from django.contrib.auth import authenticate, login
from rest_framework import filters, generics, mixins, pagination, permissions, response, status, viewsets
from Backend.models import User, Car, Cart, CarImage, Order, Comment
from Backend.serializers import UserSerializer, LoginSerializer, CarSerializer, CartSerializer, CustomTokenRefreshSerializer, CarImageSerializer, OrderSerializer, CommentSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
import django_filters
from Backend.utils import CommaSeparatedValueFilter, DestroyWithPayloadMixin, ListFilterByUserMixin, ListFilterMixin, CreateByUserMixin
from rest_framework_simplejwt.tokens import AccessToken


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]


class LoginView(TokenObtainPairView):
    serializer_class = LoginSerializer


class CustomTokenRefreshView(TokenRefreshView):
    serializer_class = CustomTokenRefreshSerializer


class ListPagination(pagination.LimitOffsetPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


class CarFilter(django_filters.FilterSet):
    category = CommaSeparatedValueFilter(
        field_name='category', lookup_expr='in')
    year = CommaSeparatedValueFilter(field_name='year', lookup_expr='in')
    brand = CommaSeparatedValueFilter(field_name='brand', lookup_expr='in')

    class Meta:
        model = Car
        fields = {
            'price': ['lt', 'gt', 'lte', 'gte'],
            'category': ['in'],
            'year': ['in', 'lt', 'gt', 'lte', 'gte'],
            'brand': ['in'],
            'enable': ['exact']
        }


class CarViewSet(mixins.CreateModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, viewsets.GenericViewSet):
    queryset = Car.objects.all()
    serializer_class = CarSerializer
    pagination_class = ListPagination
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend,
                       filters.SearchFilter, filters.OrderingFilter]
    filter_class = CarFilter
    search_fields = ['name', 'model', 'brand']
    ordering_fields = ['name', 'year', 'price']

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        if (request.user is None or not request.user.is_staff):
            queryset = queryset.filter(enable=True)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return response.Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        if (not instance.enable and (request.user is None or not request.user.is_staff)):
            return response.Response(None, status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(instance)
        return response.Response(serializer.data)


class CartViewSet(CreateByUserMixin, ListFilterByUserMixin, DestroyWithPayloadMixin, viewsets.ModelViewSet):
    queryset = Cart.objects.filter(order=None)
    serializer_class = CartSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_update(self, serializer):
        '''user is readonly on update'''
        serializer.validated_data.pop('user', None)
        return super().perform_update(serializer)


class CarImageViewSet(DestroyWithPayloadMixin, viewsets.ModelViewSet):
    queryset = CarImage.objects.all()
    serializer_class = CarImageSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend]
    filter_fields = ('car',)

    def perform_update(self, serializer):
        serializer.validated_data.pop('car', None)
        return super().perform_update(serializer)


class OrderView(ListFilterByUserMixin, generics.ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = ListPagination
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    ordering_fields = ['createTime']

    def create(self, request, *args, **kwargs):
        request.data["user"] = request.user.id
        cartids = request.data.pop('cars', [])
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        '''update cart.order'''
        for cartid in cartids:
            cart = Cart.objects.get(pk=cartid)
            cartSerializer = CartSerializer(
                cart, data={"order": serializer.data["id"]}, partial=True)
            cartSerializer.is_valid(raise_exception=True)
            cartSerializer.save()

        headers = self.get_success_headers(serializer.data)
        return response.Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class CommentView(CreateByUserMixin, ListFilterMixin, generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.AllowAny]
    pagination_class = ListPagination

    def custemFilter(self, queryset, request):
        carid = request.GET.get("carid", None)
        return Comment.objects.select_related("cart__car").filter(cart__car_id=carid)
