import { ConnectionTimeoutException } from './../../exceptions/ConnectionTimeoutException';
import { UnhandledException } from './../../exceptions/UnhandledException';
import { IQuery } from './IQuery';
import { ICommand } from './ICommand';
import { ErrorService } from './../ErrorService';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { StorageService } from './../storage.service';
import { TimeoutError } from "rxjs";
import { ServerException } from "../../shared/errors/errors";

@Injectable()
export class CqrsBus
{
    private API: string = 'api/cqrsbus';

    constructor(
        private _http: Http,
        private _storage: StorageService,
        private _errorService: ErrorService)
    {
        if (window.location.hostname.includes('localhost')) // TODO: This is primitive but works :P
        {
            this.API = 'http://localhost:3000/api/cqrsbus';
        }
      
        // this.API = 'http://r-book.herokuapp.com/api/cqrsbus'; // TEMPORARY OVERRIDE 
    }

    public async Send(message: ICommand | IQuery<any>): Promise<any>
    {
        // Message class ---into---> { class_name: { class_fields }}
        const messagePackage = {};
        messagePackage[message.constructor.name] = message;
        const messageAsJson = JSON.stringify(messagePackage);

        console.log('Sending message:', messageAsJson);

        const headers = new Headers(
            {
                'Content-type': 'application/json',
                'Authorization': this._storage.GetSessionToken()
            });
        const options = new RequestOptions({ headers: headers });

        try
        {
            let response: Response = await this._http.post(this.API, messageAsJson, options).toPromise();

          //  console.log('POST Response:', response);

            if (response.text() !== '')
            {
                let responseAsObject = response.json();

                console.log('Message result: ' + JSON.stringify(responseAsObject));

                return responseAsObject;
            }
            else 
            {
                console.log('Message result: (empty)');

                return null;
            }
        }
        catch (ex) // Jump here in case of non 200 respond
        {
            console.log('[CQRS Bus] exception!');//, ex);

            if (ex instanceof TimeoutError) // We don't get here if server is disabled
            {
                console.log("TIMEOUT");
                this._errorService.Error("Connection timeout");

                throw new ConnectionTimeoutException();
            }
            else if (ex instanceof Response)
            {
                if (ex.status === 0) // We get here if server is disabled
                {
                    this._errorService.Error("Server is not responding");
                }
                else
                {
                    let serverException: ServerException = ex.json();

                    console.log('[CQRS.Send] ServerException: ', serverException);
                    this._errorService.Error(serverException.message);

                    throw new ServerException(serverException);
                }
            }
            else 
            {
                console.log("Unhandled exception type");
                this._errorService.Error('Unhandled exception');
                throw new UnhandledException();
            }
        }
    }
}