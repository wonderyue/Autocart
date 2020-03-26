from rest_framework import routers
from django.urls import path, include
from Backend.views import UserViewSet, CarViewSet, LoginView, CartViewSet

router = routers.DefaultRouter()
router.register('users', UserViewSet)
router.register('cars', CarViewSet)
router.register('carts', CartViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('login/', LoginView.as_view()),
]
