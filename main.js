var total = 17;
var zWin = $(window)
var render = function()
{
	padding = 2;
	var winWidth = zWin.width();
	var picWidth = Math.floor((winWidth - padding*3)/4);
	var tmpl = '';
	for (var i = 1; i <= total; i++) 
	{
		var p = padding;
		if(i%4==1)
		{
			p = 0;
		}
		var imageObj = new Image();
		imageObj.src = 'images/' + i + '.jpg';
		imageObj.index = i;
		
		tmpl += '<li data-id = "'+i+'" style="width:'+picWidth+'px;height:'+picWidth+'px;padding-top:'+padding+'px;padding-left:'+p+'px;" ><canvas class="animated bounceIn" id="cvs_'+i+'" ></canvas></li>';
		
		imageObj.onload = function () 
		{
			var ctx = $("#cvs_"+this.index)[0].getContext('2d');
			ctx.width = this.width;
			ctx.height = this.height;
			ctx.drawImage(this,0,0);
		}
	}
	$('#container').html(tmpl);
}
render();
var wImage = $('#largeImg');
var domImage = wImage[0];
var loadImg =function(id,callback)
{
	var winWidth = zWin.width();
	var winHeight = zWin.height();
  

	$('#largeContainer').css(
		{
			 'width': zWin.width(),
			 'height': zWin.height()
		}).show();

	var imageObj = new Image();
	imageObj.src = 'images/' + id + '.large.jpg';
	imageObj.onload = function () 
	{
		var w = this.width;
		var h = this.height;
		var  realw = winHeight*w/h;
		var  realh = winWidth*h/w;
		var paddingLeft = parseInt((winWidth - realw)/2);
		var paddingTop = parseInt((winHeight - realh)/2);
		wImage.css('width','auto').css('height','auto');
		wImage.css('padding-left','0px').css('padding-top','0px');
		if(h/w > 1.2)
		{
			wImage.attr('src',imageObj.src).css('height',winHeight).css('padding-left',paddingLeft);

		}
		else
		{
			wImage.attr('src',imageObj.src).css('width',winWidth).css('padding-top',paddingTop);
		}
		
		callback&&callback();  //??????
	}
	
}




var cid;
// 事件代理
$('#container').delegate('li','tap',function()
{
	
	var _id = cid = $(this).attr('data-id');
	loadImg(_id);
	

});

$('#largeContainer').tap(function()
	{
		$(this).hide();
	}).swipeLeft(function()
	{
		
		cid++;
		if(cid >total)
		{
			cid = total;
		}	
		else
		{
			loadImg(cid,function()
			{
				domImage.addEventListener('webkitAnimationEnd',function()
				{
					wImage.removeClass('animated bounceInRight');
					domImage.removeEventListener('webkitAnimationEnd');
					
				},false);
				wImage.addClass('animated bounceInRight');
			});
		}
	}).swipeRight(function()
	{
		cid--;
		if(cid <1)
		{
			cid = 1;
		}	
		else
		{
			loadImg(cid,function()
				{
					domImage.addEventListener('webkitAnimationEnd',function()
				{
					wImage.removeClass('animated bounceInLeft');
					domImage.removeEventListener('webkitAnimationEnd');
				},false);
					wImage.addClass('animated bounceInLeft');
				});
		}

	});
