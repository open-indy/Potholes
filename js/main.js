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