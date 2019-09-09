(function(){
    function DropDown(options){
        this.father = options.father;
        this.dropDownWidth = options.dropDownWidth;
        this.menuList = options.menuList;
        this.colWidth = options.colWidth;
        this.direction = options.direction || 'y';

        this.init = function(){
            this.createDom();    
            this.initStyle();
            this.bindEvent();
        }   
    }

    DropDown.prototype.createDom = function(){
        var oDiv = $('<div class = "my-dropdown"></div>');
        // var self = this;
        this.menuList.forEach(function(menu){
            var oDl = $('<dl></dl>');
            if(menu.title){
                $('<dt>' + menu.title + '</dt>').appendTo(oDl);

            }
            menu.items.forEach(function(item){
                $('<dd><a href = "' + item.href + '">' + item.name +'</a></dd>').appendTo(oDl);

            });
            // console.log(this)
            if(menu.menuWidth){
                oDl.css({
                    width:menu.menuWidth,
                });
            }
            if(menu.colWidth){
                $('dd',oDl).css({
                    width:menu.colWidth,
                });
            }
            oDiv.append(oDl); 
        });
        $(this.father).append(oDiv);
    }
    DropDown.prototype.initStyle = function(){
        $(this.father).css({
            position:'relative',
        }).find('.my-dropdown').css({
            width:this.dropDownWidth,
            background:'#fff',
            position:'absolute',
            border:'1px solid #ccc',
            borderTop:'none',
            display:'none',
            left:0,
            zIndex:200,
        }).find('dl').css({
            padding:'10px 0 10px 15px',
            borderBottom:'1px solid #ccc',
            overflow:'hidden' //清除浮动
        }).find('.dt').css({
            fontWeight:'bold',//加粗
        }).end().find('dd').css({
            width:this.colWidth,
            float:'left',
            whiteSpace:'nowrap',//不换行
        });       
        if(this.direction == 'x'){
            $('.my-dropdown',this.father).css({
                right:-73,
                left:'auto',//改变上面left的影响。左右优先于left
                padding:'15px 0',
            }).find('dl').css({
                float:'left',
                borderRight:'1px solid #ccc',
                borderBottom:'none'
            })

        }
    }
    DropDown.prototype.bindEvent = function(){
        $('.my-dropdown dl dd',this.father).hover(function(){
            this.color = $(this).css('color');
            $('a',this).css({
                color:'red',
            })
            },function(){
                $('a',this).css({
                    color:this.color,
                })
            });
            $(this.father).hover(function(){
                $(this).css({
                    backgroundColor:'#fff',
                })
                $('.my-dropdown',this).show();
            },function(){
                $(this).css({
                    backgroundColor:'transparent',//透明色
                })
                $('.my-dropdown',this).hide();
        })
    }



$.fn.extend({
    addDropdown:function(options){
    
        //保存下拉列表添加到的位置
        options.father = this;
        //创建一个下拉列表对象
        var obj = new DropDown(options); 

        obj.init();
        
    }
})


}())