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
     };

     /***
     * @brief difference in days between 2 dates
     * @param compareWith date to compare difference with
     * @return int with ABSOLUTE numbers of days btween two dates
     */
     Date.prototype.getDaysDifference = function(compareWith){
         return Math.round(Math.abs((this.getTime() - compareWith.getTime())/(86400000))); // 86400000 = 24*60*60*1000
     };

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

        var _ONE_DAY_MILLISECS = 24*60*60*1000; // hours*minutes*seconds*milliseconds

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
        * @param dateEnd beginning from this date (mutex with maxOccurrences)
        * @param maxOccurrences maxOccurrences (mutex with dateEnd)
        */
        this.getDatesMonthly = function(everyXMonths, dateBegin, dateEnd, maxOccurrences=undefined){
            var dates = [];
            var tmpDate = dateBegin;
            var daysInMonthVal;
            var day = dateBegin.getDate();

            if(maxOccurrences != undefined && maxOccurrences > 0){
                var i=0;
                while(i < maxOccurrences){
                    dates.push(new Date(tmpDate));
                    tmpDate.addMonthsByDay(everyXMonths, day);
                    i++;
                }
            }else{
                while(tmpDate <= dateEnd){
                    dates.push(new Date(tmpDate));
                    tmpDate.addMonthsByDay(everyXMonths, day);
                }
            }

            return dates;
        };

        /**
        * @brief Create a list of recurring dates on every "everyXMonths" keeping
        * day of the week fixed
        * @param everyXMonths a new date every # of months
        * @param dateBegin starting from this date
        * @param dateEnd beginning from this date (mutex with maxOccurrences)
        * @param maxOccurrences (mutex with dateEnd)
        * @note It ensures that only 1 entry per month is created
        */
        this.getDatesMonthlyByWeekDay = function(every, dateBegin, dateEnd, maxOccurrences=undefined){

            var dates = [];
            var tmpDate = dateBegin;
            var daysInMonthVal;

            var weekIndex = (dateBegin.getDate() % 7)+1; // 1-4
            var weekDay = dateBegin.getDay(); // 0-6
            var day = dateBegin.getDate(); // 1-31
            var i=0;

            var prevYear = 0;
            var prevMonth = 0;

            var loop = false;
            var j=0;
            do{
                if(maxOccurrences != undefined && maxOccurrences > 0){
                    loop = j++ < maxOccurrences;
                }else{
                    loop = tmpDate <= dateEnd;
                }

                if(!loop) break;

                dates.push(new Date(tmpDate));

                prevYear = tmpDate.getFullYear();
                prevMonth = tmpDate.getMonth();

                i=0;
                while(
                        (i < (7*4*every)) ||
                        // ensuring that only 1 date per month is created
                        (tmpDate.getFullYear() == prevYear && tmpDate.getMonth() == prevMonth)
                ){
                    tmpDate.addDays(7);
                    i += 7;
                }
            }while(loop);

            return dates;
        };

        /**
        * @brief it creates a list of dates with recurring events every "x" weeks
        * @param every
        * @param dateBegin
        * @param dateEnd
        * @param weekDays {0:Sun, 1:Mon, ...} Dictionary with days of the week in which dates should repeat
        * @return dates list
        */
        this.getDatesByDays = function(every, dateBegin, dateEnd, maxOccurrences=undefined){
            var dates = [];
            var tmpDate = dateBegin;
            var found = false;
            var loop = false;
            var i=0;
            do{

                if(maxOccurrences != undefined && maxOccurrences > 0){
                    loop = ++i < maxOccurrences;
                }else{
                    loop = tmpDate < dateEnd;
                }

                dates.push(new Date(tmpDate));
                tmpDate.setDate(tmpDate.getDate()+every);

            }while(loop);
            return dates;
        };

        /**
        * @brief it creates a list of dates with recurring events every "x" weeks
        * @param every
        * @param dateBegin
        * @param dateEnd
        * @param weekDays [0:true, Sun, 1: false, ...] array with days of the week in which dates should repeat
        * @return dates list
        */
        this.getDatesByWeekDays = function(every, dateBegin, dateEnd, weekdays, maxOccurrences=undefined){
            var dates = [];
            var tmpDate = dateBegin;
            var found = false;
            var loop = false;
            var j = 0;
            do{
                if(maxOccurrences != undefined && maxOccurrences > 0){
                    loop = tmpDate <= dateEnd;
                }

                for(var i=0; i < 7; ++i){
                    if(maxOccurrences || tmpDate <= dateEnd){
                        if(weekdays[i]==true && tmpDate.getDay() in weekdays){

                            if(maxOccurrences){
                                loop = j++ < maxOccurrences;
                            }

                            if(!loop) break;
                            found = true;
                            dates.push(new Date(tmpDate));

                        }
                        tmpDate.setDate(tmpDate.getDate()+1);
                        //console.log(tmpDate + " in "+ tmpDate.getDay())
                    }else{
                        break;
                    }

                }
                if(found == true && every > 1){
                    tmpDate.setDate(tmpDate.getDate()+(every-1)*7);
                }

            }while(loop);

            return dates;
        };
    };


    return JSRecurringDates;
})();
