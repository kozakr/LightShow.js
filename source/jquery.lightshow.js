/*
 * LightShow.js v0.5-beta
 * http://romankozak.cz 
 *
 * Copyright (c) 2014 Roman Kozák
 */

(function($) {
  
  $.fn.lightshow = function(options) {

    var settings = $.extend({
      autoplay     : true,    // (boolean) animate automatically 
      pause        : true,    // (boolean) pause on hover 
      duration     : 3000,    // (integer) single slide duration, in milliseconds 
      animation    : 500,     // (integer) animation duration, in milliseconds
      transition   : "fade",  // (string)  transition between slides 
      controls     : true,    // (boolean) show controls 
      big_controls : false,   // (boolean) big controls - half of an image
      responsive   : false,   // (boolean) LightShow is responsive by default, but sometimes big controls aren't as big as they should be - this corrects them
      title        : false,   // (boolean) show title from 'data-title' attribute of <li>
      change_url   : false    // (boolean) put current slide number into url
    }, options);

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
          if(!(settings.pause && $this.is(':hover'))) {
            var first = content.find('li:first-child');
            var next = first.next('li');

            switch(settings.transition) {
              case "fade":
                first
                  .fadeOut(settings.animation);
                break;
              case "slide":
                first
                  .animate({ left: "-100%" }, settings.animation, function() { $(this).css("left", "0").hide(); });
                next.css("left", "100%").show().animate({ left: "0" }, settings.animation);
                break;
            }
            next.show();
            first.appendTo(content);
            if(settings.change_url) window.location.hash = "#slide" + next.data('index');
          }
        }, settings.duration);
      }

      // controls
      if(settings.controls) {
        var sirka = $this.find("li").outerWidth();
        if(settings.responsive || !(sirka > 0))
          sirka = "50%";
        else
          sirka = (sirka/2)-20 + "px";
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
          if(!content.find('li').is(':animated'))
          {
            var first = content.find('li:first-child');
            var next = first.next('li');

            switch(settings.transition)
            {
              case "fade":
                first
                  .fadeOut(settings.animation);
                break;
              case "slide":
                first
                  .animate({ left: "-100%" }, settings.animation, function() { $(this).css("left", "0").hide(); })
                  .next('li').css("left", "100%").show().animate({ left: "0" }, settings.animation);
                break;
            }
            next.show();
            first.appendTo(content);
            if(settings.change_url) window.location.hash = "#slide" + next.data('index');
          }
        });

        button_prev.click(function() {
          if(!content.find('li').is(':animated'))
          {
            var first = content.find('li:first-child');
            var prev = content.find('li:last-child');

            switch(settings.transition)
            {
              case "fade":
                first
                  .fadeOut(settings.animation);
                break;
              case "slide":
                first
                  .animate({ left: "100%" }, settings.animation, function() { $(this).css("left", "0").hide(); });
                  content.find('li:last-child').css("left", "-100%").show().animate({ left: "0" }, settings.animation);
                break;
            }
            prev.show().prependTo(content);
            if(settings.change_url) window.location.hash = "#slide" + prev.data('index');
          }
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


