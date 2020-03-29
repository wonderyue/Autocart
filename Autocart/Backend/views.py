from django.contrib.auth import authenticate, login
from rest_framework import generics, viewsets, permissions, mixins, filters, pagination, response
from Backend.models import User, Car, Cart
from Backend.serializers import UserSerializer, LoginSerializer, CarSerializer, CartSerializer, CustomTokenRefreshSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
import django_filters
from Backend.utils import CommaSeparatedValueFilter, DestroyWithPayloadMixin


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


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

    class Meta:
        model = Car
        fields = {
            'price': ['lt', 'gt', 'lte', 'gte'],
            'category': ['in'],
            'year': ['in', 'lt', 'gt', 'lte', 'gte'],
            'brand': ['in'],
        }


class CarViewSet(mixins.CreateModelMixin,
                 mixins.RetrieveModelMixin,
                 mixins.UpdateModelMixin,
                 mixins.ListModelMixin,
                 viewsets.GenericViewSet):
    queryset = Car.objects.all()
    serializer_class = CarSerializer
    pagination_class = CarListPagination
    permission_classes = [permissions.AllowAny]
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
