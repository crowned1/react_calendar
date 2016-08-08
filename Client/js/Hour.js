module.exports = React.createClass({
  handleDragOver: function(e){
     e.preventDefault();
  },
  handleOnDrop: function(e){
    e.preventDefault();
    var color_data = e.dataTransfer.getData("color");
    e.target.style.backgroundColor = color_data;
    document.getElementById('event_modal').style.display = "block";
  },
  render: function(){
      return (
        <div onDragOver={this.handleDragOver} onDrop={this.handleOnDrop} className='hour_container'>
         <span className='time'>{this.props.hour}</span>
        </div>
      )
  }
})
