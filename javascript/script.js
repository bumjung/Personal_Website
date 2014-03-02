
$(document).ready(function(){
	$('.box').click(function(){
		var id=$(this).attr('id').substring(4);
		$('html,body').animate({
        scrollTop: $("#"+id).offset().top},
        'slow');
	});
});