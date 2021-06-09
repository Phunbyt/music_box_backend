
import {ValidateMedia} from '../utils/validator/validateMedia';
export  async function verifyMedia(directory: string,directoryID: string
) {
	const userId = '';
	ValidateMedia({ directory, directoryID });
  
	return {userId,  directory, directoryID };
}

