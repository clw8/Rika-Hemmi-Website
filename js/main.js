

$('document').ready(function(){

  $('.slides').slick({
    //  lazyLoad: 'ondemand',
    infinite: true,
     slidesToShow: 1.67,
     touchMove: true,
     arrows: true,
     appendArrows: $('.pagination'),
     centerMode: true,
    centerPadding: '180px',
    prevArrow:
    '<img id="left-arrow-slide" src="img/arrow-left.png">',
    nextArrow:
   '<img id="right-arrow-slide" class="rightarrow" src="img/arrow-left.png">',
     responsive: [
          {
        breakpoint: 1150,
        settings: {
         centerPadding: '120px',
        }
      },
            {
        breakpoint: 860,
        settings: {
            centerPadding: '80px',
        }
      },
         {
        breakpoint: 760,
        settings: {
            centerPadding: '40px',
        }
      },
        {
        breakpoint: 680,
        settings: {
            centerPadding: '0px',
        }
      },
       {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          centerPadding: '0px',
        }
      },
       {
        breakpoint: 440,
        settings: {
          slidesToShow: 1,
          centerPadding: '0px',
        }
      },
    ]
  });
  
  
  

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
        herowrapper.css("background-image", "url(" + backgroundimages[0].src + ")");
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
        $(this).css("background-image", "url(" + backgroundimages[counter].src + ")").fadeIn(750);

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

      });}

      var closeButton=document.getElementById("close-button");
      closeButton.addEventListener("click", function(e){
        e.preventDefault();
        $modalPopup.removeClass("active");
        $modalPopup.fadeOut(800);
        $modalPopup.addClass("closed");
        $body.css('overflow-y', 'auto');
      });



      //MODAL POPUP ARROWS
      var leftArrow=document.getElementById("left-arrow-modal");
      var rightArrow=document.getElementById("right-arrow-modal");

      var srcSelector= function(number){
        return gridImages[number].getAttribute('data-background')}

        var findGridImageIndex =function(imagesrc){
          var sourcemap = Array.prototype.map.call(gridImages, function(image){return image.attributes[1].nodeValue});
          function findsource (source) { return source == imagesrc }
          var res = sourcemap.findIndex(findsource);
          return res;
        }

        //left arrow functionality
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
        //right arrow functionality
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
      function Overlay(links, elem, closeButton) {
          this.links = links;
          this.elem = elem;
          this.closeButton = closeButton;
          this.active = false;
      }

      Overlay.prototype.init = function(){
        console.log(this.elem);
        var _ = this;
        this.links.click(function(e){
            e.preventDefault();
            _.elem.removeClass('overlay--hidden');
            $("body").css({"overflow":"hidden"});
          })
          console.log(this.closeButton);
          this.closeButton.click(function(e){
            e.preventDefault();
            _.elem.addClass('overlay--hidden');
            $("body").css({"overflow":"visible"});
          })
        };
      

      var sliderLinks = $('.slider-link');
      var sliderElemOL = $('.slider-overlay');
      var sliderClose = $('.slider-overlay .close-button');
      var sliderOverlay = new Overlay(sliderLinks, sliderElemOL, sliderClose);
      sliderOverlay.init();



      //LOAD ARTICLE
      var $articleLinks = $('.article-link');
      var $articleElemOL = $('.article-overlay');
      var $articleClose = $('.article-overlay .close-button');
      var $articleImg = $('#article');
      var articleOverlay = new Overlay($articleLinks, $articleElemOL, $articleClose);
      articleOverlay.init();

      var $article2Links = $('.article2-link');
      var $article2ElemOL = $('.article2-overlay');
      var $article2Close = $('.article2-overlay .close-button');
      var $article2Content = $('.article2__image');
      var article2Overlay = new Overlay($article2Links, $article2ElemOL, $article2Close);
      article2Overlay.init();

      var $article2Left = $('.article2-buttons .leftarrow');
      var $article2Right = $('.article2-buttons .rightarrow');
      var articel2Src = ['img/article2_a.jpg', 'img/article2_b.jpg', 'img/article2_c.jpg'];
      var article2Index = 0;
      function article2Next(){
        article2Index += 1;
        article2Index == articel2Src.length ? article2Index = 0 : null;
      }
      function article2Prev(){
        article2Index -= 1;
        article2Index == -1 ? article2Index = (articel2Src.length - 1) : null;
      }

      function applyNewSlide(){
        $article2Content.each(function(index, image){
          $(image).addClass('article2__image-hidden');
        })

        $($article2Content[article2Index])
        .removeClass('article2__image-hidden');

      }
      function isMobile() {
        try{ document.createEvent("TouchEvent"); return true; }
        catch(e){ return false; }
      }
      if(!isMobile()){
        $.each($article2Content, function(index, image){
          $(image)
          .wrap('<span style="display:inline-block"></span>')
          .css('display', 'block')
          .parent()
          .zoom({
            magnify: 0.6,
            duration: 300,
            touch: true,
            on: "grab"
          });
        })
      }

      $article2Left.click(function(e){
        e.preventDefault();
        article2Prev();
        applyNewSlide();
      })
      $article2Right.click(function(e){
        e.preventDefault();
        article2Next();
        applyNewSlide();
      })


      // $article2Content
      // .wrap('<span style="display:inline-block"></span>')
      // .css('display', 'block')
      // .parent()
      // .zoom({
      //   magnify: 1,
      //   duration: 300,
      //   touch: true,
      //   on: "grab"
      // });

      //setup for zoom plugin
      $articleImg
      .wrap('<span style="display:inline-block"></span>')
      .css('display', 'block')
      .parent()
      .zoom({
        magnify: 1.5,
        duration: 300,
        touch: true,
        on: "grab"
      });
      

      //LAZY LOADING
      var lazyloading= function(callback){
        //load lazy images
        var lazyImages= document.querySelectorAll('img[data-src]');
        Array.prototype.forEach.call(lazyImages,  function(img) {
          $(img).css('display', 'none');
          img.setAttribute('src', img.getAttribute('data-src'));
          img.onload = function() {
            $(img).fadeIn(2000);
          };
        });


        function loadSliderImages(){
          var slickLazyImages= document.querySelectorAll('img[data-src-slider]');
          Array.prototype.forEach.call(slickLazyImages,  function(img) {
            img.setAttribute('src', img.getAttribute('data-src-slider'));
            img.onload = function() {
            };
          });
        }


        //load background images
        var lazybackgroundImages= document.getElementsByClassName('lazy-load');
        var lazybackgroundFallback= document.getElementsByClassName('lazy-load-fallback');
        var bgimagescount = 0;
        Array.prototype.forEach.call(lazybackgroundImages, function(lazydiv){

          var src = $(lazydiv).attr('data-background');
          img = new Image();
          img.src = src;
          img.onload= function() {
            $(lazydiv).css('background-image', 'url("'+src+'")');
            $(img).remove();
            $(lazydiv).css('display', 'none');
            $(lazydiv).fadeIn(2000);
            bgimagescount++;

            if(bgimagescount==lazybackgroundImages.length){
              loadSliderImages();
            }
          };
        });
        callback();
      }

      lazyloading(imagesready);




      //FOOTER COPYRIGHT
      var date = new Date().getFullYear();
      $('<p>').text("© " + date + " Rika Hemmi. All rights reserved.").appendTo('footer');


    });
