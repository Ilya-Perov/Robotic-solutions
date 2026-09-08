from django.urls import path
from .views import ProsthesisListView, SendRequestView

urlpatterns = [
    path("prostheses/", ProsthesisListView.as_view(), name="prosthesis-list"),
    path("send-request/", SendRequestView.as_view(), name="send-request"),
]
