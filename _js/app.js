var s = skrollr.init();

$(document).ready( function() {

  /* Text Decoration for Nav Menu */
  var coolUnderline = "<span class='coolUnderline'></span>";
  $('.nav-item').append(coolUnderline);

  $('.show-button').click( function() {
      $('.sidebar').addClass('show');
  });

  $('body > *').not('header').click( function() {
      $('.sidebar').removeClass('show');
  });

  $('.close-button').click( function() {
      $('.sidebar').removeClass('show');
  });

  // Anotate Sub Menues

  var navItem = $('.nav-item');

  navItem.each( function(){
    $( this ).has('.sub-nav').find('.nav-link').prepend('+');
  });

});
