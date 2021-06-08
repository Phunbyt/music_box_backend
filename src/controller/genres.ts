import { Request, Response } from "express";
import Genre from "../schema/genreSchema";
import { getGenre } from "../utils/helper/helper";

const url: string = process.env.GENRE_LINK as string;

export const genres = async (
  req: Request,
  res: Response
): Promise<Record<string, unknown> | any> => {
  await getGenre(url);
  try {
    const allGenre = await Genre.find();
    res.status(200).json({ message: "successful", data: allGenre });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const genre = async (
  req: Request,
  res: Response
): Promise<Record<string, unknown> | any> => {
  try {
    const genre = await Genre.findOne({ id: req.params.id });
    if (!genre) return res.status(404).send({ message: "Genre not found" });

    res.status(200).send({
      message: "Successful",
      data: [genre],
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
};
