var formPath;
var pathname = window.location.pathname;

function createCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function getParam(p) {
  var match = RegExp("[?&]" + p + "=([^&]*)").exec(window.location.search);
  return match && decodeURIComponent(match[1].replace(/\+/g, " "));
}

// On Document Ready
$(function () {
  //

  // Video
  $(".video-play[data-magnific]").magnificPopup({
    type: "iframe",
    iframe: {
      patterns: {
        youtube: {
          index: "youtube.com/",
          id: "v=",
          src: "//www.youtube.com/embed/%id%?autoplay=1&rel=0",
        },
        vimeo: {
          index: "vimeo.com/",
          id: "/",
          src: "//player.vimeo.com/video/%id%?autoplay=1",
        },
      },
    },
  });

  // Smooth Scroll
  $(".smooth-scroll").click(function () {
    var $this = $(this);
    $("html, body").animate(
      {
        scrollTop: $($this.attr("href")).offset().top,
      },
      500
    );
  });

  // Min Header
  $(window).scroll(function () {
    var nav = $(".navbar");
    // Is at top
    if ($(window).scrollTop() === 0 && nav.hasClass("min-header")) {
      nav.removeClass("min-header");
      $("#scroll-nav-logo").hide();
      $(".fixed-top-no-nav").addClass("fixed-top-margin");

      // Is not
    } else {
      nav.addClass("min-header");
      $("#scroll-nav-logo").show();
      $(".fixed-top-no-nav").removeClass("fixed-top-margin");
    }
  });
  if ($(window).scrollTop() > 0) {
    $(".navbar").addClass("min-header");
  }

  $(document).on("click", ".read-more-trigger", function () {
    var $this = $(this);
    $this.hide();
    $readmore = $this
      .closest(".read-more-boundary")
      .find(".read-more")
      .fadeIn();
  });

  // Navbar Submenu Animation
  $(".navbar .dropdown")
    .on("show.bs.dropdown", function () {
      var $this = $(this);
      var $menu = $this.find(".dropdown-menu");
      var $items = $this.find(".dropdown-menu .dropdown-item");

      TweenMax.set($menu, { height: "auto", ease: Expo.easeOut });
      TweenMax.from($menu, 0.5, { height: 0 });

      TweenMax.staggerTo(
        $items,
        0.5,
        {
          autoAlpha: 1,
          ease: Back.easeOut,
          delay: 0.3,
        },
        0.1
      );
    })
    .on("hide.bs.dropdown", function () {
      var $this = $(this);
      var $menu = $this.find(".dropdown-menu");
      var $items = $this.find(".dropdown-menu .dropdown-item");

      TweenMax.staggerTo(
        $items,
        0.5,
        {
          autoAlpha: 0,
          ease: Back.easeOut,
        },
        -0.1
      );

      TweenMax.to($menu, 0.5, { height: 0, ease: Expo.easeOut, delay: 0.3 });
    });

  // ------------------------- Analytic Goals ---------------------------------

  // Tracking strategy session
  $(".fp-session").click(function (e) {
    e.preventDefault();
    var href = $(this).attr("href");

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "gaEvent",
      eventCategory: "Session",
      eventAction: "Click",
      eventLabel: "Initiate",
    });

    setTimeout(function () {
      window.location = href;
    }, 300);
  });

  $(".mform-next").click(function () {
    var $this = $(this);
    var $fieldset = $(this).closest("fieldset");

    var eventLabel = $fieldset.find("h3").text();
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "gaEvent",
      eventCategory: "Session",
      eventAction: "Click",
      eventLabel: "eventLabel",
    });
  });

  // Tracking tel: and mailto:
  $("[href*='tel:'], [href*='mailto:']").click(function (e) {
    e.preventDefault();
    var href = $(this).attr("href");

    // tel:
    if (href.toLowerCase().indexOf("tel:") >= 0) {
      eventCategory = "Call";
      eventLabel = href.replace("tel:", "");
    }

    // mailto:
    if (href.toLowerCase().indexOf("mailto:") >= 0) {
      eventCategory = "Email";
      eventLabel = href.replace("mailto:", "");
    }

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "gaEvent",
      eventCategory: eventCategory,
      eventAction: "Click",
      eventLabel: eventLabel,
    });

    setTimeout(function () {
      window.location = href;
    }, 300);
  });

  // Store GCLID value
  function assignGclidToCookie() {
    var value = getParam("gclid");
    if (value) {
      createCookie("gclid", value, 365);
    }
  }
  assignGclidToCookie();

  // -------------------------- Promo Popup -----------------------------------

  // Promotion Popup
  if (typeof ouibounce !== "undefined" && $("#promo-popup").length > 0) {
    var openPromoPopup = ouibounce(false, {
      sensitivity: 10,
      aggressive: true,
      callback: function () {
        var cookieName = "fp_promo_popup";
        var cookieVal = "1";
        var cookieDur = 7;
        // Checked if user has been presented with popup before
        if (readCookie(cookieName) != cookieVal) {
          // Open Popup
          $.magnificPopup.open({
            items: {
              src: "#promo-popup",
              type: "inline",
            },
            callbacks: {
              open: function () {
                // Save in cookie to prevent further popups
                createCookie(cookieName, cookieVal, cookieDur);
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                  event: "gaEvent",
                  eventCategory: "Exit Popup",
                  eventAction: "Show",
                  eventLabel: "Free eBook (Popup)",
                });
              },
            },
          });
        }
      },
    });
  }
  $(document).on("click", ".mp-close-popup", function (e) {
    e.preventDefault();
    $.magnificPopup.close();
  });

  $(".open-popup-link").magnificPopup({
    type: "inline",
  });

  // -------------------------- Floating Form----------------------------------

  if ($(".floating-form").length > 0) {
    var setFloatingForm = function (elem) {
      var $this = elem;
      /* -- Always Display --
            var cookieName = 'fp_float_form';
            var cookieVal  = '1';
    
            // Checked if user has used the form before
            if (readCookie(cookieName) != cookieVal) {
                $this.fadeIn(300);
            } else {
                $this.hide();
            }
            */
      $this.fadeIn(300);

      $this.find(".float-close").click(function () {
        $this.fadeOut(150);
      });
    };
    setFloatingForm($(".floating-form"));
  }

  // -------------------------- Quote Form Handler ----------------------------
  window.Parsley.addValidator("websiteCheck", {
    validateString: function (value) {
      return value.indexOf(window.location.hostname.replace("www.", "")) === -1
        ? value
        : false;
    },
    requirementType: "string",
    messages: {
      en: "Please enter your website, not ours :)",
    },
  });

  $(".quote-form form")
    .on("keyup keypress", function (e) {
      var keyCode = e.keyCode || e.which;
      if (keyCode === 13) {
        e.preventDefault();
        return false;
      }
    })
    .parsley();
  $(".form-continue").click(function () {
    var $this = $(this);
    var $step = $this.closest(".form-step");
    var $space = $this.closest(".form-space");
    var $next = $step.next(".form-step");

    var $inputs = $step.find("input[required]");
    if ($inputs.length > 0) {
      $inputs.parsley().validate();
      if ($inputs.parsley().isValid()) {
        // Continue to the next section
        $(".banner-img-mb ").css("margin-bottom", "60px");
        $space.find(".form-hide").fadeOut("fast");
        $step.fadeOut("fast", function () {
          $next.fadeIn("fast");
        });
        // scroll to top
        $("html, body").animate(
          {
            scrollTop: 0,
          },
          "slow"
        );
      }
    } else {
      // Continue to the next section
      $space.find(".form-hide").fadeOut("fast");
      $step.fadeOut("fast", function () {
        $next.fadeIn("fast");
      });
    }
  });

  // Handle Form
  $(
    ".home .form-continue, .page-content-removal-australia .form-continue"
  ).click(function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      "slow"
    );
  });
  $(document).on("click", 'form.fp-form button[type="submit"]', function () {
    var $this = $(this);
    var $form = $this.closest("form.fp-form");

    if ($form.length > 0) {
      $form.parsley().validate();

      if ($form.parsley().isValid()) {
        var $currentstep = $form.find(".form-step:visible");
        var $thankyou = $form.find(".form-thankyou");
        console.log("123");

        // Add Spinner
        //$this.append(' <i class="fa fa-spinner fa-spin"></i>');
        $this.html('Generating... <i class="fa fa-spinner fa-spin"></i>');
        //console.log('*** Form 1 ***');

        // Send Ajax
        $.ajax({
          url: wpSiteUrl + "/action/hubspot/submit.php",
          type: "post",
          dataType: "json",
          data: $form.serialize() + "&lead_sitename=" + wpSiteName,
          success: function (data) {
            $this.html('Redirecting... <i class="fa fa-spinner fa-spin"></i>');

            var result = data.result;
            // Regardless if it's successful, otherwise: if (result == "success") {

            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
              event: "formSubmissionSucess",
              eventCategory: "Form Submission",
              eventAction: formPath,
              eventLabel: "Submitted-" + pathname,
            });

            // Check Product Type
            if ($form.find("input[name=lead_producttype]").val() == "traffic") {
              var cookieName = "fp_float_form";
              var cookieVal = "1";
              var cookieDur = 180;

              // Save in cookie to prevent further popups
              createCookie(cookieName, cookieVal, cookieDur);
            }

            // If Redirect URL exists
            if (!!$form.attr("action")) {
              window.location.href = $form.attr("action");

              // If Thank You step exists
            } else if ($thankyou.length > 0) {
              $currentstep.fadeOut("fast", function () {
                $thankyou.fadeIn();
              });

              if (
                typeof gaIdLabel !== "undefined" &&
                typeof gtag !== "undefined"
              ) {
                gtag("event", "conversion", { send_to: gaIdLabel });
              }
            }

            return false;
          },
        });

        return false;
      }
    }
  });

  // ---------------------------- Proposal Form ------------------------------
  $(document).on("keyup keypress", ".proposal-popup form", function (e) {
    var keyCode = e.keyCode || e.which;
    if (keyCode === 13) {
      e.preventDefault();
      return false;
    }
  });
  tippy(".show-popup-form", {
    html: ".embed-popup-form",
    trigger: "click",
    interactive: true,
    arrow: true,
    placement: "bottom",
    flip: false,
    animation: "shift-toward",
    inertia: true,
    distance: 15,
    arrowTransform: "scaleX(1.5)",
  });
  tippy(".show-popup-form-2", {
    html: ".embed-popup-form-2",
    trigger: "click",
    interactive: true,
    arrow: true,
    placement: "bottom",
    flip: false,
    animation: "shift-toward",
    inertia: true,
    distance: 15,
    arrowTransform: "scaleX(1.5)",
  });
  tippy(".show-popup-form-3", {
    html: ".embed-popup-form-3",
    trigger: "click",
    interactive: true,
    arrow: true,
    placement: "bottom",
    flip: false,
    animation: "shift-toward",
    inertia: true,
    distance: 15,
    arrowTransform: "scaleX(1.5)",
  });
  // Will remove these later
  tippy(".show-proposal-popup", {
    html: "#proposal-popup-form",
    trigger: "click",
    interactive: true,
    arrow: true,
    placement: "bottom",
    flip: false,
    animation: "shift-toward",
    inertia: true,
    distance: 15,
    arrowTransform: "scaleX(1.5)",
  });
  tippy(".show-orm-popup", {
    html: "#orm-popup-form",
    trigger: "click",
    interactive: true,
    arrow: true,
    placement: "bottom",
    flip: false,
    animation: "shift-toward",
    inertia: true,
    distance: 15,
    arrowTransform: "scaleX(1.5)",
  });
  tippy(".show-pcw-popup", {
    html: "#pcw-popup-form",
    trigger: "click",
    interactive: true,
    arrow: true,
    placement: "bottom",
    flip: false,
    animation: "shift-toward",
    inertia: true,
    distance: 15,
    arrowTransform: "scaleX(1.5)",
  });
  tippy(".show-reseller-popup", {
    html: "#reseller-popup-form",
    trigger: "click",
    interactive: true,
    arrow: true,
    placement: "bottom",
    flip: false,
    animation: "shift-toward",
    inertia: true,
    distance: 15,
    arrowTransform: "scaleX(1.5)",
  });
  // Workaround for Proposal Form submission
  $(document).on("submit", ".proposal-popup form", function (e) {
    var $this = $(this);

    $this
      .find('button[type="submit"]')
      .html('Submit <i class="fa fa-spinner fa-spin"></i>');
    //console.log('*** Form 2 ***');

    $this.parsley().validate();
    if ($this.parsley().isValid()) {
      return true;
    }

    $this.find('button[type="submit"]').html("Submit");
    return false;
  });

  // -------------------------- Blog Comment Reply ----------------------------
  // Blog Comment Toggler
  $(".btn-comment-reply").click(function () {
    var $this = $(this);
    $this
      .closest(".blog-comment")
      .children(".comment-box")
      .fadeToggle("fast", "linear");
  });

  // --------------------------- Multi Step Form ------------------------------
  // Countdown Timer
  if ($(".countdown-cont").length > 0) {
    function countdown(element, minutes, seconds) {
      var $this = element;
      var $bar = $this.find(".countdown-bar > span");
      var $timer = $this.find(".countdown-timer");

      // Set time
      var time = minutes * 60 + seconds;
      $bar
        .stop(true, false)
        .css("width", (time / 300) * 100 + "%")
        .animate({ width: "0%" }, time * 1000, "linear");

      // Count down
      var interval = setInterval(function () {
        // Reset when it reach 10s
        if (time <= 10) {
          setTimeout(function () {
            countdown($this, 3, 30);
          }, 1000);
          clearInterval(interval);
          return;
        }

        var minutes = Math.floor(time / 60);
        var seconds = time % 60;
        if (seconds < 10) seconds = "0" + seconds;
        var text = minutes + ":" + seconds;

        $timer.html(text);
        time--;
      }, 1000);
    }
    countdown($(".countdown-cont"), 4, 30);
  }

  // Multi Step Form
  if ($(".mform").length > 0) {
    var animating; // Flag to prevent quick multi-click glitches
    var mformAnimate = function (current, destination, is_next) {
      // Show the destination fieldset
      current.removeClass("shown");
      destination.show();

      // Hide the current fieldset with style
      current.animate(
        { opacity: 0 },
        {
          step: function (now, mx) {
            var left, opacity, scale; // Fieldset properties which we will animate

            // Next
            if (is_next) {
              // As the opacity of current_fs reduces to 0 - stored in "now"
              // 1. Scale current down to 80%
              scale = 1 - (1 - now) * 0.2;
              // 2. Bring next from the right(50%)
              left = now * 50 + "%";
              // 3. Increase opacity of next to 1 as it moves in
              opacity = 1 - now;
              current.css({ transform: "scale(" + scale + ")" });
              destination.css({ left: left, opacity: opacity });

              // Previous
            } else {
              // As the opacity of current_fs reduces to 0 - stored in "now"
              // 1. Scale previous from 80% to 100%
              scale = 0.8 + (1 - now) * 0.2;
              // 2. Take current to the right(50%) - from 0%
              left = (1 - now) * 50 + "%";
              // 3. Increase opacity of previous to 1 as it moves in
              opacity = 1 - now;
              current.css({ left: left });
              destination.css({
                transform: "scale(" + scale + ")",
                opacity: opacity,
              });
            }
          },
          duration: 800,
          complete: function () {
            current.hide().css({ transform: "scale(1)" });
            destination.addClass("shown");
            animating = false;

            // If less than tablet size, do auto smooth scroll
            var w = $(window).width();
            if (w < 768) {
              $("html, body").animate(
                {
                  scrollTop: $(".mform-progressbar").offset().top - 25,
                },
                500
              );
            }
          },
          // This comes from the custom easing plugin
          easing: "easeInOutBack",
        }
      );
    };

    // Progress Next
    $(".mform-next").click(function () {
      if (animating) return false;
      animating = true;

      current = $(this).closest("fieldset");
      destination = current.next();

      // Activate next step on progressbar using the index of next_fs
      $(".mform-progressbar li")
        .eq($(".mform fieldset").index(destination))
        .addClass("active");

      mformAnimate(current, destination, true);
    });

    // Progress Previous
    $(".mform-prev").click(function () {
      if (animating) return false;
      animating = true;

      var current = $(this).closest("fieldset");
      var destination = current.prev();

      // De-activate current step on progressbar
      $(".mform-progressbar li")
        .eq($(".mform fieldset").index(current))
        .removeClass("active");

      mformAnimate(current, destination, false);
    });

    // Re-Progress
    $(document).on("click", ".mform-progressbar li.active", function () {
      // Check if this is the last active element
      var $this = $(this);
      if (!$this.next("li").hasClass("active")) return false;

      if (animating) return false;
      animating = true;

      current = $(".mform fieldset.shown");
      destination = $(".mform fieldset").eq(
        $(".mform-progressbar li").index($this)
      );

      // De-activate current step on progressbar
      $this.nextAll().removeClass("active");

      mformAnimate(current, destination, false);
    });

    // Highlight Selection
    $(".mform-selection .mform-select").click(function () {
      var $this = $(this);
      var $parent = $this.closest(".mform-selection");

      if ($parent.hasClass("single-select")) {
        $this.addClass("selected");
        $this.siblings().removeClass("selected");
      } else {
        $this.toggleClass("selected");
        $selectedItems = $parent.find(".selected");
        $parent
          .next(".mform-btn-nav")
          .prop("disabled", $selectedItems.length == 0);
      }
      return false;
    });

    // Rangeslider
    $('.mform input[type="range"]')
      .rangeslider({
        polyfill: false,
        onInit: function () {
          var $handle = $(".rangeslider__handle", this.$range);
          $handle[0].textContent = "$" + this.value;
        },
      })
      .on("input", function (e) {
        var $handle = $(".rangeslider__handle", e.target.nextSibling);
        $handle[0].textContent =
          "$" + this.value + (this.value == 250000 ? "+" : "");
      });

    // Form Submit
    if ($("#session-booking-form").length > 0) {
      $("#session-booking-form")
        .parsley()
        .on("form:submit", function () {
          // Capture User Details
          var booking_date = $("#date_booking1").val();
          var booking_time = $("select[name=rangetime1] option:selected").val();

          var n_booking_time = booking_time.substr(
            0,
            booking_time.indexOf(" - ")
          );
          var n_booking_date = moment(
            booking_date + " " + n_booking_time,
            "DD.MM.YYYY HH:mm"
          ).format("MMMM DD YYYY HH:mm:ss");
          var n_booking_date_text = moment(booking_date, "DD.MM.YYYY").format(
            "DD MMMM YYYY"
          );

          var data = {
            lead_name: $("#lead_name").val(),
            lead_lname: $("#lead_lname").val(),
            lead_email: $("#lead_email").val(),
            lead_phone: $("#lead_phone").val(),
            lead_company: $("#lead_company").val(),
            lead_website: $("#lead_website").val(),
            lead_formname: $("#lead_formname").val(),
            lead_language: $("#lead_language").val(),
            lead_formtype: "hs_booking_form",
            lead_booking_date: n_booking_date,
            lead_booking_time: n_booking_time,
            lead_booking_date_text: n_booking_date_text,
            lead_booking_time_text: booking_time,
            lead_sitename: wpSiteName,
          };

          // Capture User Selections
          var selections = $(".mform-selection");
          for (var i = 0; i < selections.length; i++) {
            var $selection = $(selections[i]);
            var selectedValues = $selection
              .find(".selected .mform-select-value")
              .map(function () {
                return $.trim($(this).text());
              })
              .get();
            data[$selection.attr("data-field")] = selectedValues.join(", ");
          }

          // Submit to WPGlucose Form via Ajax
          if (!!booking_date) {
            // It will get rejected anyway by the next step
            $.ajax({
              type: "POST",
              url: wpSiteUrl + "/action/hubspot/submit.php",
              data: data,
            }).done(function () {
              // Nothing
            });
          }

          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: "sessionSubmissionSucess",
          });

          // Copy Data to Booking Fields and submit it
          $(".wpbc_structure_form input[name=name1]").val(data.wpg_name);
          $(".wpbc_structure_form input[name=lastname1]").val(data.wpg_lname);
          $(".wpbc_structure_form input[name=email1]").val(data.wpg_email1);
          $(".wpbc_structure_form input[name=phone1]").val(data.wpg_phone);
          $(".wpbc_structure_form input[name=company1]").val(data.wpg_company);
          $(".wpbc_structure_form input[name=website1]").val(data.wpg_website);
          $(".wpbc_structure_form input[name=marketing_used1]").val(
            data.wpg_marketing_used
          );
          $(".wpbc_structure_form input[name=describe_me1]").val(
            data.wpg_describe_me
          );
          var booking_form = document.getElementById("booking_form1");
          mybooking_submit(booking_form, 1, "en_AU");

          return false;
        });
    }
  }

  // Form Submit
  if ($("#new-session-form").length > 0) {
    $("#new-session-form")
      .parsley()
      .on("form:submit", function () {
        var $this = $(this)[0].$element;

        // Add Spinner
        $this
          .find(".mform-btn-submit")
          .append(' <i class="fa fa-spinner fa-spin"></i>');
        //console.log('*** Form 3 ***');

        // Capture User Details
        var data = {
          lead_name: $("#lead_name").val(),
          lead_email: $("#lead_email").val(),
          lead_phone: $("#lead_phone").val(),
          lead_company: $("#lead_company").val(),
          lead_website: $("#lead_website").val(),
          lead_message: $("#lead_message").val(),
          lead_formname: $("#lead_formname").val(),
          lead_language: $("#lead_language").val(),
          lead_formtype: "hs_booking_form",
          lead_sitename: wpSiteName,
        };

        // Capture User Selections
        var selections = $(".mform-selection");
        for (var i = 0; i < selections.length; i++) {
          var $selection = $(selections[i]);
          var selectedValues = $selection
            .find(".selected .mform-select-value")
            .map(function () {
              return $.trim($(this).text());
            })
            .get();
          data[$selection.attr("data-field")] = selectedValues.join(", ");
        }

        // Submit to WPGlucose Form via Ajax
        $.ajax({
          type: "POST",
          url: wpSiteUrl + "/action/hubspot/submit.php",
          data: data,
        }).done(function () {
          var result = data.result;

          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: "sessionSubmissionSucess",
          });

          // If Redirect URL exists
          if (!!$this.attr("action")) {
            window.location.href = $this.attr("action");
          }
        });

        return false;
      });
  }
  // FAQ section

  // let allCollapses = $(".section-faq .collapse");
  // let allSigns = $(".section-faq .accordion-sign");

  // $("#accordion .card").on("click", function () {
  //   allCollapses.slideUp();
  //   allSigns.html("+");

  //   var currentCollapse = $(this).find(".collapse");
  //   var currentSign = $(this).find(".accordion-sign");

  //   if (currentCollapse.css("display") !== "block") {
  //     $(this).find(".collapse").slideDown();
  //     currentSign.html("-");
  //   }
  // });
});

// Menu
$(window).on("resize", function () {
  if ($(window).width() < 992) {
    // $(".mobile-go-back").hide();
    $(".navbar-nav .dropdown").click(function (event) {
      event.stopPropagation();
      $(this).children(".dropdown-toggle").hide();
      $("#goBackMain").show();
      $(".navbar-nav .nav-item-main").not(this).hide();
      $(this).children(".dropdown-menu").addClass("show").css("height", "auto");
    });
    $(".megamenu-li>.dropdown-toggle").click(function () {
      $(".mega-dropdown-menu").hide();
    });
    $(".megamenu-heading:not(.megamenu-heading-results)").click(function (
      event
    ) {
      event.stopPropagation();
      $(this).next(".mega-dropdown-menu").show();
      $(".megamenu-heading").hide();
      $("#goBackServices").show();
      $("#goBackMain").hide();
    });
    $("#goBackMain").click(function (event) {
      event.stopPropagation();
      $(".navbar-nav .nav-item-main").show();
      $(".nav-link").show();
      $(".dropdown-menu").removeClass("show").css("height", "0");
      $(this).hide();
    });
    $("#goBackServices").click(function (event) {
      event.stopPropagation();
      $(".megamenu .megamenu-heading").show();
      $(".mega-dropdown-menu").hide();
      $(this).hide();
      $("#goBackMain").show();
    });
    $(".navbar-collapse").on("show.bs.collapse", function () {
      console.log("shown");
    });

    $(".navbar-collapse").on("hidden.bs.collapse", function () {
      console.log("hidden");
      $(".mobile-go-back").hide();
      $(".nav-item-main").show();
      $(".dropdown-toggle").show();
      $(".dropdown-menu").removeClass("show").css("height", "0");
    });
  } else {
    $(".navbar-nav .dropdown-menu").removeClass("show");
    $("#goBackMain").hide();
    $(".mobile-go-back").hide();
  }
});
$(document).ready(function () {
  $(window).trigger("resize");
});

$(function () {
  var url = window.location.href;
  $(".megamenu .dropdown-item").each(function () {
    if ($(this).attr("href") == url) {
      $(this).addClass("link-active");
    }
  });
  console.log(url);
});

jQuery(function ($) {
  $("#filter").submit(function () {
    var filter = $("#filter");
    $.ajax({
      url: filter.attr("action"),
      data: filter.serialize(), // form data
      type: filter.attr("method"), // POST
      beforeSend: function (xhr) {
        filter.find("button").text("Processing..."); // changing the button label
      },
      success: function (data) {
        filter.find("button").text("Apply filter"); // changing the button label back
        $("#response").html(data); // insert data
        // $(".filter-output").append(result);
      },
    });
    return false;
  });
});

$(document).ready(function (e) {
  $(".input-category-filter").on("change", function (e) {
    $("#applyFilter").click();
    var abc = $(this).val();
    console.log(this);
    // var id = $(this).attr("id");
    // console.log(id);
    // $("#" + id).attr("checked", "checked");

    if (this.checked == true) {
      $("#posts-pagination").hide();
      $(".category-filter-button." + abc).show();
      $(this).prop("checked", true);
    } else {
      $(".category-filter-button." + abc).hide();
      $(this).prop("checked", false);
    }
    var checked = $(".input-category-filter:checked");
    if (checked.length === 0) {
      $(".select-to-filter").hide();
      location.reload();
    } else {
      $(".select-to-filter").show();
    }
  });

  $(".category-filter-button").click(function () {
    var id = $(this).attr("id");
    $(".input-category-filter." + id).prop("checked", false);
    $(".custom-control-label." + id).removeClass("checked");
    $(this).hide();
    $("#applyFilter").click();
    var checked = $(".input-category-filter:checked");
    if (checked.length === 0) {
      $(".select-to-filter").hide();
      location.reload();
    } else {
      $(".select-to-filter").show();
    }
  });

  $(".clear-all-filters").click(function () {
    $(".select-to-filter").hide();
    location.reload();
    $(".input-category-filter").prop("checked", false);
    $(".custom-control-label").removeClass("checked");
  });

  $(".custom-control-label").click(function () {
    console.log(this);
    $(this).toggleClass("checked");
  });
});

$("input[name=lead_phone]").live("keypress", function (key) {
  if (key.charCode < 48 || key.charCode > 57) return false;
});

$(function () {
  $('[data-toggle="popover"]').popover();
});

function goToPage(url) {
  $(location).attr("href", url);
}

$(document).ready(function (e) {
  $(".dropdown-parent-link").click(function () {
    var firstSubMenu = $(".dropdown-parent-link")
      .siblings(".dropdown-menu")
      .first();
    console.log(firstSubMenu);
  });
});

//home page comparison section
$(document).ready(function () {
  $("#comparison_fp_read_more_btn").click(function () {
    $("#comparison_fp_hide_content").removeClass("d-none");
    $("#comparison_fp_read_more_btn").removeClass("d-block");
    $("#comparison_fp_read_more_btn").addClass("d-none");
    $("#comparison_fp_read_less_btn").removeClass("d-none");
    $("#comparison_fp_read_less_btn").addClass("d-block d-md-none");
  });

  $("#comparison_other_read_more_btn").click(function () {
    $("#comparison_other_hide_content").removeClass("d-none");
    $("#comparison_other_read_more_btn").removeClass("d-block");
    $("#comparison_other_read_more_btn").addClass("d-none");
    $("#comparison_other_read_less_btn").removeClass("d-none");
    $("#comparison_other_read_less_btn").addClass("d-block d-md-none");
  });

  $("#comparison_fp_read_less_btn").click(function () {
    $("#comparison_fp_read_less_btn").removeClass("d-block");
    $("#comparison_fp_read_less_btn").addClass("d-none");
    $("#comparison_fp_read_more_btn").removeClass("d-none");
    $("#comparison_fp_read_more_btn").addClass("d-block");
    $("#comparison_fp_hide_content").removeClass("d-block");
    $("#comparison_fp_hide_content").addClass("d-none");
  });

  $("#comparison_other_read_less_btn").click(function () {
    $("#comparison_other_read_less_btn").removeClass("d-block");
    $("#comparison_other_read_less_btn").addClass("d-none");
    $("#comparison_other_read_more_btn").removeClass("d-none");
    $("#comparison_other_read_more_btn").addClass("d-block");
    $("#comparison_other_hide_content").removeClass("d-block");
    $("#comparison_other_hide_content").addClass("d-none");
  });
});

function readMoreToggle(id) {
  console.log("read more:" + id);
  $("#toggle-content-" + id).removeClass("d-none");
  $("#read-more-toggle-btn-" + id).removeClass("d-block");
  $("#read-more-toggle-btn-" + id).addClass("d-none");
  $("#read-less-toggle-btn-" + id).removeClass("d-none");
  $("#read-less-toggle-btn-" + id).addClass("d-block d-md-none");
}

function readLessToggle(id) {
  console.log("read less:" + id);
  $("#read-less-toggle-btn-" + id).removeClass("d-block");
  $("#read-less-toggle-btn-" + id).addClass("d-none");
  $("#read-more-toggle-btn-" + id).removeClass("d-none");
  $("#read-more-toggle-btn-" + id).addClass("d-block");
  $("#toggle-content-" + id).removeClass("d-block");
  $("#toggle-content-" + id).addClass("d-none");
}

// $(function (){
//   $( ".buttonFormClick" ).click(function() {
//     var title = $(this).attr('data-title');
//     $('.form-type').each(function( index ) {
//       console.log(title);
//       $('.form-type')[index].value = title;
//     });
//   });
// })

$(function () {
  $(".buttonFormClick").click(function () {
    // var title = $(this).attr('data-title');
    formPath = $(this).attr("data-title");
    $(".form-type").each(function (index) {
      // console.log(title);
      console.log("form path: " + formPath);

      // $('.form-type')[index].value = title;
      $(".form-type")[index].value = formPath;
    });
  });
});

function revenueGrowthOfferGa() {
  gtag("event", "conversion", { send_to: "AW-377531324/LjLSCJXh_PACELzXgrQB" });
}
