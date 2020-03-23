from rest_framework import routers
from django.urls import path, include
from Backend.views import UserViewSet, CarViewSet, LoginView

router = routers.DefaultRouter()
router.register('users', UserViewSet)
router.register('cars', CarViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('login/', LoginView.as_view()),
]
