import { guid } from '../common/types';
import { Injectable } from '@angular/core';

@Injectable()
export class StorageService
{
    private SESSION_TOKEN_NAME = "session_token";

    constructor()
    {
        if (typeof (Storage) === "undefined")
        {
            console.log("STORAGE IS UNAVAILABLE!");
        }
    }

    public SetSessionToken(token: guid): void
    {
        if (typeof (Storage) === "undefined") return;
        
        localStorage.setItem(this.SESSION_TOKEN_NAME, token);
    }
    public ClearSessionToken(): void
    {
        if (typeof (Storage) === "undefined") return;
        
        localStorage.setItem(this.SESSION_TOKEN_NAME, '');
    }
    
    public GetSessionToken(): guid | null
    {
        if (typeof (Storage) === "undefined") return null;

        let token: string = localStorage.getItem(this.SESSION_TOKEN_NAME);
  
        if (token === '') token = null;

        return token;
    }
}