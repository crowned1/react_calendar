var Modal_Event_Form = require('./Modal_Event_Form.js');
var Event = require('./Event.js');

module.exports = React.createClass({
  getInitialState: function(){
    return {
      modal: "none",
      hour: this.props.hour
    }
  },
  handleDragOver: function(e){
     e.preventDefault();
  },
  handleOnDrop: function(e){
    e.preventDefault();
    this.setState({modal: "block"});
    this.state.color = e.dataTransfer.getData("bgColor");
    this.state.type = e.dataTransfer.getData("type");
  },
  close_modal: function(e){
    this.setState({modal: "none"});
  },
  saveEvent: function(data){
    this.props.saveEvent(data);
  },
  render: function(){
    if(this.props.hour_zero == "true"){
      return (
        <div onDragOver={this.handleDragOver} onDrop={this.handleOnDrop} className='hour_container'>
          <Modal_Event_Form end_date={this.props.current} start_date={this.props.current} hour={this.state.hour} color={this.state.color} type={this.state.type} close_modal={this.close_modal} display={this.state.modal} saveEvent={this.saveEvent} />
         <span style={{display: "none"}} className='time'>{this.props.hour}</span>
        </div>
      )
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
