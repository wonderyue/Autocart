from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator


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
    des = models.TextField(max_length=1024, blank=True)
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
    color = models.CharField(max_length=32, default="white")
    engine = models.CharField(max_length=64, blank=True)
    transmission = models.CharField(max_length=64, blank=True)
    stockid = models.CharField(max_length=64, blank=True)
    vin = models.CharField(max_length=64, blank=True)
    mileage = models.IntegerField(blank=True)
    expertRating = models.IntegerField(default=3)
    img = models.ImageField(upload_to='cars/', default="cars/1.png")
    enable = models.BooleanField(default=True)
    priority = models.IntegerField(default=1)

    def __str__(self):
        return self.name

    def fullname(self):
        return '{} {} {} {}'.format(self.year, self.brand, self.name, self.model)

    class Meta:
        ordering = ['id']


class CarImage(models.Model):
    car = models.ForeignKey(Car, on_delete=models.CASCADE)
    img = models.ImageField(upload_to='cars/', default="cars/1.png")
    index = models.IntegerField()

    def __str__(self):
        return '{}_{}_{}'.format(self.id, self.car.id, self.index)

    class Meta:
        ordering = ['index']


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    paid = models.BooleanField(default=False)
    pickedUp = models.BooleanField(default=False)
    firstName = models.CharField(max_length=64, blank=True)
    lastName = models.CharField(max_length=64, blank=True)
    email = models.EmailField(max_length=32, blank=True)
    phone = models.CharField(max_length=32)
    message = models.TextField(max_length=1024, blank=True)
    createTime = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return '{}_{}'.format(self.id, self.user.username)

    class Meta:
        ordering = ['-createTime']


class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    car = models.ForeignKey(Car, on_delete=models.CASCADE)
    amount = models.IntegerField(default=1)
    saveForLater = models.BooleanField(default=False)
    createTime = models.DateTimeField(auto_now_add=True)
    order = models.ForeignKey(
        Order, related_name="cars", on_delete=models.CASCADE, blank=True, null=True, default=None)

    def __str__(self):
        return '{}_{}_{}'.format(self.id, self.user.username, self.car.id)

    class Meta:
        ordering = ['createTime']


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    cart = models.OneToOneField(Cart, on_delete=models.CASCADE)
    rating = models.IntegerField(default=5, validators=[
                                 MaxValueValidator(5), MinValueValidator(1)])
    comment = models.TextField(max_length=1024, blank=True)
    createTime = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return '{}_{}_{}'.format(self.id, self.user.username, self.cart.id)

    class Meta:
        ordering = ['createTime']
