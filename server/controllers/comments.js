
var Comments = mongoose.model('Comments');

module.exports = (function(){

	return{
		index: function(req, res){
			Comments.find({}, function(err, comments){
		        if (err){
		          res.json(err);
		        }else{
		          res.json(comments);
		        }
     		})
		},
		create: function(req, res){
			var comment = new Comments(req.body);
			comment.save(function(err){
				if(err){
					res.json(err);
				}
				else{
					res.json(comment);
				}
			});
		}
	}
})();
