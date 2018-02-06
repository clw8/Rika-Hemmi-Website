

$(document).ready(function(){
  $('#article')
    .wrap('<span style="display:inline-block"></span>')
    .css('display', 'block')
    .parent()
    .zoom({on:"grab"});

 var date = new Date().getFullYear();
 $('<li>').text(`© ${date} Piwka. All rights reserved.`).appendTo('footer ul');


    
});

