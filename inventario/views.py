from django.shortcuts import render, redirect
from django.template.loader import get_template
from django.http import HttpResponse
from django.urls import reverse_lazy
from django.contrib.auth.views import LoginView
from django.contrib.auth.decorators import login_required




def home(request):
    
    user = request.user
    print("aquii")
    return redirect('dashboard')

# Create your views here.
class Login_View(LoginView):

    template_name="login.html"
    redirect_authenticated_user=True

    def form_invalid(self, form):
        print("Errores del formulario:", form.errors) # Esto saldrá en tu terminal/consola
        return super().form_invalid(form)

    def get_success_url(self):
        user = self.request.user

        return self.request.GET.get('next', 'home')



def nosotros(request):
    plantilla=get_template("nosotros.html")
    return  HttpResponse(plantilla.render())