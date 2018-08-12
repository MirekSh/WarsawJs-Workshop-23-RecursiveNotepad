import { IQuery } from './../IQuery';
import { guid } from '../../../common/types';
import { Tab } from './../../../models/tab.model';

export class GetNotesQuery implements IQuery<Tab[]>
{
    public parentId: guid;

    public constructor(init?: Partial<GetNotesQuery>)
    {
        Object.assign(this, init);
    }
}

