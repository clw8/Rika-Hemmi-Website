var main = function(){

//HERO IMAGES
var counter=0;
var backgroundimages = ["url(img/IMG_0073.jpg)", "url(img/IMG_0345b.jpg)", "url(img/IMG_0316.jpg)"]
function changebgImage () {
	
	if(counter===backgroundimages.length-1){counter=0;}
	else{counter++;}
  
$("#herowrapper").fadeOut(500, function(){
  $(this).css("background-image", backgroundimages[counter]).fadeIn(500);
	}); }
   

setInterval(changebgImage, 7000);

};

//MODAL POPUP MAIN PAGE


//on click get id and give to MODAL CONTENT DIV
function clicked (clickedImage) {
$(".modal-content").attr("id", clickedImage.id);
$(".modal-popup").removeClass("closed");
$(".modal-popup").addClass("active");}




main();