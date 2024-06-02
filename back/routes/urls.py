from django.urls import path
from django.contrib.auth import views as auth_views
from rest_framework_simplejwt.views import TokenRefreshView

from routes.views.auth_views import LoggedUserView, LoginView, LogoutView, RequestPasswordResetView, ResetPasswordView
from routes.views.partnership_views import ListPartnershipRequestsView, PartnershipDetailView, PartnershipListCreateView
from routes.views.place_views import PlaceDetailView, PlaceListCreateView
from routes.views.route_views import RouteDetailView, RouteListCreateView
from routes.views.user_views import GetUsersByRouteView, UserDetailView, UserListCreateView


urlpatterns = [
    path('login', LoginView.as_view(), name='login'),
    path('refresh', TokenRefreshView.as_view(), name='refresh'),
    path('logout', LogoutView.as_view(), name='logout'),
    path('logged', LoggedUserView.as_view(), name='logged'),
    
    path('request_password_reset', RequestPasswordResetView.as_view(), name='request_password_reset'),
    path('reset_password', ResetPasswordView.as_view(), name='reset_password'),

    path('users', UserListCreateView.as_view(), name='gen_user'),
    path('users/<int:pk>', UserDetailView.as_view(), name='spe_user'),
    path('users/by_route/<int:route_id>', GetUsersByRouteView.as_view(), name='get_users_by_route'),
    path('places', PlaceListCreateView.as_view(), name='gen_place'),
    path('places/<int:pk>', PlaceDetailView.as_view(), name='spe_place'),

    path('routes', RouteListCreateView.as_view(), name='gen_route'),
    path('routes/<int:pk>', RouteDetailView.as_view(), name='spe_route'),

    path('partnerships', PartnershipListCreateView.as_view(), name='gen_partnership'),
    path('partnerships/<int:pk>', PartnershipDetailView.as_view(), name='spe_partnership'),

    path('partnerships/requests', ListPartnershipRequestsView.as_view(), name='list_partnership_requests')
]
