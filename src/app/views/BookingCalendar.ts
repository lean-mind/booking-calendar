import { Calendar } from '../controller/Calendar';
import { BookingList } from './BookingList';
import { Language } from '../pipes/Language';
import { Day } from '../interfaces/Day';
import config from "../config/calendar.config"

export class BookingCalendar {

    /**
     * Calendar object (logic)
     */
    private _calendar: Calendar;

    /**
     * BookingList object (view)
     */
    private _bookingList: BookingList;

    /**
     * Main container
     */
    container: HTMLElement;

    /**
     * Month name Container
     */
    monthNameContainer: HTMLElement;

    /**
     * Days name container
     */
    daysNameContainer: HTMLElement;

    /**
     * Days container
     */
    daysContainer: HTMLElement;

    /**
     * Calendar container
     */
    calendarContainer: HTMLElement;

    /**
     * Button active cell of days
     */
    activeCell: HTMLButtonElement;

    /**
     * @param lang {es | en} Calendar language
     * @param idContainer {string} Container ID where the calendar is going to be displayed
     */
    constructor(lang: Language = 'en', idContainer: string) {
        this._calendar = new Calendar(lang);
        this._bookingList = new BookingList();
        this.container = document.getElementById(idContainer);
        this.monthNameContainer = document.createElement("span");
        this.daysContainer = document.createElement("div");
        this.daysContainer.setAttribute("id", "days-container");
        this.daysNameContainer = document.createElement("div");
        this.daysNameContainer.setAttribute("id", "days-name-container");
        this.calendarContainer = document.createElement("div");
        this.calendarContainer.setAttribute("id", "calendar-container");
    }

    /**
     * Initialize the calendar
     */
    init() {
        this.createHeader();
        this.createDaysNameElement();
        this.calendarContainer.appendChild(this.daysContainer);
        this.fillCalendarDaysElement();
        this.container.appendChild(this.calendarContainer)
        this.togglePreviousButton();
        this.container.appendChild(this._bookingList.getHoursContainer());
        this.setBookingList();
        this.container.append(this._bookingList.getTimezoneContainer());
        this._bookingList.setCountrySelect();
        this.selectTimezoneListener();
    }

    /**
     * Create the element with the name of the days
     */
    createDaysNameElement() {
        this._calendar.getDaysName().forEach(name => {
            const cell: HTMLElement = document.createElement("div");
            cell.classList.add('cell');
            cell.innerHTML = name;
            this.daysNameContainer.appendChild(cell);
        });
        this.calendarContainer.appendChild(this.daysNameContainer);
    }

    /**
     * Setting the header with the previous and next buttons and the month
     */
    createHeader() {
        // Header
        let header: HTMLElement = document.createElement("div");
        header.setAttribute("id", "calendar-header");

        // Previous Button
        let btnPreviousMonth: HTMLButtonElement = document.createElement("button");
        btnPreviousMonth.setAttribute("id", "btn-previous-calendar");
        btnPreviousMonth.innerHTML = '<i class="fas fa-angle-left fa-2x"></i>';
        btnPreviousMonth.addEventListener('click', () => this.changeMonthEvent(false));
        header.appendChild(btnPreviousMonth);
        //Month Name
        this.setCalendarMonthElement();
        header.appendChild(this.monthNameContainer);
        // Next Button
        let btnNextMonth: HTMLElement = document.createElement("button");
        btnNextMonth.innerHTML = '<i class="fas fa-angle-right fa-2x"></i>';
        btnNextMonth.addEventListener('click', () => this.changeMonthEvent(true));
        header.appendChild(btnNextMonth);

        this.calendarContainer.appendChild(header);
    }

    /**
     * Set the month name in the calendar element
     */
    setCalendarMonthElement() {
        const currentMonth: string = this._calendar.getMonthName() + " " + this._calendar.getFullYear();
        this.monthNameContainer.innerHTML = currentMonth;
    }

    /**
     * Event to change the month by clicking the next or previous buttons
     * @param isNext {boolean} Indicates in which direction the month is going to be changed,
     * true = next, false = previous.
     */
    changeMonthEvent(isNext: boolean) {
        this._calendar.changeMonth(isNext);
        this.setCalendarMonthElement();
        this.fillCalendarDaysElement();
        this.togglePreviousButton();
    }

    /**
     * Fill calendar with all the days
     */
    fillCalendarDaysElement() {
        this.daysContainer.innerHTML = "";

        this._calendar.setMonthStructure().forEach(day => {
            const cell: HTMLElement = document.createElement("div");
            cell.innerHTML = this._calendar.getDayDigit(day);

            if (this._calendar.isDayBeforeToday(day)) {
                cell.classList.add("cell_disabled");
            }

            if (cell.innerHTML != "") {
                cell.classList.add('cell');
                if (!cell.classList.contains("cell_disabled")) {
                    cell.addEventListener('click', this.selectedDay);
                }
            } else {
                cell.classList.add('cell_empty');
            }

            if (this._calendar.isToday(day)) {
                cell.classList.add('active');
                this.activeCell = cell as HTMLButtonElement;
            }

            this.daysContainer.appendChild(cell);
        });

        const cells = document.querySelectorAll('#days-container .cell:not(.cell_disabled)');

        if (!this._calendar.isMonthEqualsTodaysMonth()) {
            cells[0].classList.add('active');
            this.activeCell = cells[0] as HTMLButtonElement;
        }


    }

    /**
     * Changes the availability of the previous button depending on the selected month
     */
    togglePreviousButton() {
        let btnPreviousMonth = document.getElementById('btn-previous-calendar') as HTMLButtonElement;
        if (this._calendar.isMonthEqualsTodaysMonth()) {
            btnPreviousMonth.disabled = true;
        } else {
            btnPreviousMonth.disabled = false;
        }
    }

    /**
     * Adds or removes 'active' class to the selected day
     * @param e Event
     */
    selectedDay = (e: InputEvent) => {
        const cells = document.querySelectorAll('#days-container .cell.active');
        cells.forEach(cell => {
            cell.classList.remove('active');
        });
        this.activeCell = (e.target as HTMLButtonElement);
        this.activeCell.classList.add('active');
        const day: string = this.activeCell.innerHTML as string;
        this.setBookingList(day)
    }

    /**
     * Return available hours list
     */
    setBookingList(digit?: string) {
        const today = new Date().getDate() + '';
        let day: Day = { digit: (digit) ? digit : today, hours: config.availableHours };
        const timezone = this._bookingList.getSelectTimezone();

        this._calendar.setDay(day.digit, timezone)
            .then(result => {
                day = this._calendar.removeBusyHours(day);
                console.log(day);
                this._bookingList.setHours(day);
            }).catch(error => {
                console.log(error);
            })
    }

    /**
     * Create a event when timezone is changed
     */
    selectTimezoneListener = () => {
        const addListener = () => {
            const day: string = this.activeCell.innerHTML as string;
            this.setBookingList(day);
        }

        this._bookingList.selectTimezone.addEventListener('change', () => {
            addListener();
        })

        this._bookingList.selectCountry.addEventListener('change', () => {
            addListener();
        });
    }



    

}