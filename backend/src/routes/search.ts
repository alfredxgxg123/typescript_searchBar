import express, { Application, Request, Response, NextFunction } from 'express';
import handleJsonFile from '../ults/jsonHelper';


export const search = ( app: express.Application ):void => {
    app.get( "/api/search/:keyword", ( req: Request, res: Response) => {
        const strQuery: string = req.params.keyword.toLowerCase();    
        try {

            let data = handleJsonFile(strQuery).sort((a:any, b:any):any => Date.parse(b['date']) - Date.parse(a['date']));
            res.status(200).json(data);
        } catch (err) {
            res.status(400).json("error in your search");
        }
        
    } );
};