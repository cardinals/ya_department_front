//axios默认设置cookie
axios.defaults.withCredentials = true;
//lxy
$("#shengshizs").hide();
$("#zddwxx").hide();
var vm = new Vue({
    el: "#app",
    data: {
        loading: false,
        //点击重点单位标记上次画的圆
        circle: new BMap.Circle(),
        city: '',
        circlez: [],
        marker: [],
        clusterer: null,
        marker1: '',
        marker2: '',
        marker3: '',
        isTrafficOpen: '1',
        uuid: '',
        zddwzs: '',
        zddwxx: [],
        markerData: [],
        ShengZddwDate: [],
        ShiZddwDate: [],
        zzData: [],
        syData: [],
        clData: [],
        citys: [],
        zdd: '',
        shuiData: [],
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
        ],
        planData: {
            yaid_1: '',
            yaid_2: '',
            yaid_3: ''
        },
        planList:{},
        infoData: {},
        dwdzData: {},
        xfzrrData: {},
        zbdhData: {},
        fhdjData: {},
        xfdzData: {},
        yajbData: {},
        //消防水源详细信息
        sylxmcData: {},
        qsxsData: {},
        symcData: {},
        kyztmcData: {},
        //消防队站详细信息
        dzmcData: {},
        dzlxmcData: {},
        lxdhData: {},
        dzjcData: {},
        dzdzData: {},
        //微型消防站详细信息
        smallStation: [
            {
                gisX: 121.6032117845,
                gisY: 38.9435389700,
                xfzmc: '海防消防站'
            },
            {
                gisX: 121.6048317845,
                gisY: 38.9438239700,
                xfzmc: '香周消防站'
            },
            {
                gisX: 121.6015614549,
                gisY: 38.9402527700,
                xfzmc: '香工街消防站'
            },
            {
                gisX: 121.6025614549,
                gisY: 38.9372534900,
                xfzmc: '远东消防站'
            }
        ], 
        //分页功能
        shengshizs: [],
        selqhmc: [],
        searchForm: {
            xzqh: '',
            xzqhmc: ''
        },
        //当前页
        currentPage: 1,
        //分页大小
        pageSize: 8,
        //预案信息总记录数
        total: 10,
        //序号
        indexData: 0,
        
        // db start
        //检索数据
        searchData: [],
        //消防库检索框输入
        searchCond: '',
        //百度库检索框输入
        searchBaiduCond: '',
        //检索来源
        searchSource: '搜索百度库',
        //当前城市
        myCity: ''
        // db end
    },
    mounted() {
        // var gis_X = this.GetQueryString("gis_X");
        // var gis_Y = this.GetQueryString("gis_Y");
        // var isSydj = this.GetQueryString("sydj");
        // if(isSydj == 1){
        //     var gisX = this.GetQueryString("gis_X");
        //     var gisY = this.GetQueryString("gis_Y");
        //     var zddw={
        //         gisX:gisX,
        //         gisY:gisY,
        //     };
        //     vm.drawMapc(zddw);
        // }
        this.getCity();
        document.title = this.city + '预案情况';
        this.getShengZddwDate();//省
        

    },
    methods:
        //获取重点单位信息
        {
            //当前页修改事件
            handleCurrentChange(val) {
                this.currentPage = val;
                var _self = this;
                _self.loadingData(); //重新加载数据
            },
            getZddwxx: function (xzqh, uuid) {
                var params = { xzqh: xzqh, uuid: uuid };
                axios.post('/dpapi/importantunits/doSearchListByVO', params).then(function (res) {
                    this.zddwxx = res.data.result;
                    this.total = res.data.result.length;
                    //lxy20180528
                    $("#shengshizs").hide();
                    $("#zddwxx").show();
                }.bind(this), function (error) {
                    console.log(error);
                })
            },
            shengshiClick: function (data) {
                var xzqh = data.xzqh;
                this.searchForm.xzqhmc = data.xzqhmc;
                this.selqhmc = this.shengshizs;
                var map = vm.map;
                vm.hideMarker(vm.province);
                vm.hideMarker(vm.cityp);
                var pt = new BMap.Point(data.gisX, data.gisY);
                //判断是省还是市
                if (xzqh.indexOf("0000") > 0) {
                    //获取市下拉
                    var params = {
                        xzqh: xzqh
                    };
                    axios.post('/dpapi/map/getShiMapByVO', params).then(function (res) {
                        this.shengshizs = res.data.result;
                        //获取焦点
                        map.centerAndZoom(pt, 7);
                        vm.drawMapa(this.shengshizs);
                        this.total = res.data.result.length;
                        $("#shengshizs").show();
                        $("#zddwxx").hide();

                    }.bind(this), function (error) {
                        console.log(error);
                    })
                } else {
                    params = { xzqh: xzqh };
                    axios.post('/dpapi/map/getImportantunitsVO', params).then(function (res) {
                        this.zddwxx = res.data.result;
                        //获取焦点
                        map.centerAndZoom(pt, 15);
                        vm.drawMapb(this.zddwxx);
                        this.total = res.data.result.length;
                        $("#shengshizs").hide();
                        $("#zddwxx").show();
                    }.bind(this), function (error) {
                        console.log(error);
                    })
                    $("#shengshizs").hide();
                    $("#zddwxx").show();
                }
            },
            zddwxxClick: function (zddwxx) {
                vm.drawMapc(zddwxx);
            },
            // //表格查询事件
            searchClick: function () {
                //选中的数据
                var bdata = this.searchForm.xzqhmc;
                var xzqh = bdata.xzqh;
                vm.shengshiClick(bdata);
                var params = {
                    xzqh: xzqh
                };
                //判断是否为省
                if (xzqh.indexOf("0000") > 0) {
                    axios.post('/dpapi/map/getShiMapByVO', params).then(function (res) {
                        this.total = res.data.result.length;
                        this.shengshizs = res.data.result;
                        $("#shengshizs").show();
                        $("#zddwxx").hide();
                    }.bind(this), function (error) {
                        console.log(error);
                    })
                } else {
                    params = { xzqh: xzqh };
                    axios.post('/dpapi/importantunits/doSearchZddwListByVO', params).then(function (res) {
                        this.zddwxx = res.data.result;
                        this.total = res.data.result.length;
                        $("#shengshizs").hide();
                        $("#zddwxx").show();
                    }.bind(this), function (error) {
                        console.log(error);
                    })
                    $("#shengshizs").hide();
                    $("#zddwxx").show();
                }
            },
            // lxy end
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
            //获取省范围的方法
            getBoundary: function (map) {
                var bdary = new BMap.Boundary();
                bdary.get(this.city, function (rs) { //获取行政区域
                    var count = rs.boundaries.length; //行政区域的点有多少个
                    for (var i = 0; i < count; i++) {
                        var ply = new BMap.Polygon(rs.boundaries[i], { strokeWeight: 3, strokeColor: "#ff0000" }); //建立多边形覆盖物
                        ply.setFillColor("none");
                        map.addOverlay(ply); //添加覆盖物 map.setViewport(ply.getPath());调整视野 
                    }
                });
            },
            //获取省份
            getShengZddwDate: function () {
                var params = {};
                axios.post('/dpapi/map/getMapByVO', params).then(function (res) {
                    this.ShengZddwDate = res.data.result;
                    this.total = res.data.result.length;
                    //获取左侧省市的卡片数据
                    this.shengshizs = res.data.result;
                    //省市与重点单位详细切换
                    $("#shengshizs").show();
                    $("#zddwxx").hide();
                    this.initMap();
                }.bind(this), function (error) {
                    console.log(error);
                })
            },
            //获取城市
            getShiZddwDate: function (xzqh) {
                var params = {
                    xzqh: xzqh
                };
                axios.post('/dpapi/map/getShiMapByVO', params).then(function (res) {
                    this.ShiZddwDate = res.data.result;
                    //分页，数据总数
                    this.total = res.data.result.length;
                    //省或者市的重点单位信息
                    this.shengshizs = res.data.result;
                    $("#shengshizs").show();
                    $("#zddwxx").hide();
                    this.drawMapa(res.data.result);
                }.bind(this), function (error) {
                    console.log(error);
                })
            },
            //重点单位
            getQuZddwDate: function (xzqh) {
                var params = {
                    xzqh: xzqh
                };
                axios.post('/dpapi/map/getImportantunitsVO', params).then(function (res) {
                    this.markerData = res.data.result;
                    this.drawMapb(this.markerData);
                }.bind(this), function (error) {
                    console.log(error);
                })
            },
            //获取水源详情
            getSyDetails: function (uuid) {
                axios.get('/dpapi/xfsy/findlist' + this.uuid).then(function (res) {
                    this.shuiData = res.data.result;
                }.bind(this), function (error) {
                    console.log(error)
                })
            },
            //组织机构
            getJgidData: function () {
                var params = {};
                axios.post('/api/organization/getOrganizationtree', params).then(function (res) {
                    this.zzData = res.data.result;
                    if (this.zzData !== []) {
                    }
                }.bind(this), function (error) {
                    console.log(error);
                })
            },
            //水源
            getSyData: function () {
                var map = vm.map;
                var bounds = map.getBounds();
                var xmin = bounds.getSouthWest().lng;
                var xmax = bounds.getNorthEast().lng;
                var ymin = bounds.getSouthWest().lat;
                var ymax = bounds.getNorthEast().lat;
                var params = {
                    gisX_min: xmin,
                    gisX_max: xmax,
                    gisY_min: ymin,
                    gisY_max: ymax
                }
                axios.post('/dpapi/xfsy/findlist', params).then(function (res) {
                    this.syData = res.data.result;
                    vm.createClusterbb();//聚合
                    this.getSysj();
                }.bind(this), function (error) {
                    console.log(error);
                })
            },
            //车辆
            getClData: function () {
                var map = vm.map;
                var bounds = map.getBounds();
                var xmin = bounds.getSouthWest().lng;
                var xmax = bounds.getNorthEast().lng;
                var ymin = bounds.getSouthWest().lat;
                var ymax = bounds.getNorthEast().lat;
                var params = {
                    gisX_min: xmin,
                    gisX_max: xmax,
                    gisY_min: ymin,
                    gisY_max: ymax
                }
                //车辆获取
                axios.post('/dpapi/fireengine/list', params).then(function (res) {
                    this.clData = res.data.result;
                    vm.createClustercc();//聚合
                    this.getClsj();
                }.bind(this), function (error) {
                    console.log(error);
                })
            },
            //获取重点单位//获取重点单位取不到
            getPoint: function () {
                var map = vm.map;
                var bounds = map.getBounds();
                var xmin = bounds.getSouthWest().lng;
                var xmax = bounds.getNorthEast().lng;
                var ymin = bounds.getSouthWest().lat;
                var ymax = bounds.getNorthEast().lat;
                var params = {
                    gisX_min: xmin,
                    gisX_max: xmax,
                    gisY_min: ymin,
                    gisY_max: ymax
                }
                axios.post('/dpapi/importantunits/list', params).then(function (res) {
                    this.markerData = res.data.result;
                    vm.createCluster();//聚合
                    this.getZdsj();
                }.bind(this), function (error) {
                    console.log(error);
                })
            },
            //队站
            getDzData: function () {
                var map = vm.map;
                var bounds = map.getBounds();
                var xmin = bounds.getSouthWest().lng;
                var xmax = bounds.getNorthEast().lng;
                var ymin = bounds.getSouthWest().lat;
                var ymax = bounds.getNorthEast().lat;
                var params = {
                    gisX_min: xmin,
                    gisX_max: xmax,
                    gisY_min: ymin,
                    gisY_max: ymax
                }
                axios.post('/dpapi/xfdz/list', params).then(function (res) {
                    this.dzData = res.data.result;
                    vm.createClusteraa();//聚合
                    this.getDzsj();
                }.bind(this), function (error) {
                    console.log(error);
                })
            },
            initMap: function () {
                // db start
                // 百度地图API功能
                function G(id) {
                    return document.getElementById(id);
                }
                var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
                    {
                        "input": "suggestId"
                        , "location": map
                    });

                ac.addEventListener("onhighlight", function (e) {  //鼠标放在下拉列表上的事件
                    var str = "";
                    var _value = e.fromitem.value;
                    var value = "";
                    if (e.fromitem.index > -1) {
                        value = _value.province + _value.city + _value.district + _value.street + _value.business;
                    }
                    str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;

                    value = "";
                    if (e.toitem.index > -1) {
                        _value = e.toitem.value;
                        value = _value.province + _value.city + _value.district + _value.street + _value.business;
                    }
                    str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
                    G("searchResultPanel").innerHTML = str;
                });

                var myValue;
                ac.addEventListener("onconfirm", function (e) {    //鼠标点击下拉列表后的事件
                    var _value = e.item.value;
                    myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
                    this.myCity = _value.city;
                    console.log(this.myCity);
                    G("searchResultPanel").innerHTML = "onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;

                    setPlace();
                });

                function setPlace() {
                    map.clearOverlays();    //清除地图上所有覆盖物
                    function myFun() {
                        var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
                        map.centerAndZoom(pp, 18);
                        map.addOverlay(new BMap.Marker(pp));    //添加标注
                    }
                    var local = new BMap.LocalSearch(map, { //智能搜索
                        onSearchComplete: myFun
                    });
                    local.search(myValue);
                }
                // db end

                var map = new BMap.Map("BMap", { enableMapClick: false });  //创建Map实例
                vm.map = map;
                //声明mapType为2D
                this.mapType = '2D';
                // 添加带有定位的导航控件
                var navigationControl = new BMap.NavigationControl({
                    // 靠左上角位置
                    anchor: BMAP_ANCHOR_TOP_LEFT,
                    // LARGE类型
                    type: BMAP_NAVIGATION_CONTROL_LARGE,
                    // 启用显示定位
                    enableGeolocation: true
                });
                map.addControl(navigationControl);
                // 添加定位控件
                var geolocationControl = new BMap.GeolocationControl();
                geolocationControl.addEventListener("locationSuccess", function (e) {
                    // 定位成功事件
                    var address = '';
                    address += e.addressComponent.province;
                    address += e.addressComponent.city;
                    address += e.addressComponent.district;
                    address += e.addressComponent.street;
                    address += e.addressComponent.streetNumber;
                    alert("当前定位地址为：" + address);
                });
                geolocationControl.addEventListener("locationError", function (e) {
                    // 定位失败事件
                    alert(e.message);
                });
                map.addControl(geolocationControl);
                map.centerAndZoom(new BMap.Point(107.164226, 31.859637), 5);
                var top_left_control = new BMap.ScaleControl({
                    anchor: BMAP_ANCHOR_TOP_LEFT
                });
                map.addControl(top_left_control);
                map.enableScrollWheelZoom(true);//开启鼠标滚轮缩放
                vm.createCluster();
                vm.drawMap();
                //经纬度的获取
                map.addEventListener("click", function (e) {
                    document.getElementById('lat').value = e.point.lat;
                    document.getElementById('lng').value = e.point.lng;
                });
                //重点单位从后台管理系统的跳转
                var isSydj = this.GetQueryString("sydj");                
                if(isSydj == 1){
                    var zddw = "";
                    var ID = this.GetQueryString("uuid");
                    axios.get('/dpapi/importantunits/' + ID).then(function (res) {
                        zddw = res.data.result;
                        vm.drawMapc(zddw);
                    }.bind(this), function (error) {
                        console.log(error)
                    })
                   
                  }
                //水源从后台管理系统的跳转
                 var isShuidj = this.GetQueryString("shuidj");                
                 if(isShuidj == 1){
                     this.loading = true;
                     var sy = "";
                     var ID = this.GetQueryString("uuid");
                     var sylx = this.GetQueryString("sylx");
                     var params = {
                        uuid : ID,
                        sylx : sylx
                    }
                    axios.post('/dpapi/xfsy/findSyAndSxByVo', params).then(function (res) {
                        sy = res.data.result;
                        vm.getSysjz(sy);
                     }.bind(this), function (error) {
                         console.log(error)
                     })
                    
                   }
                //队站从后台管理系统的跳转
                 var isDzdj = this.GetQueryString("dzdj");                
                 if(isDzdj == 1){
                     this.loading = true;
                     var dz = "";
                     var dzid = this.GetQueryString("dzid");
                     var dzlx = this.GetQueryString("dzlx");
                     var params = {
                        dzid : dzid,
                        dzlx : dzlx
                    }
                    axios.post('/dpapi/xfdz/list', params).then(function (res) {
                        dz = res.data.result;
                        vm.getDzjz(dz);
                     }.bind(this), function (error) {
                         console.log(error)
                     })
                    
                   }

            },
            //除去聚合点（保留项）
            removeCluster:function(){
                var map = vm.map;
                var markerClusterer = new BMapLib.MarkerClusterer(map);
                var clustererStyle = [{
                   
                }];
                markerClusterer.setStyles(clustererStyle);
                vm.markerClusterer = markerClusterer;
            },
            //重点单位聚合
            createCluster: function () {
                var map = vm.map;
                var markerClusterer = new BMapLib.MarkerClusterer(map);
                var clustererStyle = [{
                    url: '../../static/images/new/w1_z.png',
                    
                    size: new BMap.Size(135, 95),
                 
                    textColor: 'red',
                    textSize: '180px',
                    textMarginTop:'200px',

                }];
                markerClusterer.setStyles(clustererStyle);
                vm.markerClusterer = markerClusterer;
            },
            //队站聚合
            createClusteraa: function () {
                var map = vm.map;
                var markerClusterer = new BMapLib.MarkerClusterer(map);
                var clustererStyle = [{
                    url: '../../static/images/maptool/zqdd.png',
                    size: new BMap.Size(70, 25),
                    textColor: '#fff',
                }];
                markerClusterer.setStyles(clustererStyle);
                vm.markerClusterer = markerClusterer;
            },
            //水源聚合
            createClusterbb: function () {
                var map = vm.map;
                var markerClusterer = new BMapLib.MarkerClusterer(map);
                var clustererStyle = [{
                    url: '../../static/images/maptool/trsy.png',
                    size: new BMap.Size(70, 25),
                    textColor: '#fff',
                }];
                markerClusterer.setStyles(clustererStyle);
                vm.markerClusterer = markerClusterer;
            },
            //车辆聚合
            createClustercc: function () {
                var map = vm.map;
                var markerClusterer = new BMapLib.MarkerClusterer(map);
                var clustererStyle = [{
                    url: '../../static/images/maptool/fireengine.png',
                    size: new BMap.Size(70, 25),
                    textColor: '#fff',
                }];
                markerClusterer.setStyles(clustererStyle);
                vm.markerClusterer = markerClusterer;
            },
            //图层一
            drawMap: function () {
                var map = this.map;
                var myIcon1 = new BMap.Icon("../../static/images/new/w1_p.png", new BMap.Size(100, 70)); //创建图标
                var province = [];
                this.province = province;
                var provinces = this.ShengZddwDate;
                //数据库表
                for (var i = 0; i < provinces.length; i++) {
                    var pt = new BMap.Point(provinces[i].gisX, provinces[i].gisY);
                    var marker = new BMap.Marker(pt, { icon: myIcon1 });
                    var label = new BMap.Label(this.formatLabelz(provinces[i].xzqhmc + provinces[i].zddwsl));
                    marker.province = provinces[i];
                    label.setStyle({
                        fontSize: '11px',
                        fontWeight: 'bold',
                        border: '0',
                        padding: '14px 4px',
                        textAlign: 'center',
                        marginLeft: '1.5px',
                        marginTop: '40px',
                        color: '#ED0C0A',
                        borderRadius: '5px',
                        paddingRight: '58px',
                      
                        marginTop: '25px',
                        background:'',
                    });
                    //zjczzz
                    marker.addEventListener("onmouseover", function(e) {
                        var myIcon3 = new BMap.Icon("../../static/images/new/w1_pp.png", new BMap.Size(100, 70)); //点击后的新图标
                        var marker = e.currentTarget;
                        marker.setIcon(myIcon3);
                    });
                    marker.addEventListener("onmouseout", function(e) {
                        var myIcon1 = new BMap.Icon("../../static/images/new/w1_p.png", new BMap.Size(100, 70)); //点击后的新图标
                        var marker = e.currentTarget;
                        marker.setIcon(myIcon1);
                    });
                    //
                    marker.addEventListener("click", function (e) {
                        //获取行政区划
                        var xzqh = e.target.province.xzqh;
                        vm.selqhmc = vm.shengshizs;
                        //获取省行政区划代码
                        vm.getShiZddwDate(xzqh);
                        var pmarker = e.target;
                        var pt = pmarker.getPosition();
                        vm.prvinceName = pmarker.entity[3];
                        var citys = vm.cityp;
                        var map = vm.map;
                        vm.hideMarker(vm.province);
                        map.centerAndZoom(pt, 7);
                    });
                    marker.entity = provinces[i];
                    province.push(marker);
                    map.addOverlay(marker);
                    marker.setLabel(label);
                }
            },
            //图层二
            drawMapa: function (result) {
                var myIcon1 = new BMap.Icon("../../static/images/new/w1_p.png", new BMap.Size(100, 70));      //创建图标
                var cityp = [];
                var citys;
                if (this.ShiZddwDate.length > 0) {
                    citys = this.ShiZddwDate;
                } else {
                    citys = result;
                }
                //数据库表
                for (var i = 0; i < citys.length; i++) {
                    var pt = new BMap.Point(citys[i].gisX, citys[i].gisY);
                    var marker = new BMap.Marker(pt, { icon: myIcon1 });
                    var label = new BMap.Label(this.formatLabels(citys[i].xzqhmc +':'+ citys[i].zddwsl));//城市名称
                    label.setStyle({
                        fontSize: '11px',
                        fontWeight: 'bold',
                        border: '0',
                        padding: '14px 4px',
                        textAlign: 'center',
                        marginLeft: '2px',
                        marginTop: '40px',
                        color: '#ED0C0A',
                        borderRadius: '5px',
                        paddingRight: '58px',
                      
                        marginTop: '25px',
                        background:'',
                    });
                    marker.setLabel(label);
                    var map = vm.map;
                     //zjczzz
                     marker.addEventListener("onmouseover", function(e) {
                        var myIcon3 = new BMap.Icon("../../static/images/new/w1_pp.png", new BMap.Size(100, 70)); //点击后的新图标
                        var marker = e.currentTarget;
                        marker.setIcon(myIcon3);
                    });
                    marker.addEventListener("onmouseout", function(e) {
                        var myIcon1 = new BMap.Icon("../../static/images/new/w1_p.png", new BMap.Size(100, 70)); //点击后的新图标
                        var marker = e.currentTarget;
                        marker.setIcon(myIcon1);
                    });
                    //
                    marker.addEventListener("click", function (e) {
                        vm.selqhmc = vm.shengshizs;
                        var zddws = result;
                        //获取点坐标
                        var xzqh = e.target.entity.xzqh;
                        vm.getZddwxx(xzqh);
                        //获取省行政区划代码
                        vm.getQuZddwDate(xzqh);
                        var cmarker = e.target;
                        var pt = cmarker.getPosition();
                        var map = vm.map;
                        vm.hideMarker(vm.cityp);
                        map.centerAndZoom(pt, 15);
                    });
                    marker.entity = citys[i];
                    cityp.push(marker);
                    map.addOverlay(marker);
                }
                this.cityp = cityp;
                //弹出框
            },//图层三
            drawMapb: function (data) {
                var zddws = data;
                var map = vm.map;
                var zddwp = [];//将点放到数组当中
                vm.zddwp = zddwp;
                for (var i = 0; i < zddws.length; i++) {
                    var myIcon1 = new BMap.Icon("../../static/images/new/w1_03.png", new BMap.Size(34, 34)); //创建图标
                    var point = new BMap.Point(zddws[i].gisX, zddws[i].gisY);
                    var marker = new BMap.Marker(point, { icon: myIcon1 });
                    marker.uuid = zddws[i].uuid;
                    marker.addEventListener("click", function (e) {
                        vm.getZddwxx('', e.target.uuid);
                        vm.removeAllMarkers(vm.circlez);
                        var circlez = [];//清除圆
                        vm.circlez = circlez;//清除圆
                        var pt = e.target.getPosition();
                        var map = vm.map;
                        map.centerAndZoom(pt, 16);//防止跳回聚合
                        for (var i = 0; i < zddws.length; i++) {
                            if (e.target.uuid == zddws[i].uuid) {
                                this.infoData = (zddws[i].dwmc != null ? zddws[i].dwmc : '无');
                                this.dwdzData = (zddws[i].dwdz != null ? zddws[i].dwdz : '无');
                                this.xfzrrData = (zddws[i].xfzrr != null ? zddws[i].xfzrr : '无');
                                this.zbdhData = (zddws[i].zbdh != null ? zddws[i].zbdh : '无');
                                this.fhdjData = (zddws[i].fhdj != null ? zddws[i].fhdj : '无');
                                this.yajbData = (zddws[i].yajb != null ? zddws[i].yajb : '无');
                            }
                        }
                        var uuid = e.target.uuid;
                        var contents =
                            '<div class="app-map-infowindow zddw-infowindow" style="height:210px;background-image: url(../../static/images/zddw_back.png);min-height: 164px;background-position: right;background-repeat: no-repeat;">' +
                            '<h3 class="title" style=" margin: 0;padding: 0 12px;height: 32px;line-height: 32px;font-size: 16px;color: #666;border-bottom: 1px solid #ccc; white-space:nowrap; overflow:hidden;text-overflow:ellipsis;" v-text = "zddws[i].gisX">' +
                            this.infoData +
                            '</h3>' +
                            '<div class="summary" style="height: 32px;line-height: 32px;color: #999;">' +
                            this.dwdzData +
                            '</div>' +
                            '<table cellpadding="0" cellspacing="0" class="content" style="height:100px; width:480px;white-space: normal;">' +
                            '<tr>' +
                            '<td style="padding: 1px;font-size: 14px;" colspan="2">' + '<strong>消防管理人：</strong>' + this.xfzrrData + '</td>' +
                            '</tr>' +
                            '<tr>' +
                            '<td style="padding: 1px;font-size: 14px;" colspan="2">' + '<strong>单位值班电话：</strong>' + this.zbdhData + '</td>' +
                            '</tr>' +
                            '</table>' +
                            '<div  class="bbar" style="text-align: center; position: absolute; bottom:0;width: 100%;height: 32px;text-align: left;">' +
                            '<b class="btn" onclick="vm.openPlan_1(\'' + uuid + '\')" style="font-size:12px;color: #ff6600;display: inline-block;margin: 0 2px;height: 24px;line-height: 24px;border-radius: 2px;color:#003366;cursor: pointer;text-align: center;font-weight: bold;text-decoration: none;"><img style="width: 10px;height: 10px;vertical-align: sub;" src="../../static/images/maptool/icon_3d.png">总队预案</b>' +
                            '<b class="btn" style="font-size:12px;color: #ff6600;display: inline-block;margin: 0 2px;height: 24px;line-height: 24px;border-radius: 2px;color:#003366;cursor: pointer;text-align: center;font-weight: bold;text-decoration: none;" href="{[this.getPano(values)]}" target="_blank"><img style="width: 10px;height: 10px;vertical-align: sub;" src="../../static/images/maptool/icon_key_diagram.png">支队预案</b>' +
                            '<b class="btn" style="font-size:12px;color: #ff6600;display: inline-block;margin: 0 2px;height: 24px;line-height: 24px;border-radius: 2px;color:#003366;cursor: pointer;text-align: center;font-weight: bold;text-decoration: none;" ><img style="width:10px;height:10px;vertical-align: sub;"  src="../../static/images/maptool/icon_panorama.png">大（中队）预案</b>' +
                            '<b class="btn" onclick="vm.zddwxq(\'' + uuid + '\')" style="font-size:12px;color: #ff6600;display: inline-block;margin: 0 2px;height: 24px;line-height: 24px;border-radius: 2px;color:#003366;cursor: pointer;text-align: center;font-weight: bold;text-decoration: none;" ><img style="width: 10px;height: 10px;vertical-align: sub;" src="../../static/images/maptool/icon_info.png">基本信息</b>' +
                            '<b class="btn" onclick="vm.openShare(\'' + uuid + '\')" style="font-size:12px;color: #ff6600;display: inline-block;margin: 0 2px;height: 24px;line-height: 24px;border-radius: 2px;color:#003366;cursor: pointer;text-align: center;font-weight: bold;text-decoration: none;" ><img style="width:10px;height:10px;vertical-align: sub;" src="../../static/images/maptool/icon_share.png"> 分享</b>' +
                            '</div>' +
                            '<div class="x-clear"></div>' +
                            '</div>'
                            ;
                        var infoWindow = new BMap.InfoWindow(contents); //创建信息窗口对象
                        infoWindow.disableAutoPan();//弹出框持续显示不受聚合影响
                        this.openInfoWindow(infoWindow);//打开新窗口
                        //设置新图标
                        var myIcon2 = new BMap.Icon("../../static/images/new/w1_05.png", new BMap.Size(34, 34)); //点击后的新图标
                        var marker = e.currentTarget;
                        marker.setIcon(myIcon2);
                        var pt = marker.point;
                        //隐藏旧圆
                        var oc = vm.circle;
                        oc.hide();
                        var circle = new BMap.Circle(pt, 1000, { strokeColor: "blue", fillColor: "lightblue", strokeWeight: 1, fillOpacity: 0.3, strokeOpacity: 0.3 });
                        var radius = 1000;
                        var r = 6371004;
                        map.addOverlay(circle);
                        map.addOverlay(marker);
                        circlez.push(circle);//清除圆
                        vm.chAllMarkers(vm.zdd);
                        vm.zdd = marker;  
                    });
                    var label = new BMap.Label(this.formatLabel(zddws[i].dwmc), { offset: new BMap.Size(-15, 35) });
                    label.setStyle({
                        fontSize: '12px',
                        fontWeight: 'bold',
                        opacity: '0.7',
                        border: '0',
                        textAlign: 'center',
                        color: '#fff',
                        borderRadius: '5px',
                        paddingRight: '110px',
                        paddingTop: '5px',
                        Width: '5px',
                        display: 'inline-block',
                        paddingRight: '80px',
                        marginLeft: '-9px',
                        background:'#333',
                    });
                    marker.setLabel(label);
                    zddwp.push(marker);
                };
                var markerClusterer = vm.markerClusterer;
                markerClusterer.addMarkers(zddwp);
            },
            //点击重点单位事件
            drawMapc: function (zddw) {
                //隐藏旧圆
                var oc = vm.circle;
                oc.hide();
                var pt = new BMap.Point(zddw.gisX, zddw.gisY);
                var map = vm.map;
                map.centerAndZoom(pt, 16);//防止跳回聚合
                this.infoData = (zddw.dwmc != null ? zddw.dwmc : '无');
                this.dwdzData = (zddw.dwdz != null ? zddw.dwdz : '无');
                this.xfzrrData = (zddw.xfzrr != null ? zddw.xfzrr : '无');
                this.zbdhData = (zddw.zbdh != null ? zddw.zbdh : '无');
                this.fhdjData = (zddw.fhdj != null ? zddw.fhdj : '无');
                this.yajbData = (zddw.yajb != null ? zddw.yajb : '无');
                var uuid = zddw.uuid;
                var contents =
                    '<div class="app-map-infowindow zddw-infowindow" style="height:205px;background-image: url(../../static/images/zddw_back.png);min-height: 164px;background-position: right;background-repeat: no-repeat;">' +
                    '<h3 class="title" style=" margin: 0;padding: 0 12px;height: 32px;line-height: 32px;font-size: 16px;color: #666;border-bottom: 1px solid #ccc; white-space:nowrap; overflow:hidden;text-overflow:ellipsis;" v-text = "zddws[i].gisX">' +
                    this.infoData +
                    '</h3>' +
                    '<div class="summary" style="height: 32px;line-height: 32px;color: #999;">' +
                    this.dwdzData +
                    '</div>' +
                    '<table cellpadding="0" cellspacing="0" class="content" style="height:100px; width:480px;white-space: normal;">' +
                    '<tr>' +
                    '<td style="padding: 4px;font-size: 14px;" colspan="2">' + '<strong>消防管理人：</strong>' + this.xfzrrData + '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td style="padding: 4px;font-size: 14px;" colspan="2">' + '<strong>单位值班电话：</strong>' + this.zbdhData + '</td>' +
                    '</tr>' +
                    '</table>' +
                    '<div  class="bbar" style="text-align: center; position: absolute; bottom:0;width: 100%;height: 32px;text-align: left;">' +
                    '<b class="btn" onclick="vm.openPlan_1(\'' + uuid + '\')" style="font-size:12px;color: #ff6600;display: inline-block;margin: 0 2px;height: 24px;line-height: 24px;border-radius: 2px;color:#003366;cursor: pointer;text-align: center;font-weight: bold;text-decoration: none;"><img style="width: 12px;height: 12px;vertical-align: sub;" src="../../static/images/maptool/icon_3d.png">总队预案</b>' +
                    '<b class="btn" style="font-size:12px;color: #ff6600;display: inline-block;margin: 0 2px;height: 24px;line-height: 24px;border-radius: 2px;color:#003366;cursor: pointer;text-align: center;font-weight: bold;text-decoration: none;" href="{[this.getPano(values)]}" target="_blank"><img style="width: 12px;height: 12px;vertical-align: sub;" src="../../static/images/maptool/icon_key_diagram.png">支队预案</b>' +
                    '<b class="btn" style="font-size:12px;color: #ff6600;display: inline-block;margin: 0 2px;height: 24px;line-height: 24px;border-radius: 2px;color:#003366;cursor: pointer;text-align: center;font-weight: bold;text-decoration: none;" ><img style="width:12px;height:12px;vertical-align: sub;"  src="../../static/images/maptool/icon_panorama.png">大（中队）预案</b>' +
                    '<b class="btn" onclick="vm.zddwxq(\'' + uuid + '\')" style="font-size:12px;color: #ff6600;display: inline-block;margin: 0 2px;height: 24px;line-height: 24px;border-radius: 2px;color:#003366;cursor: pointer;text-align: center;font-weight: bold;text-decoration: none;" ><img style="width: 12px;height: 12px;vertical-align: sub;" src="../../static/images/maptool/icon_info.png">基本信息</b>' +
                    '<b class="btn" onclick="vm.openShare(\'' + uuid + '\')" style="font-size:12px;color: #ff6600;display: inline-block;margin: 0 2px;height: 24px;line-height: 24px;border-radius: 2px;color:#003366;cursor: pointer;text-align: center;font-weight: bold;text-decoration: none;" ><img style="width:12px;height:12px;vertical-align: sub;" src="../../static/images/maptool/icon_share.png"> 分享</b>' +
                    '</div>' +
                    '<div class="x-clear"></div>' +
                    '</div>'
                    ;
                var infoWindow = new BMap.InfoWindow(contents); //创建信息窗口对象
                infoWindow.disableAutoPan();//不受聚合影响
                vm.map.openInfoWindow(infoWindow, pt);//
                //设置新图标
                var myIcon2 = new BMap.Icon("../../static/images/new/w1_03.png", new BMap.Size(34, 34)); //点击后的新图标
                 var marker = new BMap.Marker(pt, { icon: myIcon2 });
                var circle = new BMap.Circle(pt, 1000, { strokeColor: "blue", fillColor: "lightblue", strokeWeight: 1, fillOpacity: 0.3, strokeOpacity: 0.3 });
                var radius = 1000;
                var r = 6371004;
                map.addOverlay(circle);
                map.addOverlay(marker);
                vm.chAllMarkers(vm.zdd);
                vm.zdd = marker;
                vm.circle = circle;
            },
            //对水源传参进行画点
            getSysjz: function (sysy) {
                    var syy = [];
                    vm.syy = syy;
                    var map = vm.map;
                    var pt = new BMap.Point(sysy.gisX, sysy.gisY);
                    var uuid = sysy.uuid;
                   
                    //判断水源种类
                    var d = sysy.sylx;
                    switch (d) {
                        case '01': var myIcon1 = new BMap.Icon("../../static/images/maptool/marker_hydrant_map.png", new BMap.Size(24, 24));      //创建图标
                            var marker = new BMap.Marker(pt, { icon: myIcon1 });
                            break;
                        case '02': var myIcon1 = new BMap.Icon("../../static/images/maptool/marker_crane_map.png", new BMap.Size(24, 24));      //创建图标
                            var marker = new BMap.Marker(pt, { icon: myIcon1 });
                            break;
                        case '03': var myIcon1 = new BMap.Icon("../../static/images/maptool/marker_naturalwater_map.png", new BMap.Size(24, 24));      //创建图标
                            var marker = new BMap.Marker(pt, { icon: myIcon1 });
                            break;
                        case '04': var myIcon1 = new BMap.Icon("../../static/images/maptool/marker_pool_map.png", new BMap.Size(24, 24));      //创建图标
                            var marker = new BMap.Marker(pt, { icon: myIcon1 });
                            break;
                    };
                    marker.uuid = uuid;//影响水源这块
                    var pt = marker.getPosition();
                        map.centerAndZoom(pt, 14);//不进行放大
                        this.sylxmcData = (sysy.sylxmc != null ? sysy.sylxmc : '无');
                        this.qsxsData = (sysy.qsxs != null ? sysy.qsxs : '无');
                        this.symcData = (sysy.symc != null ? sysy.symc : '无');
                        this.kyztmcData = (sysy.kyztmc != null ? sysy.kyztmc : '无');
                    
                        var sycontent =
                            '<div class="app-map-infowindow zddw-infowindow" style="height:205px;background-image: url(../../static/images/maptool/water_xhs_back.png);min-height: 184px;background-position: right;background-repeat: no-repeat;">' +
                            '<h3 class="title" style=" margin: 0;padding: 0 12px;height: 32px;line-height: 32px;font-size: 16px;color: #666;border-bottom: 1px solid #ccc; white-space:nowrap; overflow:hidden;text-overflow:ellipsis;">' +
                            this.symcData +
                            '</h3>' +
                            '<div class="summary" style="height: 32px;line-height: 32px;color: #999;">' +
                            this.symcData +
                            '</div>' +
                            '<table cellpadding="0" cellspacing="0" class="content" style="height:150px; width:400px;white-space: normal;">' +
                            '<tr>' +
                            '<td style="padding: 4px;font-size: 14px;" colspan="2"><strong>水源类型：</strong>' + this.sylxmcData + '</td>' +
                            '</tr>' +
                            '<tr>' +
                            '<td style="padding: 4px;font-size: 14px;" colspan="2"><strong>可用状态：</strong>' + this.kyztmcData + '</td>' +
                            '</tr>' +
                            '<tr>' +
                            '<td style="padding: 4px;font-size: 14px;" colspan="2"><strong>取水形式：</strong>' + this.qsxsData + '</td>' +
                            '</tr>' +
                            '<tr>' +
                            '</tr>' +
                            '<tr>' +
                            '</tr>' +
                            '</table>' +
                            '<div class="bbar" style="text-align: center; position: absolute; bottom: 0;width: 100%;height: 32px;text-align: right;">' +
                            '<b class="btn" onclick="vm.syxq(\'' + uuid + '\')" style="font-size:12px;color: #ff6600;display: inline-block;margin: 0 2px;height: 24px;line-height: 24px;border-radius: 2px;color:#003366;cursor: pointer;text-align: center;font-weight: bold;text-decoration: none;" ><img style="width: 12px;height: 12px;vertical-align: sub;" src="../../static/images/maptool/icon_info.png">详细信息</b>' +
                            '</div>' +
                            '<div class="x-clear"></div>' +
                            '</div>'
                            ;
                        var infoWindow = new BMap.InfoWindow(sycontent);  // 创建信息窗口对象
                        infoWindow.disableAutoPan();
                        infoWindow.enableAutoPan();
                        vm.map.openInfoWindow(infoWindow,pt);
                  
                    var markerClusterer = vm.markerClusterer;
                    markerClusterer.addMarkers(syy);
                    map.addOverlay(marker);
                    var label = new BMap.Label(this.formatLabel(sysy.symc), { offset: new BMap.Size(-15, 35) });
                    label.setStyle({
                        fontSize: '12px',
                        fontWeight: 'bold',
                        opacity: '0.7',
                        border: '0',
                        textAlign: 'center',
                        color: '#fff',
                        borderRadius: '5px',
                        paddingRight: '110px',
                        paddingTop: '5px',
                        Width: '5px',
                        display: 'inline-block',
                        paddingRight: '80px',
                        marginLeft: '-9px',
                        background:'#333',
                    });
                    marker.setLabel(label);//跳动的动画
                    syy.push(marker);
                    // marker.setAnimation(BMAP_ANIMATION_DROP); //跳动的动画 
                     this.loading = false;
            },
            //对队站进行传参数画点
            getDzjz:function(dzdz){
                var dz = [];
                vm.dz = dz;
                var map = vm.map;
           
                    var x = dzdz.gisX;
                    var y = dzdz.gisY;
                    var dzid = dzdz.dzid;
                    var pt = new BMap.Point(x, y); 
                    //创建坐标点
                    var d = dzdz.dzlx;
                    //判断队站种类
                    switch (d) {
                        case "0200": var myIcon1 = new BMap.Icon("../../static/images/maptool/fire_xfzd_02.png", new BMap.Size(45, 45));      //创建图标
                            var marker = new BMap.Marker(pt, { icon: myIcon1 });
                            break;
                        case "0300": var myIcon1 = new BMap.Icon("../../static/images/maptool/fire_xfzd_03.png", new BMap.Size(45, 45));      //创建图标
                            var marker = new BMap.Marker(pt, { icon: myIcon1 });
                            break;
                        case "0500": var myIcon1 = new BMap.Icon("../../static/images/maptool/fire_xfdd_05.png", new BMap.Size(45, 45));      //创建图标
                            var marker = new BMap.Marker(pt, { icon: myIcon1 });
                            break;
                        case "0900": var myIcon1 = new BMap.Icon("../../static/images/maptool/fire_xfzd_09.png", new BMap.Size(45, 45));      //创建图标
                            var marker = new BMap.Marker(pt, { icon: myIcon1 });
                            break;
                    };
                        marker.dzid = dzid;
                        var pt = marker.getPosition();
                        // map.centerAndZoom(pt, 15);
                        this.dzlxmcData = (dzdz.dzlxmc != null ? dzdz.dzlxmc : '无');
                        this.dzmcData = (dzdz.dzmc != null ? dzdz.dzmc : '无');
                        this.lxdhData = (dzdz.lxdh != null ? dzdz.lxdh : '无');
                        this.dzjcData = (dzdz.dzjc != null ? dzdz.dzjc : '无');
                        this.dzdzData = (dzdz.dzdz != null ? dzdz.dzdz : '无');
                        var dzcontent =
                            '<div class="app-map-infowindow zddw-infowindow" style="height:215px;background-image: url(../../static/images/maptool/zqzd_back.png);min-height: 184px;background-position: right;background-repeat: no-repeat;">' +
                            '<h3 class="title" style=" margin: 0;padding: 0 12px;height: 32px;line-height: 32px;font-size: 16px;color: #666;border-bottom: 1px solid #ccc; white-space:nowrap; overflow:hidden;text-overflow:ellipsis;">' +
                            this.dzmcData +
                            '</h3>' +
                            '<div class="summary" style="height: 32px;line-height: 32px;color: #999;">' +
                            this.dzdzData +
                            '</div>' +
                            '<table cellpadding="0" cellspacing="0" class="content" style="height:150px; width:400px;white-space: normal;">' +
                            '<tr>' +
                            '<td style="padding: 4px;font-size: 14px;" colspan="2"><strong>队站类型：</strong>' + this.dzlxmcData + '</td>' +
                            '</tr>' +
                            '<tr>' +
                            '<td style="padding: 4px;font-size: 14px;" colspan="2"><strong>值班电话：</strong>' + this.lxdhData + '</td>' +
                            '</tr>' +
                            '<tr>' +
                            '<td style="padding: 4px;font-size: 14px;" colspan="2"><strong>队站简称：</strong>' + this.dzjcData + '</td>' +
                            '</tr>' +
                            '<tr>' +
                            '</tr>' +
                            '<tr>' +
                            '</tr>' +
                            '</table>' +
                            '<div class="bbar" style="text-align: center; position: absolute; bottom: 0;width: 100%;height: 32px;text-align: right;">' +
                            '<b class="btn" onclick="vm.dzxq(\'' + dzid + '\')" style="font-size:12px;color: #ff6600;display: inline-block;margin: 0 2px;height: 24px;line-height: 24px;border-radius: 2px;color:#003366;cursor: pointer;text-align: center;font-weight: bold;text-decoration: none;" ><img style="width: 10px;height: 10px;vertical-align: sub;" src="../../static/images/maptool/icon_info.png">详细信息</b>' +
                            '</div>' +
                            '<div class="x-clear"></div>' +
                            '</div>'
                            ;
                        var infoWindow = new BMap.InfoWindow(dzcontent);  // 创建信息窗口对象
                        infoWindow.disableAutoPan();
                        infoWindow.enableAutoPan();
                        this.openInfoWindow(infoWindow);
               
                    map.addOverlay(marker);
                    var label = new BMap.Label(this.formatLabel(dzdz.dzmc), { offset: new BMap.Size(-20, 35) });
                    label.setStyle({
                        fontSize: '12px',
                        fontWeight: 'bold',
                        border: '0',
                        padding: '2px 4px',
                        textAlign: 'center',
                        color: 'red',
                        borderRadius: '5px',
                        paddingRight: '77px',
                        marginLeft: '-9px',
                        marginTop: '10px',
                    });
                    marker.setLabel(label);
                    dz.push(marker);
              
                var markerClusterer = vm.markerClusterer;
                markerClusterer.addMarkers(dz);
                this.loading = false;
            },
            //重置的按钮重新的编写
            Reset: function () {
                location.reload();//重新加载
                var map = this.map;
                map.centerAndZoom(new BMap.Point(107.164226, 31.859637), 5);//重定位到原来坐标点
                var cityps = this.cityp;
                var proviences = this.province;
                var zddws = this.zddwp;
                var syy = this.syy;
                var cl = this.cl;
                var dz = this.dz;
                var wx = this.wx;
                var circlez = this.circlez;
                // var markerClusterer = this.markerClusterer;//去掉聚合点
                this.showMarker(proviences);
                this.hideMarker(cityps);
                this.hideMarker(zddws);
                this.hideMarker(syy);
                this.hideMarker(cl);
                this.hideMarker(dz);
                this.hideMarker(wx);
                this.hideMarker(circlez);
                this.removeCluster();
            },
            //清除点击后的圆 //替换图标
            removeAllMarkers: function (markers) {
                var map = vm.map;
                if (markers != null && markers.length != 0) {
                    for (i = 0; i < markers.length; i++) {
                        map.removeOverlay(markers[i]);
                    };
                }
            },
            //替换图标
            chAllMarkers: function (zdd) {
                if (zdd != '') {
                    var myicon1234 = new BMap.Icon("../../static/images/maptool/zddw.png", new BMap.Size(24, 24));
                    zdd.setIcon(myicon1234);
                    var map = vm.map;
                    map.addOverlay(zdd);
                }
            },
            //显示队站
            showOverdz: function () {
                this.loading = true;
                var duizhan = document.getElementById("duizhan").value;
                if (duizhan == '1') {
                    this.getDzData();//获取队站     
                    document.getElementById("duizhan").value = "";
                } else {
                    vm.hideMarker(vm.dz);
                    document.getElementById("duizhan").value = "1";
                }
                
            },
            getDzsj: function () {
                var dz = [];
                vm.dz = dz;
                var map = vm.map;
                for (i = 0; i < vm.dzData.length; i++) {
                    var x = vm.dzData[i].gisX;
                    var y = vm.dzData[i].gisY;
                    var dzid = vm.dzData[i].dzid;
                    var pt = new BMap.Point(x, y); 
                    //创建坐标点
                    var d = vm.dzData[i].dzlx;
                    //判断队站种类
                    switch (d) {
                        case "0200": var myIcon1 = new BMap.Icon("../../static/images/maptool/fire_xfzd_02.png", new BMap.Size(45, 45));      //创建图标
                            var marker = new BMap.Marker(pt, { icon: myIcon1 });
                            break;
                        case "0300": var myIcon1 = new BMap.Icon("../../static/images/maptool/fire_xfzd_03.png", new BMap.Size(45, 45));      //创建图标
                            var marker = new BMap.Marker(pt, { icon: myIcon1 });
                            break;
                        case "0500": var myIcon1 = new BMap.Icon("../../static/images/maptool/fire_xfdd_05.png", new BMap.Size(45, 45));      //创建图标
                            var marker = new BMap.Marker(pt, { icon: myIcon1 });
                            break;
                        case "0900": var myIcon1 = new BMap.Icon("../../static/images/maptool/fire_xfzd_09.png", new BMap.Size(45, 45));      //创建图标
                            var marker = new BMap.Marker(pt, { icon: myIcon1 });
                            break;
                    };
                    marker.dzid = dzid;
                    marker.addEventListener("click", function (e) {
                        var pt = marker.getPosition();
                        // map.centerAndZoom(pt, 15);
                        for (var i = 0; i < vm.dzData.length; i++) {
                            if (e.target.dzid == vm.dzData[i].dzid) {
                                this.dzlxmcData = (vm.dzData[i].dzlxmc != null ? vm.dzData[i].dzlxmc : '无');
                                this.dzmcData = (vm.dzData[i].dzmc != null ? vm.dzData[i].dzmc : '无');
                                this.lxdhData = (vm.dzData[i].lxdh != null ? vm.dzData[i].lxdh : '无');
                                this.dzjcData = (vm.dzData[i].dzjc != null ? vm.dzData[i].dzjc : '无');
                                this.dzdzData = (vm.dzData[i].dzdz != null ? vm.dzData[i].dzdz : '无');
                            }
                        }
                        var dzcontent =
                            '<div class="app-map-infowindow zddw-infowindow" style="height:215px;background-image: url(../../static/images/maptool/zqzd_back.png);min-height: 184px;background-position: right;background-repeat: no-repeat;">' +
                            '<h3 class="title" style=" margin: 0;padding: 0 12px;height: 32px;line-height: 32px;font-size: 16px;color: #666;border-bottom: 1px solid #ccc; white-space:nowrap; overflow:hidden;text-overflow:ellipsis;">' +
                            this.dzmcData +
                            '</h3>' +
                            '<div class="summary" style="height: 32px;line-height: 32px;color: #999;">' +
                            this.dzdzData +
                            '</div>' +
                            '<table cellpadding="0" cellspacing="0" class="content" style="height:150px; width:400px;white-space: normal;">' +
                            '<tr>' +
                            '<td style="padding: 4px;font-size: 14px;" colspan="2"><strong>队站类型：</strong>' + this.dzlxmcData + '</td>' +
                            '</tr>' +
                            '<tr>' +
                            '<td style="padding: 4px;font-size: 14px;" colspan="2"><strong>值班电话：</strong>' + this.lxdhData + '</td>' +
                            '</tr>' +
                            '<tr>' +
                            '<td style="padding: 4px;font-size: 14px;" colspan="2"><strong>队站简称：</strong>' + this.dzjcData + '</td>' +
                            '</tr>' +
                            '<tr>' +
                            '</tr>' +
                            '<tr>' +
                            '</tr>' +
                            '</table>' +
                            '<div class="bbar" style="text-align: center; position: absolute; bottom: 0;width: 100%;height: 32px;text-align: right;">' +
                            '<b class="btn" onclick="vm.dzxq(\'' + dzid + '\')" style="font-size:12px;color: #ff6600;display: inline-block;margin: 0 2px;height: 24px;line-height: 24px;border-radius: 2px;color:#003366;cursor: pointer;text-align: center;font-weight: bold;text-decoration: none;" ><img style="width: 10px;height: 10px;vertical-align: sub;" src="../../static/images/maptool/icon_info.png">详细信息</b>' +
                            '</div>' +
                            '<div class="x-clear"></div>' +
                            '</div>'
                            ;
                        var infoWindow = new BMap.InfoWindow(dzcontent);  // 创建信息窗口对象
                        infoWindow.disableAutoPan();
                        infoWindow.enableAutoPan();
                        this.openInfoWindow(infoWindow);
                    });
                    map.addOverlay(marker);
                    var label = new BMap.Label(this.formatLabel(vm.dzData[i].dzmc), { offset: new BMap.Size(-20, 35) });
                    label.setStyle({
                        fontSize: '12px',
                        fontWeight: 'bold',
                        border: '0',
                        padding: '2px 4px',
                        textAlign: 'center',
                        color: 'red',
                        borderRadius: '5px',
                        paddingRight: '77px',
                        marginLeft: '-9px',
                        marginTop: '10px',
                    });
                    marker.setLabel(label);
                    dz.push(marker);
                }
                var markerClusterer = vm.markerClusterer;
                markerClusterer.addMarkers(dz);
                this.loading = false;
            },
            //显示水源
            showOvera: function () {
                this.loading = true;
                var shuiyuan = document.getElementById("shuiyuan").value;
                if (shuiyuan == '1') {
                    this.getSyData();
                    document.getElementById("shuiyuan").value = "";
                } else {
                    vm.hideMarker(vm.syy);
                    document.getElementById("shuiyuan").value = "1";
                }
            },
            //
            //对水源进行灌注点
            getSysj: function () {
                var syy = [];
                vm.syy = syy;
                var map = vm.map;
                for (i = 0; i < vm.syData.length; i++) {
                    var x = vm.syData[i].gisX;
                    var y = vm.syData[i].gisY;
                    var uuid = vm.syData[i].uuid;
                    var pt = new BMap.Point(x, y); // 创建坐标点
                    //判断水源种类
                    var d = vm.syData[i].sylx;
                    switch (d) {
                        case '01': var myIcon1 = new BMap.Icon("../../static/images/maptool/marker_hydrant_map.png", new BMap.Size(24, 24));      //创建图标
                            var marker = new BMap.Marker(pt, { icon: myIcon1 });
                            break;
                        case '02': var myIcon1 = new BMap.Icon("../../static/images/maptool/marker_crane_map.png", new BMap.Size(24, 24));      //创建图标
                            var marker = new BMap.Marker(pt, { icon: myIcon1 });
                            break;
                        case '03': var myIcon1 = new BMap.Icon("../../static/images/maptool/marker_naturalwater_map.png", new BMap.Size(24, 24));      //创建图标
                            var marker = new BMap.Marker(pt, { icon: myIcon1 });
                            break;
                        case '04': var myIcon1 = new BMap.Icon("../../static/images/maptool/marker_pool_map.png", new BMap.Size(24, 24));      //创建图标
                            var marker = new BMap.Marker(pt, { icon: myIcon1 });
                            break;
                    };
                    marker.uuid = uuid;//影响水源这块
                    marker.addEventListener("click", function (e) {
                        var pt = marker.getPosition();
                        map.centerAndZoom(pt);//不进行放大
                        for (var i = 0; i < vm.syData.length; i++) {
                            if (e.target.uuid == vm.syData[i].uuid) {
                                this.sylxmcData = (vm.syData[i].sylxmc != null ? vm.syData[i].sylxmc : '无');
                                this.qsxsData = (vm.syData[i].qsxs != null ? vm.syData[i].qsxs : '无');
                                this.symcData = (vm.syData[i].symc != null ? vm.syData[i].symc : '无');
                                this.kyztmcData = (vm.syData[i].kyztmc != null ? vm.syData[i].kyztmc : '无');
                            }
                        }
                        var sycontent =
                            '<div class="app-map-infowindow zddw-infowindow" style="height:205px;background-image: url(../../static/images/maptool/water_xhs_back.png);min-height: 184px;background-position: right;background-repeat: no-repeat;">' +
                            '<h3 class="title" style=" margin: 0;padding: 0 12px;height: 32px;line-height: 32px;font-size: 16px;color: #666;border-bottom: 1px solid #ccc; white-space:nowrap; overflow:hidden;text-overflow:ellipsis;">' +
                            this.symcData +
                            '</h3>' +
                            '<div class="summary" style="height: 32px;line-height: 32px;color: #999;">' +
                            this.symcData +
                            '</div>' +
                            '<table cellpadding="0" cellspacing="0" class="content" style="height:150px; width:400px;white-space: normal;">' +
                            '<tr>' +
                            '<td style="padding: 4px;font-size: 14px;" colspan="2"><strong>水源类型：</strong>' + this.sylxmcData + '</td>' +
                            '</tr>' +
                            '<tr>' +
                            '<td style="padding: 4px;font-size: 14px;" colspan="2"><strong>可用状态：</strong>' + this.kyztmcData + '</td>' +
                            '</tr>' +
                            '<tr>' +
                            '<td style="padding: 4px;font-size: 14px;" colspan="2"><strong>取水形式：</strong>' + this.qsxsData + '</td>' +
                            '</tr>' +
                            '<tr>' +
                            '</tr>' +
                            '<tr>' +
                            '</tr>' +
                            '</table>' +
                            '<div class="bbar" style="text-align: center; position: absolute; bottom: 0;width: 100%;height: 32px;text-align: right;">' +
                            '<b class="btn" onclick="vm.syxq(\'' + uuid + '\')" style="font-size:12px;color: #ff6600;display: inline-block;margin: 0 2px;height: 24px;line-height: 24px;border-radius: 2px;color:#003366;cursor: pointer;text-align: center;font-weight: bold;text-decoration: none;" ><img style="width: 12px;height: 12px;vertical-align: sub;" src="../../static/images/maptool/icon_info.png">详细信息</b>' +
                            '</div>' +
                            '<div class="x-clear"></div>' +
                            '</div>'
                            ;
                        var infoWindow = new BMap.InfoWindow(sycontent);  // 创建信息窗口对象
                        infoWindow.disableAutoPan();
                        infoWindow.enableAutoPan();
                        this.openInfoWindow(infoWindow);
                    });
                    var markerClusterer = vm.markerClusterer;
                    markerClusterer.addMarkers(syy);
                    map.addOverlay(marker);
                    var label = new BMap.Label(this.formatLabel(vm.syData[i].symc), { offset: new BMap.Size(-20, 25) });
                    label.setStyle({
                        fontSize: '12px',
                        fontWeight: 'bold',
                        border: '0',
                        textAlign: 'center',
                        color: '#7BA860',
                        borderRadius: '5px',
                        paddingRight: '110px',
                        paddingTop: '5px',
                        Width: '5px',
                        display: 'inline-block',
                        paddingRight: '80px',
                        marginLeft: '-9px',
                    });
                    marker.setLabel(label);//跳动的动画
                    syy.push(marker);
                    // marker.setAnimation(BMAP_ANIMATION_DROP); //跳动的动画
                }
                this.loading = false;
            },
            //显示车辆
            showOvercl: function () {
                this.loading = true;
                var cheliang = document.getElementById("cheliang").value;
                if (cheliang == '1') {
                    this.getClData();
                    document.getElementById("cheliang").value = "";
                } else {
                    vm.hideMarker(vm.cl);
                    document.getElementById("cheliang").value = "1";
                }
            },
            getClsj: function () {
                var cl = [];
                vm.cl = cl;
                var map = vm.map;
                for (i = 0; i < vm.clData.length; i++) {
                    var x = vm.clData[i].gisX;
                    var y = vm.clData[i].gisY;
                    var uuid = vm.clData[i].uuid;
                    var pt = new BMap.Point(x, y);     // 创建坐标点
                    //判断水源种类
                    // var d=new Date().getDay();
                    var myIcon1 = new BMap.Icon("../../static/images/maptool/fireenginexfc.png", new BMap.Size(24, 24));      //创建图标
                    var marker = new BMap.Marker(pt, { icon: myIcon1 });
                    // marker.addEventListener("click", function (e) {
                    //     var marker = e.target;
                    //     marker.uuid = uuid;
                    //     var pt = marker.getPosition();
                    //     map.centerAndZoom(pt, 10);
                    //     for(var i = 0 ;i<vm.syData.length;i++){
                    //         if(e.target.uuid == vm.syData[i].uuid){
                    //             this.sylxmcData = vm.syData[i].sylxmc;
                    //             this.qsxsData = vm.syData[i].qsxs;
                    //             this.symcData = vm.syData[i].symc;
                    //             this.kyztmcData = vm.syData[i].kyztmc;
                    //         }
                    //     }
                    //     var sycontent =
                    //     '<div class="app-map-infowindow zddw-infowindow" style="height:235px;background-image: url(../../static/images/maptool/water_xhs_back.png);min-height: 184px;background-position: right;background-repeat: no-repeat;">' +
                    //     '<h3 class="title" style=" margin: 0;padding: 0 12px;height: 32px;line-height: 32px;font-size: 16px;color: #666;border-bottom: 1px solid #ccc; white-space:nowrap; overflow:hidden;text-overflow:ellipsis;">' +
                    //     this.symcData +         
                    //     '</h3>' +
                    //     '<div class="summary" style="height: 32px;line-height: 32px;color: #999;">' +
                    //     this.symcData +
                    //     '</div>' +
                    //     '<table cellpadding="0" cellspacing="0" class="content" style="height:150px; width:400px;white-space: normal;">' +
                    //     '<tr>' +
                    //     '<td style="padding: 4px;font-size: 14px;" colspan="2"><strong>水源类型：</strong>'+this.sylxmcData+'</td>' +
                    //     '</tr>' +
                    //     '<tr>' +
                    //     '<td style="padding: 4px;font-size: 14px;" colspan="2"><strong>可用状态：</strong>'+this.kyztmcData+'</td>' +
                    //     '</tr>' +
                    //     '<tr>' +
                    //     '<td style="padding: 4px;font-size: 14px;" colspan="2"><strong>取水形式：</strong>'+this.qsxsData+'</td>' +
                    //     '</tr>' +
                    //     '<tr>' +
                    //     '</tr>' +
                    //     '<tr>' +
                    //     '</tr>' +
                    //     '</table>' +
                    //     '<div class="bbar" style="text-align: center; position: absolute; bottom: 0;width: 100%;height: 32px;text-align: right;">' +
                    //     '<b class="btn" style="font-size:11px;color: #ff6600; padding: 0 8px; display: inline-block;padding: 0 30px;margin: 0 2px;height: 24px;line-height: 24px;background-color: #F7F7F7;border-radius: 2px;border: 1px solid #E4E4E4;color:#404040;cursor: pointer;text-align: center;font-weight: bold;text-decoration: none;" onclick="onClickInfoWindowDetail()"><img style="width: 15px;height: 15px;vertical-align: sub;" src="../../static/images/maptool/icon_info.png">详细信息</b>' +
                    //     '</div>' +
                    //     '<div class="x-clear"></div>' +
                    //     '</div>'
                    //     ;
                    //     var infoWindow = new BMap.InfoWindow(sycontent);  // 创建信息窗口对象
                    //     this.openInfoWindow(infoWindow);
                    // });
                    var markerClusterer = vm.markerClusterer;
                    markerClusterer.addMarkers(cl);
                    map.addOverlay(marker);
                    var label = new BMap.Label(this.formatLabel(vm.clData[i].clmc), { offset: new BMap.Size(-20, 25) });
                    label.setStyle({
                        fontSize: '12px',
                        fontWeight: 'bold',
                        border: '0',
                        textAlign: 'center',
                        color: '#7BA860',
                        borderRadius: '5px',
                        paddingRight: '110px',
                        paddingTop: '5px',
                        Width: '5px',
                        display: 'inline-block',
                        paddingRight: '80px',
                        marginLeft: '-9px',
                    });
                    marker.setLabel(label);
                    cl.push(marker);               
                }
               	
                this.loading = false;
            },
            //显示微型消防站
            showOverwx: function () {
                this.loading = true;
                var wx = document.getElementById("wx").value;
                if (wx == "1") {
                    var wx = [];
                    vm.wx = wx;
                    var map = vm.map;
                    for (var i = 0; i < vm.smallStation.length; i++) {
                        var x = vm.smallStation[i].gisX;
                        var y = vm.smallStation[i].gisY;
                        // var uuid = vm.smallStation[i].uuid;
                        var pt = new BMap.Point(x, y);
                        var myIcon1 = new BMap.Icon("../../static/images/maptool/fire_xfzd3.png", new BMap.Size(40, 40)); //创建图标
                        var marker = new BMap.Marker(pt, { icon: myIcon1 });
                        map.addOverlay(marker);
                        var label = new BMap.Label(this.formatLabel(vm.smallStation[i].xfzmc), { offset: new BMap.Size(-20, 35) });
                        label.setStyle({
                            fontSize: '12px',
                            fontWeight: 'bold',
                            border: '0',
                            textAlign: 'center',
                            color: '#B094D2',
                            borderRadius: '5px',
                            paddingRight: '110px',
                            paddingTop: '5px',
                            Width: '5px',
                            display: 'inline-block',
                            paddingRight: '80px',
                            marginLeft: '-9px',
                        });
                        marker.setLabel(label); wx.push(marker);
                    }
                    document.getElementById("wx").value = "";
                    this.loading = false;
                } else {
                    vm.hideMarker(vm.wx);
                    document.getElementById("wx").value = "1";
                }
                
            },
            //区域内重点单位全部
            showOverzddw: function () {
                var zhong = document.getElementById("zhong").value;
                if (zhong == '1') {
                    this.getPoint();
                    document.getElementById("zhong").value = "";
                } else {
                    vm.hideMarker(vm.zd);
                    document.getElementById("zhong").value = "1";
                }
            },
            //zhongdian
            getZdsj: function () {
                var zd = [];
                vm.zd = zd;
                for (var i = 0; i < vm.markerData.length; i++) {
                    var x = vm.markerData[i].gisX;
                    var y = vm.markerData[i].gisY;
                    var uuid = vm.markerData[i].uuid;
                    var pt = new BMap.Point(x, y);
                    var myIcon1 = new BMap.Icon("../../static/images/new/w1_03.png", new BMap.Size(34, 34)); //创建图标
                    var marker = new BMap.Marker(pt, { icon: myIcon1 });
                    marker.uuid = uuid;
                    marker.addEventListener("click", function (e) {
                        var map = vm.map;
                        vm.removeAllMarkers(vm.circlez);
                        var circlez = [];//清除圆
                        vm.circlez = circlez;//清除圆
                        var pt = e.currentTarget.point;
                        // map.centerAndZoom(pt, 16);
                        for (var i = 0; i < vm.markerData.length; i++) {
                            if (e.target.uuid == vm.markerData[i].uuid) {
                                this.infoData = (vm.markerData[i].dwmc != null ? vm.markerData[i].dwmc : '无');
                                this.dwdzData = (vm.markerData[i].dwdz != null ? vm.markerData[i].dwdz : '无');
                                this.xfzrrData = (vm.markerData[i].xfzrr != null ? vm.markerData[i].xfzrr : '无');
                                this.zbdhData = (vm.markerData[i].zbdh != null ? vm.markerData[i].zbdh : '无');
                                this.fhdjData = (vm.markerData[i].fhdj != null ? vm.markerData[i].fhdj : '无');
                                this.yajbData = (vm.markerData[i].yajb != null ? vm.markerData[i].yajb : '无');
                            }
                        }
                        var uuid = e.target.uuid;
                        var contentz =
                            '<div class="app-map-infowindow zddw-infowindow" style="height:210px;background-image: url(../../static/images/zddw_back.png);min-height: 164px;background-position: right;background-repeat: no-repeat;">' +
                            '<h3 class="title" style=" margin: 0;padding: 0 12px;height: 32px;line-height: 32px;font-size: 16px;color: #666;border-bottom: 1px solid #ccc; white-space:nowrap; overflow:hidden;text-overflow:ellipsis;" v-text = "zddws[i].gisX">' +
                            this.infoData +
                            '</h3>' +
                            '<div class="summary" style="height: 32px;line-height: 32px;color: #999;">' +
                            this.dwdzData +
                            '</div>' +
                            '<table cellpadding="0" cellspacing="0" class="content" style="height:100px; width:480px;white-space: normal;">' +
                            '<tr>' +
                            '<td style="padding: 1px;font-size: 14px;" colspan="2">' + '<strong>消防管理人：</strong>' + this.xfzrrData + '</td>' +
                            '</tr>' +
                            '<tr>' +
                            '<td style="padding: 1px;font-size: 14px;" colspan="2">' + '<strong>单位值班电话：</strong>' + this.zbdhData + '</td>' +
                            '</tr>' +
                            '</table>' +
                            '<div  class="bbar" style="text-align: center; position: absolute; bottom:0;width: 100%;height: 32px;text-align: left;">' +
                            '<b class="btn" onclick="vm.openPlan_1(\'' + uuid + '\')"  style="font-size:12px;color: #ff6600;display: inline-block;margin: 0 2px;height: 24px;line-height: 24px;border-radius: 2px;color:#003366;cursor: pointer;text-align: center;font-weight: bold;text-decoration: none;"><img style="width: 12px;height: 12px;vertical-align: sub;" src="../../static/images/maptool/icon_3d.png">总队预案</b>' +
                            '<b class="btn" style="font-size:12px;color: #ff6600;display: inline-block;margin: 0 2px;height: 24px;line-height: 24px;border-radius: 2px;color:#003366;cursor: pointer;text-align: center;font-weight: bold;text-decoration: none;" href="{[this.getPano(values)]}" target="_blank"><img style="width: 12px;height: 12px;vertical-align: sub;" src="../../static/images/maptool/icon_key_diagram.png">支队预案</b>' +
                            '<b class="btn" style="font-size:12px;color: #ff6600;display: inline-block;margin: 0 2px;height: 24px;line-height: 24px;border-radius: 2px;color:#003366;cursor: pointer;text-align: center;font-weight: bold;text-decoration: none;" ><img style="width:12px;height:12px;vertical-align: sub;"  src="../../static/images/maptool/icon_panorama.png">大（中队）预案</b>' +
                            '<b class="btn" style="font-size:12px;color: #ff6600;display: inline-block;margin: 0 2px;height: 24px;line-height: 24px;border-radius: 2px;color:#003366;cursor: pointer;text-align: center;font-weight: bold;text-decoration: none;" ><img style="width: 12px;height: 12px;vertical-align: sub;" src="../../static/images/maptool/icon_info.png">基本信息</b>' +
                            '<b class="btn" onclick="vm.openShare(\'' + uuid + '\')" style="font-size:12px;color: #ff6600;display: inline-block;margin: 0 2px;height: 24px;line-height: 24px;border-radius: 2px;color:#003366;cursor: pointer;text-align: center;font-weight: bold;text-decoration: none;" ><img style="width:12px;height:12px;vertical-align: sub;" src="../../static/images/maptool/icon_share.png"> 分享</b>' +
                            '</div>' +
                            '<div class="x-clear"></div>' +
                            '</div>'
                            ;
                        var infoWindow = new BMap.InfoWindow(contentz); //创建信息窗口对象
                        infoWindow.disableAutoPan();
                        infoWindow.enableAutoPan();
                        this.openInfoWindow(infoWindow);
                        var circle = new BMap.Circle(pt, 1000, { strokeColor: "blue", fillColor: "lightblue", strokeWeight: 1, fillOpacity: 0.3, strokeOpacity: 0.3 });
                        var radius = 1000;
                        var r = 6371004;
                        //设置新图标
                        var myIcon2 = new BMap.Icon("../../static/images/new/w1_05.png", new BMap.Size(34, 34)); //点击后的新图标
                        var marker = e.currentTarget;
                        marker.setIcon(myIcon2);
                        map.addOverlay(circle);
                        circlez.push(circle);
                        map.addOverlay(marker);
                        vm.chAllMarkers(vm.zdd);
                        vm.zdd = marker;
                    });
                    var label = new BMap.Label(this.formatLabel(vm.markerData[i].dwmc), { offset: new BMap.Size(-15, 35) });
                    label.setStyle({
                        fontSize: '12px',
                        fontWeight: 'bold',
                        opacity: '0.7',
                        border: '0',
                        textAlign: 'center',
                        color: '#fff',
                        borderRadius: '5px',
                        paddingRight: '110px',
                        paddingTop: '5px',
                        Width: '5px',
                        display: 'inline-block',
                        paddingRight: '80px',
                        marginLeft: '-9px',
                        background:'#333',
                    });
                    marker.setLabel(label);
                    zd.push(marker);
                    vm.chAllMarkers(vm.zdd);
                    vm.zdd = marker;
                }
                var markerClusterer = vm.markerClusterer;
                markerClusterer.addMarkers(zd);
            },
            //显示图标
            showMarker: function (markers) {
                if (markers != null && markers.length != 0) {
                    for (i = 0; i < markers.length; i++) {
                        markers[i].show();
                    };
                }
            },
            //隐藏图标
            hideMarker: function (markers) {
                if (markers != null && markers.length != 0) {
                    for (i = 0; i < markers.length; i++) {
                        markers[i].hide();
                    };
                }
                this.loading = false;
            },
            EwOver: function () {
                var map = this.map;
                var mapType = this.mapType;
                if (mapType == 'satellite') {
                    map.setMapType(BMAP_NORMAL_MAP);
                    this.mapType = '2D';
                }
            },
            //调取预案
            openPlan_1: function (val) {
                axios.get('/dpapi/digitalplanlist/doFindListByZddwId/' + val).then(function (res) {
                    var plan = res.data.result;
                    this.planData.yaid_1 = '';
                    for (var k = 0; k < plan.length; k++) {
                        if (plan[k].yajb == '01') {
                            this.planData.yaid_1 = plan[k].uuid;
                        }
                    }
                    if (this.planData.yaid_1 == null || this.planData.yaid_1 == '') {
                        this.$message({
                            message: "预案不存在",
                            showClose: true,
                        });
                    } else {
                        axios.get('/dpapi/yafjxz/doFindByPlanId/' + this.planData.yaid_1).then(function (res) {
                            if(res.data.result){
                                var yllj = res.data.result[0].yllj;
                                window.open("http://localhost:8090/upload/" + yllj);
                            }
                        }.bind(this), function (error) {
                            console.log(error)
                        })
                    }
                }.bind(this), function (error) {
                    console.log(error)
                })

            },
            //分享
            openShare:function(val){
                axios.get('/dpapi/digitalplanlist/doFindListByZddwId/' + val).then(function (res) {
                    var plan = res.data.result;
                    var planId = '';
                    for (var k = 0; k < plan.length; k++) {
                        if (plan[k].yajb == '01') {
                            planId = plan[k].uuid;
                        }
                    }
                    if (planId == '') {
                        this.$message({
                            message: "总队级预案不存在",
                            showClose: true,
                        });
                    } else {
                        window.open("http://localhost:8005/planShare/page/" + planId + "/detail" +"/web");
                    }
                }.bind(this), function (error) {
                    console.log(error)
                })
                
            },
            //水源详情跳转
            syxq:function(params){
                window.location.href = "../basicinfo/firewater_list.html?uuid=" + params+"&sydj=1"+"&index=61"+"&type=DT";
            },
            //队站详情跳转
            dzxq:function(dzparams){
                window.location.href = "../basicinfo/firestation_list.html?dzid=" + dzparams+"&dzdj=1"+"&index=65"+"&type=DT";
            },
            //重点单位详情跳转
            zddwxq:function(zddwparams){
                window.location.href = "../planobject/importantunits_detail.html?ID=" + zddwparams+"&index=41"+"&type=DT";
                // window.location.href = "../planobject/importantunits_detail.html?uuid=" + zddwparams;
            },
            //卫星地图
            WxOver: function () {
                var map = this.map;
                var mapType = this.mapType;
                if (mapType == '2D') {
                    map.setMapType(BMAP_SATELLITE_MAP);
                    this.mapType = 'satellite';
                }
            },
            //zjc
            formatLabelz: function (strname) {
                var len = strname.length;
                var subInder = 4;
                // if (strname.indexOf(":") > 0 && len < 12) {
                //     subInder = strname.indexOf(":") + 1;
                // }
                if (len <= subInder) {
                    return strname;
                }
                var result = "";
                var cnt = parseInt(len / subInder);
                var index = 0;
                for (var i = 0; i < cnt; i++) {
                    index = i * subInder;
                    result +=strname.slice(index, index + subInder)+"&nbsp;&nbsp;";
                }
                if (len % subInder) {
                    result +=  + strname.slice(index + subInder, len);
                }
                var div = '<div style="font-weight: bold;text-align:center;color:#ED0C0A;">' + result + '</div>';
                return div;
            },
           //city
            formatLabels: function (strname) {
                var len = strname.length;
                var subInder = 4;
                if (strname.indexOf(":") > 0 && len < 12) {
                    subInder = strname.indexOf(":") + 1;
                }
                if (len <= subInder) {
                    return strname;
                }
                var result = "";
                var cnt = parseInt(len / subInder);
                var index = 0;
                for (var i = 0; i < cnt; i++) {
                    index = i * subInder;
                    result +=strname.slice(index, index + subInder)+"&nbsp;&nbsp;&nbsp;&nbsp;";
                }
                if (len % subInder) {
                    result +=  + strname.slice(index + subInder, len);
                }
                var div = '<div style="font-weight: bold;text-align:center;color:#ED0C0A;">' + result + '</div>';
                return div;
            },
           
            //折行显示//文字传进来
            formatLabel: function (strname) {
                var len = strname.length;
                var subInder = 6;
                if (strname.indexOf(":") > 0 && len < 12) {
                    subInder = strname.indexOf(":") + 1;
                }
                if (len <= subInder) {
                    return strname;
                }
                var result = "";
                var cnt = parseInt(len / subInder);
                var index = 0;
                for (var i = 0; i < cnt; i++) {
                    index = i * subInder;
                    result += strname.slice(index, index + subInder) + "<br/>";
                }
                if (len % subInder) {
                    result += "&nbsp;&nbsp;&nbsp;&nbsp;" + strname.slice(index + subInder, len);
                }
                var div = '<div style="font-weight: bold;text-align:center;red">' + result + '</div>';
                return div;
            },
            //路况
            lukuang: function () {
                var map = this.map;
                var ctrl = new BMapLib.TrafficControl({
                    showPanel: false
                });
                map.addControl(ctrl);
                var isTrafficOpen = document.getElementById("isTrafficOpen").value;
                if (isTrafficOpen == '1') {
                    ctrl.showTraffic();
                    document.getElementById("isTrafficOpen").value = "";
                } else {
                    ctrl.hideTraffic();
                    document.getElementById("isTrafficOpen").value = "1";
                }
            },
            //百度库搜索
            addSearchAuto: function (fuzzyKeyField) {
                var me = this;
                var map = me.getMap();
                var ac = new BMap.Autocomplete({
                    "input": fuzzyKeyField.getId() + '-inputEl',
                    "location": map
                });
                ac.addEventListener("onconfirm", function (e) { //鼠标点击下拉列表后的事件
                    var _value = e.item.value;
                    var myValue = _value.province + _value.city +
                        _value.district + _value.street + _value.business;
                    var local = new BMap.LocalSearch(map, { //智能搜索
                        onSearchComplete: function () {
                            var poi = local.getResults().getPoi(0);
                            me.drawCurrentOverlay(poi);
                        }
                    });
                    local.search(myValue);
                });
                me.setAutoSearch(ac);
            },
            //显示百度库
            showSuggestId: function () {
                this.searchCond = '';
                this.searchBaiduCond = '';
                this.searchSource = '搜索百度库';
                document.getElementById("suggestId").style.display = 'inline';
                document.getElementById("advancedId").style.display = 'none';
            },
            //显示消防库
            showAdvancedId: function () {
                this.searchCond = '';
                this.searchBaiduCond = '';
                this.searchSource = '搜索消防库';
                document.getElementById("suggestId").style.display = 'none';
                document.getElementById("advancedId").style.display = 'inline';
            },
            //回车执行搜索
            doSearch: function (e) {
                if (e == 13) {
                    params = {
                        yadxType: "1",
                        dxmc: this.searchCond
                    };
                    axios.post('/dpapi/advancedsearch/gjssYadxList', params).then(function (res) {
                        this.searchData = res.data.result;
                        this.setPlace(this.searchData);
                    }.bind(this), function (error) {
                        console.log(error);
                    })
                }
            },
            setPlace: function (data) {
                vm.map.clearOverlays();    //清除地图上所有覆盖物
                var zddws = data;
                var map = vm.map;
                var zddwp = [];//将点放到数组当中
                vm.zddwp = zddwp;
                var visibleNum = 0;
                var visiblePoint;
                var inCityNum = 0;
                var inCityPoint = [];
                var centerPoint = new BMap.Point(map.getCenter().lng, map.getCenter().lat)
                var centerCity = '';
                for (var i = 0; i < zddws.length; i++) {
                    var myIcon1 = new BMap.Icon("../../static/images/marker_zddw_map.png", new BMap.Size(24, 24)); //创建图标
                    var point = new BMap.Point(zddws[i].gisX, zddws[i].gisY);
                    var bound = map.getBounds();//地图可视区域
                    if (bound.containsPoint(point)) {
                        visibleNum++;
                        visiblePoint = point;
                    }
                    if (map.getDistance(point, centerPoint) < 50000) {
                        inCityNum++;
                        inCityPoint.push(point);
                        console.log(map.getDistance(point, centerPoint));
                    }
                    var marker = new BMap.Marker(point, { icon: myIcon1 });
                    marker.uuid = zddws[i].uuid;
                    marker.addEventListener("click", function (e) {
                        vm.removeAllMarkers(vm.circlez);
                        var circlez = [];//清除圆
                        vm.circlez = circlez;//清除圆
                        var pt = e.target.getPosition();
                        var map = vm.map;
                        map.centerAndZoom(pt, 16);//防止跳回聚合
                        for (var i = 0; i < zddws.length; i++) {
                            if (e.target.uuid == zddws[i].uuid) {
                                this.infoData = (zddws[i].dxmc != null ? zddws[i].dxmc : '无');
                                this.dwdzData = (zddws[i].dxdz != null ? zddws[i].dxdz : '无');
                                this.xfzrrData = (zddws[i].xfzrr != null ? zddws[i].xfzrr : '无');
                                this.zbdhData = (zddws[i].zbdh != null ? zddws[i].zbdh : '无');
                                this.fhdjData = (zddws[i].fhdj != null ? zddws[i].fhdj : '无');
                                this.yajbData = (zddws[i].yajb != null ? zddws[i].yajb : '无');
                            }
                        }
                        var uuid = e.target.uuid;
                        var contents =
                            '<div class="app-map-infowindow zddw-infowindow" style="height:255px;background-image: url(../../static/images/zddw_back.png);min-height: 184px;background-position: right;background-repeat: no-repeat;">' +
                            '<h3 class="title" style=" margin: 0;padding: 0 12px;height: 32px;line-height: 32px;font-size: 16px;color: #666;border-bottom: 1px solid #ccc; white-space:nowrap; overflow:hidden;text-overflow:ellipsis;" v-text = "zddws[i].gisX">' +
                            this.infoData +
                            '</h3>' +
                            '<div class="summary" style="height: 32px;line-height: 32px;color: #999;">' +
                            this.dwdzData +
                            '</div>' +
                            '<table cellpadding="0" cellspacing="0" class="content" style="height:150px; width:643px;white-space: normal;">' +
                            '<tr>' +
                            '<td style="padding: 4px;font-size: 14px;" colspan="2">' + '<strong>消防管理人：</strong>' + this.xfzrrData + '</td>' +
                            '</tr>' +
                            '<tr>' +
                            '<td style="padding: 4px;font-size: 14px;" colspan="2">' + '<strong>单位值班电话：</strong>' + this.zbdhData + '</td>' +
                            '</tr>' +
                            '<tr>' +
                            '<td style="padding: 4px;font-size: 14px;" colspan="2">' + '<strong>责任队站：</strong>大队</td>' +
                            '</tr>' +
                            '<tr>' +
                            '<td style="padding: 4px;font-size: 14px;">' + '<strong>预案级别：</strong>大队</td>' +
                            '</tr>' +
                            '<tr>' +
                            '<td style="padding: 4px;font-size: 14px;">' + '<strong>防火级别：</strong>2</td>' +
                            '</tr>' +
                            '</table>' +
                            '<div  class="bbar" style="text-align: center; position: absolute; bottom: 0;width: 100%;height: 32px;text-align: left;">' +
                            '<b class="btn" onclick="vm.openPlan_1(\'' + uuid + '\')" style="font-size:11px;color: #ff6600; padding: 0 8px; display: inline-block;padding: 0 30px;margin: 0 2px;height: 24px;line-height: 24px;background-color: #F7F7F7;border-radius: 2px;border: 1px solid #E4E4E4;color:#404040;cursor: pointer;text-align: center;font-weight: bold;text-decoration: none;"><img style="width: 15px;height: 15px;vertical-align: sub;" src="../../static/images/maptool/icon_3d.png">总队预案</b>' +
                            '<b class="btn" style="font-size:11px;color: #ff6600; padding: 0 8px; display: inline-block;padding: 0 30px;margin: 0 2px;height: 24px;line-height: 24px;background-color: #F7F7F7;border-radius: 2px;border: 1px solid #E4E4E4;color:#404040;cursor: pointer;text-align: center;font-weight: bold;text-decoration: none;" href="{[this.getPano(values)]}" target="_blank"><img style="width: 15px;height: 15px;vertical-align: sub;" src="../../static/images/maptool/icon_3d.png">支队预案</b>' +
                            '<b class="btn" style="font-size:11px;color: #ff6600; padding: 0 8px; display: inline-block;padding: 0 30px;margin: 0 2px;height: 24px;line-height: 24px;background-color: #F7F7F7;border-radius: 2px;border: 1px solid #E4E4E4;color:#404040;cursor: pointer;text-align: center;font-weight: bold;text-decoration: none;" onclick="onClickSwcj()"><img style="width:15px;height:15px;vertical-align: sub;"  src="../../static/images/maptool/icon_3d.png">大（中队）预案</b>' +
                            '<b class="btn" style="font-size:11px;;color: #ff6600; padding: 0 8px; display: inline-block;padding: 0 30px;margin: 0 2px;height: 24px;line-height: 24px;background-color: #F7F7F7;border-radius: 2px;border: 1px solid #E4E4E4;color:#404040;cursor: pointer;text-align: center;font-weight: bold;text-decoration: none;" onclick="onClickInfoWindowDetail()"><img style="width: 15px;height: 15px;vertical-align: sub;" src="../../static/images/maptool/icon_info.png">基本信息</b>' +
                            '<b class="btn" onclick="vm.openShare(\'' + uuid + '\')"  style="font-size:11px;color: #ff6600; padding: 0 8px; display: inline-block;padding: 0 30px;margin: 0 2px;height: 24px;line-height: 24px;background-color: #F7F7F7;border-radius: 2px;border: 1px solid #E4E4E4;color:#404040;cursor: pointer;text-align: center;font-weight: bold;text-decoration: none;" onclick="onClickShare()"><img style="width:15px;height:15px;vertical-align: sub;" src="../../static/images/maptool/icon_share.png"> 分享</b>' +
                            '</div>' +
                            '<div class="x-clear"></div>' +
                            '</div>'
                            ;
                        var infoWindow = new BMap.InfoWindow(contents); //创建信息窗口对象
                        infoWindow.disableAutoPan();//
                        infoWindow.enableAutoPan();//自动平移
                        this.openInfoWindow(infoWindow);//
                        //设置新图标
                        var myIcon2 = new BMap.Icon("../../static/images/maptool/marker_zddw_mapz.png", new BMap.Size(24, 24)); //点击后的新图标
                        var marker = e.currentTarget;
                        marker.setIcon(myIcon2);
                        var pt = marker.point;// this.removeAllMarkers(zddws);//点击后清除圆圈的样式
                        var circle = new BMap.Circle(pt, 1000, { strokeColor: "blue", fillColor: "lightblue", strokeWeight: 1, fillOpacity: 0.3, strokeOpacity: 0.3 });
                        var radius = 1000;
                        var r = 6371004;
                        map.addOverlay(circle);
                        map.addOverlay(marker);
                        circlez.push(circle);//清除圆
                        vm.chAllMarkers(vm.zdd);
                        vm.zdd = marker;
                    });
                    var label = new BMap.Label(this.formatLabel(zddws[i].dxmc), { offset: new BMap.Size(-20, 25) });
                    label.setStyle({
                        fontSize: '12px',
                        fontWeight: 'bold',
                        opacity: '0.7',
                        border: '0',
                        textAlign: 'center',
                        color: '#B094D2',
                        borderRadius: '5px',
                        paddingRight: '110px',
                        paddingTop: '5px',
                        Width: '5px',
                        display: 'inline-block',
                        paddingRight: '80px',
                        marginLeft: '-9px',
                    });
                    marker.setLabel(label);
                    zddwp.push(marker);
                };
                if (visibleNum > 0 && vm.map.getZoom() >= 18) {
                    vm.map.centerAndZoom(visiblePoint, 18);//重定位到已有单位坐标点
                }
                else if (inCityNum > 0) {
                    vm.map.centerAndZoom(inCityPoint[0], 12);//重定位到已有单位坐标点
                }
                else {
                    vm.map.centerAndZoom(new BMap.Point(107.164226, 31.859637), 5);//重定位到原来坐标点
                }
                var markerClusterer = vm.markerClusterer;
                markerClusterer.addMarkers(zddwp);
            },
            // db end
            //根据参数部分和参数名来获取参数值 
           GetQueryString(name) {
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if(r!=null)return  unescape(r[2]); return null;
         },
        }
})
