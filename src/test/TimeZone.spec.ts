import { TimezoneService } from '../app/services/TimezoneService';

describe('TimeZone service', () => {

    let _timezone: TimezoneService;

    describe('calculeTimezone', () => {
        beforeEach(() => {
            _timezone = new TimezoneService();
        });

        describe("calculeTimezone function", () => {
            test("should return the time changed to the time zone of America/New_York", () => {
                const timezone = "America/New_York";
                const hour = "18:00";
                const result = _timezone.calculateTimezone(timezone, hour);
                const expectedResult = "13:00";
                expect(result).toEqual(expectedResult);
            });
        });

    });
});