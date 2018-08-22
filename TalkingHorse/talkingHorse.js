var TalkingHorse = TalkingHorse || {};

/**
 * @namespace TalkingHorse 
 * @memberof! TalkingHorse
 * @param {string} horseId, id of the horse
 * @param {string} hidesClass, class if the horse should hide
 * @param {string} comesOutClass, class if the horse should show
 * @param {string} goesBackClass, class if the horse runs backwards
 * @param {string} bubbleClass, calls of the bubble, which shows a text
 * @description Modul <code>TalkingHorse</code> is a viewcontroll modul
 * it sets the css classes of the domElement which shows messages to user
 */

TalkingHorse = function(horseId, hidesClass, comesOutClass, goesBackClass, bubbleClass){
	that = new EventTarget(),
	horse,
	speakingBubble;

	/**
	* @function init
	* @public
	* @memberof! TalkingHorse
	* @instance
	* @description Initialize this modul.
	*/ 	
	function init(){
		horse = document.getElementyById(horseId);
		speakingBubble = horse.querySelectorAll("."+bubbleClass)[0];
		addEventListeners();
	}

	/**
	* @function addEventListeners
	* @public
	* @memberof! TalkingHorse
	* @instance
	* @description adds listeners to the horse and the speaking bubble
	*/ 
	function addEventListeners(){
		horse.addEventListener("click", handleHorseClick);
		speakingBubble.addEventListener("click", handleBubbleClick);
	}

	/**
	* @function handleHorseClick
	* @public
	* @memberof! TalkingHorse
	* @instance
	* @description sends event "onHorseClicked"
	*/ 
	function handleHorseClick(){
		sendEvent("onHorseClicked");
	}

	/**
	* @function sendEvent
	* @private
	* @memberof! TalkingHorse
	* @instance
	* @param {string} type, event type
	* @description sends event of type "type"
	*/ 
	function sendEvent(type){
		let event = new Event(type);
		that.dispatchEvent(event);
	}

	/**
	* @function handleHorseClick
	* @public
	* @memberof! TalkingHorse
	* @instance
	* @description sends event "onBubbleClicked"
	*/ 
	function handleBubbleClick(){
		sendEvent("onBubbleClicked");
	}

	/**
	* @function horseHides
	* @private
	* @memberof! TalkingHorse
	* @instance
	* @description lets the horse hide
	*/ 
	function horseHides(){
		horse.class = hidesClass;
	}

	/**
	* @function horseComesOut
	* @private
	* @memberof! TalkingHorse
	* @instance
	* @description lets the horse show itsself
	*/ 
	function horseComesOut(){
		horse.class = comesOutClass;
	}

	/**
	* @function horseGoesBack
	* @private
	* @memberof! TalkingHorse
	* @instance
	* @description lets the horse show run backwards
	*/ 
	function horseGoesBack(){
		horse.class = goesBackClass;
	}

	/**
	* @function horseSpeaks
	* @private
	* @memberof! TalkingHorse
	* @instance
	* @description setter for the bubble text
	*/ 
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