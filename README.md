jQuery-Mobile-Plugins
=====================
An (eventual) collection of useful jQuery Mobile plugins.


Lightweight jQuery Mobile page parameter processing - jqm.page.params.js
========================================================================
This script allows you pass parameters between multi-page jQuery mobile (jQM) applications.

Usage within the page (note that the load order is jQuery, jQM-Plugins then jQM):

	<!-- jQuery -->
	<script src="/lib/jquery/jquery.min.js"></script>
	<!-- jQM-Plugins -->
	<script src="/lib/jquery-mobile-plugins/page.params.js"></script>
	<!-- jQM -->
	<script src="/lib/jquery/jquery.mobile.min.js"></script>

**WARNING:** This JavaScript file _must_ be listed after jQuery but _before_ jQuery Mobile because it needs to override a few settings in jQuery Mobile in order to function.

After its been included in your project you can link between pages in the usual way but also add parameters e.g.

	<ul data-role="listview">
		<li><a href="#page2">Page 1</a></li>
		<li><a href="#page2?foo=bar">Page 1 with a param</a></li>
		<li><a href="#page2?foo=bar&baz=quz">Page 1 with 2 params</a></li>
	</ul>

In the above example links are handled in the usual way but '?' seperates the hash of the page (in the above 'page2') and the parameters (the 'foo=bar' bits). You can specify multiple parameters by seperating them with '&'.

The script provides data.params within your Javascript 'pagechange' event:

	$(document).on('pagechange', function(e, data) { // React to incomming page event

		// Any parameters are now available as data.params
		console.log(data.params);

	});


History
=======
This project started life as a fork of https://github.com/jblas/jquery-mobile-plugins but it has completely changed since then. Thanks to *jblas* for his original lightweight jQuery-mobile routing system which was the inspiration for this repo.
