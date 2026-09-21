from django.db import models


class Robot(models.Model):
    CATEGORY_CHOICES = [
        ("monitoring", "Мониторинг"),
        ("rescue", "Спасательные операции"),
        ("sensors", "Датчики и модули"),
    ]

    name = models.CharField(max_length=200, verbose_name="Название")
    short_description = models.CharField(max_length=300, verbose_name="Краткое описание")
    full_description = models.TextField(verbose_name="Полное описание")
    image_url = models.URLField(
        "Ссылка на фото",
        max_length=500,
        blank=True,
        help_text="Прямая ссылка на изображение, например: https://i.imgur.com/abc.jpg",
    )
    category = models.CharField(
        max_length=20,
        choices=CATEGORY_CHOICES,
        default="monitoring",
        verbose_name="Категория",
    )
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True,
        verbose_name="Цена",
    )
    gallery = models.JSONField(
        "Галерея (ссылки на изображения)",
        default=list,
        blank=True,
        help_text="Список URL изображений, например: [\"/media/robots/1.jpg\", \"/media/robots/2.jpg\"]",
    )

    # Габариты и масса
    length_m = models.FloatField(default=2.0, verbose_name="Длина, м")
    width_m = models.FloatField(default=1.0, verbose_name="Ширина, м")
    weight_kg = models.FloatField(default=12.0, verbose_name="Масса, кг")

    # Движение и автономность
    max_speed_kmh = models.FloatField(default=5.0, verbose_name="Макс. скорость, км/ч")
    autonomy_hours = models.FloatField(default=2.0, verbose_name="Автономность, ч")
    range_km = models.FloatField(default=5.0, verbose_name="Запас хода, км")
    payload_kg = models.FloatField(default=2.0, verbose_name="Полезная нагрузка, кг")
    control_range_km = models.FloatField(default=1.0, verbose_name="Дальность управления, км")
    battery_capacity_mah = models.PositiveIntegerField(
        default=10000, verbose_name="Ёмкость АКБ, мА·ч"
    )

    # Условия эксплуатации
    ip_rating = models.CharField(max_length=16, default="IP67", verbose_name="Класс защиты")
    min_temperature_c = models.FloatField(default=5.0, verbose_name="Мин. температура, °C")
    max_wind_ms = models.FloatField(default=8.0, verbose_name="Макс. ветер, м/с")

    # Сменные модули
    supports_camera = models.BooleanField(default=True, verbose_name="Видеокамера")
    supports_water_sensors = models.BooleanField(
        default=True, verbose_name="Датчики качества воды"
    )
    supports_beacon = models.BooleanField(default=True, verbose_name="Свето-звуковой маяк")
    supports_tug = models.BooleanField(
        default=True, verbose_name="Буксировка лёгких предметов"
    )

    class Meta:
        verbose_name = "Роботизированная платформа"
        verbose_name_plural = "Роботизированные платформы"
        ordering = ["id"]

    def __str__(self):
        return self.name

class Post(models.Model):
    title = models.CharField("Заголовок", max_length=200)
    short_description = models.CharField(
        "Краткое описание", max_length=300, blank=True
    )
    full_description = models.TextField("Полный текст")

    image_url = models.URLField(
        "Ссылка на фото",
        max_length=500,
        blank=True,
        help_text="Прямая ссылка на изображение, например: https://i.imgur.com/abc.jpg",
    )

    created_at = models.DateTimeField("Создано", auto_now_add=True)
    updated_at = models.DateTimeField("Обновлено", auto_now=True)
    published_at = models.DateTimeField("Дата публикации", null=True, blank=True)
    is_published = models.BooleanField("Опубликовано", default=True)
    order = models.PositiveIntegerField("Порядок", default=0)

    class Meta:
        verbose_name = "Пост"
        verbose_name_plural = "Посты"
        ordering = ["-published_at", "-created_at", "order", "id"]

    def __str__(self):
        return self.title