# gpsNav-v2

This is the second version of my first app - gpsNav.

## Updates

Since Version 1 (simply called gpsNav), there have been a number of updates:

1. Fixed a number of glitches that occurred in Version 1 - now the init() function can take any number (and any combination) of properties
2. Added a property called "getPositionOnce" - if this is set to true, the watchPosition() method (GPS tracking) is disabled and instead the visitor's location will only be used *once*
3. Added a new feature that enables the user to change the default image and text (message) displayed to the visitor when there is an error.  This is done by passing the properties 'image' and 'text' *directly* into the 'error' object (more on that later).

## Installing gpsNav

To install gpsNav onto your website/application, please follow the following steps:

1. Paste the following HTML code somewhere in your HTML file(s):

```html
<img src="placeholder.jpg" id="map" />
<span id="error"></span>
```

It would be best if you wrapped these tags inside "p" tags - otherwise it might go all weird.

2. @import the gpsNav.css into your main CSS file(s):

```css
@import url('gpsNav.css');
```

This provides some basic styling for the error message - you can edit this file if you want to re-style your error message.

3. Link the gpsNav.min.js file to your HTML document

This is the most important step!!!

```html
<script src="gpsNav.min.js"></script>
```

4. Initialize the app to get the ball rolling!

```js
gpsNav.init();
```

Of course, you can customize the appearance and behavior of the app by passing specific properties in the init() function.  This will be discussed in detail in the next section.

## Customizing gpsNav

To start the app, simply call gpsNav.init():

```js
gpsNav.init();
```

However, you may find the map a bit too small, or you may find the error message too impolite.  In this case, you can start customizing the app - without altering the code of the app itself!

This is done by passing an object with certain properties inside the init function.  For example:

```js
gpsNav.init({
	p1: "Property Number 1",
	p2: "Property Number 2",
	// ... 
	pn: "Property Number N"
});
```

Of course, this will do nothing to customize the app, but you know what I mean.

The following properties are provided by the app:

1. zoom - this specifies how zoomed in (accurate) the map is.  Passing a value of "1" shows the whole globe; passing a larger value such as "17" gives a really close view of where the visitor is.  Give this property a numeric value.
2. 'width' and 'height' - these two properties specify how large the map should be.  Give these two properties a numeric value (e.g. {width: 400, height: 500})
3. getPositionOnce (NEW in v2) - If, for some reason, you decide not to track the visitor as he/she moves, but simply get and use the visitor's location once, set this property with the *boolean* "true".  This will swap the watchPosition() (GPS tracking) method with the getCurrentPosition() method.
4. error - this is an object.

### Customizing error images and messages

The "error" property is an object that accepts the following properties:

1. image - Specifies the default image to be displayed regardless of the error.
2. text - Specifies the default text to be displayed regardless of the error.  For example "An error occurred.  That's all we know."
3. permissionDenied - this is an object that takes the properties 'image' and 'text' - it is used to specify what image and text should be displayed to the visitor if he/she denies permission for the website/application to use his or her location.
4. positionUnavailable - this also accepts the properties 'image' and 'text' - determines what is to be displayed when the visitor's position is not available.
5. timeout - (Same as 3 and 4)
6. unknownError - (Same as 3 - 5)

For example:

```js
gpsNav.init({
	error: {
		image: "new-default.png", // If specified, this is the new default image that shows up whenever an error occurs.  This is a general property; i.e. it can be overriden by specific cases specified in 'permissionDenied', 'positionUnavailable', etc.
		text: "Sorry, an error occurred.  That's all we know." // If specified, this is the default text that shows up whenever an error occurs.  This is again general.
		permissionDenied: {
			image: "permissionDenied.jpg",
			text: "Sorry, you denied permission for this website to access your location."
		}
	}
});
```

In this case, since only the 'error' object/property is passed into the init function, all other settings remain default (i.e. width is 400px, height is 300px, zoom level is 14 and GPS tracking is on).  However, now the default image is replaced by new-default.png and the default text is replaced by "Sorry, an error occurred.  That's all we know."

Furthermore, since the permissionDenied object/property is defined in this case, when the visitor denies the website's access to his/her location, the image "permissionDenied.jpg" is shown instead of the new default and the text "Sorry, you denied permission for this website to access your location." is shown instead.  For all other errors, the new default image "new-default.png" and the new default text "Sorry, an error occurred.  That's all we know." is shown.

## Example initialization methods

```js
// In this case, the zoom is set to 15, the map is 300px x 500px, the new default image is "new-default.png" and the new default text is "Sorry, an error occurred."

gpsNav.init({
	zoom: 15,
	width: 300,
	height: 500,
	error: {
		image: "new-default.png",
		text: "Sorry, an error occurred."
	}
});
```

```js
// Full initialization method

gpsNav.init({
	getPositionOnce: true,
	zoom: 17,
	width: 500,
	height: 500,
	error: {
		image: "new-default.png",
		text: "Sorry, an error occurred.",
		permissionDenied: {
			image: "permissionDenied.jpg",
			text: "Sorry, you denied permission for this website to use your location."
		},
		positionUnavailable: {
			image: "positionUnavailable.jpg",
			text: "Sorry, your current position is unavailable."
		},
		timeout: {
			image: "timeout.gif",
			text: "Sorry, your location timed out."
		},
		unknownError: {
			image: "unknownError.jpg",
			text: "Sorry, an unknown error occurred."
		}
	}
});
```

## License

This is MIT Licensed.  See LICENSE for details.