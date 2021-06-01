import axios from 'axios';
import Genre from '../../schema/genreSchema';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();


export const getGenre = async (url: string) => {
	const database = await Genre.find({});
	console.log('database', database);

	const dataCount = Object.keys(database).length;
	console.log('count', dataCount);

	if (dataCount === 0) {
		const result = await axios.get(url);
		const data = result.data.data;
		console.log(data);

		console.log('result:', typeof data);

		data.forEach(async (element: Record<string,unknown>) => {
			let fetchedGenre = new Genre({
				id: element.id,
				name: element.name,
				picture: element.picture,
				picture_small: element.picture_small,
				picture_medium: element.picture_medium,
				picture_big: element.picture_big,
				picture_xl: element.picture_xl,
				type: element.type,
			});

			fetchedGenre = await fetchedGenre.save();
		});
	}
};
