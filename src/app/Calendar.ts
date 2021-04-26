import { lang as langMonths } from './lang/months';
import { lang as langDays } from './lang/days';
import { DayI } from './Interfaces/DayI';
import { Language } from './Language';

export class Calendar {

    /**
     * Language in which the calendar is going to be displayed
     */
     lang: string;

    /**
     * Google API Calendar Key
     */
    private readonly key: string;

    /**
     * Current date
     */
    private currentDate: Date;
    
    /**
     * Names of the months
     */
     monthsName: string[] = [];

     /**
      * Names of the days
      */
     daysName: string[] = []; 

    /**
     * key {string} Google Calendar API KEY
     */
    constructor(lang: Language, key: string) {
        this.lang = lang;
        this.key = key;
        this.monthsName = langMonths[lang] as string[];
        this.daysName = langDays[lang] as string[];
        let today = new Date();
        this.currentDate = new Date(today.getFullYear(), today.getMonth(), 1);
    }

    
    // /**
    //  * Event to change the month by clicking the next or previous buttons
    //  * isNext {boolean} Indicates in which direction the month is going to be changed,
    //  * true = next, false = previous.
    //  */
    // changeMonthEvent(isNext: boolean) {
    //     isNext ? this.setNextMonth() : this.setPreviousMonth(); // logica
    //     this.setCalendarMonthElement();
    //     this.fillCalendarDaysElement();
    // }
    

    // /**
    //  * Create the element with the name of the days
    //  */
    // createDaysNameElement() {
    //     let header: HTMLElement = document.getElementById("calendar-header");
    //     let daysContainer: HTMLElement = document.createElement("div");
    //     daysContainer.setAttribute("id", "days");
    //     this.getDaysName().forEach(name => {
    //         const cell: HTMLElement = document.createElement("div");
    //         cell.classList.add('cell');
    //         cell.innerHTML = name;
    //         daysContainer.appendChild(cell);
    //     });
    //     header.appendChild(daysContainer);
    // }

    // /**
    //  * Set the month name in the calendar element
    //  */
    // setCalendarMonthElement() {
    //     const currentMonth: HTMLElement = document.createElement('p');
    //     currentMonth.setAttribute("id", "current-month");
    //     currentMonth.innerHTML = this.getMonthName(this.currentDate.getMonth()) + " " + this.currentDate.getFullYear();
    //     this.monthNameContainer.innerHTML = currentMonth.innerHTML;
    // }

    // /**
    //  * Fill calendar with all the days
    //  */
    // fillCalendarDaysElement() { // logica
    //     this.daysContainer.innerHTML = "";
    //     let today = new Date();
    //     this.setMonthStructure().forEach(day => {
    //         const cell: HTMLElement = document.createElement("div");
    //         cell.innerHTML = (day?.day) ? day.day : "";
    //         (cell.innerHTML != "") ? cell.classList.add('cell') : cell.classList.add('cell_empty');
    //         if(day?.day && parseInt(day.day) < today.getDate()
    //         && today.getMonth() == this.currentDate.getMonth()
    //         && today.getFullYear() == this.currentDate.getFullYear()){
    //             cell.classList.add("cell_disabled");
    //         }
    //         this.daysContainer.appendChild(cell);
    //     });
    // }

    /**
     * Get names of months
     * return an array of months
     */
    getMonthsName(): string[] {
        return this.monthsName;
    }

    /**
     * Get the name of a month indicated by number
     * month {number} Number of a month, starting from 0
     * return the requested month name
     */
    getMonthName(): string {
        let month: number = this.currentDate.getMonth();
        return this.monthsName[month];
    }

    /**
     * 
     * @returns 
     */
    getFullYear(){
        return this.currentDate.getFullYear();
    }

    /**
     * Get initial letter of the days
     * return an array of days
     */
    getDaysName(): string[] {
        return this.daysName;
    }

    /**
     * Get the name of a day indicated by number
     * day {number} Number of a day of the week, starting from 0
     * return the requested day name
     */
    getDayName(day: number): string {
        if (day >= this.daysName.length) {
            throw new Error('Day cannot be greater than 6.');
        }
        return this.daysName[day];
    }

    /**
     * Get the number of days of a month
     * month {number} Number of the month, starting from 1, which we want to know how many days does it have
     * year {number} Number of the year
     * return the number of days that the requested month has
     */
    getMonthDays(): number {
        let month: number = this.currentDate.getMonth();
        let year: number = this.currentDate.getFullYear();
        return new Date(year, month + 1, 0).getDate();
    };

    /**
     * Get the first day of the month as a number
     * return the number of the day, starting from 0 as Sunday
     */
    getFirstDayOfMonth(): number {
        return this.currentDate.getDay();
    }

    /**
     * Set the month structure
     * date {Date} date
     * return an array with the structure of the month
     */
    setMonthStructure(): DayI[] {
        const blankSpaces: number = this.getFirstDayOfMonth();
        const monthDays: number = this.getMonthDays();
        let monthStructure: DayI[] = new Array(blankSpaces);
        monthStructure.fill(null, 0, blankSpaces);
        let days: DayI[] = Array.from({ length: monthDays }, (_, index) => ({ day: index + 1 + "" } as DayI));
        monthStructure = monthStructure.concat(days);
        return monthStructure;
    }

    

    /**
     * Set the currentDate to the indicated date
     * date {Date} date
     */
    changeDate(date: Date) {
        this.currentDate = new Date(date.getFullYear(), date.getMonth(), 1);
    }

    /**
     * 
     * @returns 
     */
    changeMonth(isNext: boolean){
        isNext ? this.setNextMonth() : this.setPreviousMonth();
    }

    /**
     * 
     */
    getCurrentDate(): Date{
        return this.currentDate;
    }

    /**
     * Set the currentDate to the previous month
     */
     setPreviousMonth() {
        const today = new Date();
        if(today < this.currentDate){
            this.currentDate.setMonth(this.currentDate.getMonth() - 1);
        }
    }

    /**
     * Set the currentDate to the next month
     */
    setNextMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    }
}