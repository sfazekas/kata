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
			utils.response("Your Times are incorrect - your START Time " + timeIn + " is greater than your FINISHED time " + timeOut)
			return false;
		}
		

	}
};
