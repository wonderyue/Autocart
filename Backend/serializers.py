from rest_framework import serializers
from django.contrib.auth import password_validation
from Backend.models import User, Car, Cart, CarImage, Order, Comment
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from Backend.utils import ExtraFieldMixin
from django.contrib.auth.hashers import make_password
from django.db.models import Avg


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
        '''only register response contains token'''
        if request.method != 'POST':
            self.fields.pop('token')

    def validate_password(self, value):
        password_validation.validate_password(value, self.instance)
        return make_password(value)

    def create(self, validated_data):
        user = super().create(validated_data)
        self.refresh = RefreshToken.for_user(user)
        return user

    '''for SerializeMethodField'''

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
            refresh = self.get_token(user)
            data['token']['exp'] = refresh.access_token.payload['exp']
            data['token']['refreshExp'] = refresh.payload['exp']
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


class CustomTokenRefreshSerializer(TokenRefreshSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = RefreshToken(attrs['refresh'])
        data['exp'] = refresh.access_token.payload['exp']
        data['refreshExp'] = refresh.payload['exp']
        return data


class CarSerializer(ExtraFieldMixin, serializers.ModelSerializer):
    customerRating = serializers.SerializerMethodField(read_only=True)

    def get_customerRating(self, obj):
        '''WHERE Comment.cart.car.id = self.id'''
        queryset = Comment.objects.select_related("cart__car").filter(
            cart__car_id=obj.id)
        res = {}
        res['count'] = queryset.count()
        res['rating'] = round(queryset.aggregate(
            Avg('rating'))['rating__avg'], 2) if res['count'] > 0 else 3
        return res

    class Meta:
        model = Car
        fields = ('__all__')
        extra_fields = ['customerRating']


class CartSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    img = serializers.SerializerMethodField(read_only=True)
    price = serializers.SerializerMethodField(read_only=True)
    commented = serializers.SerializerMethodField(read_only=True)

    '''for SerializeMethodField'''

    def get_name(self, obj):
        return Car.fullname(obj.car)

    def get_img(self, obj):
        return obj.car.img.url

    def get_price(self, obj):
        return obj.car.price

    def get_commented(self, obj):
        try:
            Comment.objects.get(cart=obj.id)
        except Comment.DoesNotExist:
            return False
        return True

    class Meta:
        model = Cart
        fields = ('id', 'car', 'user', 'name', 'img',
                  'price', 'amount', 'saveForLater', 'order', 'commented')


class CarImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarImage
        fields = ('__all__')


class OrderSerializer(ExtraFieldMixin, serializers.ModelSerializer):
    cars = CartSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ('__all__')
        extra_fields = ['cars']


class CommentSerializer(ExtraFieldMixin, serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    img = serializers.SerializerMethodField(read_only=True)

    def get_name(self, obj):
        return obj.user.username

    def get_img(self, obj):
        return obj.user.img

    class Meta:
        model = Comment
        fields = ('__all__')
        extra_fields = ['name', 'img']
