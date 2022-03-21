import { Day } from "../interfaces/Day";
import { TimezoneService } from "../services/TimezoneService";
import { BookingModalForm } from "./BookingModalForm";
import { Country, Timezone } from 'countries-and-timezones';
import { Language } from "../pipes/Language";

export class BookingList {

    /**
     * Available hours container
     */
    hoursContainer: HTMLElement;

    /**
     * BookingModalForm Object
     */
    _form: BookingModalForm;

    /**
     * 
     */
    _timezone: TimezoneService;

    /** 
     * Timezone Container 
     */
    timezoneContainer: HTMLElement;

    /**
     * Select Timezone 
     */
    selectTimezone: HTMLSelectElement;

    /**
     * Select Country
     */
    selectCountry: HTMLSelectElement;

    constructor(lang: Language) {
        this.hoursContainer = document.createElement("div");
        this.hoursContainer.setAttribute('id', 'hours-container');
        this._form = new BookingModalForm(lang);
        this._timezone = new TimezoneService();
        this.timezoneContainer = document.createElement("div");
        this.timezoneContainer.setAttribute('id', 'timezone-container');
        this.selectTimezone = document.createElement("select");
        this.selectTimezone.setAttribute('id', 'timezones');
        this._form.init();
    }

    /**
     * Get hours  container
     * @returns hours container {HTMLElement} 
     */
    getHoursContainer(): HTMLElement {
        return this.hoursContainer;
    }

    /**
     * Creates available hours
     * @param day of which the available hours will be set
     */
    setHours(day: Day): void {
        this.hoursContainer.innerHTML = '';
        const timezone = this.selectTimezone.value;

        day.hours.forEach(hour => {
            let hourBtn = document.createElement("a");
            hourBtn.classList.add('hour');
            hour = this._timezone.calculateTimezone(timezone, hour)
            hourBtn.innerHTML = hour;
            this.hoursContainer.appendChild(hourBtn);

            hourBtn.addEventListener("click", () =>
                this._form.show()
            );
        });
    }

    /**
     * Sets the select element with all the countries
     */
    setCountrySelect() {
        const allCountries = this._timezone.getAllCountries();
        const select = document.createElement("select");
        select.setAttribute('id', 'countries');

        Object.values(allCountries).forEach((country: Country) => {
            let option = document.createElement("option");
            option.value = country.id;
            option.defaultSelected = (country.id == "ES") ? true : false;
            option.innerHTML = country.name + "";
            select.appendChild(option);
        });

        select.addEventListener("change", (e: any) => {
            const id: string = e.target.value;
            this.setTimezones(id);
        });
        this.setTimezones('ES');

        this.selectCountry = select;
        this.timezoneContainer.append(this.selectCountry);
        this.timezoneContainer.append(this.selectTimezone);
    }

    /**
     * Sets the select element with all the timezones of the country
     * @param id Country ID
     */
    setTimezones = (id: string) => {
        const timezones = this._timezone.getTimezoneForCountry(id);
        this.selectTimezone.innerHTML = "";
        Object.values(timezones).forEach((zone: Timezone, index: number) => {
            if (zone.name.split('/')[1] !== undefined) {
                let option = document.createElement("option");
                option.value = zone.name;
                option.innerHTML = '(UTC ' + zone.utcOffsetStr + ') ' + zone.name.split('/')[1].replace('_', ' ');
                option.defaultSelected = (zone.name === "Atlantic/Canary") ? true : false;
                this.selectTimezone.appendChild(option);
            }
        });
    }

    /**
     * 
     * @returns value of selectTimezone
     */
    getSelectTimezone() {
        return this.selectTimezone.value;
    }


    /**
     * 
     * @returns timezone container
     */
    getTimezoneContainer(): HTMLElement {
        return this.timezoneContainer;
    }

}