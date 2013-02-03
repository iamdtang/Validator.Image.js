/*! Validator.Image() - v0.1.0 - 2013-02-02
* https://github.com/skaterdav85/Validator.Image
* Copyright (c) 2013 David; Licensed  */

(function(window, undefined) {

	var supported = !window.FileReader ? false : true;

	window.Validator = window.Validator || {};

	Validator.Image = function (options) {
		if (supported) {
			this.file = options.file && options.file instanceof File ? options.file : null;
			this.width = options.width ? options.width : [0, Number.POSITIVE_INFINITY];
			this.height = options.height ? options.height : [0, Number.POSITIVE_INFINITY];
			this.success = options.success ? options.success : function() {};
			this.error = options.error ? options.error : function() {};
			this.errorMessages = [];

			this.errorCount = 0;
			this._initialize();
		}
	};

	Validator.Image.prototype = {
		constructor: Validator.Image,

		_initialize: function() {
			var reader = this._fileReaderFactory();
			reader.readAsDataURL(this.file);
		},

		// returns Image node
		getImage: function() {
			return this.img;
		},

		// returns a specific error message if a key is passed or all of them
		getErrorMessages: function(key) {
			return key ? this.errorMessages[key] : this.errorMessages;
		},

		_createRangeErrorMessage: function(key) {
			this.errorMessages[key] = 'The ' + key + ' should be between ' + this[key][0] + 'px and ' + this[key][1] + 'px.';
		},

		// w and h are the actual image size
		_validateDimensions: function(w, h) {
			if (this.width instanceof Array) {
				if (w < this.width[0] || w > this.width[1]) {
					this.errorCount++;
					this._createRangeErrorMessage('width');
				}
			} else {
				if (w !== this.width) {
					this.errorCount++;
					this.errorMessages['width'] = 'The width does not equal ' + this.width;
				}
			}

			if (this.height instanceof Array) {
				if (h < this.height[0] || h > this.height[1]) {
					this.errorCount++;
					this._createRangeErrorMessage('height');
				}
			} else {
				if (h !== this.height) {
					this.errorCount++;
					this.errorMessages['height'] = 'The height does not equal ' + this.height;
				}
			}
			
			// call the correct callback method depending on success or failure of image size validation
			if (this.errorCount > 0) {
				this.error.call(this, this.getImage());
			} else {
				this.success.call(this, this.getImage());
			}
		},

		_fileReaderFactory: function() {
			var reader = new FileReader();
			var that = this;

			reader.onload = function(evt) {
				var img = document.createElement('img');

				img.onload = function() {
					that.img = this;
					that._validateDimensions(this.width, this.height);
				};

				img.src = evt.target.result;
			};

			reader.onerror = function(evt) {
				throw new Error('Error reading file');
			};

			return reader;
		}
	};

})(window);