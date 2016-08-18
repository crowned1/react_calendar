// IMPORTS
var Hour = require('./Hour.js');
var Functions = require('./functions.js');
var Stretch_Event = require('./Stretch_Event.js');

//make available with node exports
module.exports = React.createClass({

  //called when component is created
  getInitialState: function(){
    date = new Date();
    //use imported functions.js to build a day filled with hours
    day = Functions.build_day(date);
    return {
      current_day: day.Current,
      day: day.Hours,
      startDate: moment(),
      events_1: [],
      events_2: [],
      events_3: [],
      events_4: [],
      events_5: []
    }
  },

  //called after the component rendered
  componentDidMount: function(){

    //adds events to the day
    update_events = function(data, state){
      //transform the start and end string into a style for the event div
      style = Functions.time_to_length(data.start_hour, data.end_hour);
      //decide where the events should be placed to avoid collisions
      results = Functions.place_event(state.state.events_1, state.state.events_2, state.state.events_3, state.state.events_4, state.state.events_5, style, data);
      //place the div in the correct row, assigned in the place event function
      if(results.row_num == 1){
        state.setState({events_1 :results.events});
      }else if(results.row_num == 2){
        state.setState({events_2 :results.events});
      }else if(results.row_num == 3){
        state.setState({events_3 :results.events});
      }else if(results.row_num == 4){
        state.setState({events_4 :results.events});
      }else if(results.row_num == 5){
        state.setState({events_5 :results.events});
      }
    }
    populate_events = function(callback, state){
      //look through each event from the server response
      for(var k = 0; k<callback.length; k++){
        //add the event to the day
        update_events(callback[k], state);
      }
    };
    get_response = function(callback, state, request_date){
      //request the events from the server
      axios.post('/events/day', {date: request_date})
        .then(function (res) {
          callback(res.data, state);
      });
    };
    get_response(populate_events, this, date);
  },

  dateChange: function(date){
    day = Functions.build_day(date);//build new day and populate it with hours
    this.setState({
      current_day: day.Current,
      day: day.Hours,
      events_1: [],
      events_2: [],
      events_3: [],
      events_4: [],
      events_5: []
    })

    //fill day with events, see componentdidmount
    update_events = function(data, state){
      style = Functions.time_to_length(data.start_hour, data.end_hour);
      results = Functions.place_event(state.state.events_1, state.state.events_2, state.state.events_3, state.state.events_4, state.state.events_5, style, data);
      console.log(results);
      if(results.row_num == 1){
        state.setState({events_1 :results.events});
      }else if(results.row_num == 2){
        state.setState({events_2 :results.events});
      }else if(results.row_num == 3){
        state.setState({events_3 :results.events});
      }else if(results.row_num == 4){
        state.setState({events_4 :results.events});
      }else if(results.row_num == 5){
        state.setState({events_5 :results.events});
      }
    }
    populate_events = function(callback, state){
      for(var k = 0; k<callback.length; k++){
        update_events(callback[k], state);
      }
    };
    get_response = function(callback, state, request_date){
      axios.post('/events/day', {date: request_date})
        .then(function (res) {
          callback(res.data, state);
      });
    };
    get_response(populate_events, this, date);
  },

  //on calendar date change with datepicker
  handleChange: function(date) {
    this.dateChange(date.toDate());
    this.setState({
      startDate: date
    });
  },

  //reroute to month view
  redirect_month: function(){
    hashHistory.push('/month_view');
  },

  //reroute to day view (since it is already day view, consider disabling this?)
  redirect_day: function(){
    hashHistory.push('/day_view');
  },

  //load previous day
  previous_day: function(){
    prev_day = this.state.startDate.subtract(1, 'day');//use moment object to subtract a day
    this.setState({ startDate: prev_day});
    this.dateChange(prev_day.toDate());//convert moment object into date object
  },

  //load next day
  next_day: function(){
    next_day = this.state.startDate.add(1, 'day');//use moment object to add a day
    this.setState({ startDate: next_day});
    this.dateChange(next_day.toDate());//convert moment obj to date object
  },

  //save event to database, and add the event to the view
  saveEvent: function(data){

    //save event to db
    axios.post('/event', {data})
      .then(function (response) {
        //should get an object back that says success
        console.log(response);
    });

    //see componentdidmount
    style = Functions.time_to_length(data.start_hour, data.end_hour);
    results = Functions.place_event(this.state.events_1, this.state.events_2, this.state.events_3, this.state.events_4, this.state.events_5, style, data);
    if(results.row_num == 1){
      this.setState({events_1 :results.events});
    }else if(results.row_num == 2){
      this.setState({events_2 :results.events});
    }else if(results.row_num == 3){
      this.setState({events_3 :results.events});
    }else if(results.row_num == 4){
      this.setState({events_4 :results.events});
    }else if(results.row_num == 5){
      this.setState({events_5 :results.events});
    }
  },

  //render the day component
  render: function(){
    return (
      <div id='calendar'>
        {/* Navigation */}
        <div className='navigation_container'>
          <div className='col-xs-4'>
              <div className='datepicker_container'>
                <label>Date</label>
                <DatePicker selected={this.state.startDate} onChange={this.handleChange} />{/* Datepicker import npm */}
              </div>
              <ul>
                <li onClick={this.redirect_month}>Month</li> {/* Route to month view */}
                <li onClick={this.redirect_day}>Day</li>{/* Route to day view */}
                <li>Map</li>{/* will route to map component */}
                <li>Summary</li>{/* will route to summary component */}
              </ul>
          </div>
          <div className='col-xs-4' id='calendar_month'>
            <img onClick={this.previous_day} className='arrow-left' src='./css/arrow-left.svg' />
            <span id='current_day'>{this.state.current_day}</span>
            <img onClick={this.next_day} className='arrow-right' src='./css/arrow-left.svg' />
          </div>
          <div className='col-xs-4'>{/* Using bootstrap 12 column system to keep css organized */}
          </div>
        </div>
        {/* End of Navigation */}

        {/* Day */}
        <div className='day_view_container'>
          {/* Look through each hour in Day array */}
          {this.state.day.map(function(hour, i){
            {/* If the hour is 0:00 then it will not be displayed (this is because it is positioned at the edge of the top of the div, and the text would be cut off) */}
            if(hour.hour == "0:00"){
              return (
                <Hour hour_zero="true" saveEvent={this.saveEvent} key={i} current={hour.date} hour={hour.hour}></Hour>
              );
            {/* Create hour component will props passed to it */}
            }else{
              return (
                <Hour saveEvent={this.saveEvent} key={i} current={hour.date} hour={hour.hour}></Hour>
              );
            }
          }, this)}

          {/* Overlay event div, displayed the events on top of the hours, because they need to strech across several hours */}
          <div className='events_container'>
            <div className='col-xs-2'>{/* This is where the hour counter is displayed, empty to avoid overlapping with the text */}
            </div>
            {/* Each of these rows will display events as overlays, with variable css set by place event function */}
            <div className='col-xs-2 event_row'>
              <div id="event_1">
                {this.state.events_1.map(function(event, i){
                  return (
                    <Stretch_Event type={event.name} color={event.color} height={event.height} top={event.top} key={i} ></Stretch_Event>
                  );
                })}
              </div>
            </div>
            <div className='col-xs-2 event_row'>
              <div id="event_2">
                {this.state.events_2.map(function(event, i){
                  return (
                    <Stretch_Event type={event.name} color={event.color} height={event.height} top={event.top} key={i} ></Stretch_Event>
                  );
                })}
              </div>
            </div>
            <div className='col-xs-2 event_row'>
              <div id="event_3">
                {this.state.events_3.map(function(event, i){
                  return (
                    <Stretch_Event type={event.name} color={event.color} height={event.height} top={event.top} key={i} ></Stretch_Event>
                  );
                })}
              </div>
            </div>
            <div className='col-xs-2 event_row'>
              <div id="event_4">
                {this.state.events_4.map(function(event, i){
                  return (
                    <Stretch_Event type={event.name} color={event.color} height={event.height} top={event.top} key={i} ></Stretch_Event>
                  );
                })}
              </div>
            </div>
            <div className='col-xs-2 event_row'>
              <div id="event_5">
                {this.state.events_5.map(function(event, i){
                  return (
                    <Stretch_Event type={event.name} color={event.color} height={event.height} top={event.top} key={i} ></Stretch_Event>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
})
