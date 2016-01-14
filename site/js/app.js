
$('#main-header, .play-button a, .tooltip-item').velocity("fadeIn", 2000);

$('.play-button').mouseenter(function(){
	$(this)
		.velocity({ translateY: "-15px", rotateZ: "10deg" }, 100, "easeOut")
		.velocity({ rotateZ: "-8deg" }, 150)
		.velocity({ translateY: "0", rotateZ: "0" }, {duration: 600, easing: [ 500, 14 ]});
});

$('div.reveal').click(function() {
	$('h3').toggleClass('hidden');
});