import express, { Request, Response, NextFunction } from 'express';
import NewUser from '../schema/registrationSchema';
import {validateUser} from '../utils/validator/userValidator';


export async function signUp(req: Request, res: Response, next: NextFunction) {
    try {
        const { firstName, lastName, dateOfBirth, gender, email, password, confirmPassword } = req.body;

        const { error } = validateUser(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        if (password !== confirmPassword) {
            return res.status(400).send('confirmPassword does not match password');
        }
        
        const inputEmail = await NewUser.findOne({ email })
        if (inputEmail) return res.status(400).send("User already exists");
        
        const user = await NewUser.create({
            firstName,
            lastName,
            dateOfBirth: new Date(dateOfBirth),
            gender,
            email,
            password
        });
        
        res.status(201).send("Successfully added user");
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export async function signIn(req: Request, res: Response, next: NextFunction) {
    
}