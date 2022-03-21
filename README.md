# Leanmind Calendar
Component for booking appointments. Designed for Lean Mind.

---
## Download & Setup Instructions :computer:

Clone the project. This will download the GitHub respository files onto your local machine.  
```
git clone https://github.com/lean-mind/booking-calendar.git
```

Install the dependencies with this command.  
```
npm install
```

Set your environment by adding this variables to your .env file.  
```
USER_SERVICE_URL=https://www.googleapis.com/calendar/v3/calendars/
CALENDAR_ID=development@email.com/events
API_KEY=?key=(your API key)

PARAM_HOUR_MAX=&timeMax=
VALUE_HOUR_MAX=T14:00:00Z
PARAM_HOUR_MIN=&timeMin=
VALUE_HOUR_MIN=T10:00:00Z
```

Build the project.  
```
npm run build
```

Run the project.  
```
npm run dev
```
---
## Test Instructions :gear:

To execute all tests run.  
```
npm test
```