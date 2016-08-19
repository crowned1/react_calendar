var EventSchema = new mongoose.Schema({

	name: {type: String, required: true},
	type: {type: String, required: true},
	start_date: {type: String, required: true},
	start_hour: {type: String, required: true},
	end_date: {type: String, required: true},
	end_hour: {type: String, required: true},
	color: {type: String, required: true},
	location: {type: String},
	description: {type: String}

}, {timestamps: true});

mongoose.model('Events', EventSchema);
