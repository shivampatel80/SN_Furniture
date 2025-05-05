from django.contrib.sitemaps import Sitemap
from django.shortcuts import reverse
from django.conf import settings

# model
from panel.models import Product, Event
from vsg.models import VSG




class StaticSitemap(Sitemap) :
    protocol = 'http' if settings.DEBUG else 'https'

    def items(self) :
        return ['home', 'products', 'catalogues', 'visualizer_default', 'contact',]

    def location(self, item) :
        return reverse(item)

    def priority(self, item):
        return {'home': 1.00, 'products': 1.00, 'catalogues': 1.00, 'visualizer_default': 1.00, 'contact': 1.00,}[item]


class ProductSitemap(Sitemap) :
    priority = 0.9
    protocol = 'http' if settings.DEBUG else 'https'
    
    def items(self) :
        return Product.objects.all()


class VisualizerSitemap(Sitemap) :
    priority = 0.9
    protocol = 'http' if settings.DEBUG else 'https'
    
    def items(self) :
        return VSG.objects.all()


class EventSitemap(Sitemap) :
    priority = 0.9
    protocol = 'http' if settings.DEBUG else 'https'
    
    def items(self) :
        return Event.objects.all()


