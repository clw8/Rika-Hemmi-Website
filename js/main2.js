

$(document).ready(function(){
  $('#article')
    .wrap('<span style="display:inline-block"></span>')
    .css('display', 'block')
    .parent()
    .zoom({on:"grab"});
});