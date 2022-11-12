import {CosmosClient} from "@azure/cosmos";

export class DatabaseProvider {
    private _client: CosmosClient;

    constructor() {
        const dbUrl = process.env.DB_URL;
        const dbKey = process.env.DB_KEY;

        this._client = new CosmosClient({
            endpoint: dbUrl,
            key: dbKey,
            consistencyLevel: "Session"
        });
    }

    getDatabase() {
        const db = this._client.database("ReportingDb");
        return db.container("ReportingDb");
    }

}