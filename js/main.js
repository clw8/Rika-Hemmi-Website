var main = function(){

//HERO IMAGES
var counter=0;
var backgroundimages = ["url(img/IMG_0073.jpg)", "url(img/IMG_0345b.jpg)", "url(img/IMG_0271b.jpg)"]
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
$(".modal-popup").addClass("active");};

var closeButton=document.getElementById("close-button");
closeButton.addEventListener("click", function(){
	$(".modal-popup").removeClass("active");
	$(".modal-popup").addClass("closed");
}
);


//MODAL POPUP ARROWS
var slideshow= ["garment-1-image", "fabric-2-image", "garment-2-image", "coat-2-image", "coat-1-image", "coat-3-image", "bag-2-image", "fabric-1-image", "shoes-2-image", "shoes-1-image", "bag-1-image", "bag-3-image", "bag-4-image"];
var leftArrow=document.getElementById("left-arrow");
var rightArrow=document.getElementById("right-arrow");
leftArrow.addEventListener("click", function(){

	for (a=0; a<slideshow.length; a++){
	if($(".modal-content").attr("id")==slideshow[a]){
		if($(".modal-content").attr("id")==slideshow[0])
			{$(".modal-content").attr("id", slideshow[slideshow.length - 1]);}
		$(".modal-content").attr("id", slideshow[a - 1]);
		 }
	
	}
});

rightArrow.addEventListener("click", function(){

	for (a=slideshow.length; a>=0; a--){
	if($(".modal-content").attr("id")==slideshow[a]){

		if($(".modal-content").attr("id")==slideshow[slideshow.length - 1])
			{$(".modal-content").attr("id", slideshow[0]);}
		$(".modal-content").attr("id", slideshow[a + 1]);
		 }
	
	}
});


main();