from django.conf.urls import patterns, url, include
from rest_framework import routers
from shop import views
from django.contrib import admin
from django.conf import settings
admin.autodiscover()


router = routers.DefaultRouter(trailing_slash=False)
router.register(r'api/stores', views.StoreViewSet)
router.register(r'api/products', views.ProductViewSet)
# router.register(r'admin', include(admin.site.urls))
# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browseable API.
urlpatterns = patterns('',
	url(r'^$', 'clothzy.views.home', name="home"),
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^api/home', views.HomeView.as_view()),
    # url(r'^api/products/latest', views.ProductLatestView.as_view()),
    url(r'admin', include(admin.site.urls)),
    #static
    (r'^static/(?P<path>.*)$', 'django.views.static.serve',
         {'document_root': settings.STATIC_ROOT}),

    #media
    (r'^media/(?P<path>.*)$', 'django.views.static.serve',
         {'document_root': settings.MEDIA_ROOT}),
    #index

    url('^store|product|review|user\/.*', 'clothzy.views.home', name="home")

)
