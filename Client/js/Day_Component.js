var Hour = require('./Hour.js');
var Functions = require('./functions.js');
var Modal_Event_Form = require('./Modal_Event_Form.js');

module.exports = React.createClass({
  getInitialState: function(){
    date = new Date();
    day = Functions.build_day(date);
    return {
      current_day: day.Current,
      day: day.Hours,
      startDate: moment()
    }
  },
  dateChange: function(date){
    day = Functions.build_day(date);
    this.setState({
      current_day: day.Current,
      day: day.Hours
    })
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
  render: function(){
    return (
      <div id='calendar'>
        <Modal_Event_Form />
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
            return (
              <Hour key={i} hour={hour.hour}></Hour>
            );
        })}
        </div>
      </div>
    )
  }
})
