module.exports = React.createClass({
  render: function(){
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
