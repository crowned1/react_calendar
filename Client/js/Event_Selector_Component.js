var Color_Selector = require('./Color_Selector.js');

module.exports = React.createClass({
  getInitialState: function(){
    return {
      Colors: [{color: 'red', type: 'Exercise'}, {color: 'blue', type: 'Eat'}, {color: 'green', type: 'Sleep'}, {color: 'yellow', type: 'Vacation'}, {color: 'orange', type: 'Meditation'}, {color: 'purple', type: 'Bill'}]
    }
  },
  render: function(){
    return (
      <div className='event_selector_container'>
      {this.state.Colors.map(function(color, i){
           return (
             <Color_Selector bgColor={color.color} type={color.type} key={i}></Color_Selector>
           );
      })}
      </div>
    )
  }
})
