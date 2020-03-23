from rest_framework import serializers
from django.contrib.auth import password_validation
from Backend.models import User, Car
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken


class UserSerializer(serializers.ModelSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'img', 'is_staff', 'password', 'token')
        read_only_fields = ('is_staff',)
        extra_kwargs = {'password': {'required': True, 'write_only': True}}

    def __init__(self, *args, **kwargs):
        super(UserSerializer, self).__init__(*args, **kwargs)
        request = kwargs['context']['request']
        if request.method != 'POST':
            self.fields.pop('token')

    def validate_password(self, value):
        password_validation.validate_password(value, self.instance)
        return value

    def create(self, validated_data):
        user = super().create(validated_data)
        self.refresh = RefreshToken.for_user(user)
        return user

    def get_token(self, obj):
        data = {}
        data["refresh"] = str(self.refresh)
        data["access"] = str(self.refresh.access_token)
        return data


class LoginSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        user = authenticate(
            username=attrs['username'], password=attrs['password'])
        if user is not None:
            data = {'token': super().validate(attrs)}
            try:
                for key in UserSerializer.Meta.fields:
                    if key != 'token' and key != 'password':
                        data[key] = eval('user.%s' % key)
            except Exception as e:
                raise serializers.ValidationError('Bad request')
            return data
        else:
            raise serializers.ValidationError(
                'Incorrect username or password')


class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        exclude = ('update_time',)
