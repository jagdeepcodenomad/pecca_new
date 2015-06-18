$(document).ready(function () {
    $('#calendar').eCalendar({
	 	
 weekDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Total'],

        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        textArrows: {years_prev : '', previous: '', next: '',  years_next : '' },
        eventTitle: 'Events',
        url: '',
        events: [
            {title: 'Event 1', description: 'Description 1', datetime: new Date(2015, 3, 4, 17),},
            {title: 'Event 2', description: 'Description 2', datetime: new Date(2015, 3, 10, 16)},
            {title: 'Event 3', description: 'jQueryScript.Net', datetime: new Date(2015, 3, 18, 16)}
        ]});
});
