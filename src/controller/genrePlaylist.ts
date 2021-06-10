import { Request, Response, NextFunction } from "express";
import { PlayListModel } from "../schema/playlistsSchema";
import Genre from "../schema/genreSchema";
import { GenreArtist } from "../utils/helper/helper";

export const getGenrePlaylist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let id = req.params.id;

  try {
    let genre: Record<any, any> | null = await Genre.findOne({
      id,
    });
    console.log("genre", genre);
    if (!genre) return res.status(400).send({ message: "No genre found" });
    let genreName = genre["name"];

    let playlist: Record<any, any> | null = await PlayListModel.find({
      genre: genreName,
    });
   
    let publicPlaylist: string[] = playlist!.filter(
      (list: { [x: string]: string }) => {
        return list["category"] == "public";
      }
    );
    if (publicPlaylist.length !== 0) {
      return res
        .status(200)
        .json({ message: "Playlist", data: publicPlaylist });
    } else {
      return res.status(400).send({ message: "No Playlist For This Genre" });
    }
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

export const getGenreArtist = async (req: Request, res: Response) => {
  let id = req.params.id;

  try {
    let genre = await Genre.findOne({ id });

    if (!genre) return res.status(400).send({ message: "Genre Not Found" });
    let genreID = genre["id"];
    const url = `https://api.deezer.com/genre/${genreID}/artists`;
    const artist = await GenreArtist(url);
    if (artist) {
      return res.status(200).json({ message: "Artist Genre", data: artist });
    } else {
      return res.status(404).send({ error: "Not Found" });
    }
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};
