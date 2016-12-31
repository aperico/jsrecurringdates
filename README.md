# jsrecurringdates
Javascript facilities to extract recurring dates

## Examples
Here are the functions created for the functions mostly needed. See code for some others.

### getDatesMonthlyByWeekDay
```javascript
var jsRd = new JSRecurringDates();
var aDateBegin = new Date(2016,11,31); //-> 31 December 2016
var aDateEnd = new Date(2017,11,31); // -> 21 December 2017
var recurringDates = jsRd.getDatesMonthlyByWeekDay(1, aDateBegin, aDateEnd);
consoles.logs(recurringDates);
```
**result:**
```javascript
Array[12]
*0: Thu Dec 01 2016 00:00:00 GMT+0100 (CET)
*1: Thu Jan 05 2017 00:00:00 GMT+0100 (CET)
*2: Thu Feb 02 2017 00:00:00 GMT+0100 (CET)
*3: Thu Mar 02 2017 00:00:00 GMT+0100 (CET)
*4: Thu Apr 06 2017 00:00:00 GMT+0200 (CEST)
*5: Thu May 04 2017 00:00:00 GMT+0200 (CEST)
*6: Thu Jun 01 2017 00:00:00 GMT+0200 (CEST)
*7: Thu Jul 06 2017 00:00:00 GMT+0200 (CEST)
*8: Thu Aug 03 2017 00:00:00 GMT+0200 (CEST)
*9: Thu Sep 07 2017 00:00:00 GMT+0200 (CEST)
*10: Thu Oct 05 2017 00:00:00 GMT+0200 (CEST)
*11: Thu Nov 02 2017 00:00:00 GMT+0100 (CET)
```

### getDatesMonthly
```javascript
var jsRd = new JSRecurringDates();
var aDateBegin = new Date(2016,11,31); //-> 31 December 2016
var aDateEnd = new Date(2017,11,31); // -> 21 December 2017
var recurringDates = jsRd.getDatesMonthly(1, aDateBegin, aDateEnd);
console.log(recurringDates);
```

**result:**
```javascript
Array[13]
*0: Sat Dec 31 2016 00:00:00 GMT+0100 (CET)
*1: Tue Jan 31 2017 00:00:00 GMT+0100 (CET)
*2: Tue Feb 28 2017 00:00:00 GMT+0100 (CET)
*3: Fri Mar 31 2017 00:00:00 GMT+0200 (CEST)
*4: Sun Apr 30 2017 00:00:00 GMT+0200 (CEST)
*5: Wed May 31 2017 00:00:00 GMT+0200 (CEST)
*6: Fri Jun 30 2017 00:00:00 GMT+0200 (CEST)
*7: Mon Jul 31 2017 00:00:00 GMT+0200 (CEST)
*8: Thu Aug 31 2017 00:00:00 GMT+0200 (CEST)
*9: Sat Sep 30 2017 00:00:00 GMT+0200 (CEST)
*10: Tue Oct 31 2017 00:00:00 GMT+0100 (CET)
*11: Thu Nov 30 2017 00:00:00 GMT+0100 (CET)
*12: Sun Dec 31 2017 00:00:00 GMT+0100 (CET)
```
