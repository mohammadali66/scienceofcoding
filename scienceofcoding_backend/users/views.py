from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView
from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response

from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.utils import timezone

from . import serializers
from .models import UserProfile


from django.views import View
from django.shortcuts import render

class SimpleView(View):    
    
    def get(self, request, *args, **kwargs):
                                
        context = {}
        return render(request, 'simple.html', context)
    
    
    def post(self, request, *args, **kwargs):
        
        name = 'ali'
        
        if request.POST['name']:
            name = request.POST['name']
        
        context = {'name': name, }
        return render(request, 'simple.html', context)
#.............................................................................................

class UserListAPIView(APIView):
    #serializer_class = serializers.UserListSerializer
    # permission_classes = (permissions.IsAuthenticated, )
    
    def get(self, request, *args, **kwargs):
        return Response({"Hello !!!"}, status=status.HTTP_202_ACCEPTED)
    
    def post(self, request, *args, **kwargs):
        city = request.data.get('city')
        return Response({"name":"Hello %s!!!" %city}, status=status.HTTP_202_ACCEPTED)
    
# ...............................................................................................................
class UserListAPIView2(ListAPIView):
    serializer_class = serializers.UserListSerializer
    # permission_classes = (permissions.IsAuthenticated, )
    queryset = User.objects.all() 

# ...............................................................................................................
class UserProfileAPIView(RetrieveAPIView):
    serializer_class = serializers.UserProfileSerializer
    permission_classes = (permissions.AllowAny,)
    queryset = UserProfile.objects.all()
    lookup_field = 'slug'
    
# ...............................................................................................................
class UserLoginAPIView(APIView):    
    
    serializer_class = serializers.UserLoginSerializer
    permission_classes = (permissions.AllowAny,)
    
    def post(self, request, *args, **kwargs):
        
        serializer = serializers.UserLoginSerializer(data=request.data)
        
        if serializer.is_valid():
            email = request.data.get('email')
            password = request.data.get('password')
            
            try:
                user = User.objects.get(email=email)
                
                #if is_active == True
                loggedUser = authenticate(
                                            username=user.username, 
                                            password=password
                                        )
                if loggedUser is not None:                    
                    
                    loggedUser.last_login = timezone.now()
                    loggedUser.save()
                    serializer = serializers.UserLoginSerializer(loggedUser)
                    return Response(serializer.data, status=status.HTTP_200_OK)
                else:
                    return Response({'errorMessage': 'email or password are invalid'}, status=status.HTTP_400_BAD_REQUEST)
                                
            except:
                return Response({'errorMessage': 'email or password are invalid!'}, status=status.HTTP_400_BAD_REQUEST)
            
        else:
            return Response({'errorMessage': 'invalid data'}, status=status.HTTP_400_BAD_REQUEST)
    
    
# ...............................................................................................................
class UserRegisterAPIView(APIView):
    
    serializer_class = serializers.UserRegisterSerializer
    permission_classes = (permissions.AllowAny, )
    
    def post(self, request, *args, **kwargs):
        serializer = serializers.UserRegisterSerializer(data=request.data)
        
        if serializer.is_valid():
        
            username = request.data.get('username')
            email = request.data.get('email')
            password = request.data.get('password')            
            
            #user_qs_username = User.objects.filter(username=username)
            user_qs_email = User.objects.filter(email=email)
          
#             if user_qs_username and user_qs_username.count() != 0:
#                 return Response({'errorMessage': 'This username have been used before'}, status=status.HTTP_400_BAD_REQUEST)
            if user_qs_email and user_qs_email.count() != 0:
                return Response({'errorMessage': 'This email have been used before'}, status=status.HTTP_400_BAD_REQUEST)
    
            #create user:
            user_obj = User(
                                username = username,
                                email    = email
                            )
            user_obj.set_password(password)
            user_obj.last_login = timezone.now()
            user_obj.is_active = False
            
            user_obj.save()
            
            userProfile = UserProfile(user=user_obj, slug=username)
            userProfile.save()
            serializer = serializers.UserRegisterSerializer(user_obj)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
    
            return Response({'errorMessage': 'This username have been used before'}, status=status.HTTP_400_BAD_REQUEST)
        
        
        
        
        
        
        