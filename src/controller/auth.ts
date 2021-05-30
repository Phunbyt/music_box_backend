import express, { Request, Response, NextFunction } from 'express';
import {validateLogin} from '../utils/validator/userValidator'
import NewUser from '../schema/registrationSchema'
import jwt from 'jsonwebtoken'
import bcrypt  from 'bcrypt'


const dotenv = require("dotenv")
dotenv.config();


export async function signUp(req: Request, res: Response, next: NextFunction) {
    
}

export async function signIn(req: Request, res: Response, next: NextFunction) {
    try {

        let { error } = validateLogin(req.body as object)
        if (error) {
            return res.status(400).send(error.message)
        }
    
        let user: any = await NewUser.findOne({email: req.body.email})
        if(!user) return res.status(400).send('Invalid emaill or password');
    
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if(!validPassword) return res.status(400).send('Invalid emaill or password');
    
        const token = jwt.sign({
            email: user.email,
            id: user._id
        }, process.env.JWT_SECRET_KEY!, { expiresIn: '3h' });
        
        res.send(token);
    
    
      } catch (error) {
        res.status(500).send({message : `Error sigining you in`})
      }
}