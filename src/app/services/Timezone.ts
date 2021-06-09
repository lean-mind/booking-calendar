import * as lib from 'countries-and-timezones';
import * as moment from 'moment-timezone'

export class Timezone {

    constructor() { }

    getAllCountries() {
        return lib.getAllCountries();
    }

    getTimezoneForCountry(id: string): lib.Timezone[] {
        return lib.getTimezonesForCountry(id);
    }

    calculeTimezone(timezone: string, hourDate: string) {
        const resultDate = moment.utc(`2020-06-11 ${hourDate}`).tz("Europe/London");
        const result = resultDate.tz(timezone).format("HH:mm");
        return result;
    }
}