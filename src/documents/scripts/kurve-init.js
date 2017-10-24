(function($){
	$(function(){
		var slideshowEl = $('.slideshow'),
			filterEl    = $('#shows-filter');

		// if "process" pg... /*
		if(slideshowEl.length) {
			$('.slideshow').cycle({
				fx: 'fade' // transition type
			});	
		}
		

		// if "shows, events, press" pg...
		if(slideshowEl.length) {
			$('#shows-filter button').click(function() { 
		        
		        var filterTerm = $(this).attr('id');			        			        
		        
		        $(this).css('outline','none'); // IE shows unsightly outline
				$('#shows-filter .active-filter').removeClass('active-filter');  
				$(this).addClass('active-filter');
				
				if(filterTerm === 'all') { 												
		            $('#shows li').fadeIn('slow');  
		        } else {  
		            $('#shows li').each(function() {  
		                if(!$(this).hasClass(filterTerm)) {  
		                    $(this).fadeOut('slow');  
		                } else {  
		                    $(this).fadeIn('slow');  
		                }  
		            });  
		        }  
		         
		        return false;  
		    }); 
		}

	}); // end of document ready
})(jQuery); // end of jQuery name space