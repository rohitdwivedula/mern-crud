var {PageView} = require("../../models/PageView.js");

module.exports = {
	record_activity: function (user, api_endpoint, device_type)
	{
		// record that a user has accessed an endpoint right now. 
		// make sure to add a Privacy Policy to your app :p 
		var record = {email: user, endpoint: api_endpoint, device: device_type};
		PageView.create(record,(err, obj) => {
			if (err) {
				throw err;
			} 
			else {
				console.log("State surveillance successful. One step closer to 1984.");
			}
		});
	},
	compare_dates: function (date1, date2){
			if(date1._id.year < date2._id.year){
				return -1;
			}
			else if(date1._id.year > date2._id.year){
				return 1;
			}
			if(date1._id.month < date2._id.month){
				return -1;
			}
			else if(date1._id.month > date2._id.month){
				return 1;
			}
			if(date1._id.day < date2._id.day){
				return -1;
			}
			else if(date1._id.day > date2._id.day){
				return 1;
			}
			return 0;
		}
}
