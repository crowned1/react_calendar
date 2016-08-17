var Event = require('./Event.js');
var Modal_Event_Form = require('./Modal_Event_Form.js');

module.exports = React.createClass({
  getInitialState: function(){
    date_1 = new Date();
    date_2 = new Date();
    return {
      Events: [],
      modal: "none"
    }
  },
  componentWillReceiveProps: function(nextProps) {
    if(nextProps.events){
      this.setState({
        Events: nextProps.events
      });
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
    this.setState({modal: "none"});

    axios.post('/event', {data})
      .then(function (response) {
        console.log(response);
    });

    events = this.state.Events;
    events.push({name: data.type, start_date: date_1, end_date: date_2, color: data.color});
    this.setState({ Events: events });
  },
  render: function(){
    if(this.props.display == "false"){
      return (
        <div className='day'>
          <span style={{visibility: "hidden"}}>Open</span>
          <div id='event_container'></div>
        </div>
      )
    }else{
      return (
        <div onDragOver={this.handleDragOver} onDrop={this.handleOnDrop} className='day'>
        <Modal_Event_Form day_num={this.props.day_num} date={this.props.date} color={this.state.color} type={this.state.type} close_modal={this.close_modal} display={this.state.modal} saveEvent={this.saveEvent} />
         <span className="day_num">{this.props.day_num}</span>
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
