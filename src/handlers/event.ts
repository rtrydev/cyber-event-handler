import {AzureFunction, Context, HttpRequest} from '@azure/functions';
import {ReportingEvent} from "../models/reporting-event"
import {EventValidator} from "../validators/event-validator";
import {DatabaseProvider} from "../database/database-provider";

export const handle: AzureFunction = async (context: Context, req: HttpRequest) => {
    const eventBody = {
        user_id: req.body?.userId,
        username: req.body?.username,
        timestamp: req.body?.timestamp,
        event_type: req.body?.eventType
    } as ReportingEvent

    const eventValidator = new EventValidator();

    if(!eventValidator.validateEvent(eventBody)) {
        context.res = {
            status: 400,
            body: "Event body was not valid"
        }
    } else {
        const dbProvider = new DatabaseProvider();
        const db = dbProvider.getDatabase();

        const response = await db.items.create(eventBody);

        context.res = {
            status: response.statusCode
        };
    }
}
