module.exports = React.createClass({
  render: function(){
    return (
      <div className='heading_container'>
        <img src='./css/logo_placeholder.png' />
        <span>Meridians</span>
        <div className='login-register-div'>
          <button><Link to='day_view'>Login</Link></button>
          <a href='/register_view'>Dont have an account? Register Here</a>
        </div>
      </div>
    )
  }
})
