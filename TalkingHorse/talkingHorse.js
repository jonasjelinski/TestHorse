var TalkingHorse = TalkingHorse || {};

TalkingHorse = function(horseId, hidesClass, comesOutClass, goesBackClass, bubbleClass){
	that = new EventTarget(),
	horse,
	speakingBubble;

	function init(){
		horse = document.getElementyById(horseId);
		speakingBubble = horse.querySelectorAll("."+bubbleClass)[0];
		addEventListeners();
	}

	function addEventListeners(){
		horse.addEventListener("click", handleHorseClick);
		speakingBubble.addEventListener("click", handleBubbleClick);
	}

	function handleHorseClick(){
		sendEvent("onHorseClicked");
	}

	function sendEvent(type){
		let event = new Event(type);
		that.dispatchEvent(event);
	}

	function handleBubbleClick(){
		sendEvent("onBubbleClicked");
	}

	function horseHides(){
		horse.class = hidesClass;
	}

	function horseComesOut(){
		horse.class = comesOutClass;
	}

	function horseGoesBack(){
		horse.class = goesBackClass;
	}

	function horseSpeaks(text){		
		speakingBubble.innerHTML = text;
	}

	that.init = init;
	that.horseHides = horseHides;
	that.horseComesOut = horseComesOut;
	that.horseGoesBack = horseGoesBack;
	that.horseSpeaks = horseSpeaks;
	return that;
}