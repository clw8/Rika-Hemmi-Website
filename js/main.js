

$('document').ready(function(){



//HERO IMAGES FUNCTION 
var imageLoadTime, imageLoadStartTime, imageLoadEndTime, timeAfterStartTime;
     var startingImg = document.getElementById('starting-image');
  var backgroundimages = [startingImg];
  var $body = $('body');

function heroBgImageFunction () {
    var herowrapper = $("#herowrapper");
    var counter=0;
    imageLoadStartTime = new Date().getTime();
    
   
    if(startingImg.complete){
        LoadHeroImages();
    }
    else {startingImg.addEventListener('load', LoadHeroImages);}
           
              
   function LoadHeroImages() {
            imageLoadEndTime= new Date().getTime();
           imageLoadTime = imageLoadEndTime - imageLoadStartTime;
        if (window.innerWidth<=769) {
         	toBeLoaded = ["img/IMG_0345b.jpg", "img/IMG_0316.jpg"];
         }
  		else {
  			toBeLoaded = ["img/IMG_0345.jpg", "img/IMG_0271b.jpg"];
  		}

       if(imageLoadTime<=2600){ //allow loading bar to go through one full cycle before proceeding
       setTimeout(LoadHeroImages, 100)
       }

      else{  
        showStartImage(loadOtherImages);
      }     

   }

 function loadOtherImages (){ 
 		toBeLoaded.forEach(function(src){
        		imagePreload(src);
        });
        setInterval(changebgImage, 9000);
        
 };


 function showStartImage(callback) {
            clearInterval(loadingInterval);
            var loadingBar = document.getElementById('loading-bar1');
            $(loadingBar).fadeOut(700, function() { 
            		herowrapper.css("background-image", `url(${backgroundimages[0].src})`);
            		herowrapper.hide().fadeIn(800);
            		callback();
              		});
   };
 
 

    //PRELOAD images that are to be displayed later on
    function imagePreload(src){
        var img= new Image();
        img.src = src;
        backgroundimages.push(img);
            }
           //change hero background image functionality
    function changebgImage () {
            

        if(counter===backgroundimages.length-1){counter=0;}
        else{counter++;}
  
        herowrapper.fadeOut(750, function(){
             $(this).css("background-image", `url(${backgroundimages[counter].src})`).fadeIn(750);

        }); 

    };


   
};

heroBgImageFunction();



//smooth scrolling
$(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 500);
});
//scroll top on start
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}
    


//MODAL POPUP MAIN PAGE

var imagesready= function(){            //call after images have lazy loaded (see line 292)
//on click get id and give to MODAL CONTENT DIV
var gridImages = document.getElementsByClassName("grid-image");
var gridImagePosition;
var $modalContent = $('#modal-content');
var $modalPopup = $(".modal-popup");

for(i=0; i<gridImages.length; i++){
gridImages[i].addEventListener("click", function (e) {
      e.preventDefault();
      var src=e.target.getAttribute('data-background');
    $modalContent.css("background-image", 'url("'+ src +'")');
    $modalContent.attr('data-background', src);
    $modalPopup.removeClass("closed");
    $modalPopup.addClass("active");
    $modalPopup.fadeIn(800, function(){
        });
          $body.css('overflow-y', 'hidden');

}
	
);}

var closeButton=document.getElementById("close-button");
closeButton.addEventListener("click", function(e){
      e.preventDefault();
       $modalPopup.removeClass("active");
    $modalPopup.fadeOut(800);
    $modalPopup.addClass("closed");
      $body.css('overflow-y', 'auto');
}
);


//MODAL POPUP ARROWS
var leftArrow=document.getElementById("left-arrow-modal");
var rightArrow=document.getElementById("right-arrow-modal");

var srcSelector= function(number){
        return gridImages[number].getAttribute('data-background')}

var findGridImageIndex =function(imagesrc){
  var sourcemap = Array.prototype.map.call(gridImages, function(image){return image.attributes[1].nodeValue});
  function findsource (source) { return source == imagesrc }
 var res = sourcemap.findIndex(findsource);
 return res
}


leftArrow.addEventListener("click", function(e){
    e.preventDefault();

    var currentSrc= $modalContent.attr("data-background");
    var currentIndex = findGridImageIndex(currentSrc);
    if(currentIndex==0){
     $modalContent.css("background-image", 'url("'+ srcSelector(gridImages.length-1) +'")');
      $modalContent.attr("data-background", srcSelector(gridImages.length-1));
    }
    else {
      $modalContent.css("background-image", 'url("'+ srcSelector(currentIndex-1) +'")');
      $modalContent.attr("data-background", srcSelector(currentIndex-1));
    }

});

rightArrow.addEventListener("click", function(e){
    e.preventDefault();
     var currentSrc= $modalContent.attr("data-background");
    var currentIndex = findGridImageIndex(currentSrc);
    if(currentIndex==gridImages.length-1){
      $modalContent.css("background-image", 'url("'+ srcSelector(0) +'")');
      $modalContent.attr("data-background", srcSelector(0));
    }
    else {
      $modalContent.css("background-image", 'url("'+ srcSelector(currentIndex+1) +'")');
      $modalContent.attr("data-background", srcSelector(currentIndex+1));
    }




});
};

//SHOW SLIDER
 loadFromServer = function(url) {
      return new Promise((resolve, reject) => {
          var xhr = new XMLHttpRequest();
          xhr.open("GET", url);
          xhr.onload = () => resolve(xhr.response);
          xhr.onerror = () => reject(xhr.statusText);
          xhr.send();}
            )};

var sliderLinks = document.getElementsByClassName('slider-link');
var showSlider = function (e) {
    e.preventDefault();
    var $slider = $('#slider');
    var $app = $('#app')

      if($app.attr('class')=='slidershowing'){
      }
     
      else{
        
      var scriptexec= function(url, callback){
        var scr = document.createElement('script');
        scr.src = url;
        document.body.appendChild(scr);
        callback();
      }
       
      loadFromServer('templates/slick.html')
      .then(function(res) {
         
         $slider.html(res); 
         $slider.fadeIn(2000); 
        })
       .then(function(){
        
        scriptexec("js/mainslick.js", function(){
            $('.hiddenapp').removeClass('hiddenapp');
          $app.hide().fadeIn(2000);
          $('#app-border').hide().fadeIn(2500);
          $app.addClass('slidershowing');
      })})
      .catch((error) => console.log(error))

      
    }
 

}

Array.prototype.forEach.call(sliderLinks, (link) => {link.addEventListener('click', showSlider)});

//LOAD ARTICLE
var articleLinks = document.getElementsByClassName('article-link');
var loadingBar = document.getElementsByClassName('loading-bar');
var $articleholder = $('#articleholder');



var showArticle = function(e){
    e.preventDefault();
    $body.css('overflow-y', 'hidden');

    if($articleholder.attr('class') == 'active'){
      $articleholder.fadeIn(1000);


    }
    else{
        $articleholder.fadeIn(1000);
        var loadingInterval2 = setInterval(function(){replaceloadingBar('loading-bar2')}, 4000);
        loadImage = function(url) {
            return new Promise((resolve, reject) => {
                var xhr = new XMLHttpRequest();
                xhr.responseType = "arraybuffer";
                xhr.open("GET", url);
                xhr.onload = () => resolve(xhr.response);
                xhr.onerror = () => reject(xhr.statusText);
                 xhr.send(null);}
                )};


        loadImage('img/article.jpg')
        .then(function(res){
            var arrayBufferView = new Uint8Array(res);
            var blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
            var urlCreator = window.URL || window.webkitURL;
            var imageUrl = urlCreator.createObjectURL( blob );
            var img = new Image();
            img.src = imageUrl;
            clearInterval(loadingInterval2);
            $articleholder.append(img);
             $articleholder.addClass('active');
             if(window.innerWidth<800){
               $('#articleholder img').css('width', '800px');
             }
              $('#articleholder img').hide();
            $('#loading-bar2').fadeOut(600, function(){
            $('#articleholder > img').fadeIn(1000)
            })
        }).catch((error) => console.log(error));
    }

}





Array.prototype.forEach.call(articleLinks, (link) => {link.addEventListener('click', showArticle)});
var closeArticleButton = document.getElementById('close-article');
closeArticleButton.addEventListener('click', function() {
  $articleholder.fadeOut(800);
   $body.css('overflow-y', 'auto');
});


//LAZY LOADING
var lazyloading= function(callback){
  imgcount=0;
  var lazyImages= document.querySelectorAll('img[data-src]');
  Array.prototype.forEach.call(lazyImages,  function(img) {
    $(img).css('display', 'none');
    img.setAttribute('src', img.getAttribute('data-src'));

    img.onload = function() {
      img.removeAttribute('data-src');
      $(img).fadeIn(2000);
    };
  });

  var lazybackgroundImages= document.getElementsByClassName('lazy-load');
  var bgimagescount= 0;
  Array.prototype.forEach.call(lazybackgroundImages, function(lazydiv){

   var src = $(lazydiv).attr('data-background');
   img = new Image(); 
   img.src = src;
   img.onload= function() {
     $(lazydiv).css('background-image', 'url("'+src+'")');
       img.remove();
       $(lazydiv).css('display', 'none');
            $(lazydiv).fadeIn(2000);
    };

  });
callback();
}

    lazyloading(imagesready);   
  



//FOOTER COPYRIGHT
 var date = new Date().getFullYear();
 $('<p>').text(`© ${date} Rika Hemmi. All rights reserved.`).appendTo('footer');


});

