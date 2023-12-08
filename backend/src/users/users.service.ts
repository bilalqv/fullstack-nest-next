
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { Op } from 'sequelize';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User)
        private userModel: typeof User,
    ) { }

    async findAndCountAll(page: number, pageSize: number, sortField: string, sortOrder: string, search: string): Promise<any> {
        const offset = (page - 1) * pageSize;
        let order = [];
        if (sortField && sortOrder) {
            order = [[sortField, sortOrder]];
        }

        let where = {};
        if (search && search.length > 1) {
            where = {
                firstName: {
                    [Op.like]: `%${search}%`
                }
            }
        };
        return this.userModel.findAndCountAll({
            attributes: ['id', 'firstName', 'lastName', 'email', 'createdAt',],
            raw: true,
            offset,
            limit: pageSize,
            order,
            where,
        });
    }

    async findOne(id: string): Promise<User> {
        return this.userModel.findOne({
            where: {
                id,
            },
        });
    }

    async findOneByEmail(email: string): Promise<User> {
        return this.userModel.findOne({
            where: {
                email,
            },
        });
    }

    async remove(id: string): Promise<void> {
        const user = await this.findOne(id);
        await user.destroy();
    }

    async create(user: any): Promise<User> {
        return this.userModel.create(user, { raw: true });
    }

    async findById(id: number): Promise<User> {
        console.log('id', typeof id);
        return this.userModel.findByPk(id,
            {
                attributes: ['id', 'firstName', 'lastName',],
                raw: true,
            }
        );
    }

    async deleteById(id: number): Promise<any> {
        return this.userModel.destroy({
            where: {
                id,
            },
        });
    }

    async updateById(id: number, user: any): Promise<any> {
        return this.userModel.update(user, {
            where: {
                id,
            },
        });
    }
}