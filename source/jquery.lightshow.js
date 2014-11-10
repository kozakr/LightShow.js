/*
 * LightShow.js v0.7-beta
 * http://romankozak.cz 
 *
 * Copyright (c) 2014 Roman Kozák
 */

(function($) {
  
  $.fn.lightshow = function(options) {

    var settings = $.extend({
      autoplay        : true,    // (boolean) animate automatically 
      pause           : true,    // (boolean) pause on hover 
      duration        : 3000,    // (integer) single slide duration, in milliseconds 
      animation       : 500,     // (integer) animation duration, in milliseconds
      transition      : "fade",  // (string)  transition between slides (fade, slide)
      controls        : true,    // (boolean) show controls 
      big_controls    : false,   // (boolean) big controls - half of an image
      title           : false,   // (boolean) show title from 'data-title' attribute of <li>
      change_url      : false,   // (boolean) put current slide number into url
      keyboard        : false,   // (boolean) enables keyboard navigation - left and right arrow

      responsive      : false,   // (boolean) LightShow is responsive by default, but sometimes big controls aren't as big as they should be - this corrects them
      different_sizes : false,   // (boolean) set to true if your slides have different sizes (fixes transitions between them)

      after_autoplay  : function() {}, // callback function after slide is changed by autoplay
      after_next      : function() {}, // callback function after next button is clicked
      after_prev      : function() {} // callback function after prev button is clicked
    }, options);

    function button_next_click(content) {
      if(!content.find('li').is(':animated'))
      {
        var first = content.find('li:first-child');
        var next = first.next('li');

        switch(settings.transition)
        {
          case "fade":
            first
              .fadeOut(settings.animation);
            if(settings.different_sizes)
              next.fadeIn(settings.animation);
            else
              next.show();
            break;
          case "slide":
            first
              .animate({ left: "-100%" }, settings.animation, function() { $(this).css("left", "0").hide(); });
             next.css("left", "100%").show().animate({ left: "0" }, settings.animation);
            break;
        }
        first.appendTo(content);
        if(settings.change_url) 
          window.location.hash = "#slide" + next.data('index');
      }
    }

    function button_prev_click(content) {
      if(!content.find('li').is(':animated'))
      {
        var first = content.find('li:first-child');
        var prev = content.find('li:last-child');

        switch(settings.transition)
        {
          case "fade":
            first
              .fadeOut(settings.animation);
            if(settings.different_sizes)
              prev.fadeIn(settings.animation);
            else
              prev.show();
            break;
          case "slide":
            first
              .animate({ left: "100%" }, settings.animation, function() { $(this).css("left", "0").hide(); });
            prev.css("left", "-100%").show().animate({ left: "0" }, settings.animation);
            break;
        }
        prev.prependTo(content);
        if(settings.change_url) 
          window.location.hash = "#slide" + prev.data('index');
      }
    }

    this.each(function(index) {
      var $this = $(this);

      var content = $this.find('ul');
      var lis = content.find('li');

      $this.addClass("lightshow-wrapper");
      
      lis.each(function(index) {
        $(this).data("index", index);
      });



      if(settings.change_url){
        var i = window.location.hash.substr(6);
        content.find('li:eq('+i+')').show();
        content.find('li:lt('+i+')').appendTo(content);
      } else {
        content.find('li:first-child').show();
      }

      // autoplay
      if(settings.autoplay) {
        settings.duration += settings.animation;
        setInterval(function() { 
          if(!(settings.pause && $this.is(':hover'))) 
          {
            button_next_click(content);
            if(typeof options.after_autoplay == 'function')
              options.after_autoplay.call(this);
          }
        }, settings.duration);
      }

      // controls
      if(settings.controls) {
        var sirka = $this.find("li").outerWidth();
        if(settings.responsive || !(sirka > 0))
          sirka = "40%";
        else
          sirka = (sirka/2)-30 + "px";
        var vyska = $this.find("li").outerHeight();

        var button_next = $("<div/>", { class: "lightshow-next" }).appendTo($this);
        var button_prev = $("<div/>", { class: "lightshow-prev" }).appendTo($this);
        
        var top = (vyska/2 - 30) + "px";
        if(top > 0)
        {
          button_next.css("top", top);
          button_prev.css("top", top);
        }

        if(settings.big_controls)
        {
          var css = { 
            height: vyska + "px",
            width: sirka
          }

          button_next.addClass("lightshow-big").css(css);
          button_prev.addClass("lightshow-big").css(css);
        }

        button_next.click(function() {
          button_next_click(content);
          if(typeof options.after_next == 'function')
            options.after_next.call(this);
        });

        button_prev.click(function() {
          button_prev_click(content);
          if(typeof options.after_prev == 'function')
            options.after_prev.call(this);
        });
      }

      if(settings.keyboard)
      {
        $(document).keydown(function(e) {
          switch(e.which) {
              case 39: 
                button_next_click(content);
                if(typeof options.after_prev == 'function')
                  options.after_prev.call(this);
                break;

              case 37:
                button_prev_click(content);
                if(typeof options.after_next == 'function')
                  options.after_next.call(this);
                break;

              default: 
                return;
          }
          e.preventDefault();
        });
      }

      // title
      if(settings.title)
      {
        content.find("li").each(function() {
          var $this = $(this),
              title = $this.data("title");
          $("<div/>", { class: "lightshow-title" }).text(title).appendTo($this);
        });
      }

    });
    
    return this;

  };

}(jQuery));


