module.exports = React.createClass({
  render: function(){
      return (
        <div className='event'>
         <div style={{backgroundColor: this.props.color}} className='color_label'>
         </div>
         <span className='event_name'>{this.props.name}</span>
        </div>
      )
  }
})
