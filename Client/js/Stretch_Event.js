//enable node export module for stretch events 
module.exports = React.createClass({
  render: function(){
      return (
        <div className='stretch_event' style={{backgroundColor: this.props.color, top: this.props.top, height: this.props.height}}>
         <span className='stretch_event_title'>{this.props.type}</span>
        </div>
      )
  }
})
