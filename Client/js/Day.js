var Event = require('./Event.js');

module.exports = React.createClass({
  getInitialState: function(){
    date_1 = new Date();
    date_2 = new Date();
    return {
      Events: [
        {name: "Work", start_date: date_1, end_date: date_2, color: "blue"},
      ]
    }
  },
  handleDragOver: function(e){
     e.preventDefault();
  },
  handleOnDrop: function(e){
    e.preventDefault();
    var bgColor = e.dataTransfer.getData("bgColor");
    var type = e.dataTransfer.getData("type");
    document.getElementById('event_modal').style.display = "block";
    document.getElementById('event_form_event_type').value = type;
    document.getElementById('event_form_event_color').value = bgColor;
    document.getElementById('event_form_event_start').value = this.props.date.toDateString();
    document.getElementById('event_form_event_id').value = this.props.identity;
  },
  addEvent: function(){
    events = this.state.Events;
    events.push({name: "Play", start_date: date_1, end_date: date_2, color: "yellow"});
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
         <span className="day_num">{this.props.day_num}</span>
         {this.state.Events.map(function(event, i){
            return (
               <Event name={event.name} start_date={event.start_date} end_date={event.end_date} color={event.color} key={i}></Event>
            )
         })}
        </div>
      )
    }
  }
})
