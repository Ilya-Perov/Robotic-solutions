from django.urls import path
from .views import RobotListView, SendRequestView

urlpatterns = [
    path("robots/", RobotListView.as_view(), name="robot-list"),
    path("send-request/", SendRequestView.as_view(), name="send-request"),
]