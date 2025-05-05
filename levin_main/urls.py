from django.conf.urls import url
from levin_main import views


urlpatterns = [

    url(r'^$', views.home, name='home'),
    url(r'^contact/$', views.contact, name='contact'),
    url(r'^events/(?P<name_slug>.*)/$', views.events, name='events'),
    url(r'^products/(?P<name_slug>.*)/(?P<sheet_number>.*)/$', views.product_detail_single, name='product_detail_single'),
    url(r'^products/(?P<name_slug>.*)/$', views.product_detail, name='product_detail'),
    url(r'^products/$', views.products, name='products'),
    url(r'^privacy-policy/$', views.privacy_policy, name='privacy_policy'),

    url(r'^product_search/$', views.product_search, name='product_search'),

    # catalogue
    url(r'^catalogues/$', views.catalogues, name='catalogues'),
    url(r'^catalogue/remark/$', views.catalogue_remark, name='catalogue_remark'),
    url(r'^catalogue/ultima/$', views.catalogue_ultima, name='catalogue_ultima'),
    url(r'^catalogue/elite/$', views.catalogue_elite, name='catalogue_elite'),
    url(r'^catalogue/doorvin/$', views.catalogue_doorvin, name='catalogue_doorvin'),
    url(r'^catalogue/lecolours/$', views.catalogue_lecolours, name='catalogue_lecolours'),
    url(r'^catalogue/lemore/$', views.catalogue_lemore, name='catalogue_lemore'),
    url(r'^catalogue/leone/$', views.catalogue_leone, name='catalogue_leone'),
    url(r'^catalogue/catalogue_decorative/$', views.catalogue_decorative, name='catalogue_decorative'),

    url(r'^error-found/$', views.error, name='error'),

]


