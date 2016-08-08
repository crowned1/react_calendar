module.exports = {
  get_month: function(){
    var d = new Date();
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    var n = month[d.getMonth()];
    console.log(n);
    return n;
  },
  build_calendar: function(date){
    //set the date to the 1st
    date.setDate(1);
    //turn the date into a string
    calendar_start = date.toString();
    //explode string into array
    date_array = calendar_start.split(" ");
    calendar = [];
    var empty_days;
    //find number of empty days
    if(date_array[0] == "Sun"){
      empty_days = 0;
    }else if(date_array[0] == "Mon"){
      empty_days = 1;
    }else if(date_array[0] == "Tue"){
      empty_days = 2;
    }else if(date_array[0] == "Wed"){
      empty_days = 3;
    }else if(date_array[0] == "Thu"){
      empty_days = 4;
    }else if(date_array[0] == "Fri"){
      empty_days = 5;
    }else if(date_array[0] == "Sat"){
      empty_days = 6;
    }
    //add empty days to calendar
    for(var i=0;i<empty_days;i++){
      calendar.push({day_num: 0});
    }
    var days_in_month;
    var calendar_month;
    //get number of days in month & name of month
    if(date_array[1] == "Jan"){
      days_in_month = 31;
      calendar_month = "January";
    }else if(date_array[1] == "Feb"){
      year = parseInt(date_array[3]);
      var leapyear = false;
      if(year%4 == 0){
        if(year%100 == 0){
          if(year%400 == 0){
            leapyear = true;
          }
        }
      }
      if(leapyear == true){
        days_in_month = 29;
      }else{
        days_in_month = 28;
      }
      calendar_month = "February";
    }else if(date_array[1] == "Mar"){
      days_in_month = 31;
      calendar_month = "March";
    }else if(date_array[1] == "Apr"){
      days_in_month = 30;
      calendar_month = "April";
    }else if(date_array[1] == "May"){
      days_in_month = 31;
      calendar_month = "May";
    }else if(date_array[1] == "Jun"){
      days_in_month = 30;
      calendar_month = "June";
    }else if(date_array[1] == "Jul"){
      days_in_month = 31;
      calendar_month = "July";
    }else if(date_array[1] == "Aug"){
      days_in_month = 31;
      calendar_month = "August";
    }else if(date_array[1] == "Sep"){
      days_in_month = 30;
      calendar_month = "September";
    }else if(date_array[1] == "Oct"){
      days_in_month = 31;
      calendar_month = "October";
    }else if(date_array[1] == "Nov"){
      days_in_month = 30;
      calendar_month = "November";
    }else if(date_array[1] == "Dec"){
      days_in_month = 31;
      calendar_month = "December";
    }
    //add days to calendar
    for(var j = 1; j<=days_in_month; j++){
      date.setDate(j);
      calendar.push({day_num: j, date: date});
    }
    //add remaining empty days to finish calendar
    calendar_length = calendar.length;
    for(var z = 0; z < (35-calendar_length); z++){
      calendar.push({day_num: 0});
    }
    return {
      Name: calendar_month,
      Days: calendar
    }
  },
  build_day: function(date){
    var day_number = date.getDate();
    var weekday = new Array(7);
    weekday[0]=  "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    var day_name = weekday[date.getDay()];
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    var day_month = month[date.getMonth()];
    var current;
    if(day_number == 1){
      current = day_name+" "+day_month+" "+day_number+"st";
    }else if(day_number == 2){
      current = day_name+" "+day_month+" "+day_number+"nd";
    }else if(day_number == 3){
      current = day_name+" "+day_month+" "+day_number+"rd";
    }else{
      current = day_name+" "+day_month+" "+day_number+"th";
    }

    var day = [];
    for(var i = 1; i <= 24; i++){
      hour = i+":"+"00";
      day.push({hour: hour});
    }
    return {
      Current: current,
      Hours: day
    }
  }

}
