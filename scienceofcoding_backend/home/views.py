from django.shortcuts import render
from django.views import View

# class IndexView(View):
#
#     def get(self, request, *args, **kwargs):
#
#         context = {}
#         return render(request, 'index.html', context)

class IndexView(View):
    """
        Renders the Angular SPA
    """
    def get(self, request, path='', *args, **kwargs):
        context = {}
        return render(request, 'index.html', context)
