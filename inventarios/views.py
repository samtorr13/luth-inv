from django.shortcuts import render
from django.template.loader import get_template
from django.http import HttpResponse
from django.urls import reverse_lazy
from django.contrib.auth.views import LoginView
from django.contrib.auth.decorators import login_required


@login_required
def dashboard(request):
    user = request.user
    if hasattr(user, 'rol'):
            if user.rol == 'ADMIN':
                return render(request, "dashboard.html")
            elif user.rol == 'ESCUELA':
                return render(request, "dashboardes.html")

    
    
