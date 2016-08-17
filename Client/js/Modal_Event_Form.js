module.exports = React.createClass({
  getInitialState: function() {
    return {
      name: "",
      start_date: '',
      end_date: '',
      end_hour: '',
      location: "",
      description: "",
      start_hour: ''
    };
  },
  componentWillReceiveProps: function(nextProps){
    if(nextProps.hour){this.setState({end_hour: (((parseInt(this.props.hour[0]+this.props.hour[1]))+1).toString())+":00"})}else{this.setState({end_hour: "9:00"})};
    if(nextProps.hour){this.setState({start_hour: nextProps.hour})}else{this.setState({start_hour: "8:00"})};
    var temp_date;
    if(nextProps.date){
      this.setState({start_date: nextProps.date.toString().substring(0,15)});
      this.setState({end_date: nextProps.date.toString().substring(0,15)});
    }else{
      this.setState({start_date: nextProps.start_date.toString().substring(0,15)});
      this.setState({end_date: nextProps.start_date.toString().substring(0,15)});
    }
  },
  handleChange: function(name, event) {
    var change = {};
    change[name] = event.target.value;
    this.setState(change);
  },
  render: function(){
    return (
      <div id='event_modal' className='modal' style={{display: this.props.display}}>
        <div className='event_modal_form'>
          <span onClick={this.props.close_modal} className='close'>X</span>
          <span className='model_header'>Create Event</span>
          <form className='event_form'>
            <div className='form-group'>
              <label>Event Name:</label>
              <input className='form-control' type='text' value={this.state.name} onChange={this.handleChange.bind(this, 'name')} />
            </div>
            <div className='form-group'>
              <label>Event Type:</label>
              <input id='event_form_event_type' className='form-control' type='text' value={this.props.type} disabled />
            </div>
            <div className='form-group'>
              <label>Event Color:</label>
              <input id='event_form_event_color' className='form-control' type='text' value={this.props.color} disabled />
            </div>
            <div className='form-group'>
              <label>Start Date:</label>
              <input id='event_form_event_start' className='form-control' type='text' value={this.state.start_date} onChange={this.handleChange.bind(this, 'start_date')} />
            </div>
            <div className='form-group'>
              <label>Start Time:</label>
              <input id='event_form_event_hour' className='form-control' type='text' value={this.state.start_hour} onChange={this.handleChange.bind(this, 'start_hour')} />
            </div>
            <div className='form-group'>
              <label>End Date:</label>
              <input id='event_form_event_end' className='form-control' type='text' value={this.state.end_date} onChange={this.handleChange.bind(this, 'end_date')} />
            </div>
            <div className='form-group'>
              <label>End Hour:</label>
              <input id='event_form_event_end' className='form-control' type='text' value={this.state.end_hour} onChange={this.handleChange.bind(this, 'end_hour')} />
            </div>
            <div className='form-group'>
              <label>Event Location:</label>
              <input className='form-control' type='text' value={this.state.location} onChange={this.handleChange.bind(this, 'location')} />
            </div>
            <div className='form-group'>
              <label>Event Description:</label>
              <textarea className='form-control' value={this.state.description} onChange={this.handleChange.bind(this, 'description')} />
            </div>
            <button onClick={() => {this.props.saveEvent({
              name: this.state.name,
              type: this.props.type,
              color: this.props.color,
              start_date: this.state.start_date,
              start_hour: this.state.start_hour,
              end_date: this.state.end_date,
              end_hour: this.state.end_hour,
              location: this.state.location,
              description: this.state.description
            }); this.props.close_modal();}} type="button" className='btn btn-primary glyphicon glyphicon-save' />
          </form>
        </div>
      </div>
    )
  }
})
