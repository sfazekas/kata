var utils = {
	"isDate" : function (dateVal) {
    var dateTest = new Date(dateVal);
		return (dateTest instanceof Date && !isNaN(dateTest.valueOf()))
	},
	"response" : function (output) {
		var d = document,
		responseObj = d.getElementById('response');
		if (responseObj == null) {
			responseObj = d.createElement('DIV')
			responseObj.setAttribute('id','response');
			document.body.appendChild(responseObj);
		};
		responseObj.innerHTML = output;
	}
};

var babySitter = {
	"rates" : {
		"beforeBedTime": 12,
		"bedTimeToMidnight": 8,
		"midnightToEnd": 16
	},
	"hoursWorked" : function (timeIn, timeOut, bedTime) {
		if (bedTime == '') {bedTime = null}; // bedTime could be optional
		var args = arguments;
		for (x = 0; x < args.length; x++){
			if (!utils.isDate(args[x])) {
				utils.response("The time entered is not a date: " + args[x]);
				return false;
			}
		};

		if (timeIn > timeOut) {
			var responseText = "Your Times are incorrect - your START Time " + timeIn + " is greater than your FINISHED time " + timeOut;
			utils.response(responseText);
			return false;
		};
		
		return babySitter.payment(timeIn, timeOut, bedTime);
	},

	"payment": function (timeIn, timeOut, bedTime) {

	}
};



