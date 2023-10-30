import { Inject, Injectable, Req, Res } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

type userData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

@Injectable()
export class AuthService {
    @Inject(UsersService) private readonly userService: UsersService;
    @Inject(JwtService) private readonly jwtService: JwtService;

    async register(@Req() req, @Res() res): Promise<any> {
        const userData: userData = req.body;
        const existingUser = await this.userService.findOneByEmail(userData.email);
        if (existingUser) {
            return res.send({ message: 'User already exists' });
        }
        userData.password = await bcrypt.hash(userData.password, 10);
        const user = await this.userService.create(userData);
        return res.send({
            status: 'success',
            message: 'Registered',
        });
    }

    async login(@Req() req, @Res() res): Promise<any> {
        const { email, password } = req.body;
        const user = await this.userService.findOneByEmail(email);
        if (!user) {
            return res.send({ message: 'User not found' });
        };
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.send({ message: 'Password is incorrect' });
        }

        const payload = { email: user.email, id: user.id };
        const token = await this.jwtService.signAsync(payload);
        delete user.password;
        return res.send({
            status: 'success',
            message: 'Logged in',
            name: user.firstName + ' ' + user.lastName,
            email: user.email,
            accessToken: token,
            access_token: token,
            // data: {
            //     token,
            //     user,
            // },
        });
    }

    logout(@Req() req, @Res() res): any {
        return res.send({ message: 'Logout' });
    }
}
