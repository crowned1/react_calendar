React = require('react');
ReactDOM = require('react-dom');
ReactRouter = require('react-router');
axios = require('axios');
DatePicker = require('react-datepicker');
moment = require('moment');
Router = ReactRouter.Router;
Route = ReactRouter.Route;
hashHistory = ReactRouter.hashHistory;
Link = ReactRouter.Link;

Functions = require('./functions.js');

// RENDERED COMPONENT
var App = React.createClass({
  render: function(){
    return (
      <Router history={hashHistory}>
        <Route path='/' component={Home_Page_Component_Layout} />
        <Route path='/month_view' component={Home_Page_Component_Layout} />
        <Route path='/day_view' component={Day_View_Page_Component_Layout} />
      </Router>
    )
  }
});

// VIEWS
var Home_Page_Component_Layout = React.createClass({
  getInitialState: function(){
    Current_month = Functions.get_month();
    return {
      Month: Current_month
    }
  },
  render: function(){
    return (
      <div>
        <Heading_Component />
        <Calendar_Component text={this.state.Month} />
        <Event_Selector_Component />
      </div>
    )
  }
})

var Day_View_Page_Component_Layout = React.createClass({
  getInitialState: function(){
    Current_month = Functions.get_month();
    return {
      Month: Current_month
    }
  },
  render: function(){
    return (
      <div>
        <Heading_Component  />
        <Day_Component text={this.state.Month} />
        <Event_Selector_Component />
      </div>
    )
  }
})

// COMPONENTS
var Heading_Component = require('./Heading_Component.js');
var Day_Component = require('./Day_Component.js');
var Calendar_Component = require('./Calendar_Component.js');
var Event_Selector_Component = require('./Event_Selector_Component.js');

ReactDOM.render(<App />, document.getElementById('app'));
