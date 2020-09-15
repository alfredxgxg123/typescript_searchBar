import express, { Application, Request, Response, NextFunction } from 'express';

export const index = ( app: express.Application ): void => {
    // define a route handler for the default home page
    app.get( "/", ( req: Request, res: Response, next: NextFunction ) => {
        res.send( "index" );
    } );
};