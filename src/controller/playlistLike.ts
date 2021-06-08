import {Request, Response} from 'express';
import {PlayListModel} from '../schema/playlistsSchema';


export const likePublicPost = async (req: Request | any,res:Response) => {
	try{
		//  
    
		const toLike = await PlayListModel.findOne(
			{_id:req.params.id,
				category:'public',
				likes:{$in:req.user._id}}).exec();
		// console.log(toLike);
		if(!toLike){
			const addedLike = await PlayListModel.findOneAndUpdate(
				{_id:req.params.id, category:'public'},
				{$push:{likes:req.user._id}},
				{new:true}).exec();
			if(addedLike){
				return res.status(200).json({
					'message': 'success',
					'data': addedLike,
				});
			}else{
				return res.status(400).json({
					'message': 'you can not like a private playlist'
				});
			}
		}else{
			return res.status(400).json({
				'status':'failed ',
				'message': 'you can not like a post more than once'
    
			});
		}
	}catch(err){
		return res.status(400).json({
			'status':'failed ',
			'message': err.message
		});
	}
    
    
};