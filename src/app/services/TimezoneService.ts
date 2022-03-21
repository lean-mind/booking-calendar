import { Timezone, getTimezonesForCountry, getAllCountries } from 'countries-and-timezones';
import * as moment from 'moment-timezone';

export class TimezoneService {

    constructor() { }

    getAllCountries() {
        return getAllCountries();
    }

    getTimezoneForCountry(id: string): Timezone[] {
        return getTimezonesForCountry(id);
    }

    calculateTimezone(timezone: string, hourDate: string) {
        // TODO: Remove hardcoded date value 
        const resultDate = moment.utc(`2020-05-05 ${hourDate}`).tz("Europe/London");
        const result = resultDate.tz(timezone).format("HH:mm");
        return result;
    }
}