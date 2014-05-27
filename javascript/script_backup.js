
$(document).ready(function(){
	$('.box').click(function(){
		var id=$(this).attr('id').substring(4);
		$('html,body').animate({
        scrollTop: $("#"+id).offset().top},
        'slow');
	});
	$('.go_top').click(function(){
		$('html,body').animate({
        scrollTop: $("html").offset().top},
        'slow');
	});

	$(window).scroll(function() {
		if($(this).scrollTop() < ($('#about').offset().top)-1){
			$('.go_top').css('visibility','hidden');
		}
		else{
			$('.go_top').css('visibility','visible');
		}
	});
});