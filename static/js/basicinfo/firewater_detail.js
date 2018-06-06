new Vue({
    el: "#detailDisplay",
    data: function () {
        return {
            activeName: "first",  
            //页面获取的pkid
            id:"",
            //页面获取的水源类型
            sylx:"",
            //详情Data
            detailData: {},
           //地图经度
           bdLon:0,
           //地图纬度
           bdLat:0,
           
        }
    },
    created: function () {
        //取得选中行id
        this.id = this.GetQueryString("id");
        console.log(this.id);
        //获取选中行水源类型
        this.sylx = this.GetQueryString("sylx");
        history.back();
        //console.log(this.sylx);
        var start_sylx = this.sylx.substring(0,2);
        switch(start_sylx){
            case '01':
                 var div=document.getElementById("XHS");
                 div.style.display = "";
                 break;
            case '02':
                 var div=document.getElementById("XFSC");
                 div.style.display = "";
                 break;
            case '03':
                 var div=document.getElementById("XFSH");
                 div.style.display = "";
                 break;
            case '21':
                 var div=document.getElementById("XFMT");
                 div.style.display = "";
                 break;
            case '29':
                 var div=document.getElementById("TRSY");
                 div.style.display = "";
                 break;
        }
        var params = {
            uuid : this.id,
            sylx : start_sylx
        }
        axios.post('/dpapi/xfsy/findSyAndSxByVo', params).then(function (res) {
            this.detailData = res.data.result;
            this.bdLat = this.detailData.bdLat;
            this.bdLon = this.detailData.bdLon;
            this.loading=false;
            this.initMap();//创建和初始化地图
        }.bind(this), function (error) {
            console.log(error);
        })
    },

    methods: {
        //根据参数部分和参数名来获取参数值 
        GetQueryString(name) {
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if(r!=null)return  unescape(r[2]); return null;
        },
        //创建和初始化地图函数：
        initMap: function(){
            this.createMap();//创建地图
            this.setMapEvent();//设置地图事件
            this.addMapControl();//向地图添加控件
        },
        //创建地图函数：
        createMap: function(){
            var map = new BMap.Map("dituContent");//在百度地图容器中创建一个地图
            var point = new BMap.Point(this.bdLon,this.bdLat);//定义一个中心点坐标
            map.centerAndZoom(point,15);//设定地图的中心点和坐标并将地图显示在地图容器中
            window.map = map;//将map变量存储在全局
        },
        //地图事件设置函数：
        setMapEvent:function(){
            map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
            map.enableScrollWheelZoom();//启用地图滚轮放大缩小
            map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
            map.enableKeyboard();//启用键盘上下左右键移动地图
        },
        //地图控件添加函数：
        addMapControl:function(){
            //向地图中添加缩放控件
            var ctrl_nav = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
            map.addControl(ctrl_nav);
            //向地图中添加缩略图控件
            var ctrl_ove = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:0});
            map.addControl(ctrl_ove);
            //向地图中添加比例尺控件
            var ctrl_sca = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
            map.addControl(ctrl_sca);
        },
        handleClick: function (tab, event) {
          /*
            if(tab.name == "second"){
                this.initMap();
            }
            */
         },
    }
})
