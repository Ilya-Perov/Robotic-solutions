from rest_framework import serializers
from .models import Robot


class RobotSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    category_label = serializers.CharField(source="get_category_display", read_only=True)

    class Meta:
        model = Robot
        fields = [
            "id",
            "name",
            "short_description",
            "full_description",
            "image",
            "category",
            "category_label",
            "price",
            "length_m",
            "width_m",
            "weight_kg",
            "max_speed_kmh",
            "autonomy_hours",
            "range_km",
            "payload_kg",
            "control_range_km",
            "battery_capacity_mah",
            "ip_rating",
            "min_temperature_c",
            "max_wind_ms",
            "supports_camera",
            "supports_water_sensors",
            "supports_beacon",
            "supports_tug",
        ]

    def get_image(self, obj):
        request = self.context.get("request")
        if obj.image:
            url = obj.image.url
            if request:
                return request.build_absolute_uri(url)
            return url
        return None


class ContactRequestSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=200)
    phone = serializers.CharField(max_length=50)
    email = serializers.EmailField()
    message = serializers.CharField(required=False, allow_blank=True)