var utils = {
	"isDate" : function (dateVal) {
    var dateTest = new Date(dateVal);
		return (dateTest instanceof Date && !isNaN(dateTest.valueOf()))
	}
};

var babySitter = {
	"hoursWorked" : function (timeIn, timeOut, bedTime) {
		var args = arguments;
		for (x = 0; x < args.length; x++){
			if (!utils.isDate(args[x])) {
				console.log("The time entered is not a date: " + args[x]);
				return false;
			}
		}

	}
};
