
function ready(){
if(window.jQuery){

$('document').ready(function(){


//HERO IMAGE 


//make sure that images run smoothly 
function headerBgImageFunction () {

    var counter=0;
    imageLoadStartTime = new Date().getTime();
   //see index.html for initial settings for backgroundimages array startingImg

    
        //preload other images after starting hero image has loaded
   
    if(startingImg.complete){
        preloadOtherImages();
    }
    else {startingImg.addEventListener('load', preloadOtherImages);}
           
        
        

        function preloadOtherImages() {
         imageLoadEndTime= new Date().getTime();
         imageLoadTime = imageLoadEndTime - imageLoadStartTime;
         if (window.innerWidth<=769) {toBeLoaded = ["img/IMG_0345b.jpg", "img/IMG_0316.jpg"];}
   else {toBeLoaded = ["img/IMG_0345b.jpg", "img/IMG_0271b.jpg"];}

         if(imageLoadTime<=3000){
            setTimeout( preloadOtherImages, 1000)
        }
        else if (3000<imageLoadTime<=5000){                                
                toBeLoaded.forEach(function(src){
               imagePreload(src)});
            setInterval(changebgImage, 8000);
        
       }
       else{
               toBeLoaded.forEach(function(src){
               imagePreload(src)});
            setInterval(changebgImage, 12000);
               }

   }

   
   
   // startingImg.src= 'img/IMG_0073.jpg';
   // var backgroundimages = [startingImg];   



    //PRELOAD images that are to be displayed later on
    function imagePreload(src){
        var img= new Image();
        img.src = src;
        backgroundimages.push(img);
        console.log(backgroundimages);
    }

   
 
                    //change background image functionality
    function changebgImage () {
            

        if(counter===backgroundimages.length-1){counter=0;}
        else{counter++;}
  
        $("#herowrapper").fadeOut(750, function(){
             $(this).css("background-image", `url(${backgroundimages[counter].src})`).fadeIn(750);
        }); 

    }


   
};

headerBgImageFunction();





    


//MODAL POPUP MAIN PAGE


//on click get id and give to MODAL CONTENT DIV
var gridImages = document.getElementsByClassName("grid-image");
for(i=0; i<gridImages.length; i++){
gridImages[i].addEventListener("click", function () {
    $(".modal-content").attr("id", this.id);
    $(".modal-popup").removeClass("closed");
    $(".modal-popup").addClass("active");
}
);}

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


//FOOTER COPYRIGHT
 var date = new Date().getFullYear();
 $('<li>').text(`© ${date} Piwka. All rights reserved.`).appendTo('footer ul');


});

}

else{
    setTimeout(ready, 500);
        console.log('Waiting for Jquery to load');
        }
}
ready();