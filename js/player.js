/*
 * plin.cc
QMusic 音乐播放器 插件
*/
var QMusic={
	x:'',
	isPlay:false,//播放状态
	isscale:false,//防止拖动失败
	$cover:$('.QMusic_cover'),
	$playMusic:$('#QMusic_play'),
	$scale: $('#QMusic_scale'),
	music:$('#QMusic_music').get(0),
	formatTime:function(num){
	    // 计算
	    var h=0,i=0,s=parseInt(num);
	    if(s>60){
	        i=parseInt(s/60);
	        s=parseInt(s%60);
	        if(i > 60) {
	            h=parseInt(i/60);
	            i = parseInt(i%60);
	        }
	    }
	    // 补零
	    var zero=function(v){
	        return (v>>0)<10?"0"+v:v;
	    };
	    return [zero(i),zero(s)].join(":");
	},
	iplay:function(){
		console.log(this)
		this.$cover.addClass('cover-play');
		console.log(this)
		this.music.play();
		this.isPlay = true;
		var _this=this;
		this.x = setInterval(function() {
			_this.$scale.attr('max', _this.music.duration);
			if(_this.isscale==false){
				_this.$scale.val(_this.music.currentTime);
			}
			_this.$scale.css({'background-size':_this.music.currentTime/_this.music.duration*100+'% 100%'})		
			$('.QMusic_time span:eq(0)').text(_this.formatTime(_this.music.currentTime));
			$('.QMusic_time span:eq(1)').text(_this.formatTime(_this.music.duration));
			/*判断歌曲是否播放结束*/
			if (_this.music.currentTime ==_this.music.duration) {
				clearInterval(_this.x);
				console.log('播放结束')
			}
		});
	},
	stop:function(){
		this.$cover.removeClass('cover-play');
		this.music.pause();
		this.isPlay = false;	
		clearInterval(this.x);
	},
	init:function(){
		var _this=this;
		/*播放*/
		this.$playMusic.on('click', function() {
			if (_this.isPlay == false) {
				_this.iplay();
			} else {
				_this.stop();
			}
		});
		/*防止拖动失败*/
		this.$scale.on('touchstart mousedown',function(){		
			_this.isscale=true;
		})
		this.$scale.on('touchend mouseup',function(){
			_this.isscale=false;
		})
		//拖动组件
		this.$scale.on('change', function() {
			_this.music.currentTime = _this.$scale.val();
			_this.iplay();
		});
	}
}
QMusic.init();//初始化
QMusic.iplay()//播放

