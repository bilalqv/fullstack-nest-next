import { Controller, Delete, Get, Param, ParseIntPipe, Put, Req, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    // @UseGuards(AuthGuard)
    @Get('all')
    async getAllUsers(@Req() req, @Res() res): Promise<any> {
        try {
            const page = req.query.page ? parseInt(req.query.page as string) : 1;
            const pageSize = req.query.pageSize ? parseInt(req.query.pageSize as string) : 2;
            const sortField = req.query.sortField as string;
            const sortOrder = req.query.sortOrder as string;
            const search = req.query.search as string;

            const { count, rows } = await this.usersService.findAndCountAll(page, pageSize, sortField, sortOrder, search);
            return res.send({
                success: true,
                data: rows,
                count
            })
        } catch (err) {
            return res.send({
                success: false,
                message: err.message,
            })
        }
    }

    @Get(':id')
    async getUserById(@Param('id', ParseIntPipe) id: number, @Req() req, @Res() res): Promise<any> {
        try {
            const data = await this.usersService.findById(req.params.id);
            return res.send({
                success: true,
                data
            })
        } catch (err) {
            return res.send({
                success: false,
                message: err.message,
            })
        }
    }

    @Delete(':id')
    async deleteUserById(@Param('id', ParseIntPipe) id: number, @Req() req, @Res() res): Promise<any> {
        try {
            await this.usersService.deleteById(req.params.id);
            return res.send({
                success: true,
                message: 'User deleted successfully'
            })
        } catch (err) {
            return res.send({
                success: false,
                message: err.message,
            })
        }
    }

    @Put(':id')
    async updateUserById(@Param('id', ParseIntPipe) id: number, @Req() req, @Res() res): Promise<any> {
        try {
            const data = await this.usersService.updateById(req.params.id, req.body);
            console.log('updateUserById');
            return res.send({
                success: true,
                message: 'User updated successfully',
            })
        } catch (err) {
            return res.send({
                success: false,
                message: err.message,
            })
        }
    }

}
