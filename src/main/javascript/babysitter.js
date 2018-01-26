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
				return 0;
			}
		};

		if (timeIn > timeOut) {
			var responseText = "Your Times are incorrect - your START Time " + timeIn + " is greater than your FINISHED time " + timeOut;
			utils.response(responseText);
			return 0;
		};
		
		// TODO: add constraint for timeIn < 17:00:00
		// TODO: add constraint for timeOut > 04:00:00
		
		return babySitter.payment(timeIn, timeOut, bedTime);
	},

	"payment": function (timeIn, timeOut, bedTime) {
		var bedTimeNum = 0,
			timeInNum = new Date(timeIn).getTime(),
			midnightTimeNum = new Date(new Date(timeIn).setHours(24,0,0,0)).getTime(),
			timeOutNum = new Date(timeOut).getTime();

		if (bedTime != null) {
			bedTimeNum = new Date(bedTime).getTime();
		};

		if (midnightTimeNum > timeOutNum) {
			// timeIn is after midnight
			var hours = Math.floor(Math.abs(timeOutNum - timeInNum) / 36e5);

			var responseText = "Note: TimeIn is after midnight... " + hours;
			utils.response(responseText);
			var payment = babySitter.rates.midnightToEnd * hours;
			return payment;
		}
	}
};



