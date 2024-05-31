GMAIL_APP_PASS = "senha de aplicativo do gmail"

PENDING = 'PENDING'
ACCEPTED = 'ACCEPTED'
REJECTED = 'REJECTED'

try:
    from config_local import *
except ImportError:
    pass
