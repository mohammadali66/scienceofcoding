from channels.routing import route

from .consumers import clientUser_connect, clientUser_receive, clientUser_disconnect

clientUser_routing = [
    route('websocket.connect', clientUser_connect),
    route('websocket.receive', clientUser_receive),
    route('websocket.disconnect', clientUser_disconnect),
]

