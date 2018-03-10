import json
from channels import Group
from channels.auth import channel_session_user, channel_session_user_from_http

from channels_presence.models import Room as Room_channels_presence
from channels_presence.decorators import touch_presence
from channels_presence.decorators import remove_presence
from channels_presence.signals import presence_changed

from django.dispatch import receiver
from django.utils import timezone

from clientUsers.models import ClientUser, Page, ClientUserOpenedPage
from django.contrib.auth.models import User

# ...............................................................................................................
@channel_session_user_from_http
def clientUser_connect(message):
    print('conneted!!')
    message.reply_channel.send({'accept': True})

# ...............................................................................................................
@touch_presence
@channel_session_user
def clientUser_receive(message):

    data = json.loads(message['text'])

    #this request is from analytics component in angular : . . . . . . . . . . . . . .
    if data['repeattext'] == 'heartbeat':
        #send today statistic to frontend
        today_view_count = ClientUserOpenedPage.objects.filter(open_datetime__date=timezone.now().date()).count()
        room_name = 'analytics'
        Group(room_name).add(message.reply_channel)
        my_dict = {
            'todaycount': today_view_count,
        }
        Group(room_name).send({'text': json.dumps(my_dict)})
        return
    #. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .


    # Get or create clientUser obj
    clientUser = None
    ip_address = data['ip_address']
    print('ip: ' + ip_address)

    if not message.user.is_authenticated:
        print('not authenticated')

    else:
        print('authenticated')
        
    
    try:
        clientUser = ClientUser.objects.get(ip_address=ip_address)
        
    except ClientUser.DoesNotExist:
        clientUser = ClientUser()
        
        isp = data['isp']
        country = data['country']
        city = data['city']
        altitude = data['altitude']
        longitude = data['longitude']
        
        clientUser.ip_address = ip_address
        clientUser.isp = isp
        clientUser.country = country
        clientUser.city = city
        clientUser.altitude = altitude
        clientUser.longitude = longitude
        
        clientUser.save()
        
    
    # Get page obj
    room_name = data['room_name']
    page = None
    try:
        page = Page.objects.get(name=room_name)
    except:
        page = Page(name=room_name)
        page.save()
    
    # Create clientUserOpenedPage obj
    clientUserOpenedPage = ClientUserOpenedPage(
                                                clientUser=clientUser,
                                                page=page                                
                                                )
    clientUserOpenedPage.save()
    
    # Save clientUserOpenedPage id for disconnect function
    message.channel_session['clientUserOpenedPageId'] = clientUserOpenedPage.id
     
    token = data['token']
    
    Group(room_name).add(message.reply_channel)
    
    #message.user = User.objects.get(username='ali')
    #print('username: %s' % (message.user.username))
    #message.user = None
    #Room_channels_presence.objects.add(room_name, message.reply_channel.name, message.user)
    Room_channels_presence.objects.add(room_name, message.reply_channel.name)
    message.channel_session['room'] = room_name
    
    print(room_name)    
    
    my_dict = {
        'user': message.user.username,
        # 'clientUserOpenedPageId': str(clientUserOpenedPage.id)
    }
    Group(room_name).send({'text': json.dumps(my_dict)})
    

# ...............................................................................................................
@remove_presence
@channel_session_user
def clientUser_disconnect(message):
    print('disconnet!!')
    
    
    # Save end datetime for clientUserOpenedPage 
    clientUserOpenedPageId = message.channel_session['clientUserOpenedPageId']
    clientUserOpenedPage = ClientUserOpenedPage.objects.get(id=clientUserOpenedPageId)
    clientUserOpenedPage.end_datetime = timezone.now()
    clientUserOpenedPage.save()
    
    # close from room
    room_name = message.channel_session['room']
    Group(room_name).discard(message.reply_channel)
    Room_channels_presence.objects.remove(room_name, message.reply_channel.name)


# ...............................................................................................................
@receiver(presence_changed)
def broadcast_presence(sender, room, **kwargs):
    # Broadcast the new list of present users to the room.
    # print('users: %s' % str(room.get_users()))
    
    print('presence function --- anonymous: %s' % str(room.get_anonymous_count()))
    
    Group(room.channel_name).send({
        'text': json.dumps({
            'type': 'presence',
            'payload': {
                'channel_name': room.channel_name,
                'members': [user.username for user in room.get_users()],
                'lurkers': int(room.get_anonymous_count()),
                'anonymous': int(room.get_anonymous_count()),
            }
        })
    })





