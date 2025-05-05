from django.conf.urls import url
from . import views


urlpatterns = [

    url(r'^images/product/', views.product_redirect, name='product_redirect'),

]
