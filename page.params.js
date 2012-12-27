/**
* jQuery-Mobile-Plugins/Page-params
*
* @url https://github.com/hash-bang/jquery-mobile-plugins
* @author Matt Carter <m@ttcarter.com>
*/
$(document).on('mobileinit', function() {
	console.log('Router - Started');
	$.extend($.mobile, {
		linkBindingEnabled: false,
		hashListeningEnabled: false,
		routerBackTransition: 0
	});
	// Replace the urlHistory addNew function with our own which stores the page params
	$.mobile.urlHistory.addNew = function(url, transition, title, pageUrl, role) {
		if (window.location.hash.substr(1, url.length) == url) // Does the incomming page look like the current hash + params?
			url = window.location.hash.substr(1); // Replace URL will full window.location URL
		if ($.mobile.urlHistory.getNext()) // If there's forward history, wipe it
		     $.mobile.urlHistory.clearForward();
		$.mobile.urlHistory.stack.push( {url : url, transition: transition, title: title, pageUrl: pageUrl, role: role } );
		$.mobile.urlHistory.activeIndex = $.mobile.urlHistory.stack.length - 1;
		console.log('HISTORY NOW', $.mobile.urlHistory.stack);
	};
	$.mobile.urlHistory.pop = function(amount) { // Not sure why pop() doesnt exist anyway in the urlHistory object
		if (!amount)
			amount = 1;
		$.mobile.urlHistory.activeIndex -= amount;
		if ($.mobile.urlHistory.activeIndex <= 0)
			return {url: 'home'};
		var prev = $.mobile.urlHistory.stack[$.mobile.urlHistory.activeIndex];
		$.mobile.urlHistory.stack = $.mobile.urlHistory.stack.slice(0, $.mobile.urlHistory.activeIndex);
		return prev;
	};
});
$(function() {
	$(document).bind('pagebeforechange', function(e, data) {
		data.params = [];
		if (typeof data.toPage != 'string')
			return;
		var url = (typeof data.toPage == 'string') ? data.toPage : window.location;
		var urlparsed = /^(.*?)#(.+?)(?:\?(.*))?$/.exec(url);

		if (urlparsed) {
			var baseurl = urlparsed[1];
			var hash = urlparsed[2];
			if (urlparsed[3]) {
				var keypairs = urlparsed[3].split('&');
				data.paramString = '#' + hash + '?' + keypairs;

				for (var i = 0; i < keypairs.length; i++) {
					var keyval = /^(.*?)=(.*)$/.exec(keypairs[i]);
					if (!keyval || keyval.length < 2) { // Deal with parameters without values (e.g. '#hash?param1=value1&param2' where 'param2' does not have a value but is still there)
						data.params[keypairs[i]] = 0;
					} else // Valid key=val pair
						data.params[keyval[1]] = keyval[2];
				}
			}
			data.toPage = '#' + hash;
		} else
			data.paramString = false;

		$('#' + hash).trigger('pageprepare', [data]);
	});
	$(window).bind('hashchange', function(e) {
		if (window.location.hash == '#back') {
			var lastpage = $.mobile.urlHistory.pop();
			console.log('Router - Go back', lastpage.url);
			$.mobile.routerBackTransition = lastpage.transition;
			window.location.hash = '#' + lastpage.url;
		} else {
			if ($.mobile.routerAvoid) {
				console.log('ROUTER AVOID');
				$.mobile.routerAvoid--;
			}
			var urlparsed;
			if (urlparsed = /^(.*?)#(.+?)(?:\?(.*))?$/.exec(window.location)) {
				console.log('Router - Goto ' + urlparsed[2]);
				var options = {changeHash: false};
				if ($.mobile.routerBackTransition) {
					options.transition = $.mobile.routerBackTransition;
					options.reverse = 1;
					$.mobile.routerBackTransition = 0;
				}
				$.mobile.changePage('#' + urlparsed[2] + (urlparsed[3] ? '?' + urlparsed[3] : ''), options);
			}
		}
	});
});
