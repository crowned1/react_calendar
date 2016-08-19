module.exports = React.createClass({

  //called when the component is to be created
  getInitialState: function() {
    return {
      name: "",
      start_date: moment(),
      end_date: moment(),
      end_hour: '',
      location: "",
      description: "",
      start_hour: ''
    };
  },

  //called just before the props are recieved, and the param is the props to be applied
  componentWillReceiveProps: function(nextProps){
    if(nextProps.hour){
      //converts the hour into string, and saves it to end_hour state
      this.setState({end_hour: (((parseInt(this.props.hour[0]+this.props.hour[1]))+1).toString())+":00"})
    }else{
      //if there is no hour sent to modal, (saved from calendar view), then default to 9:00
      this.setState({end_hour: "9:00"})
    };
    if(nextProps.hour){
      //converts the hour into string, and saves it to start_hour state
      this.setState({start_hour: nextProps.hour})
    }else{
      //if there is no hour sent to modal, (saved from calendar view), then default to 8:00
      this.setState({start_hour: "8:00"})
    };
    var temp_date;
    if(nextProps.date){
      //set the start_date and end_date to the date passed from parent
      this.setState({start_date: moment(nextProps.date)});
      this.setState({end_date: moment(nextProps.date)});
    }else{
      //if nothing came from parent, use startdate property instead
      this.setState({start_date: moment(nextProps.start_date)});
      this.setState({end_date: moment(nextProps.start_date)});
    }
  },

  //listen for input field changes
  handleChange: function(name, event) {
    var change = {};
    change[name] = event.target.value;
    this.setState(change);
  },

  //handle calendar picker change for start date input
  handleStartDateChange: function(date){
    this.setState({
      start_date: date
    });
  },

  //handle calendar picker change for end date input
  handleEndDateChange: function(date){
    this.setState({
      end_date: date
    });
  },

  //render the modal form
  render: function(){
    return (
      <div id='event_modal' className='modal' style={{display: this.props.display}}>
        <div className='event_modal_form'>
          <span onClick={this.props.close_modal} className='close'>X</span>
          <span className='model_header'>Event Editor</span>
          <form className='event_form'>
            <div className='col-xs-6'>
              <div className='form-group'>
                <label>Event Name:</label>
                <input className='form-control' type='text' value={this.state.name} onChange={this.handleChange.bind(this, 'name')} />{/* each of these is bound to the state, so that they alter the state of the component when they are typed in*/}
              </div>
              <div className='form-group'>
                <label>Event Type:</label>
                <input id='event_form_event_type' className='form-control' type='text' value={this.props.type} disabled />{/* these are disabled and inherited by props not state, so they cannot be changed yet*/}
              </div>
              <div className='form-group'>
                <label>Event Color:</label>
                <input id='event_form_event_color' className='form-control' type='text' value={this.props.color} disabled />
              </div>
              <div className='form-group'>
                <label>Start Date:</label>
                <DatePicker className='modal_date_picker'
                dateFormat="MM/DD/YYYY"
                selected={this.state.start_date}
                onChange={this.handleStartDateChange} />
              </div>
              <div className='form-group'>
                <label>Start Time:</label>
                <input id='event_form_event_hour' className='form-control' type='text' value={this.state.start_hour} onChange={this.handleChange.bind(this, 'start_hour')} />
              </div>
            </div>
            <div className='col-xs-6'>
              <div className='form-group'>
                <label>End Date:</label>
                <DatePicker className='modal_date_picker'
                dateFormat="MM/DD/YYYY"
                selected={this.state.end_date}
                onChange={this.handleEndDateChange} />
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
            </div>
            {/* gets input fields and passes them to parent through callback prop function then closes the modal, uses es6 syntax to activate both functions at the same time*/}
            <button onClick={() => {this.props.saveEvent({
              name: this.state.name,
              type: this.props.type,
              color: this.props.color,
              start_date: this.state.start_date.toDate().toString().substring(0, 15),
              start_hour: this.state.start_hour,
              end_date: this.state.end_date.toDate().toString().substring(0, 15),
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
