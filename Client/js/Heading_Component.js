//enable node export module for heading component
module.exports = React.createClass({
  render: function(){
    return (
      <div className='heading_container'>
        <img src='./css/logo_placeholder.png' />
        <span>Meridians</span>
        <div className='login-register-div'>
          <button><Link to='day_view'>Login</Link></button>
        </div>
      </div>
    )
  }
})
