from shop.models import Store, Product, Review
from rest_framework import viewsets
from shop.serializers import StoreSerializer, ProductSerializer, ReviewSerializer
from rest_framework import filters
from rest_framework import generics
from rest_framework.decorators import link
from rest_framework.response import Response
from rest_framework.views import APIView

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
    filter_fields = ['name','category']
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

# class ProductLatestView(generics.ListAPIView):
#     queryset = Product.objects.all()
#     serializer_class = ProductSerializer  # Create your views here.

#     def get_queryset(self):
#         return Product.objects.all().order_by('created_on').reverse()[:1]