import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    register(): any {
        // return this.authService.register(req, res);
        return {
            status: 'success',
            message: 'Registered',
        }
    }

    @Post('login')
    login(@Req() req, @Res() res): any {
        return this.authService.login(req, res);
    }

    @Post('logout')
    logout(@Req() req, @Res() res): any {
        return this.authService.logout(req, res);
    }

    @UseGuards(AuthGuard)
    @Get('p')
    profile(@Req() req, @Res() res): any {
        return res.send({
            status: 'success',
            message: 'Profile',
        });
    }
}
