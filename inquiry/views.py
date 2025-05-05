from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from django.utils.safestring import mark_safe
from django.contrib import messages
import datetime
from django.core.mail import send_mail, EmailMessage
from django.conf import settings

# models
from panel.models import Event, Event_Images, Product, Full_Sheet
from inquiry.models import Enquiry



def enquiry(request) :

    if request.method == 'POST' :

        name = request.POST.get('name', '')
        email = request.POST.get('email', '')
        phone = request.POST.get('phone', '')
        message = request.POST.get('message', '')

        # getting : today's date
        today = datetime.datetime.now()
        date = "{} {}, {}".format(today.strftime('%B'), today.day, today.year)

        enquiry_obj = Enquiry(
            name = name,
            email = email,
            phone = phone,
            message = message,
            date = date,
        )

        enquiry_obj.save()

        # email : to Me
        message_ = "Hello, You have received new enquiry from website. Have a look at it. <br><br>" + "Name : " + name + "<br><br>Email : " + email + "<br><br>Phone : " + phone + "<br><br>Message : " + message + "<br><br><br><br><br><br>Have a good one."

        title_ = "Tou have new enquiry from website "  

        email_ = EmailMessage(title_, message_, 'Got Enquiry <mailer@krioskcreata.com>', ['levindecor@yahoo.com'])

        email_.content_subtype = 'html'

        email_.send()


        messages.success(request, 'Your message has been sent, you will hear from us soon')

        return redirect('contact')


    enquiry = Enquiry.objects.all()

    send = {
        'enquiry': enquiry,
    }

    return render(request, 'back/enquiry/contact_back.html', send)


def enquiry_view(request, enquiry_pk) :

    try :
        enquiry = Enquiry.objects.get(pk=enquiry_pk)
    except :
        messages.error(request, 'Enquiry not found')

        return redirect('enquiry')


    send = {
        'enquiry': enquiry,
    }

    return render(request, 'back/enquiry/contact_back_view.html', send)



def enquiry_delete(request, enquiry_pk) :

    try :
        enquiry = Enquiry.objects.get(pk=enquiry_pk)
    except :
        messages.error(request, 'Enquiry not found')

        return redirect('enquiry')

    enquiry.delete()

    messages.success(request, 'Enquiry is removed')

    return redirect('enquiry')

