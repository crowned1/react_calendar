var comments = require('./../controllers/comments.js');

module.exports = function(app){

	app.get('/comments', comments.index);
	app.post('/comments', comments.create);

}
