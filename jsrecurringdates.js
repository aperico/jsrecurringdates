/***
 * @author armandoperico
 * @date  01.09.2016
 * @brief Facilities to create recurring dates
 * @version 0.1
 *
 * @todo Include better test cases
 *
 **/


var JSRecurringDates = (function(){

    /*---------- begin EXTENDING Date.protorype --------------- */

     /**
      * @brief It adds x days into a date object
      * @param daysToAdd number of days to be added
      * @return new Date object
      **/
     Date.prototype.addDays = function(daysToAdd){
         this.setDate(this.getDate() + daysToAdd);
     };

     /**
      * @brief It loads the total days available in the Month
      * @return values from 28-31 depending on the month of the year
      */
     Date.prototype.getDaysInMonth = function() {
         // storing current day of month from date
         var totalDaysInMonth = 0;
         var tmpDayOfMonth = this.getDate();
         var tmpDateMonth = this.getMonth();

         // reseting date
         this.setMonth(tmpDateMonth+1);
         this.setDate(0);

         // collecting total days in month
         totalDaysInMonth = this.getDate();

         // setting day of month back to original
         this.setDate(tmpDayOfMonth);
         this.setMonth(tmpDateMonth);

         return totalDaysInMonth;
     }

    /**
    * @brief It adds x months to a given date ensuring correct corner cases.
    * @param months2add numbers of months to be added to the current date
    * @param referenceDay day of the month to be used as reference in case current
    * month has less days than the next. It solves the problem of adding month to
    * Februrary 28, when the expected result should be a day > 28
    *
    * @example new Date(2016,11,31).addMonthsByDay(2) => Date(2017,1,28);
    * @example new Date(2016,11,31).addMonthsByDay(3,31) => Date(2017,2,31);
    */
    Date.prototype.addMonthsByDay = function(months2add, referenceDay){
         var day;
         var daysInMonth;

         day = referenceDay|this.getDate();

         this.setDate(1);
         this.setMonth(this.getMonth()+months2add);

         daysInMonth = this.getDaysInMonth();

         this.setDate( ((daysInMonth-1) < day)?daysInMonth:day );

     }

    /*---------- end EXTENDING Date.protorype --------------- */


    var JSRecurringDates = function(){

        var _strWeekDay = new Array(7);
        _strWeekDay[0] =  "Sunday";
        _strWeekDay[1] = "Monday";
        _strWeekDay[2] = "Tuesday";
        _strWeekDay[3] = "Wednesday";
        _strWeekDay[4] = "Thursday";
        _strWeekDay[5] = "Friday";
        _strWeekDay[6] = "Saturday";

        this.setWeekDaysStrValues = function(weekDays){
            for(var i=0; i < weekDays.length; ++i){
                _strWeekDay[i] = weekDays[i];
            }
        };

        this.getDayOfWeekStr = function(date){
            return _strWeekDay[date.getDay()];
        };

        /**
        * @brief Create a list of recurring dates on every "everyXMonths" keeping
        * day of the month fixed
        * @param everyXMonths a new date every # of months
        * @param dateBegin starting from this date
        * @param dateEnd beginning from this date
        */
        this.getDatesMonthly = function(everyXMonths, dateBegin, dateEnd){
            var dates = [];
            var tmpDate = dateBegin;
            var daysInMonthVal;
            var day = dateBegin.getDate();

            while(tmpDate <= dateEnd){
                dates.push(tmpDate);
                tmpDate.addMonthsByDay(everyXMonths, day);
            }

            return dates;
        };

        /**
        * @brief Create a list of recurring dates on every "everyXMonths" keeping
        * day of the week fixed
        * @param everyXMonths a new date every # of months
        * @param dateBegin starting from this date
        * @param dateEnd beginning from this date
        * @note It ensures that only 1 entry per month is created
        */
        this.getDatesMonthlyByWeekDay = function(every, dateBegin, dateEnd){

            var dates = [];
            var tmpDate = dateBegin;
            var daysInMonthVal;

            var weekIndex = (dateBegin.getDate() % 7)+1; // 1-4
            var weekDay = dateBegin.getDay(); // 0-6
            var day = dateBegin.getDate(); // 1-31
            var i=0;

            var prevYear = 0;
            var prevMonth = 0;
            while(tmpDate <= dateEnd){
                dates.push(tmpDate);

                prevYear = tmpDate.getFullYear();
                prevMonth = tmpDate.getMonth();

                i=0;
                while(
                        (i < ((4*7)*every)) ||
                        // ensuring that only 1 date per month is created
                        (tmpDate.getFullYear() == prevYear && tmpDate.getMonth() == prevMonth)
                ){
                    tmpDate.addDays(7);
                    i += 7;
                }
            }
            return dates;
        };

    };
    return JSRecurringDates;
})();
