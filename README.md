## Validator.Image()

A JavaScript constructor function or 'class' for validating the dimensions of an image from a file input. This relies on FileReader. If FileReader does not exist, it will fail gracefully.

This can be used with the [Validator](https://github.com/skaterdav85/Validator) constructor function, which was inspired by Laravel's Validator class, or it can be used by itself.

### Example

```js

	var file = document.getElementById('image').files[0];
		
	var validation = new Validator.Image({
		file: file,
		width: 100,
		height: [359, 360],  // or just use a single number
		success: function(img) {
			document.getElementById('img').appendChild(img);
			console.log('Passes: ', img.width, img.height);
		},
		error: function(img) {
			console.error('Wrong dimensions: ', img.width, img.height);
			console.log(this.getErrorMessages());
		}
	});
	

```
### Required
* file

### Optional
* width
* height

The width and height options can be a single number or an array containing the min and max range. The range is inclusive. You can pass in both width and height or just one. If width is not passed in for example, there will be no restriction on the width.

* success - callback function if image validation passes
* error - callback function if image validation fails