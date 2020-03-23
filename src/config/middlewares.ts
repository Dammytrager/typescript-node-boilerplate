import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import passport from 'passport';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

const router = express.Router();

dotenv.config({path: path.resolve(__dirname, '../../env/.env')});
router.use(morgan("dev"));
router.use(cors());
router.use(passport.initialize());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

export default router;
