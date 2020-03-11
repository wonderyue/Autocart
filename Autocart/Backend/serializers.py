from rest_framework import serializers
from rest_framework import generics
from Backend import models


class UserSerializer(generics.ListCreateAPIView):
    class Meta:
        model = models.User
        fields = (
            'id',
            'name',
            'c_time',
        )
        read_only_fields = (
            'id',
            'name',
            'c_time',
        )
