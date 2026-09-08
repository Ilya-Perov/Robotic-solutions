from django.db import models


class Prosthesis(models.Model):
    CATEGORY_CHOICES = [
        ("legs", "Для ног"),
        ("arms", "Для рук"),
        ("cosmetic", "Косметические"),
    ]

    name = models.CharField(max_length=200, verbose_name="Название")
    short_description = models.CharField(max_length=300, verbose_name="Краткое описание")
    full_description = models.TextField(verbose_name="Полное описание")
    image = models.ImageField(upload_to="prostheses/", verbose_name="Изображение")
    category = models.CharField(
        max_length=20,
        choices=CATEGORY_CHOICES,
        default="legs",
        verbose_name="Категория",
    )
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True,
        verbose_name="Цена",
    )

    class Meta:
        verbose_name = "Протез"
        verbose_name_plural = "Протезы"
        ordering = ["id"]

    def __str__(self):
        return self.name
