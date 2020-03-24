from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.auth.hashers import make_password


class User(AbstractUser):
    first_name = None
    last_name = None
    img = models.CharField(max_length=32, default='avatars/1.png')

    def __str__(self):
        return self.username

    class Meta(AbstractUser.Meta):
        pass


class Car(models.Model):
    CATEGORY_OPTIONS = (
        ('Hatchback', 'Hatchback'),
        ('SUV', 'SUV'),
        ('Sedan', 'Sedan'),
        ('Trucks', 'Trucks')
    )
    name = models.CharField(max_length=64)
    des = models.CharField(max_length=1024, blank=True)
    year = models.IntegerField()
    brand = models.CharField(max_length=64)
    category = models.CharField(max_length=32, choices=CATEGORY_OPTIONS)
    model = models.CharField(max_length=64)
    price = models.IntegerField()
    horsepower = models.IntegerField()
    mpg = models.IntegerField(help_text='Combined Fuel Economy')
    fuelType = models.CharField(max_length=32, default="Gasoline")
    seating = models.CharField(max_length=32, default="Second Row Seating")
    drivetrain = models.CharField(max_length=32, default="FWD")
    interiorColor = models.CharField(max_length=32, default="white")
    exteriorColor = models.CharField(max_length=32, default="white")
    engine = models.CharField(max_length=64, blank=True)
    transmission = models.CharField(max_length=64, blank=True)
    stockid = models.CharField(max_length=64, blank=True)
    vin = models.CharField(max_length=64, blank=True)
    mileage = models.IntegerField(default=50)
    expertRating = models.IntegerField(default=3)
    img = models.CharField(max_length=64, default="cars/1.png")
    detailImgs = models.CharField(max_length=256, default="cars/1.png")
    enable = models.BooleanField(default=True)
    priority = models.IntegerField(default=1)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['id']
