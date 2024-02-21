import jwt
from django.utils.deprecation import MiddlewareMixin
from util.jwt import decode_token
from services import AWSCognitoService

class RefreshTokenMiddleware(MiddlewareMixin):
    def process_request(self, request):
        refresh_token = request.COOKIES.get('refreshToken')
        if not refresh_token:
            return

        try:
            access_token = request.COOKIES.get('accessToken')
            jwt.decode(access_token, options={"verify_signature": False})
            return self.get_response(request)
        except jwt.ExpiredSignatureError:
            cognito_service = AWSCognitoService()
            decoded_id_token = decode_token(request.COOKIES.get('idToken'))
            new_tokens = cognito_service.refresh_tokens(decoded_id_token.get("sub"), refresh_token)
            
            if new_tokens:
                response = self.get_response(request)
                response.set_cookie('idToken', new_tokens.get("IdToken"), httponly=True, samesite='Lax')
                response.set_cookie('accessToken', new_tokens.get("AccessToken"), httponly=True, samesite='Lax')
                if new_tokens.get("RefreshToken"):
                    response.set_cookie('refreshToken', new_tokens.get("RefreshToken"), httponly=True, samesite='Lax')
                return response

        return None