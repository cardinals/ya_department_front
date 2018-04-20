//axios默认设置cookie
axios.defaults.withCredentials = true;
new Vue({
    el: '#app',
    data: function () {
        return {
            activeName: "first",      
            urls: ['inform.html', 'inform2.html'],
            //显示加载中样
            loading: false,
            labelPosition: 'right',
            //基本数据保存
            rowdata: { },
            //序号
            indexData: 0,
            //地图经度
            bdLon:0,
            //地图纬度
            bdLat:0,
            //发送至邮箱是否显示
            emailDialogVisible: false,
            email: "",
            //信息分享是否显示
            shareDialogVisible: false,
            //信息打印是否显示
            printDialogVisible: false,             
    }
},
    mounted: function () {
        this.loading=true;
        var url = location.search;
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            if(str.indexOf("&") != -1){
                var sylxStr = str.substr(str.indexOf("&")+1);
                str = str.substr(0,str.indexOf("&"));
            }
            var id = str.substring(3);
            sylxStr = sylxStr.substring(5);
            var start_sylx = sylxStr.substring(0,2);
            switch(start_sylx){
                case '11':
                     var div=document.getElementById("XHS");
                     div.style.display = "";
                     break;
                case '13':
                     var div=document.getElementById("XFSC");
                     div.style.display = "";
                     break;
                case '12':
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
                uuid : id,
                sylx : start_sylx
            }
            axios.post('/dpapi/xfsy/findSyAndSxByVo', params).then(function (res) {
                this.rowdata = res.data.result;
                this.bdLat = this.rowdata.bdLat;
                this.bdLon = this.rowdata.bdLon;
                this.loading=false;
                this.initMap();//创建和初始化地图
            }.bind(this), function (error) {
                console.log(error);
            })
           
        }
    },
    methods: {
        handleNodeClick(data) {
            //console.log(data);
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
        //标签页
        handleClick: function (e) {
           // console.log(e);
        },
        begindateChange(val) {
            //console.log(val);
            this.searchForm.begintime = val;
        },
        enddateChange(val) {
            //console.log(val);
            this.searchForm.endtime = val;
        },
        //发送至邮箱
        openEmail: function () {
            this.emailDialogVisible = true;
        },
        closeEmailDialog: function () {
            this.emailDialogVisible = false;
            this.email = "";
        },
        //信息分享
        openShare: function () {
            this.shareDialogVisible = true;
        },
        closeShareDialog: function () {
            this.shareDialogVisible = false;
        },
        //信息打印
        openPrinter: function () {
            window.print();
        },
        //表格重新加载数据
        loadingData: function () {
            var _self = this;
            _self.loading = true;
            setTimeout(function () {
                console.info("加载数据成功");
                _self.loading = false;
            }, 300);
        },
    },

})