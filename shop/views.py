from shop.models import Store, Product, Review
from rest_framework import viewsets
from shop.serializers import StoreSerializer, ProductSerializer, ReviewSerializer
from rest_framework import filters
from rest_framework import generics
from rest_framework.decorators import link
from rest_framework.response import Response
from rest_framework.views import APIView
import json

class StoreViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows Stores to be viewed.
    """
    queryset = Store.objects.all()
    serializer_class = StoreSerializer
    # filter_fields = ['name']
    # filter_backends = (filters.DjangoFilterBackend,)
    filter_backends = (filters.OrderingFilter,)

    @link()
    def products(self, request, pk=None):
        products =  Product.objects.filter(store = self.get_object())
        serializer = ProductSerializer(products)
        return Response(serializer.data)

    @link()
    def reviews(self, request, pk=None):
        reviews =  Review.objects.filter(store = self.get_object())
        serializer = ReviewSerializer(reviews)
        return Response(serializer.data)

class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows Products to be viewed or edited.
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer  # Create your views here.

    filter_backends = (filters.OrderingFilter,filters.DjangoFilterBackend,)
    filter_fields = ['name']
    # ordering = ('popularity',)

    @link()
    def reviews(self, request, pk=None):
        reviews =  Review.objects.filter(product = self.get_object())
        serializer = ReviewSerializer(reviews)
        return Response(serializer.data)

class HomeView(APIView):

    def get(self, request, format=None):
        """
        Return a list of all users.
        """
        dict1 = {}
        stores =  Store.objects.all().order_by("-created_on")[:3]
        serializer1 = StoreSerializer(stores)
        dict1["Stores"] = serializer1.data

        products =  Product.objects.all().order_by("-created_on")[:3]
        serializer2 = ProductSerializer(products)
        dict1["Products"] = serializer2.data

        reviews =  Review.objects.all().order_by("-created_on")[:3]
        serializer3 = ReviewSerializer(reviews)
        dict1["Reviews"] = serializer3.data

        return Response(dict1)

class ProductSearchView(APIView):

    def get(self,request, format=None):
        """
        Return product search results.
        """
        dict1 = {}
        dict1["Filters"]  = {"Price":[100,10000],"Location":["HauzKhas","ShahpurJat","MalviyaNagar"],"Size":["XL","M","L","S"],"Color":["Red","Orange","Green","Blue"],"Discount":[],"Occassion":["Party","Wedding","Dhinchak"]}
        # print data
        # dict1["Filters"] = data
        print dict1["Filters"]
        dict1["Products"] = {"id":16,"store":6,"name":"Black net dress","sku":"446","sex":"Female","price":"null","price_discounted":"null","brand":"Niharika Pandey","color":"Black","material":"Net","sizes":"","made_to_order":"false","active":"true","description":"","popularity":"","created_on":"2014-01-25T23:33:07.422","updated_on":"2014-01-25T23:33:07.422","num_images":"null","category":"Dress"},{"id":39,"store":8,"name":"Black net dress","sku":"446","sex":"Female","price":"null","price_discounted":"null","brand":"Niharika Pandey","color":"Black","material":"Net","sizes":"","made_to_order":"false","active":"true","description":"","popularity":"","created_on":"2014-01-26T13:56:46.596","updated_on":"2014-01-26T13:56:46.596","num_images":"null","category":"Dress"},{"id":41,"store":8,"name":"Black wool dress","sku":"60","sex":"Female","price":"null","price_discounted":"null","brand":"Niharika Pandey","color":"Black","material":"Wool","sizes":"","made_to_order":"false","active":"true","description":"","popularity":"","created_on":"2014-01-26T13:56:46.604","updated_on":"2014-01-26T13:56:46.604","num_images":"null","category":"Dress"},{"id":18,"store":6,"name":"Black wool dress","sku":"60","sex":"Female","price":"null","price_discounted":"null","brand":"Niharika Pandey","color":"Black","material":"Wool","sizes":"","made_to_order":"false","active":"true","description":"","popularity":"","created_on":"2014-01-25T23:33:07.427","updated_on":"2014-01-25T23:33:07.427","num_images":"null","category":"Dress"},{"id":10,"store":6,"name":"Blue net suit","sku":"76","sex":"Female","price":"null","price_discounted":"null","brand":"Niharika Pandey","color":"Blue","material":"Net","sizes":"","made_to_order":"false","active":"true","description":"","popularity":"","created_on":"2014-01-25T23:33:07.407","updated_on":"2014-01-25T23:33:07.407","num_images":"null","category":"Suit"},{"id":9,"store":6,"name":"Blue net suit","sku":"366","sex":"Female","price":"null","price_discounted":"null","brand":"Niharika Pandey","color":"Blue","material":"Net","sizes":"","made_to_order":"false","active":"true","description":"","popularity":"","created_on":"2014-01-25T23:33:07.404","updated_on":"2014-01-25T23:33:07.404","num_images":"null","category":"Suit"},{"id":32,"store":8,"name":"Blue net suit","sku":"366","sex":"Female","price":"null","price_discounted":"null","brand":"Niharika Pandey","color":"Blue","material":"Net","sizes":"","made_to_order":"false","active":"true","description":"","popularity":"","created_on":"2014-01-26T13:56:46.570","updated_on":"2014-01-26T13:56:46.570","num_images":"null","category":"Suit"},{"id":33,"store":8,"name":"Blue net suit","sku":"76","sex":"Female","price":"null","price_discounted":"null","brand":"Niharika Pandey","color":"Blue","material":"Net","sizes":"","made_to_order":"false","active":"true","description":"","popularity":"","created_on":"2014-01-26T13:56:46.573","updated_on":"2014-01-26T13:56:46.573","num_images":"null","category":"Suit"},{"id":21,"store":6,"name":"Green net saree","sku":"1","sex":"Female","price":"null","price_discounted":"null","brand":"Niharika Pandey","color":"Green","material":"Net","sizes":"","made_to_order":"false","active":"true","description":"","popularity":"","created_on":"2014-01-25T23:33:07.434","updated_on":"2014-01-25T23:33:07.434","num_images":"null","category":"Saree"},{"id":44,"store":8,"name":"Green net saree","sku":"1","sex":"Female","price":"null","price_discounted":"null","brand":"Niharika Pandey","color":"Green","material":"Net","sizes":"","made_to_order":"false","active":"true","description":"","popularity":"","created_on":"2014-01-26T13:56:46.613","updated_on":"2014-01-26T13:56:46.613","num_images":"null","category":"Saree"},{"id":34,"store":8,"name":"Green net suit","sku":"157","sex":"Female","price":"null","price_discounted":"null","brand":"Niharika Pandey","color":"Green","material":"Net","sizes":"","made_to_order":"false","active":"true","description":"","popularity":"","created_on":"2014-01-26T13:56:46.576","updated_on":"2014-01-26T13:56:46.576","num_images":"null","category":"Suit"}
        return Response(dict1)
# class ProductLatestView(generics.ListAPIView):
#     queryset = Product.objects.all()
#     serializer_class = ProductSerializer  # Create your views here.

#     def get_queryset(self):
#         return Product.objects.all().order_by('created_on').reverse()[:1]