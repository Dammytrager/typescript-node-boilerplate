import mongoose from 'mongoose';
import bluebird from 'bluebird';
mongoose.Promise = bluebird;

export class Db {
    host = process.env.DB_HOST;
    name = process.env.DB_NAME;
    username = process.env.DB_USERNAME;
    password = process.env.DB_PASSWORD;
    protocol = process.env.DB_PROTOCOL;
    additionalData = process.env.ADDITIONAL_DATA;
    dbUrl: string;

    constructor() {
        this.validateEnvParams(this.host, 'DB_HOST');
        this.validateEnvParams(this.name, 'DB_NAME');
        this.validateEnvParams(this.username, 'DB_USERNAME');
        this.validateEnvParams(this.password, 'DB_PASSWORD');
        this.validateEnvParams(this.protocol, 'DB_PROTOCOL');
        this.dbUrl = `${this.protocol}://${this.username}:${this.password}@${this.host}/${this.name}${this.additionalData}`;
        console.log(this.dbUrl);
    }

    connect() {
        mongoose.connect(this.dbUrl, {useNewUrlParser: true, autoReconnect: true})
            .then(() => {
                return console.log(`Successfully connected to ${this.dbUrl}`);
            })
            .catch((err) => {
                console.log("Error connecting to database: ", err);
                return process.exit(1);
            });

        mongoose.connection.on('open', this.connecting);

        mongoose.connection.on('disconnected', (err: any) => {
            console.log('mongoose disconnected ' + err );
        });
    }

    private connecting() {
        console.log('mongoose connecting to ' + this.dbUrl);
    }

    private disconnected(err: any) {
        console.log('mongoose disconnected ' + err );
    }

    private validateEnvParams(param: string | undefined, paramName: string) {
        if (!param) {
            throw new Error(`${paramName} is not set in the .env file`);
        }
    }
}
