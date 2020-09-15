import express from "express";
import path from 'path';
import dotenv from "dotenv";
import * as bodyParser from 'body-parser';
import * as routesIndex from "./routes/index";
import * as routesSearch from "./routes/search";

import cors from "cors";

//options for cors midddleware
const options: cors.CorsOptions = {
  origin: (origin, cb) => cb(null, true),
  credentials: true,
  preflightContinue: true,
  exposedHeaders: [
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept",
    "X-Password-Expired"
  ],
  optionsSuccessStatus: 200
};


// initialize configuration
dotenv.config();
// port is now available to the Node.js runtime 
// as if it were an environment variable
const port = process.env.SERVER_PORT;
const app = express();


// Configure Express to use EJS
app.set( "views", path.join( __dirname, "views" ) );
app.set( "view engine", "ejs" );

// Configure Express to parse incoming JSON data
app.use(express.json());
app.use(cors(options));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Configure routes for serach api and index render

routesIndex.index( app );
routesSearch.search( app );



app.listen(port, () => console.log(`server started at http://localhost:${ port }`));