import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorService
{
    constructor(private _snack: MatSnackBar)
    { }

    public Error(message: string)
    {
        console.log("SnackBar: " + message);

        this._snack.open(message, null, { duration: 2500 });
    }
}