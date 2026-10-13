"""TO-DO: Write a description of what this XBlock is."""

from importlib.resources import files

from pathlib import Path

from web_fragments.fragment import Fragment
from xblock.core import XBlock
from xblock.fields import Integer, Scope, String
from xblock.utils.resources import ResourceLoader


resource_loader = ResourceLoader(__name__)


class {{cookiecutter.class_name}}(XBlock):
    """
    TO-DO: document what your XBlock does.
    """

    # Fields are defined on the class.  You can access them in your code as
    # self.<fieldname>.

    # TO-DO: delete count and code, and define your own fields.
    count = Integer(
        default=0, scope=Scope.user_state,
        help="A simple counter, to show something happening",
    )
    code = String(
        default="beep", scope=Scope.settings,
        help="code word to check for on update"
    )

    def resource_string(self, path: str | Path) -> str:
        """Handy helper for getting resources from our kit."""
        return resource_loader.load_unicode(path)

    # TO-DO: change this view to display your data your own way.
    def student_view(self, context=None):
        """
        The primary view of the {{cookiecutter.class_name}}, shown to students
        when viewing courses.
        """
        html = self.resource_string("static/html/{{cookiecutter.short_name|lower}}.html")
        frag = Fragment(html.format(self=self))
        frag.add_css(self.resource_string("static/css/{{cookiecutter.short_name|lower}}.css"))
        frag.add_javascript(self.resource_string("static/js/src/{{cookiecutter.short_name|lower}}.js"))
        frag.initialize_js('{{cookiecutter.class_name}}')
        return frag

    # TO-DO: change this handler to perform your own actions.  You may need more
    # than one handler, or you may not need any handlers at all.
    @XBlock.json_handler
    def increment_count(self, data, suffix=''):
        """
        An example handler, which increments the data.
        """
        if data['code'] != self.code:
            return Response(
                json.dumps({"error": "Code does not match!"}),
                status=status,
                content_type="application/json",
                charset="utf8",
            )

        self.count += 1
        return {"count": self.count}

    # TO-DO: change this to create the scenarios you'd like to see in the
    # workbench while developing your XBlock.
    @staticmethod
    def workbench_scenarios():
        """A canned scenario for display in the workbench."""
        return [
            ("{{cookiecutter.class_name}}",
             """<{{cookiecutter.short_name|lower}}/>
             """),
            ("Multiple {{cookiecutter.class_name}}",
             """<vertical_demo>
                <{{cookiecutter.short_name|lower}}/>
                <{{cookiecutter.short_name|lower}}/>
                <{{cookiecutter.short_name|lower}}/>
                </vertical_demo>
             """),
        ]
