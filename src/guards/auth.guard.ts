import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor (private jwtService: JwtService){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    console.log(request.headers, "request header");

    const token = request.cookies['Bearer'];
    // const token = request.headers?.cookie?.replace("Bearer=","") || request.headers?.authorization?.replace("Bearer ", "");
    console.log("token", token);

    if(!token) {
      throw new UnauthorizedException("No token provided")
    }

    try {
      const payLoad = this.jwtService.verify(token);
      request['user'] = payLoad;
    } catch (e) {
      throw new UnauthorizedException("Invalid token")
    }

     return true;
    
  }
}
