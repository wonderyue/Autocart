from django.contrib.auth import authenticate, login
from rest_framework import generics, viewsets, permissions, mixins, filters, pagination, response
from Backend.models import User, Car, Cart, CarImage
from Backend.serializers import UserSerializer, LoginSerializer, CarSerializer, CartSerializer, CustomTokenRefreshSerializer, CarImageSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
import django_filters
from Backend.utils import CommaSeparatedValueFilter, DestroyWithPayloadMixin
from rest_framework_simplejwt.tokens import AccessToken


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]


class LoginView(TokenObtainPairView):
    serializer_class = LoginSerializer


class CustomTokenRefreshView(TokenRefreshView):
    serializer_class = CustomTokenRefreshSerializer


class CarListPagination(pagination.LimitOffsetPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


class CarFilter(django_filters.FilterSet):
    category = CommaSeparatedValueFilter(
        field_name='category', lookup_expr='in')
    year = CommaSeparatedValueFilter(field_name='year', lookup_expr='in')
    brand = CommaSeparatedValueFilter(field_name='brand', lookup_expr='in')

    def __init__(self, data, *args, **kwargs):
        '''hide field: enable for non-staff user'''
        if not data.get('enable'):
            data = data.copy()
            data['enable'] = True
        super().__init__(data, *args, **kwargs)

    class Meta:
        model = Car
        fields = {
            'price': ['lt', 'gt', 'lte', 'gte'],
            'category': ['in'],
            'year': ['in', 'lt', 'gt', 'lte', 'gte'],
            'brand': ['in'],
            'enable': ['exact']
        }


class CarViewSet(mixins.CreateModelMixin,
                 mixins.RetrieveModelMixin,
                 mixins.UpdateModelMixin,
                 mixins.ListModelMixin,
                 viewsets.GenericViewSet):
    queryset = Car.objects.all()
    serializer_class = CarSerializer
    pagination_class = CarListPagination
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend,
                       filters.SearchFilter, filters.OrderingFilter]
    filter_class = CarFilter
    search_fields = ['name', 'model', 'brand']
    ordering_fields = ['name', 'year', 'price']


class CartViewSet(DestroyWithPayloadMixin, viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        queryset = Cart.objects.all().filter(user=self.request.user)
        serializer = CartSerializer(queryset, many=True)
        return response.Response(serializer.data)

    def create(self, request, *args, **kwargs):
        request.data["user"] = request.user.id
        return super().create(request, *args, **kwargs)

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
