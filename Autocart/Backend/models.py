from django.db import models
from django.contrib.auth.hashers import make_password


class User(models.Model):

    name = models.CharField(max_length=16, unique=True)
    password = models.CharField(max_length=32)
    c_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['c_time']


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

    @property
    def full_name(self):
        return '%s %s' % (self.year, self.name)

    class Meta:
        ordering = ['id']
