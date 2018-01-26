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
			
			describe("when the 'date/time' based parameters are passed in", function () {
				beforeEach(function () {
					//hoursWorkedSpy = spyOn(babySitter, "hoursWorked").and.callThrough();
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
				
				describe("will call the 'payment' method with 'timeIn, timeOut, bedTime' parameters", function () {
					var paymentSpy, amount;
					
					beforeEach(function () {
						paymentSpy = spyOn(babySitter, "payment").and.returnValue(1);
						amount = babySitter.hoursWorked('2018-01-25 01:01:01','2018-01-25 03:01:01','');
					});

					it("should return the 'payment' amount", function () {
						 expect(amount).toEqual(1);
					});
				});

			});
			
		});


		describe("'retHours', where when called", function () {
			describe("accepts numeric 'time' parameters [laterTime, earlierTime]", function () {
				var laterTime, earlierTime, hours;
				
				describe("when the difference (laterTime - earlierTime))", function () {
					describe("is less than or equals zero (0)", function () {
						it("should return 0", function () {
							laterTime = 6;
							earlierTime = 7;
							hours = babySitter.retHours(laterTime, earlierTime);
							expect(hours).toEqual(0);
						});
					});
				
					describe("greater than 0", function () {
						it("should return the number of hours (based on number of seconds)", function () {
							laterTime = 1516935660000;
							earlierTime = 1516917661000;
							hours = babySitter.retHours(laterTime, earlierTime);
							expect(hours).toEqual(4);
						});
					});
				});
			});
		});

		describe("'payment', where when called", function () {
			var timeIn, timeOut, bedTime, amount;

			describe("accepts three 'date/time' parameters 'timeIn, timeOut, bedTime'", function () {

				describe("when 'bedTime' is AFTER 'timeIn' (and timeIn before midnight)", function () {
					beforeEach(function () {
						timeIn = '2018-01-25 17:01:01'
						bedTime = '2018-01-25 23:01:00'
						timeOut = '2018-01-26 03:01:01'
					});
					
					it("should calculate the payment to be '108'", function () {
						amount = babySitter.payment(timeIn, timeOut, bedTime);
						expect(amount).toEqual(108);
					});
				});

				describe("when 'bedTime' is AFTER 'timeIn' and 'timeOut' is before 'midnight'", function () {
					beforeEach(function () {
						timeIn = '2018-01-25 17:01:01'
						bedTime = '2018-01-25 22:01:00'
						timeOut = '2018-01-25 23:59:01'
					});
					
					it("should calculate the payment to be '56'", function () {
						amount = babySitter.payment(timeIn, timeOut, bedTime);
						expect(amount).toEqual(56);
					});
				});

				describe("when 'bedTime' is BEFORE 'timeIn'", function () {
					beforeEach(function () {
						timeIn = '2018-01-25 17:01:01'
						bedTime = '2018-01-25 17:00:00'
						timeOut = '2018-01-26 03:01:01'
					});
					
					it("should calculate the payment to be '96'", function () {
						amount = babySitter.payment(timeIn, timeOut, bedTime);
						expect(amount).toEqual(96);
					});
				});

				describe("when 'bedTime' is BEFORE 'timeIn' and 'timeOut' is BEFORE 'midNight'", function () {
					beforeEach(function () {
						timeIn = '2018-01-25 17:01:01'
						bedTime = '2018-01-25 22:01:00'
						timeOut = '2018-01-25 23:59:01'
					});
					
					it("should calculate the payment to be '56'", function () {
						amount = babySitter.payment(timeIn, timeOut, bedTime);
						expect(amount).toEqual(56);
					});
				});

				describe("when 'timeIn' is AFTER 'midNight'", function () {
					beforeEach(function () {
						timeIn = '2018-01-25 01:01:01'
						timeOut = '2018-01-25 03:01:00'
						bedTime = null
					});
					
					it("should calculate the payment to be '16'", function () {
						amount = babySitter.payment(timeIn, timeOut, bedTime);
						expect(amount).toEqual(16);
					});
				});

			});
			
		});
	});
});
