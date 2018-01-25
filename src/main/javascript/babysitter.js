var utils = {
	"isDate" : function (dateVal) {
    dateTest = new Date(dateVal);
		return (dateTest instanceof Date && !isNaN(dateTest.valueOf()))
	}
};

var babySitter = {
	"hoursWorked" : function (timeIn, timeOut, bedTime) {
		var args = this.arguments;
		for (x = 0; x <= args.length; x++){
			if (!utils.isDate(args[x])) {alert("The time entered is not a date: " + args[x]); return false;}
		}
		
	}
};
