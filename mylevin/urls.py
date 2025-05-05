from django.contrib import admin
from django.conf.urls import url, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve

# sitemap
from django.contrib.sitemaps.views import sitemap
from levin_main.sitemaps import StaticSitemap, ProductSitemap, VisualizerSitemap, EventSitemap



sitemaps = {
    'static': StaticSitemap,
    'product': ProductSitemap,
    'visualizer': VisualizerSitemap,
    'event': EventSitemap,
}



urlpatterns = [

    url(r'^admin/', admin.site.urls),
    url(r'', include('levin_main.urls')),
    url(r'', include('authenticate.urls')),
    url(r'', include('panel.urls')),
    url(r'', include('vsg.urls')),
    url(r'', include('inquiry.urls')),
    url(r'', include('redirect.urls')),
    url(r'^sitemap.xml/', sitemap, {'sitemaps': sitemaps}, name='django.contrib.sitemaps.views.sitemap'),

]


# Static & Media urls
if settings.DEBUG :
    urlpatterns += static(settings.STATIC_URL, document_root = settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)

else :
    urlpatterns += [url(r'^media/(?P<path>.*)$', serve,{'document_root': settings.MEDIA_ROOT})]
    urlpatterns += [url(r'^static/(?P<path>.*)$', serve,{'document_root': settings.STATIC_ROOT})]

