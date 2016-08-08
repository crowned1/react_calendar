module.exports = React.createClass({
  close_modal: function(e){
    var modal = document.getElementById('event_modal');
    var modal_close = document.getElementsByClassName('close')[0];
    if(e.target == modal || e.target == modal_close){
      modal.style.display = "none";
    }
  },
  render: function(){
    return (
      <div id='event_modal' className='modal'>
        <div className='event_modal_form'>
          <span onClick={this.close_modal} className='close'>X</span>
          <span className='model_header'>Create Event</span>
          <form className='event_form'>
            <input id='event_form_event_id' type='hidden' />
            <div className='form-group'>
              <label>Event Name:</label>
              <input className='form-control' type='text' />
            </div>
            <div className='form-group'>
              <label>Event Type:</label>
              <input id='event_form_event_type' className='form-control' type='text' />
            </div>
            <div className='form-group'>
              <label>Event Color:</label>
              <input id='event_form_event_color' className='form-control' type='text' />
            </div>
            <div className='form-group'>
              <label>Start:</label>
              <input id='event_form_event_start' className='form-control' type='text' />
            </div>
            <div className='form-group'>
              <label>End:</label>
              <input id='event_form_event_end' className='form-control' type='text' />
            </div>
            <div className='form-group'>
              <label>Event Location:</label>
              <input className='form-control' type='text' />
            </div>
            <div className='form-group'>
              <label>Event Description:</label>
              <textarea className='form-control' />
            </div>
            <button onClick={() => this.props.saveEvent({name: 10})} type="button" className='btn btn-primary glyphicon glyphicon-save' />
          </form>
        </div>
      </div>
    )
  }
})
