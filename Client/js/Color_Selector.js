module.exports = React.createClass({

  //when the color is dragged
  handleOnDrag: function(e){
    //save the properties of that dragged element
    e.dataTransfer.setData("bgColor", this.props.bgColor);
    e.dataTransfer.setData("type", this.props.type);
  },

  //render Color Selector (the colored circles)
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
