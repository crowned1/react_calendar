var events = require('./../controllers/events.js');

module.exports = function(app){

	app.get('/events', events.index);
	app.post('/events/day', events.index_day);
	app.post('/events/calendar', events.index_calendar);
	app.post('/event', events.create);

}
