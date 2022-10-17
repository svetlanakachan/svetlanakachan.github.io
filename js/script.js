// $(document).ready(function(){
//     $('.carousel__inner').slick({
//         speed: 1200,
//         adaptiveHeight: false,
//         prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
//         nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
//         responsive: [{
//             breakpoint: 991,
//             settings: {
//                 dots: true,
//                 arrows: false
//             }
//         }]
//       });
//   });

$(document).ready(function(){
  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });


  function toggleSlide(item) {
    $(item).each(function(i) {
      $(this).on('click', function(e) {
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      })
    })
  }

  toggleSlide('.catalog-item__link');
  toggleSlide('.catalog-item__back');

  $('[data-modal="consultation"]').on('click', function() {
    $('.overlay, #consultation').fadeIn('slow');
  });

  $('.button_mini').each(function(i) {
    $(this).on('click', function() {
      $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
      $('.overlay, #order').fadeIn('slow');
    })
  });

  $('.modal__close').on('click', function() {
    $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
  })

  validateForms(".consultation .feed-form");
  validateForms("#consultation .feed-form");
  validateForms("#order .feed-form");

  function validateForms(form) {
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2
      },
        phone: "required",
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        name: {
          required: "Пожалуйста, введите свое имя",
          minlength: jQuery.validator.format("Введите {0} символа!")
        },
        phone: "Пожалуйста, введите свой номер телефона",
        email: {
          required: "Пожалуйста, введите свою почту",
          email: "Неправильно введен адрес почты"
        }
      }
    });
  }

  $('form').submit(function(e) {
    e.preventDefault();

    if(!$(this).valid()) {
      return;
    }

    $.ajax({
      type: "POST",
      url: "mailer/send.php",
      data: $(this).serialize()
    }).done(function() {
      $(this).find("input").val("");
      $('#consultation, #order').fadeOut();
      $('.overlay, #thanks').fadeIn('slow');

      $('form').trigger('reset');
    })
    return false;
  })

  $('input[name=phone]').inputmask({"mask": "+38 (999) 999-99-99"});

  $(window).scroll(function() {
    if ($(this).scrollTop() > 1600) {
      $('.pageup').fadeIn();
    } else {
      $('.pageup').fadeOut();
    }
  })

  $("a[href^='#']").on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){
        window.location.hash = hash;
      });
    } 
  });

  setAninationClases();
 
  new WOW().init();
});
  


var slider = tns({
  container: '.carousel__inner',
  items: 1,
  slideBy: 'page',
  nav: true,
  navPosition: 'bottom',
  controls: false,
  autoWidth: false,
  responsive: {
    991: {
      nav: false,
      controlsContainer: '.carousel__controls'
    }
  }
});

function handleAnimationEnd(event) {
  // event.stopPropagation();
  console.log("!!!!!!");
  // this.classList.remove('animate__');
  this.classList.remove('wow');
  // this.classList.add('animate__animated', 'animate__zoomIn');

}

function setAninationClases() {
  let catalogContent = document.querySelectorAll(".catalog__content");
  for(let curCatalog of catalogContent) {
    let durStep = 0;
    let catalogItems = curCatalog.querySelectorAll(".catalog-item");
    for(let item of catalogItems) {
      durStep+=.2;
      item.classList.add('animate__animated', 'animate__zoomIn');
      // item.setAttribute('data-wow-delay', `${durStep}s`);
      item.style.animationDelay = `${durStep}s`;
      item.style.animationDuration = "1s";
    };
  }
  let catalogActiveItems = document.querySelectorAll(".catalog__content_active .catalog-item");

  for(let item of catalogActiveItems) {
    // item.classList.add('wow');
    item.addEventListener('animationend', handleAnimationEnd, {once: true});
    // item.addEventListener("animationend", handleAnimationEnd);
    // item.addEventListener('animationend', () => {
    //   console.log("--------------------");
    //   // item.classList.handleAnimationEnd, {once: false};
    // })
  };  
}

