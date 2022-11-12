import {EventTypes} from "../enums/event-types";

export interface ReportingEvent {
    user_id: string,
    username: string,
    timestamp: number,
    event_type: EventTypes
}