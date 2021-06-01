"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const genres_1 = require("../../controller/genres");
const auth_1 = require("../../controller/auth");
const changePassword_1 = require("../../controller/changePassword");
const router = express_1.default.Router();
// Genre routes
router.get('/music/genres', genres_1.genres);
router.get('/music/genres/:id', genres_1.genre);
// route for signIn and signUp
router.post('/music/signUp', auth_1.signUp);
router.post('/music/signIn', auth_1.signIn);
//change password router
router.put('/music/changePassword/:id', changePassword_1.changePassword);
exports.default = router;
