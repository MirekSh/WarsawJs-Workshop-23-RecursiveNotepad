import axios from 'axios';
import { UUID } from "angular2-uuid";

export class DbSeed
{
    private EMAIL = 'test1@test.com';
    private PASS = 'test';
    private HOST = 'http://localhost:3000/api/cqrsbus';
    private TABS = [
        { parentId: "00000000-0000-0000-0000-000000000000", id: UUID.UUID(), title: '1' },
        { parentId: "00000000-0000-0000-0000-000000000000", id: UUID.UUID(), title: '2' },
        { parentId: "00000000-0000-0000-0000-000000000000", id: "00000000-1111-0000-0000-000000000000", title: '3' },
        { parentId: "00000000-1111-0000-0000-000000000000", id: UUID.UUID(),  title: '3.1' }
    ];

    private httpConfig = {
        headers: {
            'Content-type': 'application/json',
            'Authorization': '' }
    };

    private async Login(email, pass)
    {
        let response: any = await axios.post(this.HOST,
            { LoginQuery: { email: email, password: pass } },
            this.httpConfig);

        this.httpConfig.headers['Authorization'] = response.data.token;
    }

    private async Add(tabs)
    {
        await Promise.all(
            tabs.map(
                async (t) =>
                {
                    await axios.post(this.HOST,
                        { AddNoteCommand: t },
                        this.httpConfig);
                }
            )
        );
    }

    private async Delete(tabId)
    {
        await axios.post(this.HOST,
            { DeleteNotesCommand: { id: tabId } },
            this.httpConfig);
    }

    public async Seed()
    {
        await this.Login(this.EMAIL, this.PASS);
        await this.Delete("00000000-0000-0000-0000-000000000000");
        await this.Add(this.TABS);
    }
}