// IMPORTS
var Event = require('./Event.js');
var Modal_Event_Form = require('./Modal_Event_Form.js');

//make day available with node export
module.exports = React.createClass({

  //called when component is to be created
  getInitialState: function(){
    date_1 = new Date();
    date_2 = new Date();
    return {
      Events: [],
      modal: "none"
    }
  },

  //called just before props are added to component, the param is the props to be added
  componentWillReceiveProps: function(nextProps) {
    if(nextProps.events){
      //assign the properties to the state of the object
      this.setState({
        Events: nextProps.events
      });
    }
  },

  //prevent events from triggering when dragging an element
  handleDragOver: function(e){
     e.preventDefault();
  },

  //listen for drop element
  handleOnDrop: function(e){
    //prevent any other events from firing
    e.preventDefault();
    //display the modal form
    this.setState({modal: "block"});
    //get properties of the event that was dragged
    this.state.color = e.dataTransfer.getData("bgColor");
    this.state.type = e.dataTransfer.getData("type");
  },

  //hide modal
  close_modal: function(e){
    this.setState({modal: "none"});
  },

  //save the event
  saveEvent: function(data){

    //IMPORTANT: this function is passed to the modal component and called back to the day. This means when the data comes back, it is actually called from the modal event forms save button. not from this day object.

    //hide modal
    this.setState({modal: "none"});
    //send data to db to be saved
    axios.post('/event', {data})
      .then(function (response) {
        //should get a success response
        console.log(response);
    });

    //add the event to the day
    events = this.state.Events;
    events.push({name: data.name, start_date: date_1, end_date: date_2, color: data.color});
    this.setState({ Events: events });
  },

  //called last, renders day, and renders modal as a hidden component
  render: function(){

    //if its not a day of the month, hide this day
    if(this.props.display == "false"){
      return (
        <div className='day'>
          <span style={{visibility: "hidden"}}>Open</span>
          <div id='event_container'></div>
        </div>
      )
    //render day, and alongside it will be the hidden modal corresponding to the day.
    }else{
      return (
        <div onDragOver={this.handleDragOver} onDrop={this.handleOnDrop} className='day'>
          <Modal_Event_Form day_num={this.props.day_num} date={this.props.date} color={this.state.color} type={this.state.type} close_modal={this.close_modal} display={this.state.modal} saveEvent={this.saveEvent} />
           <span className="day_num">{this.props.day_num}</span>
           {/* For each event, add to the day */}
           {this.state.Events.map(function(event, i){
              return (
                 <Event view='day' name={event.name} start_date={event.start_date} end_date={event.end_date} color={event.color} key={i}></Event>
              )
           })}
        </div>
      )
    }
  }
})
