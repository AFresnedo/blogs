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
    }).fail(function(msg) {
      console.log('err msg:', msg);
    });
  });
});
