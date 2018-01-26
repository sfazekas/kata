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
	
	"retHours": function (laterTime, earlierTime) {
		var diff = laterTime - earlierTime;
		if (diff <= 0) {
			return 0
		} else {
			return Math.floor(Math.abs(laterTime - earlierTime) / 36e5);
		}
	},

	"payment": function (timeIn, timeOut, bedTime) {
		var payment = 0,
			bedTimeNum = 0,
			responseText = '',
			timeInNum = new Date(timeIn).getTime(),
			midnightTimeNum = new Date(new Date(timeIn).setHours(24,0,0,0)).getTime(),
			timeOutNum = new Date(timeOut).getTime();

		if (bedTime != null) {
			bedTimeNum = new Date(bedTime).getTime();
		};

		if (bedTimeNum > timeInNum && bedTimeNum < midnightTimeNum) {
			// bedTime is after timeIn and before midnight
			var earlyHours = babySitter.retHours(bedTimeNum, timeInNum),
					bedTimeHours = babySitter.retHours(midnightTimeNum, bedTimeNum),
					lateHours = babySitter.retHours(timeOutNum, midnightTimeNum),
					pmtBeforeBed = babySitter.rates.beforeBedTime * earlyHours,
					pmtBedToMidnight = babySitter.rates.bedTimeToMidnight * bedTimeHours,
					pmtAfterMidNight = babySitter.rates.midnightToEnd * lateHours;

			payment = pmtBeforeBed + pmtBedToMidnight + pmtAfterMidNight;
			return payment;

		} else if (bedTimeNum > 0 && bedTimeNum < timeInNum && timeInNum < midnightTimeNum) {
			// bedTime occurred before timeIn
			var bedTimeHours = babySitter.retHours(midnightTimeNum, timeInNum),
					lateHours = babySitter.retHours(timeOutNum, midnightTimeNum),
					pmtBedToMidnight = babySitter.rates.bedTimeToMidnight * bedTimeHours,
					pmtAfterMidNight = babySitter.rates.midnightToEnd * lateHours;

			payment = pmtBedToMidnight + pmtAfterMidNight;
			return payment;
			
		} else if (midnightTimeNum > timeOutNum) {
			// timeIn is after midnight
			var lateHours = babySitter.retHours(timeOutNum, timeInNum);
			payment = babySitter.rates.midnightToEnd * lateHours;
			return payment;

		};

		
	}
};



