from django.contrib import admin
from . import models

admin.site.register(models.User)
admin.site.register(models.Car)
admin.site.register(models.Cart)
admin.site.register(models.Order)
admin.site.register(models.CarImage)
admin.site.register(models.Comment)
