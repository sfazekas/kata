var isDateSpy;

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
		describe("'response', where when called", function () {
			
			beforeEach(function () {
				responseSpy = spyOn(utils, "response").and.callThrough();
			});
			
			describe("will accept an output (string) parameter", function () {
				var getElementByIdSpy, output = "This is my response text";
				
				beforeEach(function () {
					getElementByIdSpy = spyOn(document, "getElementById").and.callThrough();
					utils.response(output)
				});

				it("should find id = 'response' in the DOM", function () {
					expect(getElementByIdSpy).toHaveBeenCalledWith('response')
				});
				
				it("should update the 'output' to the DOM", function () {
					var responseObj = document.getElementById('response');
					expect(responseObj.innerHTML).toEqual(output)
				});
				
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
			
			describe("accepts three 'date/time' parameters", function () {
				beforeEach(function () {
					hoursWorkedSpy = spyOn(babySitter, "hoursWorked");
				});
			
				it("should recieve: timeIn, timeOut, bedTime", function () {
					babySitter.hoursWorked(timeIn, timeOut, bedTime)
					expect(hoursWorkedSpy).toHaveBeenCalledWith(timeIn, timeOut, bedTime);
				});
			});
			
			describe("when the 'date/time' based parameters are accepted", function () {
				beforeEach(function () {
					hoursWorkedSpy = spyOn(babySitter, "hoursWorked").and.callThrough();
					isDateSpy = spyOn(utils, "isDate").and.callThrough();
				});
				
				describe("will check each parameter for date validity", function () {
					describe("when timeIn and timeOut are provided", function () {
						it("should loop through the validity check 2 times", function () {
							babySitter.hoursWorked('2018-01-25 17:01:01','2018-01-25 17:01:01');
							expect(isDateSpy).toHaveBeenCalledTimes(2)
						});
					});

					describe("when timeIn and timeOut are provided, while bedTime is '' (empty)", function () {
						it("should loop through the validity check 3 times", function () {
							babySitter.hoursWorked('2018-01-25 17:01:01','2018-01-25 17:01:01','');
							expect(isDateSpy).toHaveBeenCalledTimes(3)
						});
					});

					describe("when timeIn, timeOut, and bedTime are provided", function () {
						it("should loop through the validity check 3 times", function () {
							babySitter.hoursWorked('2018-01-25 17:01:01','2018-01-25 17:01:01','2018-01-25 17:01:01');
							expect(isDateSpy).toHaveBeenCalledTimes(3)
						});
					});

				});
				
				describe("will check to make sure 'timeIn' is not after 'timeOut'", function () {
					var responseSpy, responseText, IN, OUT;

					beforeEach(function () {
						responseSpy = spyOn(utils, "response");
					});
						
					describe("when 'timeIn' greater than 'timeOut'", function () {
						IN = '2018-01-26 17:01:01'; 
						OUT = '2018-01-26 03:01:01';
						responseText = "Your Times are incorrect - your START Time " + IN + " is greater than your FINISHED time " + OUT;

						it("should send a message to the util.reponse method", function () {
							babySitter.hoursWorked(IN, OUT);
							expect(responseSpy).toHaveBeenCalledWith(responseText)
						});
					});

					describe("when 'timeIn' is less than 'timeOut'", function () {
						var START = '2018-01-25 17:01:01'; 
								END = '2018-01-26 03:01:01';
						
						it("should NOT send a message to the util.reponse method", function () {
							babySitter.hoursWorked(START, END);
							expect(responseSpy).not.toHaveBeenCalled();
						});
					});
					
				});
				
			});
			
		});

	
	});
});
