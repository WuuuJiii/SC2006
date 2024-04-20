import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from './user.schema';
import { jwtConstants } from './auth.constant';

/**
 * Strategy for JWT authentication
 * This is used to validate JWT tokens and extract user information from them
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.secret,
    });
  }

  /**
   * Validates the payload extracted from the JWT token
   * @param payload Payload extracted from the JWT token
   * @returns User object if the user is found 
   * Otherwise throws an UnathorizedException 
   */
  async validate(payload) {
    const { id } = payload;

    const user = await this.userModel.findById(id);

    if (!user) {
      throw new UnauthorizedException('Login first to access function.');
    }

    return user;
  }
}