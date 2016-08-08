module.exports = React.createClass({
  handleOnDrag: function(e){
    e.dataTransfer.setData("bgColor", this.props.bgColor);
    e.dataTransfer.setData("type", this.props.type);
  },
  render: function(){
    var divStyle = {
      backgroundColor: this.props.bgColor
    }
    return (
      <div className="color_select" style={divStyle} draggable='true' onDragStart={this.handleOnDrag}>
        <div className='center_text'>
          <span className='color_text'>{this.props.type}</span>
        </div>
      </div>
    )
  }
})
