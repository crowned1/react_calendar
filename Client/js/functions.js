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
    return n;
  },
  build_calendar: function(date){
    //set the date to the 1st
    var param = date;
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
      calendar.push({day_num: j, date: new Date(param.setDate(j))});
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
    for(var i = 0; i <= 23; i++){
      hour = i+":"+"00";
      day.push({hour: hour, date: date.toDateString()});
    }
    return {
      Current: current,
      Hours: day,
    }
  },
  time_to_length: function(start, end){
    start_time = start.split(":");
    start_hour = parseInt(start_time[0]);
    start_minutes = parseInt(start_time[1]);
    measure_top = (((start_hour*60)+start_minutes)/60)*(100/24);

    end_time = end.split(":");
    end_hour = parseInt(end_time[0]);
    end_minutes = parseInt(end_time[1]);
    height = ((((end_hour-start_hour)*60)+(end_minutes-start_minutes))/60)*(100/24);

    return {
       top: measure_top,
       height: height
    }
  },
  collision_detection: function(current, new_event){
    for(var i = 0; i<current.length; i++){
      current_height = parseInt(current[i].height.substring(0, current[i].height.length-1));
      current_top = parseInt(current[i].top.substring(0, current[i].top.length-1));
      current_bottom = current_top+current_height;
      new_bottom = new_event.top + new_event.height;
      if(new_event.top >= current_top && new_event.top < current_bottom){
        return false;
      }else if(new_bottom < current_top){
        return false;
      }
    }
    return true;
  },
  place_event: function(event1, event2, event3, event4, event5, style, data){
    var event_rows = [
      event1,
      event2,
      event3,
      event4,
      event5,
    ];
    if(event_rows[0].length == 0){
      events = event_rows[0];
      events.push({name: data.type, color: data.color, height: style.height+"%", top: style.top+"%"});
      return {events: events, row_num: 1};
    }else{
      row_num = 0;
      for(var z = 0; z < event_rows.length; z++){
        row_num++;
        if(event_rows[z].length == 0){
          events = event_rows[z];
          events.push({name: data.type, color: data.color, height: style.height+"%", top: style.top+"%"});
          return {events: events, row_num: row_num};
        }else if(this.collision_detection(event_rows[z], style)){
          console.log(events);
          events = event_rows[z];
          events.push({name: data.type, color: data.color, height: style.height+"%", top: style.top+"%"});
          return {events: events, row_num: row_num};
        }
      }
    }
  },
  fill_events_day: function(arr_events){
    //variable being declared for the first time, no other variables with the same name anywhere else in code.
    var _events1 = [];
    var _events2 = [];
    var _events3 = [];
    var _events4 = [];
    var _events5 = [];
    //checking to make sure its declared correctly
    console.log(_events1);
    //its already got an infinite loop of objects in it??
    for(var x = 0; x < arr_events.length; x++){
      style = Functions.time_to_length(arr_events[x].start_hour, arr_events[x].end_hour);
      results = Functions.place_event(_events1, _events2, _events3, _events4, _events5, style, arr_events[x]);
      if(results.row_num == 1){
        _events1.push({events_1: results.events});
      }else if(results.row_num == 2){
        _events2.push({events_2: results.events});
      }else if(results.row_num == 3){
        _events3.push({events_3: results.events});
      }else if(results.row_num == 4){
        _events4.push({events_4: results.events});
      }else if(results.row_num == 5){
        _events5.push({events_5: results.events});
      }
    }
    return {event1: _events1, event2: _events2, event3: _events3, event4: _events4, event5: _events5};
  },
  fill_events_month: function(arr_events){

  }
}
