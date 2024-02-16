import json
import jwt
from jwt import exceptions
import requests
from django.conf import settings

def decode_token(token):
    jwks_url = settings.SIMPLE_JWT['JWK_URL']
    response = requests.get(jwks_url)
    jwks = response.json()
    
    headers = jwt.get_unverified_header(token)
    kid = headers['kid']
    
    key = next((key for key in jwks['keys'] if key['kid'] == kid), None)
    if not key:
        raise exceptions.InvalidKeyError("Key ID not found in JWKS")
    
    public_key = jwt.algorithms.RSAAlgorithm.from_jwk(json.dumps(key))
    
    try:
        decoded = jwt.decode(
            token,
            public_key,
            algorithms=["RS256"],
            audience=settings.SIMPLE_JWT['AUDIENCE'],
            issuer=settings.SIMPLE_JWT['ISSUER']
        )
        return decoded
    except exceptions.InvalidAudienceError:
        raise exceptions.InvalidAudienceError("Invalid audience")

