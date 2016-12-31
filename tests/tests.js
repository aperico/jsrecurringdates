
var jsRd = new JSRecurringDates();

QUnit.test( "TestAddDates", function( assert ) {
	var aDate = new Date(2016,12,30);
	var expectedDate = new Date(2016,12,31);
	aDate.addDays(1);
	assert.equal(aDate.getTime(),expectedDate.getTime());

	aDate = new Date(2016,12,30);
	expectedDate = new Date(2017,1,1);
	aDate.addDays(2)
	assert.equal(aDate.getTime(),expectedDate.getTime());

});

QUnit.test( "TestaddMonthsByDayEasy", function( assert ) {
	var aDate = new Date(2016,11,1);
	var expectedDate = new Date(2017,0,1);

	aDate.addMonthsByDay(1);
	assert.equal(aDate.getTime(), expectedDate.getTime());


	aDate = new Date(2016,11,1);
	expectedDate = new Date(2017,1,1);

	aDate.addMonthsByDay(2);
	assert.equal(aDate.getTime(), expectedDate.getTime());

});


QUnit.test( "TestaddMonthsByDayHard", function( assert ) {
	var aDate = new Date(2016,11,31);
	var expectedDate = new Date(2017,0,31);

	aDate.addMonthsByDay(1);
	assert.equal(aDate.getTime(), expectedDate.getTime());

	aDate = new Date(2016,11,31);
	expectedDate = new Date(2017,1,28);

	aDate.addMonthsByDay(2);
	assert.equal(aDate.getTime(), expectedDate.getTime());

});


QUnit.test( "TestgetDatesMonthly", function( assert ) {
	var aDateBegin = new Date(2016,11,31);
	var aDateEnd = new Date(2017,11,31);

	var dates = jsRd.getDatesMonthly(1, aDateBegin, aDateEnd);
	assert.equal(dates.length,13);

});


QUnit.test( "TestaddMonthsByWeekDay", function( assert ) {
	var aDateBegin = new Date(2016,11,31);
	var aDateEnd = new Date(2017,11,31);

	dates = jsRd.getDatesMonthlyByWeekDay(1, aDateBegin, aDateEnd);
	console.log(dates);
	console.log(dates.length);
	assert.equal(dates.length,13);

	aDateBegin = new Date(2016,11,01);
	aDateEnd = new Date(2017,11,01);

	dates = jsRd.getDatesMonthlyByWeekDay(1, aDateBegin, aDateEnd);
	assert.equal(dates.length,12);

});


QUnit.test( "getDaysInMonth", function( assert ) {
	var aDateBegin = new Date(2016,11,1);
	var aDateExpected = new Date(2016,11,16);

	aDateBegin.addDays(15);
	assert.equal(aDateBegin.getTime(), aDateExpected.getTime());

	aDateBegin = new Date(2016,11,1);
	assert.equal(aDateBegin.getDaysInMonth(), 31);


	aDateBegin = new Date(2016,10,1);
	assert.equal(aDateBegin.getDaysInMonth(), 30);

	assert.equal(aDateBegin.getTime(), new Date(2016,10,1).getTime());

});


QUnit.test( "addMonthsByDay", function( assert ) {
	var aDateBegin = new Date(2016,10,1);
	var aDateExpected = new Date(2016,11,1);

	aDateBegin.addMonthsByDay(1);

	assert.equal(aDateBegin.getTime(), aDateExpected.getTime());



	aDateBegin = new Date(2016,11,1);
	aDateExpected = new Date(2017,0,1);

	aDateBegin.addMonthsByDay(1);
	console.log(aDateBegin)
	console.log(aDateExpected)
	assert.equal(aDateBegin.getTime(), aDateExpected.getTime());


	aDateBegin = new Date(2016,11,31);
	aDateExpected = new Date(2017,0,31);
	aDateBegin.addMonthsByDay(1);
	assert.equal(aDateBegin.getTime(), aDateExpected.getTime());


	aDateBegin = new Date(2016,11,31);
	aDateExpected = new Date(2017,1,28);

	aDateBegin.addMonthsByDay(2);
	console.log(aDateBegin)
	console.log(aDateExpected)
	assert.equal(aDateBegin.getTime(), aDateExpected.getTime());



	aDateBegin = new Date(2016,11,31);
	aDateExpected = new Date(2017,1,28);

	aDateBegin.addMonthsByDay(2,31);
	assert.equal(aDateBegin.getTime(), aDateExpected.getTime());

	var rd = new JSRecurringDates();
	console.log(Date.prototype);

});
