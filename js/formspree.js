var contactForm = $('#contact-form');
contactForm.submit(function(e) {
	e.preventDefault();
	$.ajax({
		url: '//formspree.io/jhubz-work@list.ru',
		method: 'POST',
		data: $(this).serialize(),
		dataType: 'json',
		
		beforeSend: function() {
			contactForm.append('<div class="alert alert-loading">Сообщение отправляется…</div>');
		},
		
		success: function(data) {
			contactForm.find('.alert-loading').hide();
			contactForm.append('<div class="alert alert-success">Сообщение отправлено!</div>');
			contactForm.trigger('reset');
			
			setTimeout( function () {
				contactForm.find('.alert-success').hide();
			}, 6000 );
			
		},
		
		error: function(err) {
			contactForm.find('.alert-loading').hide();
			contactForm.append('<div class="alert alert-error">Ошибка отправки сообщения.</div>');
			
			setTimeout( function () {
				contactForm.find('.alert-error').hide();
			}, 5000 );
			
		}
	});
});