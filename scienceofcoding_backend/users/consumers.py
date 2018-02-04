import json
from channels import Group
from channels.auth import channel_session_user, channel_session_user_from_http
from channels.sessions import channel_session

from channels_presence.models import Room as Room_channels_presence
from channels_presence.decorators import touch_presence
from channels_presence.signals import presence_changed
from channels_presence.models import Presence
from channels_presence.decorators import remove_presence

from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model
User = get_user_model()

from django.dispatch import receiver

# .............................................................................................................
@channel_session_user_from_http
@channel_session
def user_connect(message):
    
    print('user_connet !!!!!!!!!3333')
    
    Group('all2').add(message.reply_channel)
    # user = User.objects.first()
    # message.user = user
    # print('user222: %s' % str(message.user))
    # Room_channels_presence.objects.add("all2", message.reply_channel.name, message.user)
    message.reply_channel.send({'accept': True})
    
    
# .............................................................................................................
@touch_presence
@channel_session_user
def user_receive(message):
    print('user_receive !!!!!!!!!!878888 %s' % message.content)
    
    data = json.loads(message['text'])
    myContent = data['content']
    myToken = data['token']
    token = Token.objects.get(key=myToken)
    print('myUser: %s' % token.user.username)
    message.user = token.user
    Room_channels_presence.objects.add("all2", message.reply_channel.name, message.user)
    
    # print('content: {0} - token: {1}'.format(myContent, myToken))
#     if message.content['text'] == "heartbeat":
#         print('heart')
#         Presence.objects.touch(message.reply_channel.name)
        
    Group('all2').add(message.reply_channel)
    # Room_channels_presence.objects.add('all', message.reply_channel.name, message.user)
    my_dict = {
        'user': "alll",
        'messagechat': "testing"
    }
    Group('all2').send({'text': json.dumps(my_dict)})
     
    
    
# .............................................................................................................
@remove_presence
def user_disconnect(message):
    Group("all2").discard(message.reply_channel)
    Room_channels_presence.objects.remove("all2", message.reply_channel.name)
    print('disssssssssss')
# .............................................................................................................
@receiver(presence_changed)
def broadcast_presence(sender, room, **kwargs):
    # Broadcast the new list of present users to the room.
    print('users: %s' % str(room.get_users()))
    
    print('presence function')
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





    
