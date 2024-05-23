from django.urls import path

from routes.views.auth_views import CustomTokenObtainPairView
from routes.views.endpoint_views import EndpointDetailView, EndpointListCreateView
from routes.views.place_views import PlaceDetailView, PlaceListCreateView
from routes.views.route_views import RouteDetailView, RouteListCreateView
from routes.views.user_views import UserDetailView, UserListCreateView


urlpatterns = [
    path('login', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users', UserListCreateView.as_view(), name='user-list-create'),
    path('users/<int:pk>', UserDetailView.as_view(), name='user-detail'),
    path('places', PlaceListCreateView.as_view(), name='place-list-create'),
    path('places/<int:pk>', PlaceDetailView.as_view(), name='place-detail'),
    path('routes', RouteListCreateView.as_view(), name='route-list-create'),
    path('routes/<int:pk>', RouteDetailView.as_view(), name='route-detail'),
    path('endpoints', EndpointListCreateView.as_view(), name='endpoint-list-create'),
    path('endpoints/<int:pk>', EndpointDetailView.as_view(), name='endpoint-detail'),
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
