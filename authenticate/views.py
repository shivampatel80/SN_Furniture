from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib import messages
from django.core.mail import send_mail, EmailMessage
from django.conf import settings
import random
from django.contrib.auth.decorators import login_required



def mylogin(request):

    if request.method == 'POST':

        email = request.POST.get('email', '')
        password = request.POST.get('password', '')

        user = authenticate(username=email, password=password)

        if user != None :
            
            login(request, user)

            messages.success(request, 'Welcome '+ str(user.first_name))

            return redirect('panel')

        else :

            messages.error(request, 'Credentials did not match')

            return redirect(mylogin)

    return render(request, 'back/authenticate/login.html')



def mylogout(request):

    logout(request)

    return redirect('mylogin')


@login_required
def master_panel(request) :

    # {% url 'admin:index' %} | for admin

    user = request.user

    if user.is_authenticated :

        if user.is_staff :
            return HttpResponseRedirect('/admin/')
        else :
            msg = "You are allowed here. Now buzz off."
            messages.error(request, msg)

            return redirect('panel')

    else :
        return redirect('mylogin')

    return HttpResponseRedirect('/admin/')
