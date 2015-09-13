$(function(){
	$('.del').click(function(e){
		var target = $(e.target)
		var id = target.data('id')
		var tr = $('.item-id-'+id)
		$.ajax({
			type: 'DELETE',
			url: '/admin/movie/list?id='+id
		})
		.done (function(results){
			if (results.success==1){
				if (tr.length > 0){
					tr.remove()
				}
			}
		})
	})
	$('#inputImdb').blur(function(){
		var imdb = $(this);
		var id = imdb.val();
		if (id) {
			$.ajax({
				url: 'http://www.omdbapi.com/?y=&plot=short&r=json&i='+id,
				cache: true,
				type: 'get',
				dataType: 'jsonp',
				crossDomain: true,
				jsonp: 'callback',
				success: function(data){
					$('#inputTitle').val(data.Title);
					$('#inputDirector').val(data.Director);
					$('#inputCountry').val(data.Country);
					$('#inputLanguage').val(data.Language);
					$('#inputYear').val(data.Year);
					$('#inputPoster').val(data.Poster);
					$('#inputSummary').val(data.Plot);
				}
			});
		}
		
	});
})

