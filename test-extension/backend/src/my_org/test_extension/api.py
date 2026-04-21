from flask import Response
from flask_appbuilder.api import expose, protect, safe
from superset_core.rest_api.api import RestApi
from superset_core.rest_api.decorators import api


@api(
    id="hello_world_api",
    name="Hello World API",
    description="API endpoints for the Hello World extension"
)
class HelloWorldAPI(RestApi):
    openapi_spec_tag = "Hello World"
    class_permission_name = "hello_world"

    @expose("/message", methods=("GET",))
    @protect()
    @safe
    def get_message(self) -> Response:
        """Gets a hello world message
        ---
        get:
          description: >-
            Get a hello world message from the backend
          responses:
            200:
              description: Hello world message
              content:
                application/json:
                  schema:
                    type: object
                    properties:
                      result:
                        type: object
                        properties:
                          message:
                            type: string
            401:
              $ref: '#/components/responses/401'
        """
        return self.response(
            200,
            result={"message": "Hello from the backend!"}
        )