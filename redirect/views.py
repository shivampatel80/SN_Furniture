from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import resolve


def product_redirect(request) :

    current_url = request.path

    product_number = current_url.split('/')[-1]

    response = redirect('/media/portfolio/full-sheet/' + product_number)

    return response

