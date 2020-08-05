from rest_framework import routers
from django.urls import path, include
from Backend.views import UserViewSet, CarViewSet, LoginView, CartViewSet, CustomTokenRefreshView, CarImageViewSet, OrderView, CommentView
from rest_framework_simplejwt.views import TokenObtainPairView

router = routers.DefaultRouter()
router.register('users', UserViewSet)
router.register('cars', CarViewSet)
router.register('carts', CartViewSet)
router.register('carimages', CarImageViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('login/', LoginView.as_view()),
    path('orders/', OrderView.as_view()),
    path('comments/', CommentView.as_view()),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
]
