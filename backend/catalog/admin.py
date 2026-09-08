from django.contrib import admin
from .models import Prosthesis


@admin.register(Prosthesis)
class ProsthesisAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "price", "image")
    list_filter = ("category",)
    search_fields = ("name", "short_description")
