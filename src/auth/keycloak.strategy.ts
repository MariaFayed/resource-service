import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as jwksRsa from 'jwks-rsa';
import { ConfigService } from '@nestjs/config';
//This class implements a Passport JWT strategy to authenticate and authorize users using tokens issued by Keycloak.
//The strategy ensures the token is issued by the expected Keycloak issuer and uses the RS256 algorithm.
@Injectable()
export class KeycloakJwtStrategy extends PassportStrategy(Strategy) {
  constructor(private config: ConfigService) {
    console.log("KeycloakJwtStrategy");
    console.log(config.get('KEYCLOAK_JWKS_URI'));
    console.log(config.get('KEYCLOAK_CLIENT_ID'));
    console.log(config.get('KEYCLOAK_ISSUER'));
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKeyProvider: jwksRsa.passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: config.get('KEYCLOAK_JWKS_URI')!,
      }),

      issuer: config.get('KEYCLOAK_ISSUER'),
      algorithms: ['RS256'],
    });
  }

  validate(payload: any) {
     console.log("validate");
    return payload; 
  }
}
