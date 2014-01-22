from shop.models import Store, Product, Review
from rest_framework import serializers


class StoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        # fields = ('name', 'location', 'phone')

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review