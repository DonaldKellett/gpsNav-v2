"use strict";

/*
	gpsNav.js
	The main JS file for the gpsNav app
	(c) Donald Leung.  All rights reserved.
	P.S. Do not edit this code unless you are an experienced coder in Javascript - change the settings by passing arguments in the gpsNav.init() function.
*/

// Declaring variables

var zoom,
	width,
	height,
	defaultImage,
	defaultMessage,
	permissionDeniedImage,
	permissionDeniedMessage,
	positionUnavailableImage,
	positionUnavailableMessage,
	timeoutImage,
	timeoutMessage,
	unknownErrorImage,
	unknownErrorMessage,
	getPositionOnce;

// Actual gpsNav app

var gpsNav = {
	init: function(settings) {
		defaultImage = "error.png";
		if (!settings) {
			// If no arguments passed, use default values (listed here)
			zoom = 14;
			width = 400;
			height = 300;
			permissionDeniedImage = defaultImage;
			permissionDeniedMessage = "Permission denied.";
			positionUnavailableImage = defaultImage;
			positionUnavailableMessage = "Position unavailable.";
			timeoutImage = defaultImage;
			timeoutMessage = "Timed out.";
			unknownErrorImage = defaultImage;
			unknownErrorMessage = "An unknown error occurred.";
			getPositionOnce = 0;
		} else {
			if (!settings.getPositionOnce) {
				getPositionOnce = 0;
			} else {
				if (settings.getPositionOnce === true) {
					getPositionOnce = 1;
				} else {
					getPositionOnce = 0;
				}
			}
			if (!settings.zoom) {
				// If user does not modify zoom level, use default
				zoom = 14;
			} else {
				// If user passes a value, use their value
				zoom = settings.zoom;
			}
			if (!settings.width) {
				// Same logic applies here
				width = 400;
			} else {
				// Same logic applies here
				width = settings.width;
			}
			if (!settings.height) {
				height = 300;
			} else {
				height = settings.height;
			}
			if (!settings.error) {
				// Use error default values
				permissionDeniedImage = defaultImage;
				positionUnavailableImage = defaultImage;
				timeoutImage = defaultImage;
				unknownErrorImage = defaultImage;
				permissionDeniedMessage = "Permission denied.";
				positionUnavailableMessage = "Position unavailable.";
				timeoutMessage = "Timed out.";
				unknownErrorMessage = "An unknown error occurred.";
			} else {
				if (!settings.error.image) {
					permissionDeniedImage = defaultImage;
					positionUnavailableImage = defaultImage;
					timeoutImage = defaultImage;
					unknownErrorImage = defaultImage;
				} else {
					defaultImage = settings.error.image;
					permissionDeniedImage = defaultImage;
					positionUnavailableImage = defaultImage;
					timeoutImage = defaultImage;
					unknownErrorImage = defaultImage;
				}
				if (!settings.error.text) {
					permissionDeniedMessage = "Permission denied.";
					positionUnavailableMessage = "Position unavailable.";
					timeoutMessage = "Timed out.";
					unknownErrorMessage = "An unknown error occurred.";
				} else {
					defaultMessage = settings.error.text;
					permissionDeniedMessage = defaultMessage;
					positionUnavailableMessage = defaultMessage;
					timeoutMessage = defaultMessage;
					unknownErrorMessage = defaultMessage;
				}
				if (!settings.error.permissionDenied) {
					permissionDeniedImage = defaultImage;
					if (!defaultMessage) {
						permissionDeniedMessage = "Permission denied.";
					} else {
						permissionDeniedMessage = defaultMessage;
					}
				} else {
					if (!settings.error.permissionDenied.image) {
						permissionDeniedImage = defaultImage;
					} else {
						permissionDeniedImage = settings.error.permissionDenied.image;
					}
					if (!settings.error.permissionDenied.text) {
						if (!defaultMessage) {
							permissionDeniedMessage = "Permission denied.";
						} else {
							permissionDeniedMessage = defaultMessage;
						}
					} else {
						permissionDeniedMessage = settings.error.permissionDenied.text;
					}
				}
				if (!settings.error.positionUnavailable) {
					positionUnavailableImage = defaultImage;
					if (!defaultMessage) {
						positionUnavailableMessage = "Position unavailable.";
					} else {
						positionUnavailableMessage = defaultMessage;
					}
				} else {
					if (!settings.error.positionUnavailable.image) {
						positionUnavailableImage = defaultImage;
					} else {
						positionUnavailableImage = settings.error.positionUnavailable.image;
					}
					if (!settings.error.positionUnavailable.text) {
						if (!defaultMessage) {
							positionUnavailableMessage = "Position unavailable.";
						} else {
							positionUnavailableMessage = defaultMessage;
						}
					} else {
						positionUnavailableMessage = settings.error.positionUnavailable.text;
					}
				}
				if (!settings.error.timeout) {
					timeoutImage = defaultImage;
					if (!defaultMessage) {
						timeoutMessage = "Timed out.";
					} else {
						timeoutMessage = defaultMessage;
					}
				} else {
					if (!settings.error.timeout.image) {
						timeoutImage = defaultImage;
					} else {
						timeoutImage = settings.error.timeout.image;
					}
					if (!settings.error.timeout.text) {
						if (!defaultMessage) {
							timeoutMessage = "Timed out.";
						} else {
							timeoutMessage = defaultMessage;
						}
					} else {
						timeoutMessage = settings.error.timeout.text;
					}
				}
				if (!settings.error.unknownError) {
					unknownErrorImage = defaultImage;
					if (!defaultMessage) {
						unknownErrorMessage = "An unknown error occurred.";
					} else {
						unknownErrorMessage = defaultMessage;
					}
				} else {
					if (!settings.error.unknownError.image) {
						unknownErrorImage = defaultImage;
					} else {
						unknownErrorImage = settings.error.unknownError.image;
					}
					if (!settings.error.unknownError.text) {
						if (!defaultMessage) {
							unknownErrorMessage = "An unknown error occurred.";
						} else {
							unknownErrorMessage = defaultMessage;
						}
					} else {
						unknownErrorMessage = settings.error.unknownError.text;
					}
				}
			}
		}
		if (getPositionOnce === 1) {
			gpsNav.get();
		} else {
			gpsNav.watch();
		}
	},
	watch: function() {
		navigator.geolocation.watchPosition(gpsNav.createMap, gpsNav.displayError);
	},
	get: function() {
		navigator.geolocation.getCurrentPosition(gpsNav.createMap, gpsNav.displayError);
	},
	createMap: function(position) {
		// Clear error message (if any)
		document.getElementById("error").innerHTML = "";
		// Display position in Google Maps
		document.getElementById("map").src = "http://maps.googleapis.com/maps/api/staticmap?center=" + position.coords.latitude + "," + position.coords.longitude + "&zoom=" + zoom + "&size=" + width + "x" + height + "&sensor=false";
	},
	displayError: function(error) {
		switch(error.code) {
			case error.PERMISSION_DENIED:
			document.getElementById("map").src = permissionDeniedImage;
			document.getElementById("error").innerHTML = permissionDeniedMessage;
			break;
			case error.POSITION_UNAVAILABLE:
			document.getElementById("map").src = positionUnavailableImage;
			document.getElementById("error").innerHTML = positionUnavailableMessage;
			break;
			case error.TIMEOUT:
			document.getElementById("map").src = timeoutImage;
			document.getElementById("error").innerHTML = timeoutMessage;
			break;
			case error.UNKNOWN_ERROR:
			document.getElementById("map").src = unknownErrorImage;
			document.getElementById("error").innerHTML = unknownErrorMessage;
			break;
		}
	}
};