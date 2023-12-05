"""URL patterns for user profile-related views."""

from django.urls import path
from .views import (UserProfileView,
                    ViewUserProfile,
                    update_profile_image,
                    update_status,
                    remove_saved_post,
                    get_all_users_profiles,
                    deleteUserAccount)

urlpatterns = [
    path('', UserProfileView.as_view(), name='user_profile'),
    path('update_profile_image/', update_profile_image, name='update_profile_image'),
    path('update_status/', update_status, name='update_status'),
    path('view_user_profile/<int:user_id>/', ViewUserProfile.as_view(), name='view_user_profile'),
    path('edit_user_profile/', ViewUserProfile.as_view(), name='edit_user_profile'),
    path('remove_saved_post/<int:post_id>/', remove_saved_post, name='remove_saved_post'),
    path('get_all_user_profiles/', get_all_users_profiles, name='get_all_user_profiles'),
    path('delete_account/', deleteUserAccount, name='delete_account')
]
