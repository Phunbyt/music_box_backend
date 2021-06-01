"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genre = exports.genres = void 0;
const genreSchema_1 = __importDefault(require("../schema/genreSchema"));
const helper_1 = require("../utils/helper/helper");
const url = process.env.GENRE_LINK;
helper_1.getGenre(url);
const genres = async (req, res) => {
    try {
        const allGenre = await genreSchema_1.default.find();
        res.status(200).json(allGenre);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.genres = genres;
const genre = async (req, res) => {
    try {
        const genre = await genreSchema_1.default.findOne({ id: req.params.id });
        if (!genre)
            return res.status(404).send({ message: 'Genre not found' });
        res.status(200).send({ data: [genre] });
    }
    catch (error) {
        res.status(404).send(error.message);
    }
};
exports.genre = genre;
