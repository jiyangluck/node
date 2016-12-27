$('#stuform').submit(function(){
	var data = $(this).serialize();
	$.post('/insert',data,function(data){
		showData(data);
	})
	return false;
})

$('.table').delegate('.update','click',function(){
	var opt = {};
	var $tr = $(this).parent().parent();
	if(!$(this).hasClass('save')){	
		$tr.find('.edited').each(function(index,element){
			var attr = $(element).attr('stuattr');
			var text = $(element).text();
			opt[attr] = text;

			if(attr !== "stuid"){
				var $input = "<input type='text'>";
				$(element).html($input);
			}
		})
		console.log(opt)
		$(this).text("保存").addClass('save');

	}else{
		$tr.find('.edited').each(function(index,element){
			var attr = $(element).attr('stuattr');
			if(attr !== "stuid"){
				var text = $(element).find('input').val();
				opt[attr] = text;
			}
		})
		$.post('/update',opt,function(data){
			showData(data);
		})
		$(this).text('编辑').removeClass('save');
	}
})


$('.table').delegate('.delete','click',function(){
	if(confirm('是否删除该学生的数据？')){	
		var stuid = $(this).attr('stuid');
		$.post('/delete',{stuid:stuid},function(data){
			showData(data);
		})	
	}
})

function showData(data){
	$('.table tbody').empty();
	data.map(function(val,index){
		var $tr = $('<tr>');
		$tr.append("<td stuattr='stuid' class='edited'>" + val.stuid + "</td>");
		$tr.append("<td stuattr='name' class='edited'>" + val.name + "</td>");
		$tr.append("<td stuattr='sex' class='edited'>" + val.sex + "</td>");
		$tr.append("<td stuattr='age' class='edited'>" + val.age + "</td>");
		$tr.append("<td><button class='btn btn-primary update' stuid='"+val.stuid+"'>编辑</button></td>");
		$tr.append("<td><button class='btn btn-primary delete' stuid='"+val.stuid+"'>删除</button></td>");
		$('.table tbody').append($tr);
	})
}