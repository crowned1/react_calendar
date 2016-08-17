var Hour = require('./Hour.js');
var Functions = require('./functions.js');
var Stretch_Event = require('./Stretch_Event.js');

module.exports = React.createClass({
  getInitialState: function(){
    date = new Date();
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
  componentDidMount: function(){
    update_events = function(data, state){
      style = Functions.time_to_length(data.start_hour, data.end_hour);
      results = Functions.place_event(state.state.events_1, state.state.events_2, state.state.events_3, state.state.events_4, state.state.events_5, style, data);
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
        console.log('here');
        update_events(callback[k], state);
      }
    };
    get_response = function(callback, state, request_date){
      console.log(request_date);
      axios.post('/events/day', {date: request_date})
        .then(function (res) {
          console.log(res.data);
          callback(res.data, state);
      });
    };
  get_response(populate_events, this, date);
  },
  dateChange: function(date){
    day = Functions.build_day(date);
    this.setState({
      current_day: day.Current,
      day: day.Hours,
      events_1: [],
      events_2: [],
      events_3: [],
      events_4: [],
      events_5: []
    })
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
        console.log('here');
        update_events(callback[k], state);
      }
    };
    get_response = function(callback, state, request_date){
      console.log(request_date);
      axios.post('/events/day', {date: request_date})
        .then(function (res) {
          console.log(res.data);
          callback(res.data, state);
      });
    };
  get_response(populate_events, this, date);
  },
  handleChange: function(date) {
    this.dateChange(date.toDate());
    this.setState({
      startDate: date
    });
  },
  redirect_month: function(){
    hashHistory.push('/month_view');
  },
  redirect_day: function(){
    hashHistory.push('/day_view');
  },
  previous_day: function(){
    prev_day = this.state.startDate.subtract(1, 'day');
    this.setState({ startDate: prev_day});
    this.dateChange(prev_day.toDate());
  },
  next_day: function(){
    next_day = this.state.startDate.add(1, 'day');
    this.setState({ startDate: next_day});
    this.dateChange(next_day.toDate());
  },
  saveEvent: function(data){

    axios.post('/event', {data})
      .then(function (response) {
        console.log(response);
    });

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
  render: function(){
    return (
      <div id='calendar'>
        <div className='navigation_container'>
          <div className='col-xs-4'>
              <div className='datepicker_container'>
                <label>Date</label>
                <DatePicker selected={this.state.startDate} onChange={this.handleChange} />
              </div>
              <ul>
                <li onClick={this.redirect_month}>Month</li>
                <li onClick={this.redirect_day}>Day</li>
                <li>Map</li>
                <li>Summary</li>
              </ul>
          </div>
          <div className='col-xs-4' id='calendar_month'>
            <img onClick={this.previous_day} className='arrow-left' src='./css/arrow-left.svg' />
            <span id='current_day'>{this.state.current_day}</span>
            <img onClick={this.next_day} className='arrow-right' src='./css/arrow-left.svg' />
          </div>
          <div className='col-xs-4'>
          </div>
        </div>
        <div className='day_view_container'>
        {this.state.day.map(function(hour, i){
          if(hour.hour == "0:00"){
            return (
              <Hour hour_zero="true" saveEvent={this.saveEvent} key={i} current={hour.date} hour={hour.hour}></Hour>
            );
          }else{
            return (
              <Hour saveEvent={this.saveEvent} key={i} current={hour.date} hour={hour.hour}></Hour>
            );
          }
        }, this)}
          <div className='events_container'>
            <div className='col-xs-2'>
            </div>
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
