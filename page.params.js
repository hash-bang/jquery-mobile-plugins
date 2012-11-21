/**
* jQuery-Mobile-Plugins/Page-params
*
* @url https://github.com/hash-bang/jquery-mobile-plugins
* @author Matt Carter <m@ttcarter.com>
*/
(function($, window, undefined) {
	$(document).bind('pagebeforechange', function(e, data) {
		var url = (typeof data.toPage == 'string') ? data.toPage : window.location;
		var urlparsed = /^(.*?)#(.+?)\?(.*)$/.exec(url);

		data.params = [];
		if (urlparsed) {
			var baseurl = urlparsed[1];
			var hash = urlparsed[2];
			var keypairs = urlparsed[3].split('&');

			for (var i = 0; i < keypairs.length; i++) {
				var keyval = /^(.*?)=(.*)$/.exec(keypairs[i]);
				if (!keyval || keyval.length < 2) { // Deal with parameters without values (e.g. '#hash?param1=value1&param2' where 'param2' does not have a value but is still there)
					data.params[keypairs[i]] = 0;
				} else // Valid key=val pair
					data.params[keyval[1]] = keyval[2];
			}
			data.toPage = $('#' + hash);
		}
	});
})(jQuery, window);
