"use strict";

// module Engine

exports.createImageImpl = function(s){
	return function(callback){
		return function(){
			if(!window.auxImages){
				window.auxImages = {};
				window.auxImagesLoaded = {};
			}
			if(window.auxImages[s]){
				var im = window.auxImages[s];
				if(window.auxImagesLoaded[s])
					callback(im)();
				else{
					//console.log("CRAZY SHIT " + s);
					var func = im.onload;
					im.onload = function(){
						func();
						callback(im)();
					}
				}
				return window.auxImages[s];
			}
			var im = new Image();
			im.onload = function() {
				window.auxImagesLoaded[s] = true;
				callback(im)();
			};
			im.src = s;
			window.auxImages[s] = im;
		};
	};
};


exports.emptyImage = function(dim){
	return function(){
		if(window.epiBlank && window.epiBlank[dim])
			return window.epiBlank[dim];
		if(!window.epiBlank)
			window.epiBlank = {}

		var canvas = document.createElement("canvas");
		canvas.width = dim;
		canvas.height = dim;
    var context = canvas.getContext("2d");
		context.fillStyle = "#000000";
		context.fill();

		window.epiBlank[dim] = new Image();
		window.epiBlank[dim].src = canvas.toDataURL("image/png");
		return window.epiBlank[dim];
	};
};


exports.audioData = function(analyser) {
	return function() {
		var freqData = new Uint8Array(analyser.frequencyBinCount);
		var timeData = new Uint8Array(analyser.frequencyBinCount);
		analyser.getByteFrequencyData(freqData);
		analyser.getByteTimeDomainData(timeData);

		var data = new Uint8Array(2.0 * analyser.frequencyBinCount);
		data.set(freqData);
		data.set(timeData, freqData.length);
		return freqData;
	}
}



// not generally supported.  works on chrome atm
exports.initAudioAnalyzer = function(bufferSize){
	return function(){
		function streamError(err) {
			console.log("The following error occured getting user audio: " + err.name);
		}

		function gotStream(ctx, analyser){
			return function(stream) {
				var mediaStreamSource = ctx.createMediaStreamSource(stream);
				mediaStreamSource.connect(analyser);
			}
		}

		var ctx = new AudioContext();
		var analyser = ctx.createAnalyser();
		analyser.fftSize = bufferSize * 2;
		analyser.smoothingTimeConstant = 0.9;
		analyser.minDecibels = -85;

		navigator.webkitGetUserMedia({audio:true}, gotStream(ctx, analyser), streamError);

		return analyser;
	}
}


exports.preloadImages = function(images) {
	return function() {
		//$.each(images, function(i,source) { $.get(source); });
		window.images = {};

		$.each(images, function(i,source) {
			var im = new Image();
			im.src = source;
			window.images[source] = im;
			$.ajax({url:source, async:false});
		});
		console.log("ASDSADSADASDSADS");
	};
}
