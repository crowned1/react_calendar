// IMPORTS
var Day = require('./Day.js');
var Functions = require('./functions.js');

// Make available via node exports
module.exports = React.createClass({

  //function called as soon as parent is done creating the component
  getInitialState: function(){
    date = new Date();
    //build out calendar with function from functions.js file passing in current date
    calendar = Functions.build_calendar(date);
    //set initial state of calendar object with built calendar
    return {
      Days: calendar.Days,
      Name: calendar.Name,
      //use moment.js to create a moment object
      startDate: moment()
    }
  },

  //function called right before the component is rendered
  componentWillMount: function(){
    var results;
    //set days function will add the events to the day based on day of the month
    set_days = function(callback, obj, request_date){
      //request events from calendar using date param
      axios.post('/events/calendar', {date: request_date}).then(function (res) {
        results = res.data;//events array
        current = obj.state.Days;//obj is component (this)
        //look through all days
        for(var i = 0; i < current.length; i++){
          var temp = [];
          //look through all events
          for(var u = 0; u < results.length; u++){
            //if the day of the month for an event matches the day of the month for a day, push to temp array
            if(results[u].start_date.substring(8,10) == current[i].day_num){
              temp.push(results[u]);
            }
          }
          //set temp array as new key in the day object
          current[i].events = temp;
        }
        //send the modified state.Days object into callback
        callback(current, obj);
      });
    }
    callback_function = function(callback, obj){
      //set the new state of Days to the modified state.Days object
        obj.setState({Days: callback});
    }

    set_days(callback_function, this, date);
  },

  //calendar date change function
  handleChange: function(date) {
   this.calendarChange(date.toDate()); //convert the moment object into a date object
   this.setState({
     startDate: date
   });
  },

  //builds out new calendar and populates it with events
  calendarChange: function(date){
    calendar = Functions.build_calendar(date);
    this.setState({
      Days: calendar.Days,
      Name: calendar.Name
    })

    //see component will mount for comments
    var results;
    set_days = function(callback, obj, request_date){
      axios.post('/events/calendar', {date: request_date}).then(function (res) {
        results = res.data;
        current = obj.state.Days;
        for(var i = 0; i < current.length; i++){
          var temp = [];
          for(var u = 0; u < results.length; u++){
            if(results[u].start_date.substring(8,10) == current[i].day_num){
              temp.push(results[u]);
            }
          }
          current[i].events = temp;
        }
        callback(current, obj);
      });
    }
    callback_function = function(callback, obj){
      obj.setState({Days: callback});
    }
    set_days(callback_function, this, date);
  },

  //Reroute to month view
  redirect_month: function(){
    hashHistory.push('/month_view');//change url and save it to hashHistory
  },

  //Reroute to day view
  redirect_day: function(){
    hashHistory.push('/day_view');
  },

  //load previous month calendar
  previous_month: function(){
    prev_month = this.state.startDate.subtract(1, 'M');//use moment object to subtract a month
    this.setState({ startDate: prev_month});
    this.calendarChange(prev_month.toDate()); //convert the moment to date object
  },

  //load next month calendar
  next_month: function(){
    next_month = this.state.startDate.add(1, 'M');//use moment object to add month
    this.setState({ startDate: next_month});
    this.calendarChange(next_month.toDate());//convert moment into a date object
  },

  //called after component will mount, renders view for user
  render: function(){
    return (
      <div id='calendar'>

        {/* NAVIGATION  */}
        <div className='navigation_container'>
          {/* Page selector */}
          <div className='col-xs-4'>
              <div className='datepicker_container'>
                <label className='date_label'>Date: </label>
                <DatePicker selected={this.state.startDate} onChange={this.handleChange} />{/* Uses imported datePicker npm */}
              </div>
              <ul>
                <li onClick={this.redirect_month}>Month</li>{/* routes to month view */}
                <li onClick={this.redirect_day}>Day</li>{/* routes to day view */}
                <li>Map</li>{/* will route to map component soon */}
                <li>Summary</li>{/* will route to summary page soon */}
              </ul>
          </div>

          {/* Calendar Navigation */}
          <div className='col-xs-4' id='calendar_month'>
            <img onClick={this.previous_month} className='arrow-left' src='./css/arrow-left.svg' />
            <span>{this.state.Name}</span>
            <img onClick={this.next_month} className='arrow-right' src='./css/arrow-left.svg' />
          </div>
          <div className='col-xs-4'>{/* Using bootstrap columns to keep navigation organized */}
          </div>
        </div>
        {/* End of Navigation */}

        {/* Calendar */}
        <div className='calendar_container'>
          {/* Look through each day */}
          {this.state.Days.map(function(day, i){
              {/* if the day is a non day of month, create it with display false */}
              if(day.day_num == 0){
                return (
                  <Day events={day.events} key={i} day_num={day.day_num} display="false"></Day>
                );
              {/* otherwise, create the day component passing along props */}
              }else{
                return (
                  <Day events={day.events} identity={i} key={i} day_num={day.day_num} date={day.date} ></Day>
                );
              }
          })}
        </div>
      </div>
    )
  }
})
