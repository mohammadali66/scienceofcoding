from channels.routing import route
from channels import include
from .consumers import user_connect, user_receive, user_disconnect
 
 
chat_routing = [
    route('websocket.connect', user_connect),
    route('websocket.receive', user_receive),
    route('websocket.disconnect', user_disconnect),
]
 
channel_routing = [
    include(chat_routing, path=r'^/ws/'),
]
