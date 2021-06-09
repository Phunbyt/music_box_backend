"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenreArtist = exports.getGenre = void 0;
const axios_1 = __importDefault(require("axios"));
const genreSchema_1 = __importDefault(require("../../schema/genreSchema"));
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();
const getGenre = async (url) => {
    const database = await genreSchema_1.default.find({});
    const dataCount = Object.keys(database).length;
    if (dataCount === 0) {
        const result = await axios_1.default.get(url);
        const data = result.data.data;
        data.forEach(async (element) => {
            let fetchedGenre = new genreSchema_1.default({
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
exports.getGenre = getGenre;
const GenreArtist = async (url) => {
    const result = await axios_1.default.get(url);
    return result.data.data;
};
exports.GenreArtist = GenreArtist;
