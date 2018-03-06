//SLICK
 $('.slides').slick({
   lazyLoad: 'ondemand',
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



