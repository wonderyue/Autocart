from django.contrib.auth import authenticate, login
from rest_framework import generics, viewsets, permissions, mixins, filters, pagination, response
from Backend.models import User, Car
from Backend.serializers import UserSerializer, LoginSerializer, CarSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework_simplejwt.views import TokenObtainPairView


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
