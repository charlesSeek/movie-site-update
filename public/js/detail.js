$(function(){
	$('.comment').click(function(e){
		var target = $(this);
		var tid = target.data('tid');
		var commentId = target.data('cid');
		if ($('#toId').length >0){
			$('#toId').val(tid);
		}
		else {
			$('<input>').attr({
			type: 'hidden',
			id: 'toId',
			name: 'comment[tid]',
			value: tid
			}).appendTo('#commentForm');
		}
		if ($('#commentId').length >0){
			$('#commentId').val(commentId);
		}
		else {
		$('<input>').attr({
			type: 'hidden',
			name: 'comment[cid]',
			id: 'commentId',
			value: commentId
			}).appendTo('#commentForm');
		}
	});
});