require("dotenv").config();
import express, { Express, Request, Response } from 'express';
const app: Express = express();
const jsforce = require('jsforce');
const {PORT, CLIENT_ID, CLIENT_SECRET_ID, REDIRECT_URI} = process.env;

class Salesforce {
    public static authUser = async (req: Request, res: Response) => {
        
    }
}