import express, { Request, Response} from 'express';
import NewUser from '../schema/registrationSchema'
import { profileJoiVal } from '../utils/validator/profileValidator';


export const getSingleData = async (req: Request, res: Response) => {
  try {
    const singleData = await NewUser.findById(req.params.id).select('_id firstName lastName dateOfBirth country gender');
    return res.status(200).json(singleData);
  } catch (error) {
    res.status(404).json({ message: 'Error getting single data' });
  }
};

export const updateData = async (req: Request, res: Response) => {
    if (!req.body) {
        return res.status(400).json({ message: 'Cannot update empty data' })
    }
    try {
        const check = profileJoiVal.validate(req.body);
        if (check.error) {
          res.status(400).send(check.error.details[0].message);
        }
        const sid = req.params.id;
        const data = await NewUser.findByIdAndUpdate(
            sid,
            req.body,
            { useFindAndModify: false },
            (error, docs) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log(`Updated User Profile`);
                }
            }
        ).exec();
        return res.status(200).json({message: 'Updated successfully'});
    } catch (error) {
        return res.status(404).json({ message: 'Error updating data' });
    }
};