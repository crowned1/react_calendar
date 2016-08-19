module.exports = {

  //returns the month as a string
  get_month: function(){
    var d = new Date();
    //assign each month as string to corresponding number
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
    var n = month[d.getMonth()]; //assign month string to n from dates month number
    return n;
  },

  //builds a calender array
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
      //check if its a leap year
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

  //build a day filled with hours
  build_day: function(date){
    var day_number = date.getDate();//convert moment to date
    //assign week name strings to weekday array
    var weekday = new Array(7);
    weekday[0]=  "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    var day_name = weekday[date.getDay()];//compare day to weekday array to get the weekday string
    //assign month name strings to month array
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
    var day_month = month[date.getMonth()];//compare month to month array to get the month string
    var current;

    //create a string for the name of the day (ie: 1st 2nd 3rd etc)
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
    //create hours for array looping 24 times
    for(var i = 0; i <= 23; i++){
      hour = i+":"+"00";
      day.push({hour: hour, date: date});
    }
    return {
      Current: current,
      Hours: day,
    }
  },

  //convert two hours into style properties
  time_to_length: function(start, end){
    //break apart the string example: 8:00 to [8, 00]
    start_time = start.split(":");
    //convert strings to ints
    start_hour = parseInt(start_time[0]);
    start_minutes = parseInt(start_time[1]);
    //converts the two ints into a measurement for top margin.
    measure_top = (((start_hour*60)+start_minutes)/60)*(100/24);// ((convert hour to minutes) add minutes)/divide by 60 to get hours(multiply by 100percent/24hours), this gives you the percent from the top that this event should be based on the 24 hours in the day
    end_time = end.split(":");//break apart string
    //convert strings to ints
    end_hour = parseInt(end_time[0]);
    end_minutes = parseInt(end_time[1]);
    //convert two ints into the height of the event in realtion to the 24 hour day
    height = ((((end_hour-start_hour)*60)+(end_minutes-start_minutes))/60)*(100/24);
    return {
       top: measure_top,
       height: height
    }
  },

  //check if there is a div in the way of the projected event placement
  collision_detection: function(current, new_event){
    //loops through each of the current events on the day
    for(var i = 0; i<current.length; i++){
      current_height = parseInt(current[i].height.substring(0, current[i].height.length-1));//gets the current height of event
      current_top = parseInt(current[i].top.substring(0, current[i].top.length-1));//gets the current top margin of event
      current_bottom = current_top+current_height;//gets the current bottom of div event
      new_bottom = new_event.top + new_event.height;// gets the new events bottom of div
      //checks if the new divs top runs inbetween the top and bottom of the current div, if so there is a collision
      if(new_event.top >= current_top && new_event.top < current_bottom){
        return false;
      //checks if the bottom of the new div is below the top of the current div, if so there is a collision
      }else if(new_bottom < current_top){
        return false;
      }
    }
    //no collisions
    return true;
  },

  //function decides which row the new event will be placed in
  place_event: function(event1, event2, event3, event4, event5, style, data){
    var event_rows = [
      event1,
      event2,
      event3,
      event4,
      event5,
    ];
    //if the first row of the day has no events, just place it there
    if(event_rows[0].length == 0){
      events = event_rows[0];
      events.push({name: data.type, color: data.color, height: style.height+"%", top: style.top+"%"});
      return {events: events, row_num: 1};
    }else{
      row_num = 0;
      //loop through the rows and find a place for the new event
      for(var z = 0; z < event_rows.length; z++){
        row_num++;
        //if there is nothing in a row, just place it there
        if(event_rows[z].length == 0){
          events = event_rows[z];
          events.push({name: data.type, color: data.color, height: style.height+"%", top: style.top+"%"});
          return {events: events, row_num: row_num};
        //if there is no collisions for where the new div wants to go, just place it there.
        }else if(this.collision_detection(event_rows[z], style)){
          console.log(events);
          events = event_rows[z];
          events.push({name: data.type, color: data.color, height: style.height+"%", top: style.top+"%"});
          return {events: events, row_num: row_num};
        }
        //if it didnt find an empty slot, and had a collision, try the next row-- (if all the rows are filled, the event will not be placed)
      }
    }
  },

  //run through and add events to the initial state arrays.
  fill_events_day: function(arr_events){
    var _events1 = [];
    var _events2 = [];
    var _events3 = [];
    var _events4 = [];
    var _events5 = [];
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
  }
}
