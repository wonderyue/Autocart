from django.contrib.auth import authenticate, login
from rest_framework import generics, viewsets, permissions, mixins, filters, pagination, response
from Backend.models import User, Car
from Backend.serializers import UserSerializer, LoginSerializer, CarSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework_simplejwt.views import TokenObtainPairView
import django_filters


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]


class LoginView(TokenObtainPairView):
    serializer_class = LoginSerializer


class CarListPagination(pagination.LimitOffsetPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


class CommaSeparatedValueFilter(django_filters.CharFilter):
    """Accept comma separated string as value and convert it to list.
    It's useful for __in lookups.
    """

    def filter(self, qs, value):
        if value:
            value = value.split(',')

        return super(CommaSeparatedValueFilter, self).filter(qs, value)


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
