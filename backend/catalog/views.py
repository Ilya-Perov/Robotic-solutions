from django.core.mail import send_mail
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Prosthesis
from .serializers import ProsthesisSerializer, ContactRequestSerializer


class ProsthesisListView(generics.ListAPIView):
    queryset = Prosthesis.objects.all()
    serializer_class = ProsthesisSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        return context


class SendRequestView(APIView):
    def post(self, request):
        serializer = ContactRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        subject = f"Новая заявка от {data['name']}"
        message = (
            f"Имя: {data['name']}\n"
            f"Телефон: {data['phone']}\n"
            f"Email: {data['email']}\n"
            f"Сообщение: {data.get('message', '-')}"
        )
        from_email = "noreply@prosthetics-shop.ru"
        recipient_list = ["info@prosthetics-shop.ru"]

        try:
            send_mail(
                subject,
                message,
                from_email,
                recipient_list,
                fail_silently=True,
            )
        except Exception:
            pass

        print("=" * 50)
        print("НОВАЯ ЗАЯВКА (вывод в консоль, пока SMTP не настроен)")
        print(f"Имя: {data['name']}")
        print(f"Телефон: {data['phone']}")
        print(f"Email: {data['email']}")
        print(f"Сообщение: {data.get('message', '-')}")
        print("=" * 50)

        return Response(
            {"detail": "Заявка отправлена! С вами свяжутся."},
            status=status.HTTP_200_OK,
        )
