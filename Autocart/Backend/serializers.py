from rest_framework import serializers
from Backend import models


class UserSerializer(serializers.ModelSerializer):
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


class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Car
        exclude = ('update_time',)
