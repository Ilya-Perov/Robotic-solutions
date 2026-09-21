from django.urls import path
from .views import RobotListView, PostListView, SendRequestView

urlpatterns = [
    path("robots/", RobotListView.as_view(), name="robot-list"),
    path("posts/", PostListView.as_view(), name="post-list"),
    path("send-request/", SendRequestView.as_view(), name="send-request"),
]