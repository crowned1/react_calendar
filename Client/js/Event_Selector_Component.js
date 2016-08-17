var Color_Selector = require('./Color_Selector.js');

module.exports = React.createClass({
  getInitialState: function(){
    return {
      Colors: [{color: '#B7472C', type: 'Exercise'}, {color: '#2658B5', type: 'Eat'}, {color: '#4E9642', type: 'Sleep'}, {color: '#D6D335', type: 'Vacation'}, {color: '#DD8E39', type: 'Meditation'}, {color: '#8035D6', type: 'Bill'}]
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
