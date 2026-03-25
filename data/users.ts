import { IUser } from "../interfaces/IUser";

export const validUsers: IUser[] = [
    {
        username: 'standard_user',
        password: 'secret_sauce'
    }]

export const invalidUsers: IUser[] = [
    {
        username: 'locked_out_user',
        password: 'secret_sauce'
    }
]
