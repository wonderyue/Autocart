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
