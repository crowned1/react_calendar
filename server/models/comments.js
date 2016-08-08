var CommentSchema = new mongoose.Schema({

	comment: {type: String, required: true, minlength:5},
	username: {type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true},

}, {timestamps: true});

mongoose.model('Comments', CommentSchema);
