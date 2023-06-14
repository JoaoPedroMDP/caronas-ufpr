from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'routes', views.RouteViewSet, basename='routes')
router.register(r'endpoints', views.EndpointViewSet, basename='endpoints')

urlpatterns = [path('', include(router.urls))]
