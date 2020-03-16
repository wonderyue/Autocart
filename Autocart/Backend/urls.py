from rest_framework import routers
from django.urls import path, include
from Backend.views import UserViewSet, CarViewSet

router = routers.DefaultRouter()
router.register('users', UserViewSet)
router.register('cars', CarViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
