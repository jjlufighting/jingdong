

// $.extend()
// $.fn.extend()  ---->fn == prototype
// (function(){


//    //创造轮播图对象的构造函数
//   function Swiper(options){
//       //轮播图插入的位置
//     this.wrap = options.wrap || $('body');
//     //轮播的图片列表
//     this.imgList = options.imgList;
//     //轮播动画类型
//     this.animateType = options.animateType || "fade";
//     //是否展示左右切换列表
//     this.changeBtn = options.changeBtn;
//     //是否展示小圆点
//     this.showPointBtn = options.showPointBtn;
//     //是否自动轮播
//     this,isAuto = options.isAuto; 
//     //图片大小
//     this.imgWidth = options.imgWidth || $(this.wrap).width();
//     this.imgHeight = options.imgHeight || $(this.wrap).height();
//     //展示当前图片索引值
//     this.nowIndex = 0;
//     //图片个数
//     this.imgNum = this.imgList.length;
//     //加个锁
//     this.lock = true;
//     //初始化函数
//     this.init = function(){
//         //创建轮播图结构
//         this.createDom();
//         //初始化样式
//         this.initStyle();
//         // 绑定事件
//         this.bindEvent();
//         if (this.isAuto) {
//             this.autoChange();
//         }
//     }
// }
// Swiper.prototype.createDom = function(){
//     var oUl = $('<ul class ="swiper-wrap"></ul>');
//     var spotDiv = $('<div class = "spot"></div>');
//     this.imgList.forEach(function(item){
//         $('<li><a href="#"><img src="' + item + '"/></a></li>').appendTo(oUl);
//         $('<span></span>').appendTo(spotDiv);
//     });
//     if(this.animateType == 'animate'){
//         $('<li><a href="#"><img src="' + this.imgList[0] + '"/></a></li>')

//     }

//     var leftBtn = $('<div class="btn left-btn">&lt;</div>');
//     var rightBtn = $('<div class="btn right-btn">&gt;</div>');

//     $(this.wrap).append(oUl);
//     if(this.changeBtn){
//         $(this.wrap).append(leftBtn).append(rightBtn);
//     }
//     if(this.showPointBtn){
//         $(this.wrap).append(spotDiv);
//     }
// }
// Swiper.prototype.initStyle = function(){
//     $(this.wrap).css({
//         position:'relative',
//         overflow:'hidden'
//     })

//     $('*',this.wrap).css({
//         listStyle:'none',
//         textDecoration:'none',
//         margin:0,
//         padding:0,
//     }).find('a').css({
//         width:'100%',
//         height:'100%',
//         display:'inline-block'
//     })

//     $('img',this.wrap).css({
//         width:'100%',
//         height:'100%'
//     });
//     if(this.animateType == 'animate'){
//         $('.swiper-wrap',this.wrap).css({
//             width:this.imgWidth * (this.imgNum + 1),
//             height:this.imgHeight,
//             position:'absolute',
//             // overfloat:'hidden',

//         }).find('li').css({
//             width:this.imgWidth, 
//             height:this.imgHeight,
//             float:'left',
//             // position:absolute,
//         });
//     } else {
//         $('.swiper-wrap',this.wrap).css({
//             position:'relative'
//         }).find('li').css({
//             position:'absolute',
//             left:0,
//             top:0,
//             width:this.imgWidth,
//             height:this.imgHeight,
//             display:'none',
//         }).eq(this.nowIndex).css({
//             display:'block'
//         })
//     }
//     $('.btn',this.wrap).css({
//         width:50,
//         height:30,
//         lineHeight:'30px',
//         backgroundColor:'rgba(0,0,0,0.3)',
//         color:'#fff',
//         textAlign:'center',
//         position:'absolute',
//         top:'50%',
//         marginTop:-15,
//         cursor:'pointer',
//     }).filter('.right-btn').css({
//          right: 0,
//      });
//      $('.spot', this.wrap).css({
//          position:'absolute',
//          bottom:10,
//          width:'100%',
//          textAlign:'center',
//          cursor:'pointer',
//      })

//      $('.spot > span',this.wrap).css({
//          display:'inline-block',
//          width:10,
//          height:10,
//          margin:'0 5px',
//          borderRadius:'50%',
//          backgroundColor:'#fff',
//      }).eq(this.nowIndex).css({
//          backgroundColor:'red'
//      });
// }
// Swiper.prototype.bindEvent = function(){
//     var self = this;
//     $('.left-btn',this.wrap).click(function(){
//         if(!self.lock){
//             return false;
//         }
//         if(self.nowIndex == 0){
//             self.nowIndex = self.imgNum - 1;
//             if(self.animateType == 'animate'){
//                 $('.swiper-wrap',self.wrap).css({
//                     left:-self.imgWidth * self.imgNum
//                 });
//             }
//         }else{
//             self.nowIndex --;
//         } 
//         //改变图片动画
//         self.changeImg()     
//     });
//     $('.right-btn',this.wrap).click(function(){
//         if(!self.lock){
//             return false;
//         }
//         if(self.animateType == 'fade' && self.nowIndex == self.imgNum - 1){
//             self.nowIndex = 0;
//         } else if (self.animateType == 'animate' && self.nowIndex == self.imgNum){
//             $('.swiper-wrap',self.wrap).css({
//                 left:0
//             });
//             self.nowIndex = 1;
//         }else {
//             self.nowIndex ++;
//         }
//         self.changeImg() 
//     });
//     $('.spot > span',this.wrap).click(function(){
//         if(!self.lock){
//             return false;
//         }   
//         self.nowIndex = $(this).index();
//         self.changeImg();
//     });
//     $(this.wrap).mouseenter(function(){
//         clearTimeout(self.timer);
//     }).mouseleave(function(){
//         if(self.isAuto){
//             self.autoChange()
//         }
//     })
// }
// Swiper.prototype.changeImg = function(){
//     this.lock = false;
//     var self = this;
//     if(this.animateType == 'fade'){
//         //淡入淡出效果调用fadeIn fadeOut方法
//         $('.swiper-wrap > li',this.wrap).fadeOut().eq(this.nowIndex).fadeIn(function(){
//             self.lock = true;
//         });
//     }else{
//         $('.swiper-wrap',this.wrap).animate({
//             left: -this.nowIndex * this.imgWidth,

//         },function(){
//            self.lock = true;
//         })
//     }
//     $('.spot > span',this.wrap).css({
//         backgroundColor:'#fff',
//     }).eq(this.nowIndex % this.imgNum ).css({
//         backgroundColor:'red'
//     })
// }
// Swiper.prototype.autochange = function(){
//     var self = this;
//     this.timer = setInterval(function(){
//         $('.right-btn',self.wrap).trigger('click');
//     },3000)
// }

//   $.fn.extend({
//     swiper:function(options){
//         options.wrap = this;
//         var obj = new Swiper(options);
//         obj.init();
//     }
// })

// })(jQuery);




(function ($) {

    function Swiper(options) {
        // 轮播图添加到的父级
        this.wrap = options.wrap;
        // 轮播图片列表
        this.imgList = options.imgList;
        // 轮播图片数量
        this.imgNum = this.imgList.length;
        // 轮播图片动画类型
        this.animate = options.animate || 'fade';
        // 是否自动轮播
        this.isAuto = options.isAuto;
        // 是否展示轮播小圆点
        this.showBtn = options.showBtn === undefined ? true : options.showBtn;
        // 每张图片宽度
        this.imgWidth = options.imgWidth || this.wrap.width();
        // 每张图片的高度
        this.imgHeight = options.imgHeight || this.wrap.height();
        // 当前展示图片的索引值
        this.nowIndex = 0;
        // 动画是否正在执行
        this.flag = false;
        // 自动轮播定时器
        this.timer = null;
        // 初始化函数
        this.init = function () {
            this.createDom();
            this.initStyle();
            this.bindEvent();
            if (this.isAuto) {
                this.autoChange();
            }
        }
    }
    // 创建dom元素
    Swiper.prototype.createDom = function () {
        // 创建轮播图图片区域
        var oUl = $('<ul class="swiper-wrapper"></ul>');
        // 创建轮播图小圆点区域
        var spotDiv = $('<div class="spot"></div>');
        
        // 添加图片和小圆点
        this.imgList.forEach(function (item, index) {
            $('<li><a href="#"><img src="' + item + '"/></a></li>').appendTo(oUl);
            $('<span></span>').appendTo(spotDiv);
        });
        if (this.animate == 'animate') {
            $('<li><a href="#"><img src="' + this.imgList[0] + '"/></a></li>').appendTo(oUl);
        }
        // 左右两个切换按钮
        var leftBtn = $('<div class="left-btn btn">&lt;</div>');
        var rightBtn = $('<div class="right-btn btn">&gt;</div>');
        // 添加到页面中
        $(this.wrap).append(oUl).append(leftBtn).append(rightBtn);
        if (this.showBtn) {
            $(this.wrap).append(spotDiv);
        }
        // 初始化当前显示的图片
    }
    // 初始化样式
    Swiper.prototype.initStyle = function() {
        // 给轮播图区域添加初始化样式
        $(this.wrap).css({
            position: 'relative',
            overflow: 'hidden',
        });
        $('*', this.wrap).css({
            padding: 0,
            margin: 0,
            listStyle: 'none',
            textDecoration: 'none',
        }).find('img').css({
            width: '100%',
            height: '100%'
        });
        // 给图片区域添加样式 如果动画是淡入淡出则将图片放置在一起 并仅展示第一张
        if (this.animate == 'fade') {
            $('.swiper-wrapper', this.wrap).css({
                width: this.imgWidth,
                height: this.imgHeight
            }).find('li').css({
                position: 'absolute',
                width: this.imgWidth,
                height: this.imgHeight,
                display: 'none',
            }).eq(0).css({
                display: 'block',
            });
        // 如果动画是轮播则将图片放置在一行
        } else {
            $('.swiper-wrapper', this.wrap).css({
                width: this.imgWidth * (this.imgNum + 1),
                height: this.imgHeight,
                position: 'absolute',
                left: 0,
                top: 0,
                overflow: 'hidden',
            }).find('li').css({
                // position: 'absolute',
                float: 'left',
                width: this.imgWidth,
                height: this.imgHeight
            });
        }
        // 左右按钮样式
        $('.btn', this.wrap).css({
            width: 40,
            height: 40,
            lineHeight: '40px',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            textAlign: 'center',
            color: '#fff',
            position: 'absolute',
            top: '50%',
            marginTop: -25,
            cursor: 'pointer',
            borderRadius:'20px',
            borderRadius:'20px',
            fontSize:'15px'
            
        
        }).filter('.right-btn').css({
            right: 0,
        });





        $('.spot', this.wrap).css({
            position: 'absolute',
            overflow: 'hidden',
            bottom: 10,
            width: '100%',
            textAlign: 'center',
        }).find('span').css({
            // float: 'left',
            display: 'inline-block',
            width: 10,
            height: 10,
            margin: "0 5px",
            borderRadius: '50%',
            backgroundColor: '#fff',
            cursor: 'pointer',
        }).eq(this.nowIndex).css({
            backgroundColor: 'red'
        });
    }
    // 绑定事件
    Swiper.prototype.bindEvent = function () {
        var self = this;
        // 上一张按钮点击事件
        $('.left-btn', this.wrap).click(function () {
            if (self.flag) {
                return false;
            }
            // 当前图片索引值为0时点击上一张将要展示最后一张图片索引值为imgNum - 1
            if (self.nowIndex == 0) {
                self.nowIndex = self.imgNum - 1;
                // 如果动画类型时animate的话 图片要瞬间移动到最后一张图片的位置上再进行动画效果
                if (self.animate == 'animate') {
                    $('.swiper-wrapper', self.wrap).css({
                        left: -self.imgWidth * self.imgNum
                    });
                }
            } else {
                self.nowIndex --;
            }
            // 执行动画效果
            self.changeImage();
        });
        // 下一张按钮点击事件
        $('.right-btn', this.wrap).click(function () {
            if (self.flag) {
                return false;
            }
            // 如果动画效果为淡入淡出 则判断当前图片的索引是否展示的是图片轮播的最后一张如果是 则上一页为第一页即索引值为0
            if (self.animate == 'fade' && self.nowIndex == self.imgNum - 1) {
                self.nowIndex = 0;
                // 如果动画效果为animate  则要判断索引值是否是图片轮播最后一张图片的下一位即索引值为imgNum（重复的第一张图片位置） 如果是  则将轮播图位置瞬间移至第一张图片的位置 再进行轮播
            } else if (self.animate == 'animate' && self.nowIndex == self.imgNum) {
                $('.swiper-wrapper', self.wrap).css({
                    left: 0
                });
                self.nowIndex = 1;
            } else {
                self.nowIndex ++;
            }
            // 执行动画效果
            self.changeImage();
        });
        $('.spot > span', this.wrap).click(function () {
            if (self.flag) {
                return false;
            }
            // console.log()
            self.nowIndex = $(this).index();
            self.changeImage()
        });
        $(this.wrap).mouseenter(function () {
            clearInterval(self.timer);
        }).mouseleave(function () {
            self.autoChange();
        });
    }
    Swiper.prototype.changeImage = function () {
        this.flag = true;
        var self = this;
        if (this.animate == 'fade') {
            // 淡入淡出效果调用fadeIn  fadeOut方法
            $('.swiper-wrapper > li', this.wrap).fadeOut()
                                                .eq(this.nowIndex).fadeIn(function () {
                                                    self.flag = false;
                                                });
            // $('.spot > span', this.wrap).css('background-color', '#fff')
            //                     .eq(this.nowIndex).css({
            //                         backgroundColor: 'red',
            //                     });
        } else {
            // 轮播动画效果改变left值
            $('.swiper-wrapper', this.wrap).animate({
                left: -this.nowIndex * this.imgWidth
            }, function () {
                self.flag = false;
            })
        }
        $('.spot > span', this.wrap).css('background-color', '#fff')
        .eq(this.nowIndex % this.imgNum).css({
            backgroundColor: 'red',
        });
    }
    Swiper.prototype.autoChange = function () {
        var self = this;
        this.timer = setInterval(function() {
            $('.right-btn', self.wrap).trigger('click');
        }, 3000)
    }


    $.fn.extend({
        swiper: function(options) {
            options.wrap = this;
            var obj = new Swiper(options);
            obj.init();
        }
    })
} (jQuery))