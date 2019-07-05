$('.top-block').slick({
	arrows: false,
	autoplay: true,
	autoplaySpeed: 5000,
	pauseOnHover: false,
	dots: true,
	dotsClass: 'slick-dots top-block__dots',
	customPaging: function(){
		return ''
	},
	responsive: [
		{
			breakpoint: 1140,
			settings: {
				adaptiveHeight: true
			}
		}
	]
})
//Виджеты с аптеками
var widgetTimer = 0;

function closeWidget(widget){
	widgetTimer = setTimeout(function(){
		widget.removeClass('active');
	},5000)
}

$('.widget__head-btn').click(function(e){
	e.preventDefault();
	var widget = $(this).parent('.widget');
	//закрываем другие виджеты
	$('.widget').not(widget).removeClass('active');
	clearTimeout(widgetTimer);
	
	if(!widget.is('.active')){//если виджет открывается
		closeWidget(widget);//закрываем его с таймером
		widget.addClass('active');
		
	}else{
		widget.removeClass('active');
	}	
})

$(document).click(function(e){
	if(!$(e.target).parents('.widget').length){
		$('.widget.active').removeClass('active');
		clearTimeout(widgetTimer);
	}
})

//Модальные окна
function openModal(modalId, initiator){  
  var scrollWidth = window.innerWidth - document.body.clientWidth;//Ширина полосы прокрутки
  
	$('.modal-wrapper').children().unwrap();
	if(!$('#'+modalId).length){
		alert('Ошибка вызова модального окна');
		return false;
	}
	$('#'+modalId).trigger('beforeShow',initiator).wrap('<div class="modal-wrapper" style="display:none" />');
	$('.modal-wrapper').fadeIn(400,function(){
    $('#'+modalId).trigger('afterShow',initiator);
  });	
	if(scrollWidth){
		$('html').css('padding-right',scrollWidth);
		$('body').css('overflow-y','hidden');
	}
}
function closeModal(){
	$('.modal-wrapper').fadeOut(200, function(){
		$('html').css('padding-right','');
		$('body').css('overflow-y','');
	});
}
$(document).on('click', '[data-modal]', function(e){
	e.preventDefault();
	var modal = $(this).data('modal');
	openModal(modal,e.target);
})
$(document).on('click', '.modal__close', closeModal);

$(document).on('mousedown', '.modal-wrapper', function(e){
	if(!$('.modal').is(e.target) && $('.modal').has(e.target).length === 0){
		closeModal();
	}
})
$(document).keydown(function(e){
	//Закрытие окна на Esc
	if(e.which == 27){
		closeModal();
	}
});
$('form').submit(function(e){
	e.preventDefault();
	var form = this;
	$.ajax({
		url: form.action,
		type: form.method,
		data: $(form).serialize(),
		success: function(response){
			$('#result .modal__body').text(response);
			openModal('result',form);
		}
	})
})
grecaptcha.ready(function() {
	grecaptcha.execute('6LehPqwUAAAAANxEaqiE4iT-ANKVFwkS465QVSBw', {action: 'homepage'}).then(function(token) {
		$('input[name=response]').val(token);
	});
});