from rest_framework import generics, viewsets, permissions, mixins, filters, pagination
from Backend.models import User, Car
from Backend.serializers import UserSerializer, CarSerializer
from django_filters.rest_framework import DjangoFilterBackend


class UserViewSet(viewsets.ModelViewSet):
    """get/post/update"""
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]


class CarListPagination(pagination.LimitOffsetPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


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
    filterset_fields = ['category', 'year']
    search_fields = ['name', 'model']
    ordering_fields = ['name', 'year', 'price', 'mpg']
