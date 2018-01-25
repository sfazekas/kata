describe("Given a namespace 'utils'", function () {
	it("should exist", function () {
		expect(utils).toBeDefined();
	});

	describe("should contain a method called", function () {
		describe("'isDate', where when called", function () {
			var returnVal;
			
			beforeEach(function () {
				isDateSpy = spyOn(utils, "isDate").and.callThrough();
			});

			it("should return true, when parameter is a valid date", function () {
				returnVal = utils.isDate('2018-01-25 17:01:01')
				expect(returnVal).toBe(true);
			});

			it("should return false, when parameter is NOT a valid date", function () {
				returnVal = utils.isDate('abcdef');
				expect(returnVal).toBe(false);
			});
		});
	});
});

describe("Given a namespace 'babySitter'", function () {

	it("should exist", function () {
		expect(babySitter).toBeDefined();
	});

	describe("should contain a method called", function () {
		
		describe("'hoursWorked', where when called", function () {
			
			var hoursWorkedSpy,
				timeIn = '2018-01-25 17:01:01', 
				timeOut = '2018-01-26 03:01:01', 
				bedTime = '2018-01-25 20:00:00';
			
			beforeEach(function () {
				hoursWorkedSpy = spyOn(babySitter, "hoursWorked");
			});
			
			it("should accept parameters: timeIn, timeOut, bedTime", function () {
				babySitter.hoursWorked(timeIn, timeOut, bedTime)
				expect(hoursWorkedSpy).toHaveBeenCalledWith(timeIn, timeOut, bedTime);
			});
		});

	
	});
});
