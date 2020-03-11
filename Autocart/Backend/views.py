from rest_framework import generics, viewsets, permissions, mixins
from Backend.models import User
from Backend.serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    """get/post/update"""
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]
