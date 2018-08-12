import { Injectable } from '@angular/core';
// import { MdSnackBar } from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorService
{
    constructor(
        // private _snack: MdSnackBar
        private _snack: MatSnackBar
    )
    {

    }

    public Error(message: string)
    {
        console.log("snack: "+message);
        // this._snack.open(message, null, { duration: 2500, extraClasses: ["red-alert"] });
        this._snack.open(message, null, { duration: 2500 });
    }
}