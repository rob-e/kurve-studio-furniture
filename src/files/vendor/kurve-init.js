// Slider/Carousel based on: http://codereview.stackexchange.com/questions/54673/pure-js-image-slider by charliegeiger89
// Also see: https://bitbucket.org/bradyliles/deity-slider
// Note: removed Caption handling functionality, reorganized around Figure/Img/FigCaption elements
// - Also: apply "hidden" class to all Figure elements except the 1st (prevents flash of "under image")
// 'use strict';

var kurveSlider = (function() {
	var _doc = document;
	var slider;

	var defaultOptions = {
		slider: "#kurveSlider",
		pauseTime: 3000,
		transitionTime: 1000,
		directionNav: false,
		pauseOnHover: false,
		prevText: 'Previous',
		nextText: 'Next'
	};

	var settings = {
		stage: -1, // Starting Image (-1 gives 1st image an extra cycle on start)
		stages: null,
		interval: null,
		images: null,
	};

	return {

		init: function(userDefinedOptions) {
			options = kurveSlider.mergeOptions(defaultOptions, userDefinedOptions);
			slider = _doc.querySelector(options.slider);
			settings.images = _doc.querySelectorAll(options.slider + " > figure");
			settings.stages = settings.images.length;
			//run init functions
			kurveSlider.initNavigation();
			kurveSlider.initHoverEvent();
			// console.log("total stages: " + (settings.stages));
			kurveSlider.cycle(); // Loads first slide
			kurveSlider.setTimerInterval();
		},

		// Overwrite defaults with user set options, otherwise preserve defaults
		mergeOptions: function (defaultSet, userSet) {
		    for (var key in defaultSet) {
		        if (userSet.hasOwnProperty(key)) {
		        	defaultSet[key] = userSet[key];
		        }
		    }
		    return defaultSet;
		},

		initNavigation: function() {
			if( !options.directionNav )
				return;

			var element = _doc.createElement("div");
			element.className = "kurve-directionNav";
			element.innerHTML = '<input type="button" value="'+ options.prevText +'" class="kurve-prevNav"><input type="button" class="kurve-nextNav" value="'+ options.nextText +'">';
			slider.appendChild(element);

			var pauseAlert = _doc.createElement("span");
			pauseAlert.className = "pause-alert";
			pauseAlert.innerHTML = ' ';
			slider.appendChild(pauseAlert);

			var prevNav = slider.querySelector('.kurve-prevNav');
			prevNav.addEventListener('click', function() {
				settings.stage > 0 ? settings.stage -= 2 : settings.stage = (settings.stages - 2);

				if (settings.stage < 0) {
					settings.stage = settings.stages - 1; // ie last array element
				}

				kurveSlider.cycle(); //kurveSlider.cycle("play");
				kurveSlider.setTimerInterval();
			}, false);

			var nextNav = slider.querySelector('.kurve-nextNav');
			nextNav.addEventListener('click', function() {
				kurveSlider.cycle();
				kurveSlider.setTimerInterval();
			}, false);
		},

		initHoverEvent: function() {
			if( !options.pauseOnHover )
				return;

			slider.addEventListener("mouseover", function() {
				clearInterval(settings.interval);
			}, false);

			slider.addEventListener("mouseout", function() {
				// > null
				if (settings.interval !== null) {
					kurveSlider.setTimerInterval();
				}
			}, false);
		},

		cycle: function() {
			// console.log("initial stage: " + (settings.stage));
			// console.log("target stage: " + (settings.stage + 1));

			var cSettings = settings,
				cOptions = options,
				i = 0,
				length = cSettings.stages;

			cSettings.stage = (cSettings.stage + 1) % cSettings.stages;

			for (i = 0; i < length; i++) {
				if ( i === cSettings.stage ) {
					cSettings.images[i].classList.remove("hidden");
				} else {
					cSettings.images[i].classList.add("hidden");
				}
			}
		},

		setTimerInterval: function() {
			// > null
			if ( settings.interval !== null ) {
				clearInterval(settings.interval);
			}
			settings.interval = setInterval(kurveSlider.cycle, options.pauseTime);
		},

	};
})();

var kurveFilter = (function() {
	
	document.addEventListener("DOMContentLoaded", function () {
		var filtersParent = document.getElementById("shows-filter");
		
		if(document.contains(filtersParent)) {
			filtersParent.addEventListener("click", filterClick, false);
		}
	
		function filterClick(e) {
			if (e.target !== e.currentTarget) {
				var i = 0,
					clickedEl = e.target,
					filterTerm = e.target.id,
					filterContainers = document.getElementById("shows").querySelectorAll("li");
			
				// IE shows unsightly outline
				clickedEl.style.outline = "none";
				filtersParent.querySelector(".active-filter").classList.remove("active-filter");
				clickedEl.classList.add("active-filter");
				
				// fuglyville loops, see about toggles plus refactor
				// fades borked due to display none/aut-oh from toggled classes
				if(filterTerm === "all"){
					for (i = 0; i < filterContainers.length; i++) {							
						filterContainers[i].classList.remove("fade-out");
						filterContainers[i].classList.remove("hiding");
						filterContainers[i].classList.add("fade-in");
						
						// window.setTimeout(removeEl, 1100, filterContainers[i]);
					}
				} else {
					for (i = 0; i < filterContainers.length; i++) {
						
						if(filterContainers[i].classList.contains(filterTerm)) {
							filterContainers[i].classList.remove("fade-out");
							filterContainers[i].classList.remove("hiding");
							filterContainers[i].classList.add("fade-in");
							
							// window.setTimeout(removeEl, 1100, filterContainers[i]);
						} else {
							filterContainers[i].classList.remove("fade-in");
							filterContainers[i].classList.add("fade-out");
							
							window.setTimeout(removeEl, 950, filterContainers[i]);
						}
					}
				}
			}
			e.stopPropagation();
		}
		
		function removeEl (el) {
			el.classList.add("hiding");
		}
	});
	
})();