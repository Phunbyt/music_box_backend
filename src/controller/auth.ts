import express, { Request, Response, NextFunction } from 'express';
import {validateLogin, validateUser} from '../utils/validator/userValidator';
import jwt from 'jsonwebtoken';
import NewUser from '../schema/registrationSchema';
import bcrypt from 'bcrypt';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');
dotenv.config();


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
        
        const inputEmail = await NewUser.findOne({ email });
        if (inputEmail) return res.status(400).send('User already exists');
        
        const user = await NewUser.create({
            firstName,
            lastName,
            dateOfBirth: new Date(dateOfBirth),
            gender,
            email,
            password
        });

        res.status(201).send('Successfully added user');
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export async function signIn(req: Request, res: Response, next: NextFunction) {
    try {

        // eslint-disable-next-line @typescript-eslint/ban-types
        const { error } = validateLogin(req.body as object);
        if (error) {
            return res.status(400).send(error.message);
        }
    
        const user: any = await NewUser.findOne({email: req.body.email});
        if(!user) return res.status(400).send('Invalid emaill or password');
    
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword) return res.status(400).send('Invalid emaill or password');
    
        const token = jwt.sign({
            email: user.email,
            id: user._id
        }, process.env.JWT_SECRET_KEY!, { expiresIn: '3h' });
        
        res.status(200).json({
            token,
            'status':'success',
            'user': {
                'firstName': user.firstName,
                'lastName': user.lastName,
                'email': user.email,                
                'gender': user.gender,
                '_id' : user._id       
            }
        });
    
    
    } catch (error) {
        res.status(500).send({message : 'Error sigining you in'});
    }
}