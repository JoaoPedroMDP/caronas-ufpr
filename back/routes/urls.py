from django.urls import path

from routes.views.auth_views import CustomTokenObtainPairView, LoggedUserView, LogoutView
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
]
