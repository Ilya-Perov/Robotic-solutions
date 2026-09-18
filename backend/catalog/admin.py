from django.contrib import admin
from .models import Robot


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
            "fields": ("name", "short_description", "full_description", "category", "image", "price")
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