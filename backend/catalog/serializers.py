from rest_framework import serializers
from .models import Prosthesis


class ProsthesisSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Prosthesis
        fields = ["id", "name", "short_description", "full_description", "image", "category", "price"]

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
