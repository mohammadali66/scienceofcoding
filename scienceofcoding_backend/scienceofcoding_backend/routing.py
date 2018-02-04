# from channels.routing import route
from channels import include

from clientUsers.routing import clientUser_routing

channel_routing = [
    include(clientUser_routing, path=r'^/clientuser/'),
]



