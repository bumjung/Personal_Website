'use strict';

$(document).ready(function(){
	var sectionMap = {
		'aboutMe' : 'About Me',
		'projects' : 'Projects',
		'experiences': 'Experiences'
	}

	var imageMap = {
		'aboutMe' : 'bg69.jpg',
		'projects' : 'bg23.jpg',
		'experiences' : 'bg45.jpg'
	}

	var fadeInMap = {
		'aboutMe' : function () {
			$('.aboutMe .content')
				.animate({
					opacity: 1
				}, {
					queue: false,
					duration: 750
				})
				.animate({
					bottom: 0
				}, {
					duration: 600
				});
		},
		'projects' : function () {
			$('.projects .content').css({ opacity: 1, bottom: 0});

			var $children = $('.projects').find('.proj');
			for (var i=0; i<$children.length; i++) {
				$($children[i]).css({ opacity: 0, bottom: 30});
				(function (i){
					setTimeout(function () {
						$($children[i]).animate({
							bottom: 0
						}, {
							queue: false,
							duration: 450
						})
						.animate({
							opacity: 1
						}, {
							duration: 600
						});
					}, i*150);
				})(i);
			}
		},
		'experiences' : function () {
			$('.experiences .content')
				.animate({
					opacity: 1
				}, {
					queue: false,
					duration: 700
				})
				.animate({
					bottom: 0
				}, {
					duration: 500
				});
		}
	}

	fadeInMap['aboutMe']();

	$('.section').on('click', function (){
		var oldSection = $('.section.active').attr('id');
		var newSection = $(this).attr('id');

		if (oldSection !== newSection) {
			$('#'+newSection).addClass('active');
			$('#'+oldSection).removeClass('active');
			
			$('.contentContainer .header').text(sectionMap[newSection]);

			handleImageLoading(imageMap, newSection);

			$('.'+ oldSection +' .content')
				.animate({
					opacity: 0
				}, {
					queue: false,
					duration: 400
				})
				.animate({
					bottom: 50
				}, {
					duration: 700
				})
				.promise().done(function() {
					$('.'+oldSection).addClass('hide');
					$('.'+newSection).removeClass('hide');

					fadeInMap[newSection]();
				});
		}
	});
});

function handleImageLoading(imageMap, newSection) {
	// imageContainer1 is hidden... show imageContainer1, hide imageContainer2
	if($('.mainContainer .imageContainer1').hasClass('hide')) {
		$('.mainContainer .imageContainer1').css('background-image', 'url('+imageMap[newSection]+')');
		$('.mainContainer .imageContainer1').removeClass('hide');

		$('.mainContainer .imageContainer2')
			.fadeTo('slow', 0, function() {
				$('.mainContainer .imageContainer2').addClass('hide');
			});

		$('.mainContainer .imageContainer1')
			.fadeTo('slow', 1);
	} else {
		$('.mainContainer .imageContainer2').css('background-image', 'url('+imageMap[newSection]+')');
		$('.mainContainer .imageContainer2').removeClass('hide');

		$('.mainContainer .imageContainer1')
			.fadeTo('slow', 0, function() {
				$('.mainContainer .imageContainer1').addClass('hide');
			});

		$('.mainContainer .imageContainer2')
			.fadeTo('slow', 1);
	}
}
