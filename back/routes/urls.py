from django.urls import path

from routes.views.auth_views import CustomTokenObtainPairView, LoggedUserView, LogoutView
from routes.views.endpoint_views import EndpointDetailView, EndpointListCreateView
from routes.views.place_views import PlaceDetailView, PlaceListCreateView
from routes.views.route_views import RouteDetailView, RouteListCreateView
from routes.views.user_views import UserDetailView, UserListCreateView


urlpatterns = [
    path('login', CustomTokenObtainPairView.as_view(), name='login'),
    path('logout', LogoutView.as_view(), name='logout'),
    path('logged', LoggedUserView.as_view(), name='logged'),
    path('users', UserListCreateView.as_view(), name='gen_user'),
    path('users/<int:pk>', UserDetailView.as_view(), name='spe_user'),
    path('places', PlaceListCreateView.as_view(), name='gen_place'),
    path('places/<int:pk>', PlaceDetailView.as_view(), name='spe_place'),
    path('routes', RouteListCreateView.as_view(), name='gen_route'),
    path('routes/<int:pk>', RouteDetailView.as_view(), name='spe_route'),
    path('endpoints', EndpointListCreateView.as_view(), name='gen_endpoint'),
    path('endpoints/<int:pk>', EndpointDetailView.as_view(), name='spe_endpoint'),
]

# router = DefaultRouter()
# router.register(r'routes', views.RouteViewSet, basename='routes')
# router.register(r'endpoints', views.EndpointViewSet, basename='endpoints')
# router.register(r'places', views.PlaceViewSet, basename='places')
# router.register(r'users', views.UserViewSet, basename='users')

# urlpatterns = [
#     path('', include(router.urls)),
#     path('users/firebase/<str:firebase_id>/', views.UserViewSet.as_view({'get': 'get_user_by_firebase_id'}), name='get_user_by_firebase_id'),
# ]
