module.exports = function() {
  $('.search-form-toggle').on('click', function(e) {
    e.preventDefault();
    $('.search-form-navigation-container').toggleClass('open');
    $('.search-icon').toggleClass('open');
  });

  $('.collapsible-button').on('click', function(e) {
    const button = $(this);
    const button_id = button.attr('aria-controls');
    const panel = $(`#${button_id}`);
    let state = false;

    panel.slideToggle(75, function() {
      state = button.attr('aria-expanded') === 'false' ? true : false;
      button.attr('aria-expanded', state);
      panel.attr('aria-hidden', !state);
    });
  });

  $('.burger').on('click', function() {
    $('.header').toggleClass('menu-open');
    $('.main-content').toggleClass('menu-open');
    $('.mobile-menu-mask').toggleClass('menu-open');
    $('.mobile-menu-button').toggleClass('menu-open');
    $('.burger').toggleClass('menu-open');
  });

  $('.subscribe-modal-summon').on('click', function() {
    $('#subscribe-modal').modal();
    $('.header').toggleClass('newsletter-modal-open');
  });

  $('#subscribe-modal').on($.modal.CLOSE, function(event, modal) {
    $('.header').removeClass('newsletter-modal-open');
  });


  $('.dropdown-toggle').on('click', function() {
    $(this).parent('.dropdown').toggleClass('open');
  });

  $('#btn-search').on('click', function() {
    $('.search-wrapper').toggleClass('open');
  });
};
