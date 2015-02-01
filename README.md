LightShow.js
============

A lightweight slideshow for jQuery.

## Instalation
Just copy files from the ```source``` folder into your project. Images should be in the same folder as ```jquery.lightshow.css```.

Then add these two lines into ```<head>``` section of your page.
```html
<script src="js/jquery.lightshow.js"></script>
<link href="css/jquery.lightshow.css" rel="stylesheet">
```

## Usage
Your slideshow has to have this structure.
```html
<div class="my-slideshow">
	<ul>
		<li data-title="Example title 1">
			<img src="images/1.jpg" alt="">
		</li>
		<li data-title="Example title 2">
			<img src="images/2.jpg" alt="">
		</li>
	</ul>
</div>
```
There can be anything inside the ```<li>```...```</li>```, not just a single image.

The only thing left to do is triggering the LightShow. This will run it with default settings.
```js
$(document).ready(function() {
	$('.lightshow').lightshow();
});
```

## Options
LightShow comes with several options. These are their default values.
```js
$(document).ready(function() {
	$('.lightshow').lightshow({
		autoplay        : true,    // (boolean) animate automatically 
		pause           : true,    // (boolean) pause on hover 
		duration        : 3000,    // (integer) single slide duration, in milliseconds 
		animation       : 500,     // (integer) animation duration, in milliseconds
		transition      : "fade",  // (string)  transition between slides (fade, slide)
		controls        : true,    // (boolean) show controls 
		big_controls    : false,   // (boolean) big controls - half of an image
		circles         : true,    // (boolean) jumping between slides using little circles below LightShow
		title           : false,   // (boolean) show title from 'data-title' attribute of <li>
		change_url      : false,   // (boolean) put current slide number into url
		keyboard        : false,   // (boolean) enables keyboard navigation - left and right arrow

		responsive      : false,   // (boolean) LightShow is responsive by default, but sometimes big controls aren't as big as they should be - this corrects them
		different_sizes : false,   // (boolean) set to true if your slides have different sizes (fixes transitions between them)

		after_autoplay  : function() {}, // callback function after slide is changed by autoplay
		after_next      : function() {}, // callback function after next button is clicked
		after_prev      : function() {} // callback function after prev button is clicked
	});
});
```

## Troubleshooting
### Responsive design
If your encounter problems with the size of LightShow on a responsive website, trigger it after page is fully loaded like this.
```js
$(window).load(function() {
	$('.lightshow').lightshow();
});
```

Also, it may be necessary to set the ```responsive``` option to ```true``` when using ```big_controls```.
