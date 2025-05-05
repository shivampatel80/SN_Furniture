from django.conf.urls import url
from vsg import views


urlpatterns = [

    # front
    url(r'^visualizer/$', views.visualizer_default, name='visualizer_default'),
    url(r'^visualizer/(?P<area>.*)/$', views.visualizer, name='visualizer'),

    # visual-gallery
    url(r'^panel/visual-gallery/$', views.vsg_back, name='vsg_back'),
    url(r'^panel/visual-gallery/edit/(?P<vsg_pk>\d+)/$', views.vsg_edit, name='vsg_edit'),
    url(r'^panel/visual-gallery/delete/(?P<vsg_pk>\d+)/$', views.vsg_delete, name='vsg_delete'),

    # visual-gallery - product
    url(r'^panel/visual-gallery/product/(?P<vsg_pk>\d+)/$', views.vsg_back_product, name='vsg_back_product'),
    url(r'^panel/visual-gallery/product/edit/(?P<vsg_pk>\d+)/(?P<vsg_product_pk>\d+)/$', views.vsg_back_product_edit, name='vsg_back_product_edit'),
    url(r'^panel/visual-gallery/product/delete/(?P<vsg_pk>\d+)/(?P<vsg_product_pk>\d+)/$', views.vsg_back_product_delete, name='vsg_back_product_delete'),


]
