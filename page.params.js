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
		hashListeningEnabled: false
	});
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
		var urlparsed;
		if (urlparsed = /^(.*?)#(.+?)(?:\?(.*))?$/.exec(window.location)) {
			console.log('Router - Goto ' + urlparsed[2]);
			$.mobile.changePage('#' + urlparsed[2] + (urlparsed[3] ? '?' + urlparsed[3] : ''), {
				changeHash: false
			});
		}
	});
});
