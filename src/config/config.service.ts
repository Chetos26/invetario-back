/* eslint-disable prettier/prettier */
import * as fs from 'fs';
import { parse } from 'dotenv';

export class ConfigService {
    private readonly env: {[key: string]: string};

    constructor(){
        const envFilePath = __dirname + '/../../.env';
        const existsPath = fs.existsSync(envFilePath);
        console.log(envFilePath);
        
        if (!existsPath) {
            console.log('.env does not exist');
            process.exit(0);
        }else {
            this.env = parse(fs.readFileSync(envFilePath))   
        }
    }

    get (key: string) : string {
        return this.env[key];
    }
    
}