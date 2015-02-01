LightShow.js
============

A lightweight slideshow for jQuery.

## Instalation
Just copy files from source folder to your project. Images should be in the same folder as jquery.lightshow.css.

Then add these two lines into ```<head>``` of your page.
```html
<script src="../source/jquery.lightshow.js"></script>
<link href="../source/jquery.lightshow.css" rel="stylesheet">
```

Your slideshow has to have this structure.
```html
<div class="lightshow">
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
