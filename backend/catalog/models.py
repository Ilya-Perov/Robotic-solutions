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
    image = models.ImageField(
        upload_to="robots/", verbose_name="Изображение", null=True, blank=True
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