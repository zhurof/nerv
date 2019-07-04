$('.top-block').slick({
	arrows: false,
	autoplay: true,
	autoplaySpeed: 5000,
	pauseOnHover: false,
	responsive: [
		{
			breakpoint: 1140,
			settings: {
				adaptiveHeight: true
			}
		}
	]
})
$('.widget__head-btn').click(function(e){
	e.preventDefault();
	$(this).parent('.widget').toggleClass('active');
})