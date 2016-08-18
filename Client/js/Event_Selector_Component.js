// IMPORTS
var Color_Selector = require('./Color_Selector.js');

//enable node exports for event selector component
module.exports = React.createClass({

  //called when component is called to be created
  getInitialState: function(){
    // list of all the premade event types and colors
    return {
      Colors: [{color: '#B7472C', type: 'Exercise'}, {color: '#2658B5', type: 'Eat'}, {color: '#4E9642', type: 'Sleep'}, {color: '#D6D335', type: 'Vacation'}, {color: '#DD8E39', type: 'Meditation'}, {color: '#8035D6', type: 'Bill'}]
    }
  },

  //render component, building the color selector
  render: function(){
    return (
      <div className='event_selector_container'>
        {/* for each event type/color render an additional color selector */}
        {this.state.Colors.map(function(color, i){
           return (
             <Color_Selector bgColor={color.color} type={color.type} key={i}></Color_Selector>
           );
        })}
      </div>
    )
  }
})
