/*
 * LightShow.js v0.4
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
      title        : false    // (boolean) show title from 'data-title' attribute of <li>
    }, options);

    this.each(function() {
      var $this = $(this);

      var content = $this.find('ul');

      $this.addClass("lightshow-wrapper");
      $this.find('li:first-child').show();

      // autoplay
      if(settings.autoplay) {
        settings.duration += settings.animation;
        setInterval(function() { 
          if(!(settings.pause && $this.is(':hover'))) {
            var first = content.find('li:first-child');
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
            first
              .next('li').show()
              .end().appendTo(content);
          }
        }, settings.duration);
      }

      // controls
      if(settings.controls) {
        var sirka = $this.find("li").outerWidth();
        var vyska = $this.find("li").outerHeight();

        var next = $("<div/>", { class: "lightshow-next" }).appendTo($this);
        var prev = $("<div/>", { class: "lightshow-prev" }).appendTo($this);
        
        var top = (vyska/2 - 30) + "px";
        if(top > 0)
        {
          next.css("top", top);
          prev.css("top", top);
        }

        if(settings.big_controls)
        {
          var css = { 
            height: vyska + "px",
            width: (sirka/2)-20 + "px"
          }

          next.addClass("lightshow-big").css(css);
          prev.addClass("lightshow-big").css(css);
        }

        next.click(function() {
          if(!content.find('li').is(':animated'))
          {
            var first = content.find('li:first-child');
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
            first
              .next('li').show()
              .end().appendTo(content);
          }
        });

        prev.click(function() {
          if(!content.find('li').is(':animated'))
          {
            var first = content.find('li:first-child');
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
            content.find('li:last-child').show()
              .prependTo(content);
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


