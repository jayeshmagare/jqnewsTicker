/*
* newsTicker: Jquery plugin for news ticker
*
* latest version and complete README available on Github:
* https://github.com/jayeshmagare/newsTicker
*
* Copyright 2013 Jayesh Magare (jayesh.magare@gmail.com)
* Please file issues on Github : https://github.com/jayeshmagare/newsTicker/issues
* Licensed under the MIT license.
*/

(function ($) {

    $.fn.newsTicker = function (options) {
        var options = $.extend({}, $.fn.newsTicker.config, options);
		
		/* check that the passed element is actually in the DOM */
		if ($(this).length == 0) {
			if (window.console && window.console.log) {
				window.console.log('Element does not exist in DOM!');
			}
			else {
				alert('Element does not exist in DOM!');		
			}
			return false;
		}
		
		/* ID of the identifier */
		var newsID = '#' + $(this).attr('id');
		$(newsID).hide();
		
        return this.each(function () {
            /* initialize the elements in the collection */
			var settings = {				
				count: 0,
				newsArr: {},
				play: true,
				contentLoaded: false,
				interval:'',
				clearIntrvl:0
			};
			
			/* Next button click button handler */
			$(options.nextBtnDiv).click(function() {
				settings.clearIntrvl = 1;
				putNews();
			});
			
			/* Prev button click button handler */
			$(options.prevBtnDiv).click(function() {
				if (settings.count == 0) {
					settings.count = countSize(settings.newsArr) -2;
				}
				else if (settings.count == 1) {
					settings.count = countSize(settings.newsArr) -1;
				}
				else {
					settings.count = settings.count - 2;
				}
				
				if (settings.count < 0) {
					settings.count = countSize(settings.newsArr)-1;
				}
				settings.clearIntrvl = 1;
				putNews();
			});
			
			/* Play/Pause button click button handler */
			$(options.playPauseID).click(function() {
				if(settings.play == true)
				{
					if(settings.interval)
					{
						settings.clearIntrvl = 1;
						clearInterval(settings.interval);
					}
					settings.play= false;
					debugError('Paused:'+settings.count);
				}
				else				
				{
					debugError('Play :'+settings.count);
					settings.play= true;
					putNews();
				}
			});
			
			initPage();
			
			function initPage()
			{
				populateNews();
				
				if(settings.contentLoaded)
				{
					settings.clearIntrvl = 1;
					putNews();
				}
			}
			
			function runIntervals()
			{
				settings.clearIntrvl=0;	
				settings.interval = setInterval(function(){ putNews() }, options.interval);
					
				$(options.newsData).hover(function() {
						if(settings.interval)
						{
							settings.clearIntrvl = 1;
							clearInterval(settings.interval);
						}
					 }, function(){
						putNews();
					 });
			}

			/* Function to get the size of an Object*/
			function countSize(obj) {
			    var size = 0, key;
			    for (key in obj) {
			        if (obj.hasOwnProperty(key)) size++;
			    }
			    return size;
			};

			/* This function populates news from the array to newsData div */
			function putNews()
			{
				debugError('in News putting :'+settings.count);
				if(settings.clearIntrvl == 1)
				{
					if(settings.interval)
						clearInterval(settings.interval);
						
				}
			
				$(options.newsData).fadeOut('slow',function(){
					var news = settings.newsArr[settings.count].content;
					
					$(options.newsData).html(news).fadeIn('slow');
					settings.count++;
					if (settings.count == countSize(settings.newsArr) ) {
						settings.count = 0;
					}
				});
				
				if(settings.clearIntrvl == 1)
				{
					runIntervals();
				}
			}	
			
			/* This function populates news array from the UL list */
			function populateNews()
			{
				var tagType = $(newsID).get(0).tagName; 
				
				if (tagType != 'UL' ) {
					debugError('Cannot use <' + tagType.toLowerCase() + '> type of element for this plugin - must of type <ul> or <ol>');
					return false;
				}
				
				if($(newsID + ' LI').length > 0) {
					$(newsID + ' LI').each(function (i) {
						// Populating the news array from LI elements
						settings.newsArr[i] = { type: options.titleText, content: $(this).html()};
					});		
				}	
				else {
					debugError('There are no news in UL tag!');
					return false;
				}
				
				if (countSize(settings.newsArr < 1)) {
					debugError('Couldn\'t find any content from the UL news!');
					return false;
				}
				settings.contentLoaded = true;
			}
			
			/* Function for handling debug and error messages */ 
			function debugError(obj) {
				if (options.debugMode) {
					if (window.console && window.console.log) {
						window.console.log(obj);
					}
					else {
						alert(obj);			
					}
				}
			}
        });
    };

    $.fn.newsTicker.config = {
        // set values and custom functions
		interval: "4000",
		newsData: "#newsData",
		prevBtnDiv: "#prevDiv",
		nextBtnDiv: "#nextDiv",
		playPauseID: "#play-pause",
		effect: "fadeIn",
		debugMode:0
    };

}(jQuery));