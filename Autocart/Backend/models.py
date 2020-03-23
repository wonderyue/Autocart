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
    name = models.CharField(max_length=16)
    year = models.IntegerField()
    category = models.CharField(max_length=32, choices=CATEGORY_OPTIONS)
    model = models.CharField(max_length=32)
    price = models.IntegerField()
    horsepower = models.IntegerField()
    mpg = models.IntegerField(help_text='Combined Fuel Economy')
    des = models.CharField(max_length=512)
    url = models.CharField(max_length=32)
    update_time = models.DateTimeField(auto_now=True)
    enable = models.BooleanField(default=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['id']
