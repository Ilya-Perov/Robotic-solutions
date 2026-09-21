from django.contrib import admin
from .models import Robot, Post


@admin.register(Robot)
class RobotAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "category",
        "weight_kg",
        "max_speed_kmh",
        "autonomy_hours",
        "price",
    )
    list_filter = ("category", "supports_camera", "supports_water_sensors")
    search_fields = ("name", "short_description", "full_description")
    fieldsets = (
        ("Основное", {
            "fields": ("name", "short_description", "full_description", "category", "image_url", "gallery", "price")
        }),
        ("Габариты и масса", {
            "fields": ("length_m", "width_m", "weight_kg")
        }),
        ("Движение и автономность", {
            "fields": (
                "max_speed_kmh",
                "autonomy_hours",
                "range_km",
                "payload_kg",
                "control_range_km",
                "battery_capacity_mah",
            )
        }),
        ("Условия эксплуатации", {
            "fields": ("ip_rating", "min_temperature_c", "max_wind_ms")
        }),
        ("Сменные модули", {
            "fields": (
                "supports_camera",
                "supports_water_sensors",
                "supports_beacon",
                "supports_tug",
            )
        }),
    )

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ("title", "is_published", "published_at", "created_at", "order")
    list_filter = ("is_published",)
    search_fields = ("title", "short_description", "full_description")
    list_editable = ("is_published", "order")
    readonly_fields = ("created_at", "updated_at")
    fieldsets = (
        ("Основное", {
            "fields": ("title", "short_description", "full_description", "image_url")
        }),
        ("Публикация", {
            "fields": ("is_published", "published_at", "order")
        }),
        ("Служебное", {
            "fields": ("created_at", "updated_at")
        }),
    )