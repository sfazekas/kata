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
