"""
Pytest setup/configuration file. We use this to set up the Django settings
for use during testing, since this isn't a full django project.
"""
from uuid import uuid4

from django.conf import settings


# def pytest_configure():
#     settings.configure(
#         # Changes each test run.
#         SECRET_KEY=str(uuid4()),
#         TEMPLATES=[
#             {
#                 "BACKEND": "django.template.backends.django.DjangoTemplates",
#                 "DIRS": [],
#                 "APP_DIRS": True,
#                 "OPTIONS": {
#                     "context_processors": [
#                         "django.contrib.auth.context_processors.auth",
#                         "django.template.context_processors.debug",
#                         "django.template.context_processors.i18n",
#                         "django.template.context_processors.media",
#                         "django.template.context_processors.request",
#                         "django.template.context_processors.static",
#                         "django.template.context_processors.tz",
#                         "django.contrib.messages.context_processors.messages",
#                     ],
#                 },
#             },
#         ],
#         LMS_ROOT_URL="http://local.openedx.io:8000",
#         COURSE_AUTHORING_MICROFRONTEND_URL="http://apps.local.openedx.io:2001/authoring",
#     )
