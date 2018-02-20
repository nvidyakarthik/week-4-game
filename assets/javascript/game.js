 $( function() {
    $( "#harry" ).draggable();
  } );
  $( function() {
    $( "#draggable2" ).draggable();
  } );
  $( function() {
    $( "#draggable3" ).draggable();
  } );
  $( function() {
    $( "#draggable4" ).draggable();
  } );
  $('#characterbox').on('click','.character',function() {
      $(this).removeClass('character');
      $(this).addClass('selected');      
      $('#enemy').append( $('#characterbox >.character') );
}); 
$('#enemy').on('click','.character',function() {
    $(this).removeClass('character');
    $(this).addClass('selected');      
    $('#defender').append( $('#enemy >.selected') );
}); 

