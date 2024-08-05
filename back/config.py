GMAIL_APP_PASS = "senha de aplicativo do gmail"
GMAIL_APP_EMAIL = "email do gmail"
PENDING = 'PENDING'
ACCEPTED = 'ACCEPTED'
REJECTED = 'REJECTED'

DJANGO_EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
try:
    from config_local import *
except ImportError:
    pass
