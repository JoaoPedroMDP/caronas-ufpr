from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'routes', views.RouteViewSet, basename='routes')
router.register(r'endpoints', views.EndpointViewSet, basename='endpoints')
router.register(r'places', views.PlaceViewSet, basename='places')
router.register(r'users', views.UserViewSet, basename='users')

urlpatterns = [path('', include(router.urls))]
