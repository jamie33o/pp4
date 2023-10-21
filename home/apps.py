from django.apps import AppConfig

class ChannelsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'home'


    def ready(self):
        import home.signals