import {ReportingEvent} from "../models/reporting-event";
import {EventTypes} from "../enums/event-types";

export class EventValidator {
    validateEvent(event: ReportingEvent) {
        const eventTypes = []
        for (let eventTypesKey in EventTypes) {
            eventTypes.push(EventTypes[eventTypesKey])
        }

        if (!event.user_id
            || !event.username
            || !event.timestamp
            || !eventTypes.some(eventType => eventType === event.event_type)) {
            return false;
        }

        return true;
    }
}