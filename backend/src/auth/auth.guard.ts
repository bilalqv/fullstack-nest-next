
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: process.env.JWT_SECRET,
                }
            );
            // 💡 We're assigning the payload to the request object here
            // so that we can access it in our route handlers
            request['user'] = payload;
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        if (type === 'Bearer') return token;
        else {
            const cookieHeader = request.headers.cookie;

            if (cookieHeader) {
                const cookies = cookieHeader.split(';').map((cookie) => cookie.trim());
                for (const cookie of cookies) {
                    const [cookieName, cookieValue] = cookie.split('=');
                    if (cookieName === 'access_token') {
                        // Decode the cookie value if needed
                        // For example, if it's URL-encoded, you can use decodeURIComponent
                        const token = decodeURIComponent(cookieValue);
                        return token;
                    }
                }
            }
        }
        return undefined;
    }
}
