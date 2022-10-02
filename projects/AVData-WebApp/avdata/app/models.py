from pyexpat import model
from django.db import models


class Data(models.Model):
    name = models.CharField(max_length=200)
    price = models.IntegerField()
    rent = models.IntegerField()
    emi = models.IntegerField()
    tax = models.IntegerField()
    exp = models.IntegerField()
    expenses_monthly = models.IntegerField(default=0)
    income_monthly = models.IntegerField(default=0)
