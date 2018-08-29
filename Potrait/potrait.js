var Potrait = Potrait || {};

Potrait = function(containerID){
	"use strict";
	let that = {},
	container,
	picture;

	function init(){
		container = document.getElementById(containerID);
		picture = container.getElementsByTagName("img")[0];
	}

	function setPicture(src){
		picture.src = src;
	}

	that.init = init;
	that.setPicture = setPicture;
	return that;
}