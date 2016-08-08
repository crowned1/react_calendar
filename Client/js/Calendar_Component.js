var Day = require('./Day.js');
var Functions = require('./functions.js');
var Modal_Event_Form = require('./Modal_Event_Form.js');

module.exports = React.createClass({
  getInitialState: function(){
    date = new Date();
    calendar = Functions.build_calendar(date);
    return {
      Days: calendar.Days,
      Name: calendar.Name,
      startDate: moment()
    }
  },
  handleChange: function(date) {
    this.calendarChange(date.toDate());
    this.setState({
      startDate: date
    });
  },
  calendarChange: function(date){
    calendar = Functions.build_calendar(date);
    this.setState({
      Days: calendar.Days,
      Name: calendar.Name
    })
  },
  saveEvent: function(data){
    console.log(data);
  },
  redirect_month: function(){
    hashHistory.push('/month_view');
  },
  redirect_day: function(){
    hashHistory.push('/day_view');
  },
  previous_month: function(){
    prev_month = this.state.startDate.subtract(1, 'M');
    this.setState({ startDate: prev_month});
    this.calendarChange(prev_month.toDate());
  },
  next_month: function(){
    next_month = this.state.startDate.add(1, 'M');
    this.setState({ startDate: next_month});
    this.calendarChange(next_month.toDate());
  },
  render: function(){
    return (
      <div id='calendar'>
        <Modal_Event_Form saveEvent={this.saveEvent} />
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
            <img onClick={this.previous_month} className='arrow-left' src='./css/arrow-left.svg' />
            <span>{this.state.Name}</span>
            <img onClick={this.next_month} className='arrow-right' src='./css/arrow-left.svg' />
          </div>
          <div className='col-xs-4'>
          </div>
        </div>
        <div className='calendar_container'>
          {this.state.Days.map(function(day, i){
              if(day.day_num == 0){
                return (
                  <Day  key={i} day_num={day.day_num} display="false"></Day>
                );
              }else{
                return (
                  <Day identity={i} key={i} day_num={day.day_num} date={day.date} ></Day>
                );
              }
          })}
        </div>
      </div>
    )
  }
})
