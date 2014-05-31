var columns = $('.dataTable tr').length;
var rows = $('.dataTable th').length;

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

$.getJSON('http://communities.socrata.com/resource/xbyf-k2dy.json', function(data) {
	var rows = '';
	for (var i = 0; i < data.length; i++) {
		rows += '<tr><td>ID</td><td>' + data[i].phv + '</td><td>' + data[i].incident_address + '</td><td>' + data[i].township + '</td><td>' + data[i].age_factor + ' days</td></tr>';
	};
	$('.dataTable tbody').append(rows);
})