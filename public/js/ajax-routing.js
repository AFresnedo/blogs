$(document).ready(function() {
  console.log('ajax-routing loaded on this page');

  $('.delete-btn').click(function(e) {
    e.preventDefault();
    console.log('delete requested for:', $(this).attr('href'));

    $.ajax({
      url: $(this).attr('href'),
      method: 'DELETE'
    }).done(function(msg) {
      console.log('success msg:', msg);
      window.location = '/tags';
    }).fail(function(msg) {
      console.log('err msg:', msg);
    });
  });

  $('#edit-tag').submit(function(e) {
    e.preventDefault();
    console.log('recieved edit form');

    // serialize takes all form data and sends by name
    $.ajax({
      url: $(this).attr('action'),
      method: 'PUT',
      data: $(this).serialize()
    }).done(function(msg) {
      console.log('success msg:', msg);
    }).fail(function(msg) {
      console.log('fail msg:', msg);
    })
  });
});
