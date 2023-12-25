import express from 'express';
import { createUser, getUserByEmail } from '../db/users';
import { authentication, random } from '../helpers/index';

export const register = async (req: express.Request, res: express.Response) => { 
    try{
        const { email, fullName, password } = req.body;

        if(!email || !fullName || !password){
            return res.status(400).json({ message: 'Missing fields' });
        }

        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const salt = random();
        const user = await createUser({
            email,
            fullName,
            authentication: {
                password: authentication(password, salt),
                salt,
            }
        });

        return res.status(200).json(user);
    }
    catch(err){
        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};