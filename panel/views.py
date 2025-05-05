from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib import messages
import datetime
from django.utils.safestring import mark_safe
import json
from django.core.files.storage import default_storage
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from itertools import chain
from django.contrib.auth.decorators import login_required
from panel.models import Product, Full_Sheet, Event, Event_Images, Page_Handler
from inquiry.models import Enquiry



@login_required
def panel(request):

    storage = messages.get_messages(request)
    storage.used = True

    inquiry = Enquiry.objects.all().order_by('-id')[:5]

    return render(request, 'back/panel.html', {
        'inquiry': inquiry,
    })

def error_back(request) :

    return render(request, 'back/error_back.html')



@login_required
def product_list(request):

    product_all = Product.objects.all()

    send = {
        'product_all': product_all,
    }

    return render(request, 'back/panel/product_list.html', send)


@login_required
def product_add(request):

    if request.method == 'POST' :

        name = request.POST.get('name', '')
        intro = request.POST.get('intro', '')
        detail = request.POST.get('detail1', '')

        image1 = request.FILES.get('image1', '')

        meta_title = request.POST.get('meta_title', '')
        meta_description = request.POST.get('meta_description', '')

        index = Product.objects.all().count() + 1

        product_obj = Product(
            index=index,
            name=name,
            intro = intro,
            detail = detail,
            image1 = image1,
            meta_title = meta_title,
            meta_description = meta_description,
        )

        product_obj.save()

        msg = "New product has been added successfully"
        messages.success(request, msg)

        return redirect('product_list')


    return render(request, 'back/panel/product_add.html')


@login_required
def product_edit(request, product_pk) :

    if request.method == 'POST' :

        try :
            product = Product.objects.get(pk=product_pk)
        except :
            msg = "Product not found, try to go back, refresh the page and come again"
            messages.success(request, msg)

            return redirect('error_back')

        index = request.POST.get('index', None)
        name = request.POST.get('name', '')
        intro = request.POST.get('intro', '')
        detail = request.POST.get('detail1', '')
        
        image1 = request.FILES.get('image1', None)

        meta_title = request.POST.get('meta_title', '')
        meta_description = request.POST.get('meta_description', '')

        if image1 != None :
            if product.image1 :
                default_storage.delete(product.image1.path)
            product.image1 = image1


        product.index = index
        product.name = name
        product.intro = intro
        product.detail = detail
        product.meta_title = meta_title
        product.meta_description = meta_description

        product.save()

        msg = "Edits made to product page are committed successfully, changes will be visible on front-page in few minutes !"
        messages.success(request, msg)

        return redirect('product_list')


    try :
        product = Product.objects.get(pk=product_pk)
    except :
        msg = "Product not found, try to go back, refresh the page and come again"
        messages.success(request, msg)

        return redirect('error_back')

    send = {
        'product': product,
    }

    return render(request, 'back/panel/product_edit.html', send)


@login_required
def product_delete(request, product_pk) :

    try :
        product = Product.objects.get(pk=product_pk)
    except :
        msg = "Product not found, try to go back, refresh the page and come again"
        messages.success(request, msg)

        return redirect('error_back')

    product.delete()

    msg = "Product and all the full-sheets associated with it are deleted completely !"
    messages.success(request, msg)

    return redirect('product_list')


@login_required
def sheet_list(request, product_pk) :

    if request.method == 'POST' :

        number = request.POST.get('number', None)
        name = request.POST.get('name', None)
        finish = request.POST.get('finish', None)
        size = request.POST.get('size', None)
        image1 = request.FILES.get('image1', None)
        has_detail = bool(request.POST.get('has_detail', False))

        try :
            product = Product.objects.get(pk=product_pk)
        except :
            msg = "Product not found, try to go back, refresh the page and come again"
            messages.success(request, msg)

            return redirect('error_back')

        sheet_index = Full_Sheet.objects.filter(fk=product).count() + 1

        sheet_obj = Full_Sheet(
            fk = product,
            index = sheet_index,
            number = number,
            name = name,
            finish = finish,
            size = size,
            image1 = image1,
            has_detail = has_detail,
        )

        sheet_obj.save()

        msg = "Full-Sheet has been added successfully !"
        messages.success(request, msg)

        return redirect('sheet_list', product_pk)


    
    try :
        product = Product.objects.get(pk=product_pk)
    except :
        msg = "Product not found, try to go back, refresh the page and come again"
        messages.success(request, msg)

        return redirect('error_back')

    sheet = Full_Sheet.objects.filter(fk=product).order_by('index')

    send = {
        'sheet': sheet,
        'product': product,
    }

    return render(request, 'back/panel/sheet_back.html', send)


@login_required
def sheet_edit(request, product_pk, sheet_pk) :

    if request.method == 'POST' :

        try :
            sheet = Full_Sheet.objects.get(pk=sheet_pk)
        except :
            msg = "Sheet not found, try to go back, refresh the page and come again"
            messages.success(request, msg)

            return redirect('error_back')


        index = request.POST.get('index', None)
        number = request.POST.get('number', None)
        image1 = request.FILES.get('image1', None)
        name = request.POST.get('name', None)
        finish = request.POST.get('finish', None)
        size = request.POST.get('size', None)
        has_detail = bool(request.POST.get('has_detail', False))


        if image1 != None :
            if sheet.image1 :
                default_storage.delete(sheet.image1.path)
            sheet.image1 = image1

        sheet.index = index
        sheet.number = number
        sheet.name = name
        sheet.finish = finish
        sheet.size = size
        sheet.has_detail = has_detail

        sheet.save()

        msg = "Edits made to Full-Sheet has been applied successfully. It could be visible on front page any moment !"
        messages.success(request, msg)
        

        return redirect('sheet_list', product_pk)


    try :
        sheet = Full_Sheet.objects.get(pk=sheet_pk)
    except :
        msg = "Sheet not found, try to go back, refresh the page and come again"
        messages.success(request, msg)

        return redirect('error_back')

    send = {
        'sheet': sheet,
        'product_pk': product_pk,
    }

    return render(request, 'back/panel/sheet_back_edit.html', send)


@login_required
def sheet_delete(request, product_pk, sheet_pk) :

    try :
        sheet = Full_Sheet.objects.get(pk=sheet_pk)
    except :
        msg = "Sheet not found, try to go back, refresh the page and come again"
        messages.success(request, msg)

        return redirect('error_back')

    sheet.delete()

    msg = "Full-Sheet has been removed successfully, changes will be visible on front side shortly !"
    messages.success(request, msg)

    return redirect('sheet_list', product_pk)




# Events

@login_required
def event_back(request) :

    if request.method == 'POST' :

        name = request.POST.get('name', '')
        title = request.POST.get('title', '')
        intro = request.POST.get('intro', '')
        detail = request.POST.get('detail', '')

        event_obj = Event(
            name = name,
            title = title,
            intro = intro,
            detail = detail,
        )

        event_obj.save()

        msg = "New event has been added to list successfully !"
        messages.success(request, msg)

        return redirect('event_back')


    events = Event.objects.all()

    send = {
        'events': events,
    }

    return render(request, 'back/panel/event_back.html', send)


@login_required
def event_back_edit(request, event_pk) :

    if request.method == 'POST' :

        try :
            event = Event.objects.get(pk=event_pk)
        except :
            msg = "Event not found, try to go back, refresh the page and try again !"
            messages.error(request, msg)

            return redirect('event_back')
    

        name = request.POST.get('name', '')
        title = request.POST.get('title', '')
        intro = request.POST.get('intro', '')
        detail = request.POST.get('detail', '')

        event.name = name
        event.title = title
        event.intro = intro
        event.detail = detail

        event.save()

        msg = "Changes made to event has been committed successfully, it will be visible on front-end very soon !"
        messages.success(request, msg)

        return redirect('event_back')


    try :
        event = Event.objects.get(pk=event_pk)
    except :
        msg = "Event not found, try to go back, refresh the page and try again !"
        messages.error(request, msg)

        return redirect('event_back')
    

    send = {
        'event': event,
    }

    return render(request, 'back/panel/event_back_edit.html', send)


@login_required
def event_back_delete(request, event_pk) :
    
    try :
        event = Event.objects.get(pk=event_pk)
    except :
        msg = "Event not found, try to go back, refresh the page and try again !"
        messages.error(request, msg)

        return redirect('event_back')

    event.delete()

    msg = "Event has been deleted successfully, changes will be visible on front-end very soon !"
    messages.success(request, msg)

    return redirect('event_back')


@login_required
def event_image(request, event_pk) :

    if request.method == 'POST' :

        try :
            event = Event.objects.get(pk=event_pk)
        except :
            msg = "Event not found, try to go back, refresh the page and try again !"
            messages.error(request, msg)

            return redirect('event_back')

        image1 = request.FILES.get('image1', None)

        index = Event_Images.objects.filter(fk=event).count() + 1

        event_image_obj = Event_Images(
            fk = event,
            index = index,
            image1 = image1,
        )

        event_image_obj.save()

        msg = "New image has been successfully added to the Event !"
        messages.success(request, msg)

        return redirect('event_image', event_pk)


    try :
        event = Event.objects.get(pk=event_pk)
    except :
        msg = "Event not found, try to go back, refresh the page and try again !"
        messages.error(request, msg)

        return redirect('event_back')

    event_images = Event_Images.objects.filter(fk=event)

    events = Event.objects.all()


    send = {
        'events': events,
        'event': event,
        'event_images': event_images,
    }

    return render(request, 'back/panel/event_image.html', send)


@login_required
def event_image_edit(request, event_pk, event_image_pk) :

    if request.method == 'POST' :

        try :
            event = Event.objects.get(pk=event_pk)
        except :
            msg = "Event not found, try again later !"
            messages.success(request, msg)

            return redirect('event_back')

        try :
            event_image = Event_Images.objects.get(pk=event_image_pk)
        except :
            msg = "Event Image not found, try going back, refresh the page and give it a one more try !"
            messages.success(request, msg)

            return redirect('event_image', event_pk)

        index = request.POST.get('index', None)
        image1 = request.FILES.get('image1', None)

        if image1 :
            if event_image.image1 :
                default_storage.delete(event_image.image1.path)
            event_image.image1 = image1

        event_image.index = index
        event_image.fk = event

        event_image.save()

        msg = "Changes made to Event Image has been successfully committed, it will be visible on front end very soon !"
        messages.success(request, msg)

        return redirect('event_image', event_pk)




    try :
        event = Event.objects.get(pk=event_pk)
    except :
        msg = "Event not found, try again later !"
        messages.success(request, msg)

        return redirect('event_back')
    
    try :
        event_image = Event_Images.objects.get(pk=event_image_pk)
    except :
        msg = "Event Image not found, try going back, refresh the page and give it a one more try !"
        messages.success(request, msg)

        return redirect('event_image', event_pk)

    events = Event.objects.all()

    send = {
        'event': event,
        'events': events,
        'event_image': event_image
    }

    return render(request, 'back/panel/event_image_edit.html', send)


def event_image_delete(request, event_pk, event_image_pk) :

    try :
        event_image = Event_Images.objects.get(pk=event_image_pk)
    except :
        msg = "Image not found, try going back, refresh the page and try again !"
        messages.success(request, msg)

        return redirect('event_image', event_pk)

    event_image.delete()

    msg = "Image has been successfully removed from the event library !"
    messages.success(request, msg)

    return redirect('event_image', event_pk)




# Page handler

@login_required
def page_handler(request) :

    page_handler = Page_Handler.objects.all()


    send = {
        'page_handler': page_handler,
    }

    return render(request, 'back/panel/page_list.html', send)


@login_required
def page_handler_add(request) :

    if request.method == 'POST' :

        name = request.POST.get('name', '')
        meta_title = request.POST.get('meta_title', '')
        meta_description = request.POST.get('meta_description', '')

        page_handler_obj = Page_Handler(
            name=name,
            meta_title=meta_title,
            meta_description=meta_description,
        )

        page_handler_obj.save()

        messages.success(request, 'New page has been added')

        return redirect('page_handler')

    return render(request, 'back/panel/page_add.html')


@login_required
def page_handler_edit(request, page_pk) :

    if request.method == 'POST' :

        try:
            page_handler = Page_Handler.objects.get(pk=page_pk)
        except :
            messages.success(request, 'Page not found')

            return redirect('page_handler')

        name = request.POST.get('name', '')
        meta_title = request.POST.get('meta_title', '')
        meta_description = request.POST.get('meta_description', '')

        page_handler.name = name
        page_handler.meta_title = meta_title
        page_handler.meta_description = meta_description

        page_handler.save()

        messages.success(request, 'Page has been edited')

        return redirect('page_handler')

    
    try:
        page_handler = Page_Handler.objects.get(pk=page_pk)
    except :
        messages.success(request, 'Page not found')

        return redirect('page_handler')

    send = {
        'page_handler': page_handler,
    }

    return render(request, 'back/panel/page_edit.html', send)



@login_required
def page_handler_delete(request, page_pk) :

    try :
        page_handler = Page_Handler.objects.get(pk=page_pk)
    except :
        messages.error(request, 'Page not found')

        return redirect('page_handler')

    page_handler.delete()

    messages.success(request, 'Page deleted')

    return redirect('page_handler')




