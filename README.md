Jquery News Ticker
====================

## Usage

1. Include jQuery:

	```html
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
	```

2. Include plugin's code:

	```html
	<script src="js/newsTicker.js"></script>
	```
3. Keep the news data div and list of news in html
	
	```html
	<div id="newsData" class="row newsCss"></div>
	<ul id="newsList">
			<li class="news-item" >1 jQuery News Ticker, Lorem ipsum dolor sit amet !</li>
			<li class="news-item" >2 jQuery News Ticker, nunc nobis videntur parum clari, fiant sollemnes in futurum !</li>
			<li class="news-item" >3 jQuery News Ticker, claritatem insitam; est usus legentis in iis qui facit eorum  !</li>
	</ul>	
	```
	
4. Call the plugin:

	```javascript
	$(function () {
		$('#newsList').newsTicker();
	});
	```
	
##	Additional Properties available
	$('#newsList').newsTicker({
		interval: "4000",			// Timeout interval between two news 4000 = 4 secs
		newsData: "#newsData",		// Div where news will appear 
		prevBtnDiv: "#prevDiv",		// Prev button/div id 
		nextBtnDiv: "#nextDiv",		// Next button/div id 
		playPauseID: "#play-pause",	// Play/Pause toggle button/div id
		debugMode:0					// Pass 1 if you want to see console messages
    });

## Issues:
	Please file issues on Github : https://github.com/jayeshmagare/newsTicker/issues
	
## License

	MIT License http://opensource.org/licenses/MIT	

Copyright 2013 Jayesh Magare
