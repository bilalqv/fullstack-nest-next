
import { Column, Model, Table, Unique } from 'sequelize-typescript';

@Table
export class User extends Model {
    @Column
    firstName: string;

    @Column
    lastName: string;

    @Unique
    @Column
    email: string;

    @Column
    password: string;

    @Column({ defaultValue: true })
    isActive: boolean;
}