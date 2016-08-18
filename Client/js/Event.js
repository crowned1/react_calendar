// enable node exports for event
module.exports = React.createClass({

  //render event
  render: function(){
    //check if the day property was sent to this component and then render if true
    if(this.props.view == 'day'){
      return (
        <div className='event'>
         <div style={{backgroundColor: this.props.color}} className='color_label_day'>
         </div>
         <span className='event_day'>{this.props.name}</span>
        </div>
      )
    }
  }
})
