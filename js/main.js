var columns = $('.dataTable tr').length;
var rows = $('.dataTable th').length;

var markers = [];
var bounds = new google.maps.LatLngBounds();
var mapOptions = {};
var map;
var mapData;

$(document).ready(function() {
	$(window).on('resize', function(){
		if ($(window).width() < 800) {
			for(i=0;i < rows; i++) {
				var maxHeight = $('.dataTable th:nth-child(' + i + ')').outerHeight();
				for(j=0; j < columns; j++) {
					if($('.dataTable tr:nth-child(' + j + ') td:nth-child(' + i + ')').outerHeight() > maxHeight) {
						maxHeight = $('.dataTable tr:nth-child(' + j + ') td:nth-child(' + i + ')').outerHeight();
					}
				}
				for (j=0; j < columns; j++) {
					$('.dataTable tr:nth-child(' + j + ') td:nth-child(' + i + ')').css('height',maxHeight);
					$('.dataTable th:nth-child(' + i + ')').css('height',maxHeight);
				}
			}
		}
	});
});

function initialize() {
	var myLatlng = new google.maps.LatLng(39.768403, -86.158068);
	var mapOptions = {
		zoom: 11
	}

	var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	$.getJSON('http://communities.socrata.com/resource/pc7t-dhfq.json', function(data) {
		var rows = '';
		for (var i = 0; i < data.length; i++) {
			rows += '<tr><td>' + data[i].sr_number + '</td><td>' + data[i].phv + '</td><td>' + data[i].incident_address + '</td><td>' + data[i].township + '</td><td>' + data[i].age_factor + ' days</td></tr>';

			// console.log(data[i]);
			// continue;

			var geocode = new google.maps.LatLng(data[i].geocoded_location.latitude, data[i].geocoded_location.longitude);
			var marker = new google.maps.Marker({
				position: geocode,
				map: map
			});

			bounds.extend(marker.position);

			markers.push(marker);
		};
		$('.dataTable tbody').append(rows);

		map.setCenter(bounds.getCenter());
	});
}
google.maps.event.addDomListener(window, 'load', initialize);
