'use strict';

$(document).ready(function(){
	var sectionMap = {
		'aboutMe' : 'About Me',
		'projects' : 'Projects',
		'experiences': 'Experiences'
	}

	var imageMap = {
		'aboutMe' : 'bg62.jpg',
		'projects' : 'bg23.jpg',
		'experiences' : 'bg41.jpg'
	}

	var fadeInMap = {
		'aboutMe' : function () {
			$('.aboutMe .content').css({ opacity: 1, bottom: 0});
			$('.aboutMe .bio h3').css({ opacity: 0, bottom: 30});
			$('.aboutMe .bio p').css({ opacity: 0, bottom: 30});
			$('.aboutMe .contact').css({ opacity: 0, bottom: 30});

			animateFadeAndMove('.aboutMe .bio h3', 1, 750, 0, 600);

			setTimeout(function () {
				animateFadeAndMove('.aboutMe .bio p', 1, 750, 0, 600);
			},300);

			setTimeout(function () {
				animateFadeAndMove('.aboutMe .contact', 1, 750, 0, 600);
			},600);
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
			animateFadeAndMove('.experiences .content', 1, 700, 0, 500);
		}
	}

	var imgArr = $.map(imageMap, function(v) {
		return v;
	});

	preload(imgArr);

	fadeInMap['aboutMe']();

	$('.section').on('click', function (){
		var oldSection = $('.section.active').attr('id');
		var newSection = $(this).attr('id');

		if (oldSection !== newSection) {
			$('#'+newSection).addClass('active');
			$('#'+oldSection).removeClass('active');

			$('.contentContainer .header').text(sectionMap[newSection]);

			if(newSection == "aboutMe") {
				$('.contentContainer .header').css('visibility', 'hidden');
			} else {
				$('.contentContainer .header').css('visibility', 'visible');
			}

			handleImageLoading(imageMap, newSection);

			animateFadeAndMove('.'+ oldSection +' .content', 0, 400, 50, 700)
				.promise().done(function() {
					$('.'+oldSection).addClass('hide');
					$('.'+newSection).removeClass('hide');

					fadeInMap[newSection]();
				});
		}
	});

	$('.menuIcon').on('click', function (){
		$('.nav').toggle();
	});

	if($('.menuIcon').css('display') !== 'none') {
		var arrList = $('.nav > li');
		for(var i = 0; i < arrList.length; i++) {
			if($(arrList[i]).hasClass('lineContainer')) continue;
			
			$(arrList[i]).on('click', function (){
				$('.nav').toggle();
			});
		}
	}
});

function animateFadeAndMove(id, opacity, startDuration, bottom, endDuration) {
	return $(id)
		.animate({
			opacity: opacity
		}, {
			queue: false,
			duration: startDuration
		})
		.animate({
			bottom: bottom
		}, {
			duration: endDuration
		});
}

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

function preload(arrayOfImages) {
    $(arrayOfImages).each(function(){
        $('<img/>')[0].src = this;
    });
}
