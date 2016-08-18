// IMPORTS
var Modal_Event_Form = require('./Modal_Event_Form.js');
var Event = require('./Event.js');

//enable node module exports for Hour components
module.exports = React.createClass({

  //called when the component is to be created
  getInitialState: function(){
    return {
      modal: "none",
      hour: this.props.hour
    }
  },

  //prevent default events on drag
  handleDragOver: function(e){
     e.preventDefault();
  },

  //listens for drop event
  handleOnDrop: function(e){
    //prevent default events from triggering
    e.preventDefault();
    this.setState({modal: "block"});//show modal form popup
    this.state.color = e.dataTransfer.getData("bgColor");
    this.state.type = e.dataTransfer.getData("type");
  },

  //hide modal form
  close_modal: function(e){
    this.setState({modal: "none"});
  },

  //saveEvent inherited from the parent component
  saveEvent: function(data){
    this.props.saveEvent(data);
  },

  //create component
  render: function(){
    //if its the first hour of the day, do not show the hour (this is because it will be located inbetween two divs, and will be cut in half 0:00 can be implied)
    if(this.props.hour_zero == "true"){
      return (
        <div onDragOver={this.handleDragOver} onDrop={this.handleOnDrop} className='hour_container'>
          <Modal_Event_Form end_date={this.props.current} start_date={this.props.current} hour={this.state.hour} color={this.state.color} type={this.state.type} close_modal={this.close_modal} display={this.state.modal} saveEvent={this.saveEvent} />
          <span style={{display: "none"}} className='time'>{this.props.hour}</span>
        </div>
      )
    //renders both the hour, and the corresponding hidden modal
    }else{
      return (
        <div onDragOver={this.handleDragOver} onDrop={this.handleOnDrop} className='hour_container'>
          <Modal_Event_Form end_date={this.props.current} start_date={this.props.current} hour={this.props.hour} color={this.state.color} type={this.state.type} close_modal={this.close_modal} display={this.state.modal} saveEvent={this.saveEvent} />
          <span className='time'>{this.props.hour}</span>
        </div>
      )
    }
  }
})
