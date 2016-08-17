
var Events = mongoose.model('Events');

module.exports = (function(){

	return{
		index: function(req, res){
			Events.find({}, function(err, events){
		        if (err){
		          res.json(err);
		        }else{
							console.log(events);
		          res.json(events);
		        }
     		})
		},
		index_day: function(req, res){
			console.log(req.body);
			month = req.body.date.substring(5,7);
			if(month == "01"){
				month = "Jan";
			}else if(month == "02"){
				month = "Feb";
			}else if(month == "03"){
				month = "Mar";
			}else if(month == "04"){
				month = "Apr";
			}else if(month == "05"){
				month = "May";
			}else if(month == "06"){
				month = "Jun";
			}else if(month == "07"){
				month = "Jul";
			}else if(month == "08"){
				month = "Aug";
			}else if(month == "09"){
				month = "Sep";
			}else if(month == "10"){
				month = "Oct";
			}else if(month == "11"){
				month = "Nov";
			}else if(month == "12"){
				month = "Dec";
			}
			year = req.body.date.substring(0,4);
			day = req.body.date.substring(8,10);
			console.log(month);
			console.log(year);
			console.log(day);
			regex = new RegExp('\\w{3}\\s('+month+')\\s('+day+')\\s('+year+')');
			Events.find({start_date: regex}, function(err, events){
					console.log(events);
	        if (err){
	          res.json(err);
	        }else{
	          res.json(events);
	        }
   		})
		},
		index_calendar: function(req, res){
			month = req.body.date.substring(5,7);
			if(month == "01"){
				month = "Jan";
			}else if(month == "02"){
				month = "Feb";
			}else if(month == "03"){
				month = "Mar";
			}else if(month == "04"){
				month = "Apr";
			}else if(month == "05"){
				month = "May";
			}else if(month == "06"){
				month = "Jun";
			}else if(month == "07"){
				month = "Jul";
			}else if(month == "08"){
				month = "Aug";
			}else if(month == "09"){
				month = "Sep";
			}else if(month == "10"){
				month = "Oct";
			}else if(month == "11"){
				month = "Nov";
			}else if(month == "12"){
				month = "Dec";
			}
			year = req.body.date.substring(0,4);
			regex = new RegExp('\\w{3}\\s('+month+')\\s\\d{2}\\s('+year+')');
			console.log(regex.test("Tue Aug 16 2016"));
			console.log(regex.exec("Tue Aug 16 2016"));
			Events.find({start_date: regex}, function(err, events){
	        if (err){
	          res.json(err);
	        }else{
	          res.json(events);
	        }
   		})
		},
		create: function(req, res){
			console.log(req.body);
			var event = new Events(req.body.data);
			event.save(function(err){
				if(err){
					console.log(err);
					res.json(err);
				}
				else{
					console.log('success');
					res.json({status: "Success"});
				}
			});
		}
	}

})();
