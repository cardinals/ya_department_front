//axios默认设置cookie
axios.defaults.withCredentials = true;
var vm = new Vue({
    el: "#app",
    data: {
        city: '',
        marker: [],
        clusterer: null,
        marker1: '',
        marker2: '',
        marker3: '',
        markerData: [],
        zzData: [],
        syData: [],
        form: {
            delivery1: true,
            delivery2: true,
            delivery3: true
        },
        options: [
            { value: '北京', label: '北京' },
            { value: '天津', label: '天津' },
            { value: '河北', label: '河北' },
            { value: '山西', label: '山西' },
            { value: '内蒙古', label: '内蒙古' },
            { value: '辽宁', label: '辽宁' },
            { value: '吉林', label: '吉林' },
            { value: '黑龙江', label: '黑龙江' },
            { value: '上海', label: '上海' },
            { value: '江苏', label: '江苏' },
            { value: '浙江省', label: '浙江省' },
            { value: '安徽', label: '安徽' },
            { value: '福建', label: '福建' },
            { value: '江西', label: '江西' },
            { value: '山东', label: '山东' },
            { value: '河南', label: '河南' },
            { value: '湖北', label: '湖北' },
            { value: '湖南', label: '湖南' },
            { value: '广东', label: '广东' },
            { value: '广西', label: '广西' },
            { value: '海南', label: '海南' },
            { value: '重庆', label: '重庆' },
            { value: '四川', label: '四川' },
            { value: '贵州', label: '贵州' },
            { value: '云南', label: '云南' },
            { value: '西藏', label: '西藏' },
            { value: '陕西', label: '陕西' },
            { value: '甘肃省', label: '甘肃省' },
            { value: '青海', label: '青海' },
            { value: '宁夏', label: '宁夏' },
            { value: '新疆', label: '新疆' }],
        selectedOptions: [],
        selectedOptions2: [],
        tableData: [
            {
                DWMC: "辽宁省人民法院",
                XZQY: "辽宁省",
                DWDZ: "霞飞路29号",
                XFGXJGNAME: "沈阳市消防局",
                CJSJ: "2012-02-23",
                DWDJ: "省部级",
                DWXZ: "司法",
                DWDH: "1234567",
                ID: "1"
            },
            {
                DWMC: "辽宁省政府",
                DWDJ: "省部级",
                DWXZ: "行政",
                XZQY: "辽宁省",
                DWDZ: "霞飞路30号",
                ZDMJ: 50000,
                XFGXJGID: "沈阳市消防局",
                DWDH: "1234567",
                ID: "2"
            },
            {
                DWMC: "辽宁省就业局",
                DWDJ: "省部级",
                DWXZ: "民事",
                XZQY: "辽宁省",
                DWDZ: "霞飞路31号",
                ZDMJ: 20000,
                XFGXJGID: "沈阳市消防局",
                DWDH: "1234567",
                ID: "3"
            },
            {
                DWMC: "沈阳市城市规划管理局",
                DWDJ: "市厅级",
                DWXZ: "城市管理",
                XZQY: "辽宁省",
                DWDZ: "霞飞路32号",
                ZDMJ: 10000,
                XFGXJGID: "沈阳市消防和平分队",
                DWDH: "1234567",
                ID: "4"
            },
            {
                DWMC: "沈阳市公安局",
                DWDJ: "市厅级",
                DWXZ: "司法",
                XZQY: "辽宁省",
                DWDZ: "霞飞路33号",
                ZDMJ: 12000,
                XFGXJGID: "沈阳市消防沈河分队",
                DWDH: "1234567",
                ID: "5"
            },
            {
                DWMC: "沈阳市地铁二号线",
                DWDJ: "市厅级",
                DWXZ: "民事",
                XZQY: "辽宁省",
                DWDZ: "霞飞路34号",
                ZDMJ: 1000,
                XFGXJGID: "沈阳市消防浑南分队",
                DWDH: "1234567",
                ID: "6"
            },
            {
                DWMC: "青岛市塑性加工园",
                DWDJ: "市厅级",
                DWXZ: "城市管理",
                XZQY: "山东省",
                DWDZ: "文明路39号",
                ZDMJ: 2000,
                XFGXJGID: "青岛市市消防大东分队",
                DWDH: "1234567",
                ID: "7"
            },
            {
                DWMC: "泰安市城建局",
                DWDJ: "市厅级",
                DWXZ: "城市管理",
                XZQY: "山东省",
                DWDZ: "法防路36号",
                ZDMJ: 2000,
                XFGXJGID: "泰安市消防塔湾分队",
                DWDH: "1234567",
                ID: "8"
            },
            {
                DWMC: "河北省国土资源厅",
                DWDJ: "省部级",
                DWXZ: "城市管理",
                XZQY: "河北省",
                DWDZ: "格调路46号",
                ZDMJ: 3000,
                XFGXJGID: "河北省消防总队",
                DWDH: "1234567",
                ID: "9"
            },
            {
                DWMC: "秦皇岛市林业局",
                DWDJ: "市厅级",
                DWXZ: "城市管理",
                XZQY: "河北省",
                DWDZ: "发文路64号",
                ZDMJ: 4000,
                XFGXJGID: "秦皇岛市消防大队",
                DWDH: "1234567",
                ID: "10"
            }
        ]
    },
    methods: {
        getMarker1: function () {
            if (this.form.delivery1) {
                this.marker1.show();
            } else {
                this.marker1.hide();
            }
        },
        getMarker2: function () {
            if (this.form.delivery2) {
                this.marker2.show();
            } else {
                this.marker2.hide();
            }
        },
        getMarker3: function () {
            if (this.form.delivery3) {
                this.marker3.show();
            } else {
                this.marker3.hide();
            }
        },
        getCity: function () {
            var url = location.href;
            var tmp1 = url.split("?")[1];
            var city1 = tmp1.split("=")[1];
            this.city = decodeURI(city1);
        },
        getBoundary: function (map) {
            var bdary = new BMap.Boundary();
            bdary.get(this.city, function (rs) { //获取行政区域
                var count = rs.boundaries.length; //行政区域的点有多少个
                for (var i = 0; i < count; i++) {
                    var ply = new BMap.Polygon(rs.boundaries[i], { strokeWeight: 2, strokeColor: "#ff0000" }); //建立多边形覆盖物
                    ply.setFillColor("none");
                    map.addOverlay(ply); //添加覆盖物
                    map.setViewport(ply.getPath()); //调整视野 
                }
            });
        },
        //获取重点单位
        getPoint: function () {
            // debugger;
            var params = {};
            axios.post('/dpapi/importantunits/list', params).then(function (res) {
                this.markerData = res.data.result;
                if (this.markerData !== []) {
                    this.drawMap();
                }

            }.bind(this), function (error) {
                console.log(error);
            })
        },
        //组织机构
        getJgidData: function () {
            var params = {};
            axios.post('/dpapi/organization/getOrganizationtree', params).then(function (res) {
                this.zzData = res.data.result;
                if (this.zzData !== []) {
                    // this.getSyData();
                    this.drawMap();
                }
                console.log(this.zzData);
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        //水源
        getSyData: function () {
            // debugger;
            var params = {
                symc: "",
                sydz: "",
                sylx: "",
                dzbm: "",
                xz: "",
                kyzt: "",
                xhs_gwid: "",
                xhs_szxs: "",
                xhs_gwxs: "",
                xhs_jkxs: "",
                xfsh_gwid: "",
                xfsh_shgd: "",
                xfsh_jscd: "",
                xfsc_rl: "",
                xfsc_gwxs: "",
                xfsc_tcwz: "",
                xfmt_tcwz: "",
                xfmt_ksq: "",
                xfmt_sz: "",
                trsy_trsylx: "",
                trsy_ywksq: ""
            }
            axios.post('/dpapi/xfsy/findlist', params).then(function (res) {
                this.syData = res.data.result;
                if (this.syData !== []) {
                    this.drawMap();
                }
                console.log(this.syData);
            }.bind(this), function (error) {
                console.log(error);
            })

        },
        showOvera: function () {
            this.clusterer.addMarkers(this.marker);
        },
        hideOvera: function () {
            this.clusterer.removeMarkers(this.marker);
        },
        drawMap: function () {
            var content =
                '<div class="app-map-infowindow water-xhs-infowindow" style=" min-height: 184px;background-position: right bottom; background-repeat: no-repeat;" >' +
                '<h3 class="title" style=" margin: 0; padding: 0 12px;height: 32px;line-height: 32px; font-size: 16px;color: #666; border-bottom: 1px solid #ccc;white-space:nowrap;overflow:hidden; text-overflow:ellipsis;">' +
                '重点单位' +
                '</h3>' +
                '<div class="summary" style=" height: 32px; line-height: 32px;color: #999;">' +
                '详情' +
                '</div>' +
                '<table cellpadding="0" cellspacing="0" class="content">' +
                '<tr>' +
                '<td><strong>单位名称：</strong>泰安市城建局</td>' +
                '</tr>' +
                '<tr>' +
                '<td><strong>单位地址：</strong>法防路36号</td>' +
                '</tr>' +
                '<tr>' +
                '<td><strong>单位电话：</strong>123456</td>' +
                '</tr>' +
                '<tr>' +
                '<td><strong>消防管辖：</strong>泰安市消防塔湾分队</td>' +
                '</tr>' +
                '</table>' +
                '<div class="bbar" style="color:#8470FF;"><img src="../../static/images/zqdd.png"><b class="btn" onclick="onClickInfoWindowDetail()">总队级预案-预览</b></div>' +
                '<div class="bbar" style="color:#8470FF;"><img src="../../static/images/zqdd.png"><b class="btn" onclick="onClickInfoWindowDetail()">支队级预案-预览</b></div>' +
                '<div class="bbar" style="color:#8470FF;"><img src="../../static/images/zqdd.png"><b class="btn" onclick="onClickInfoWindowDetail()">大中队级预案-预览</b></div>' +
                '<div class="x-clear"></div>' +
                '</div>'
                ;
            var map = new BMap.Map("BMap");    //创建Map实例
            // debugger;
            var top_left_control = new BMap.ScaleControl({
                anchor: BMAP_ANCHOR_TOP_LEFT
            });
            map.addControl(top_left_control);
            //添加地图类型控件
            map.addControl(new BMap.MapTypeControl({
                mapTypes: [
                    BMAP_NORMAL_MAP,
                    BMAP_HYBRID_MAP
                ]
            })
            );
            map.setCurrentCity(this.city);      //设置地图显示的城市 此项是必须设置的
            map.centerAndZoom(this.city);       //设置地图中心点
            map.enableScrollWheelZoom(true);      //开启鼠标滚轮缩放
            map.setMinZoom(5);       //设置地图最小缩放级别
            this.getBoundary(map);   //绘制边框
            var myIcon1 = new BMap.Icon("../../static/images/marker_hydrant_map.png", new BMap.Size(25, 25));      //创建图标
            var myIcon2 = new BMap.Icon("../../static/images/marker_xfc_map.png", new BMap.Size(45, 45));      //创建图标
            var myIcon3 = new BMap.Icon("../../static/images/marker_qyd_map.png", new BMap.Size(25, 25));      //创建图标
            var pt = null;
            var markerDatas = [];
             var Point = new BMap.Point(117.2832435, 39.1429405);
            //  var x2 = Point.lng * Math.PI / 180;
            //  var y2 = Point.lat * Math.PI / 180;
            //  var circle = new BMap.Circle(Point, 1000, { fillColor: "red", strokeWeight: 1, fillOpacity: 0.3, strokeOpacity: 0.3 });
            //  var radius = 1000;
            //  var r = 6371004;
            //  map.addOverlay(circle);
            // 重点单位
            for (i = 0; i < this.markerData.length; i++) {  
                var x = this.markerData[i].gisX;
                // var x1 = x * Math.PI / 180;
                var y = this.markerData[i].gisY;
                // var gcj = bd_decrypt(x,y);
                // gcj.lon,gcj.lat
                // var y1 = y * Math.PI / 180;
                // var dx = Math.abs(x1 - x2);
                // var dy = Math.abs(y1 - y2);
                // var p = Math.pow(Math.sin(dy / 2), 2) + Math.cos(y1) * Math.cos(y2) * Math.pow(Math.sin(dx / 2), 2);
                // var d = r * 2 * Math.asin(Math.sqrt(p));
                var pt = new BMap.Point(x, y);  // 创建坐标点
                var myIcon1 = new BMap.Icon("../../static/images/marker_zddw_map.png", new BMap.Size(24, 24));      //创建图标
                var marker = new BMap.Marker(pt, { icon: myIcon1 });
                this.marker.push(marker);
                markerDatas.push(marker);
                // var infoWindow = new BMap.InfoWindow(content);  // 创建信息窗口对象
                // map.addOverlay(marker);
                marker.addEventListener("click", function (e) {
                    var marker = e.currentTarget;
                    // debugger;
                    var pt = marker.point;
                    this.openInfoWindow(infoWindow);
                    var circle = new BMap.Circle(pt, 1000, { fillColor: "red", strokeWeight: 1, fillOpacity: 0.3, strokeOpacity: 0.3 });
                    var radius = 1000;
                    var r = 6371004;
                    map.addOverlay(circle);
                });
            };
            //组织机构
            for (i = 0; i < this.zzData.length; i++) {
                var x = this.zzData[i].gisX;
                var x1 = x * Math.PI / 180;
                var y = this.zzData[i].gisY;
                var y1 = y * Math.PI / 180;
                var dx = Math.abs(x1 - x2);
                var dy = Math.abs(y1 - y2);
                var p = Math.pow(Math.sin(dy / 2), 2) + Math.cos(y1) * Math.cos(y2) * Math.pow(Math.sin(dx / 2), 2);
                var d = r * 2 * Math.asin(Math.sqrt(p));
                if (radius >= d) {
                    var pt = new BMap.Point(x, y);     // 创建坐标点
                    var myIcon1 = new BMap.Icon("../../static/images/marker_zqzd_map.png", new BMap.Size(24, 24));      //创建图标
                    var marker = new BMap.Marker(pt, { icon: myIcon1 });
                    this.marker = marker;
                    markerDatas.push(marker);
                    var infoWindow = new BMap.InfoWindow(content);  // 创建信息窗口对象
                    // map.addOverlay(marker);
                    marker.addEventListener("click", function () {
                        var marker = e.currentTarget;
                        // debugger;
                        var pt = marker.point;
                        this.openInfoWindow(infoWindow);
                        var circle = new BMap.Circle(pt, 1000, { fillColor: "red", strokeWeight: 1, fillOpacity: 0.3, strokeOpacity: 0.3 });
                        var radius = 1000;
                        var r = 6371004;
                        map.addOverlay(circle);
            
                    });
                }
            };
            //水源
            // console.log(this.syData);
            for (i = 0; i < this.syData.length; i++) {
                var x = this.syData[i].gisX;
                // var x1 = x * Math.PI / 180;
                var y = this.syData[i].gisY;
                // var y1 = y * Math.PI / 180;
                // var dx = Math.abs(x1 - x2);
                // var dy = Math.abs(y1 - y2);
                // var p = Math.pow(Math.sin(dy / 2), 2) + Math.cos(y1) * Math.cos(y2) * Math.pow(Math.sin(dx / 2), 2);
                // var d = r * 2 * Math.asin(Math.sqrt(p));
                // if (radius >= d) {
                var pt = new BMap.Point(x, y);     // 创建坐标点
                var myIcon1 = new BMap.Icon("../../static/images/marker_naturalwater_map.png", new BMap.Size(24, 24));      //创建图标
                var marker = new BMap.Marker(pt, { icon: myIcon1 });
                this.marker.push(marker);
                markerDatas.push(marker);
                var infoWindow = new BMap.InfoWindow(content);  // 创建信息窗口对象
                // map.addOverlay(marker);
                marker.addEventListener("click", function (e) {
                    this.openInfoWindow(infoWindow);
                    var marker = e.currentTarget;
                    // debugger;
                    var pt = marker.point;
                    var circle = new BMap.Circle(pt, 1000, { fillColor: "red", strokeWeight: 1, fillOpacity: 0.3, strokeOpacity: 0.3 });
                    var radius = 1000;
                    var r = 6371004;
                    map.addOverlay(circle);
                });
                // }
            }
            console.log(this.marker);
            //悬浮框
            var markerClusterer = new BMapLib.MarkerClusterer(map);
            var clustererStyle = [{
                url: '../../static/images/heart30.png',
                size: new BMap.Size(30, 26),
                opt_anchor: [16, 0],
                textColor: '#ff00ff',
                opt_textSize: 10
            }, {
                url: '../../static/images/heart40.png',
                size: new BMap.Size(40, 35),
                opt_anchor: [40, 35],
                textColor: '#ff0000',
                opt_textSize: 12
            }, {
                url: '../../static/images/heart50.png',
                size: new BMap.Size(50, 44),
                opt_anchor: [32, 0],
                textColor: 'white',
                opt_textSize: 14
            }];
            this.clusterer = markerClusterer;
            // markerClusterer.setStyles(clustererStyle);
            markerClusterer.addMarkers(markerDatas);
          
            //弹出框
            var infoWindow = new BMap.InfoWindow(content);  // 创建信息窗口对象//悬浮框 
        },


    },
    mounted() {
        this.getCity();
        document.title = this.city + '预案情况';
        // this.getPoint();
        // this.getJgidData();
        this.getSyData();
        // this.showOvera();
        // this.hideOver();
    }
})
