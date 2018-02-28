$("#header_box").load("../pages/header_box.html #header_box");
//axios默认设置cookie
axios.defaults.withCredentials = true;	
new Vue({
    el: '#app',
    data: function() {
      return {
      activeName:"first",
      IDs:"",
      //表数据
      tableData: [],//基本数据
      yuData: [],//预案数据
      /*
      tableData: [
        {
            DWMC:"辽宁省人民法院",
            DWDJ: "省部级",
            FRDB:"王长贵",
            AQZRR:"刘树田",
            JZLX:"高层建筑",
            DWCLSJ:'2016-08-30',
            DWXZ:"司法",
            XZQY: "辽宁省",
            DWDZ:"霞飞路29号",
            ZDMJ: 5000,
            JZMJ:20000,
            ZDXFSS:"配备正常",
            XFGXJGID: "沈阳市消防局",
            ZJZXFGLR:"刘备",
            ZJZXFGLRDH:"13234567890",
            GIS_X:"114.6204",
            GIS_Y:"23.1647",
            ID:"1"
        },
           {
            DWMC:"辽宁省政府",
            DWDJ: "省部级",
            FRDB:"曹爽",
            AQZRR:"蒹葭",
            JZLX:"大型综合体",
            DWCLSJ:'2015-07-30',
            DWXZ:"行政",
            XZQY: "辽宁省",
            DWDZ:"霞飞路30号",
            ZDMJ: 50000,
            JZMJ:200000,
            ZDXFSS:"配备正常",
            XFGXJGID: "沈阳市消防局",
            ZJZXFGLR:"曹操",
            ZJZXFGLRDH:"13212347890",
            GIS_X:"103.9526",
            GIS_Y:"30.7617",
            ID:"2"
        },
        {
            DWMC:"辽宁省就业局",
            DWDJ: "省部级",
            FRDB:"司马伦",
            AQZRR:"谢永强",
            JZLX:"大型综合体",
            DWCLSJ:'2013-04-20',
            DWXZ:"民事",
            XZQY: "辽宁省",
            DWDZ:"霞飞路31号",
            ZDMJ: 20000,
            JZMJ:100000,
            ZDXFSS:"配备正常",
            XFGXJGID: "沈阳市消防局",
            ZJZXFGLR:"孙权",
            ZJZXFGLRDH:"13289077890",
            GIS_X:"119.4653",
            GIS_Y:"32.8162",
            ID:"3"
        },
        {
            DWMC:"沈阳市城市规划管理局",
            DWDJ: "市厅级",
            FRDB:"朱然",
            AQZRR:"王铁柱",
            JZLX:"高层建筑",
            DWCLSJ:'2012-11-14',
            DWXZ:"城市管理",
            XZQY: "辽宁省",
            DWDZ:"霞飞路32号",
            ZDMJ: 10000,
            JZMJ: 80000,
            ZDXFSS:"配备正常",
            XFGXJGID: "沈阳市消防和平分队",
            ZJZXFGLR:"张昭",
            ZJZXFGLRDH:"13435357890",
            GIS_X:"117.5757",
            GIS_Y:"41.4075",
            ID:"4"
        },
        {
            DWMC:"沈阳市公安局",
            DWDJ: "市厅级",
            FRDB:"潘凤",
            AQZRR:"强东",
            JZLX:"大型综合体",
            DWCLSJ:'2015-06-10',
            DWXZ:"司法",
            XZQY: "辽宁省",
            DWDZ:"霞飞路33号",
            ZDMJ: 12000,
            JZMJ: 60000,
            ZDXFSS:"配备正常",
            XFGXJGID: "沈阳市消防沈河分队",
            ZJZXFGLR:"张郃",
            ZJZXFGLRDH:"13632457890",
            GIS_X:"91.1865",
            GIS_Y:"30.1465",
            ID:"5"
        },
        {
            DWMC:"沈阳市地铁二号线",
            DWDJ: "市厅级",
            FRDB:"曹彰",
            AQZRR:"张建",
            JZLX:"地下建筑",
            DWCLSJ:'2016-12-23',
            DWXZ:"民事",
            XZQY: "辽宁省",
            DWDZ:"霞飞路34号",
            ZDMJ: 1000,
            JZMJ: 60000,
            ZDXFSS:"配备正常",
            XFGXJGID: "沈阳市消防浑南分队",
            ZJZXFGLR:"颜良",
            ZJZXFGLRDH:"13632653425",
            GIS_X:"120.3442",
            GIS_Y:"31.5527",
            ID:"6"
        },
        {
            DWMC:"青岛市塑性加工园",
            DWDJ: "市厅级",
            FRDB:"贾诩",
            AQZRR:"周磊",
            JZLX:"化工园区",
            DWCLSJ:'2014-03-15',
            DWXZ:"城市管理",
            XZQY: "山东省",
            DWDZ:"文明路39号",
            ZDMJ: 2000,
            JZMJ: 6000,
            ZDXFSS:"配备正常",
            XFGXJGID: "青岛市市消防大东分队",
            ZJZXFGLR:"张鲁",
            ZJZXFGLRDH:"13664546425",
            GIS_X:"119.2786",
            GIS_Y:"35.5023",
            ID:"7"
        },
        {
            DWMC:"泰安市城建局",
            DWDJ: "市厅级",
            FRDB:"张辽",
            AQZRR:"王玉山",
            JZLX:"大型综合体",
            DWCLSJ:'2017-02-12',
            DWXZ:"城市管理",
            XZQY: "山东省",
            DWDZ:"法防路36号",
            ZDMJ: 2000,
            JZMJ: 7000,
            ZDXFSS:"配备正常",
            XFGXJGID: "泰安市消防塔湾分队",
            ZJZXFGLR:"韩遂",
            ZJZXFGLRDH:"13683456425",
            GIS_X:"102.9199",
            GIS_Y:"25.4663",
            ID:"8"
        },
        {
            DWMC:"河北省国土资源厅",
            DWDJ: "省部级",
            FRDB:"许褚",
            AQZRR:"孙坚",
            JZLX:"高层建筑",
            DWCLSJ:'2011-12-12',
            DWXZ:"城市管理",
            XZQY: "河北省",
            DWDZ:"格调路46号",
            ZDMJ: 3000,
            JZMJ: 9000,
            ZDXFSS:"配备正常",
            XFGXJGID: "河北省消防总队",
            ZJZXFGLR:"袁术",
            ZJZXFGLRDH:"13952234425",
            GIS_X:"119.5313",
            GIS_Y:"29.8773",
            ID:"9"
        },
        {
            DWMC:"秦皇岛市林业局",
            DWDJ: "市厅级",
            FRDB:"徐晃",
            AQZRR:"黄山",
            JZLX:"化工园区",
            DWCLSJ:'2014-07-25',
            DWXZ:"城市管理",
            XZQY: "河北省",
            DWDZ:"发文路64号",
            ZDMJ: "4000平方米",
            JZMJ: 9000,
            ZDXFSS:"配备正常",
            XFGXJGID: "秦皇岛市消防大队",
            ZJZXFGLR:"马腾",
            ZJZXFGLRDH:"13845674425",
            GIS_X:"117.323",
            GIS_Y:"34.8926",
            ID:"10"
        }
     ],
     //预案data
     yuData: [
        {
            DWMC:"辽宁省人民法院",
            FRDB:"王长贵",
            AQZRR:"刘树田",
            DWDZ:"霞飞路29号",
            JZLX:"高层建筑",
            DWCLSJ:'2016-08-30',
            YAMC:"一号预案",
            YABH: "001",
            YAZL:1,
            YAZTDM: "01",
            ZZRMC:"胡保义",
            ZZDWID: '30',
            ZZRQ:'2016-08-30',
            CZYXM:"宋山",
            JGID: "75-81",
            DXMC:"指挥部队",
            YWXTBSID:"构建完整",
            CZJG:"安检",
            BWMC:"消防设施",
            BMDJ:"绝密",
            ID:"1"
        },
           {
            DWMC:"辽宁省政府",
            FRDB:"曹爽",
            AQZRR:"蒹葭",
            DWDZ:"霞飞路30号",
            JZLX:"大型综合体",
            DWCLSJ:'2015-07-30',
            YAMC:"二号预案",
            YABH: "002",
            YAZL:2,
            YAZTDM: "02",
            ZZRMC:"于麒麟",
            ZZDWID: '31',
            ZZRQ:'2016-10-02',
            CZYXM:"卢俊义",
            JGID: "75-81",
            DXMC:"指挥部队",
            YWXTBSID:"构建完整",
            CZJG:"部员",
            BWMC:"消防设施",
            BMDJ:"绝密",
            ID:"2"
        },
        {
            DWMC:"辽宁省就业局",
            FRDB:"司马伦",
            AQZRR:"谢永强",
            DWDZ:"霞飞路31号",
            JZLX:"大型综合体",
            DWCLSJ:'2013-04-20',
            YAMC:"三号预案",
            YABH: "003",
            YAZL:3,
            YAZTDM: "03",
            ZZRMC:"赵多星",
            ZZDWID: '32',
            ZZRQ:'2013-02-28',
            CZYXM:"吴用",
            JGID: "75-81",
            DXMC:"指挥部队",
            YWXTBSID:"构建完整",
            CZJG:"政治部",
            BWMC:"水源设施",
            BMDJ:"绝密",
            ID:"3"
        },
        {
            DWMC:"沈阳市城市规划管理局",
            FRDB:"朱然",
            AQZRR:"王铁柱",
            DWDZ:"霞飞路32号",
            JZLX:"高层建筑",
            DWCLSJ:'2012-11-14',
            YAMC:"四号预案",
            YABH: "004",
            YAZL:4,
            YAZTDM: "04",
            ZZRMC:"卢云龙",
            ZZDWID: '33',
            ZZRQ:'2014-05-20',
            CZYXM:"公孙胜",
            JGID: "75-81",
            DXMC:"一线部队",
            YWXTBSID:"构建完整",
            CZJG:"电子信息",
            BWMC:"消防设施",
            BMDJ:"机密",
            ID:"4"
        },
        {
            DWMC:"沈阳市公安局",
            FRDB:"潘凤",
            AQZRR:"强东",
            DWDZ:"霞飞路33号",
            JZLX:"大型综合体",
            DWCLSJ:'2015-06-10',
            YAMC:"五号预案",
            YABH: "005",
            YAZL:5,
            YAZTDM: "05",
            ZZRMC:"庞立伙",
            ZZDWID: '34',
            ZZRQ:'2012-11-24',
            CZYXM:"秦明",
            JGID: "75-81",
            DXMC:"一线部队",
            YWXTBSID:"构建完整",
            CZJG:"灭火设施",
            BWMC:"消防设施",
            BMDJ:"机密",
            ID:"5"
        },
        {
            DWMC:"沈阳市地铁二号线",
            FRDB:"曹彰",
            AQZRR:"张建",
            DWDZ:"霞飞路34号",
            DWCLSJ:'2016-12-23',
            JZLX:"地下建筑",
            YAMC:"六号预案",
            YABH: "006",
            YAZL:6,
            YAZTDM: "06",
            ZZRMC:"鲍子友",
            ZZDWID: '35',
            ZZRQ:'2004-06-14',
            CZYXM:"林冲",
            JGID: "75-81",
            DXMC:"一线部队",
            YWXTBSID:"构建完整",
            CZJG:"灭火设施",
            BWMC:"消防设施",
            BMDJ:"机密",
            ID:"6"
        },
        {
            DWMC:"青岛市塑性加工园",
            FRDB:"贾诩",
            AQZRR:"周磊",
            DWDZ:"文明路39号",
            JZLX:"化工园区",
            DWCLSJ:'2014-03-15',
            YAMC:"七号预案发服务费",
            YABH: "007",
            YAZL:7,
            YAZTDM: "07",
            ZZRMC:"梅然功",
            ZZDWID: '36',
            ZZRQ:'2016-08-30',
            CZYXM:"朱仝",
            JGID: "75-81",
            DXMC:"一线部队",
            YWXTBSID:"构建完整",
            CZJG:"水源管理",
            BWMC:"消防设施",
            BMDJ:"秘密",
            ID:"7"
        },
        {
            DWMC:"泰安市城建局",
            FRDB:"张辽",
            AQZRR:"王玉山",
            DWDZ:"法防路36号",
            JZLX:"大型综合体",
            DWCLSJ:'2017-02-12',
            YAMC:"八号预案",
            YABH: "008",
            YAZL:8,
            YAZTDM: "08",
            ZZRMC:"李广",
            ZZDWID: '37',
            ZZRQ:'2007-03-12',
            CZYXM:"花荣",
            JGID: "75-81",
            DXMC:"一线部队",
            YWXTBSID:"构建完整",
            CZJG:"设备管理",
            BWMC:"消防设施",
            BMDJ:"机密",
            ID:"8"
        },
        {
            DWMC:"河北省国土资源厅",
            FRDB:"许褚",
            AQZRR:"孙坚",
            DWDZ:"格调路46号",
            JZLX:"高层建筑",
            DWCLSJ:'2011-12-12',
            YAMC:"九号预案",
            YABH: "009",
            YAZL:9,
            YAZTDM: "09",
            ZZRMC:"盛汴",
            ZZDWID: '38',
            ZZRQ:'2015-05-12',
            CZYXM:"呼延灼",
            JGID: "75-81",
            DXMC:"一线部队",
            YWXTBSID:"构建完整",
            CZJG:"灭火设施",
            BWMC:"消防设施",
            BMDJ:"机密",
            ID:"9"
        },
        {
            DWMC:"秦皇岛市林业局",
            FRDB:"徐晃",
            AQZRR:"黄山",
            DWDZ:"发文路64号",
            JZLX:"化工园区",
            DWCLSJ:'2014-07-25',
            YAMC:"十号预案",
            YABH: "010",
            YAZL:10,
            YAZTDM: "10",
            ZZRMC:"窦道",
            ZZDWID: '39',
            ZZRQ:'2008-08-24',
            CZYXM:"关胜",
            JGID: "75-81",
            DXMC:"一线部队",
            YWXTBSID:"构建完整",
            CZJG:"灭火设施",
            BWMC:"消防设施",
            BMDJ:"秘密",
            ID:"10"
        }
     ],*/
     urls: [ 'inform.html', 'inform2.html' ],
       //表高度变量
       tableheight :474,
       //显示加载中样
       loading: false,
       labelPosition: 'right',
        //多选值
        multipleSelection: [],
        //当前页
        currentPage: 1,
        //分页大小
        pageSize: 10,
        //总记录数
        total:0, 
        //基本数据保存
        rowdata:{},
        //预案数据保存
        yudata:{},
        //序号
        indexData:0,
        //发送至邮箱是否显示
        emailDialogVisible:false,
        email:"",
        //信息分享是否显示
        shareDialogVisible:false,
        //信息打印是否显示
        printDialogVisible:false,
        //删除的弹出框
        deleteVisible: false,
        //新建页面是否显示
        addFormVisible:false,
        addLoading:false,
        addFormRules:{

        },
        //新建数据
        addForm:{
            DWMC:"",
            DWDJ: "",
            DWXZ:"",
            XZQY: "",
            DWDZ:"",
            ZDMJ: "",
            XFGXJGID: ""
        },
        //选中的值显示
        sels: [], 
        //选中的序号
        selectIndex: -1, 
        //编辑界面是否显示
        editFormVisible: false,
        editLoading: false,
        editFormRules: {
            permissionname: [{ required: true, message: "请输入角色名称", trigger: "blur" }]
        },
        //编辑界面数据
        editForm: {
            DWMC:"",
            DWDJ: "",
            DWXZ:"",
            XZQY: "",
            DWDZ:"",
            ZDMJ: "",
            XFGXJGID: ""
        },
       
       }
    },
    mounted:function(){
        var url = location.search;
        if (url.indexOf("?") != -1) {  
            var str = url.substr(1);  
            //alert(str);  
            var ID=str.substring(3);
            this.IDs = ID;   
            //alert(ID);
            axios.post('/key-unit/findByVO', IDs).then(function(res){
                this.tableData = res.data.result.MHDW;
                this.yuData = res.data.result.YAJBXX;
                for(var i=0;i<this.tableData.length;i++){
                    if(this.tableData[i].ID==ID){
                         this.rowdata=this.tableData[i];
                    }
                 }
                 for(var k=0;k<this.yuData.length;k++) {
                     if(this.yuData[k].ID==ID){
                         this.yudata=this.yuData[k];
                    }
                    console.log(this.yudata);
                 }
            }.bind(this),function(error){
                console.log(error)
            })  
        }    
    },
    methods:{
    handleNodeClick(data) {
        console.log(data);
    },
    //标签页
    handleClick: function (e) {
        console.log(e);
    },
    //二维预案下载
    DownLoadTwoFile:function(){
        var fileUrl="../example/二维预案.xlsx";
        document.getElementById("ew").href=fileUrl;
           $("#we").click();//在执行a标签里面span的click
    },
    //三维预案下载
    DownLoadThreeFile:function(){
        var fileUrl="../example/三维预案.xlsx";
        document.getElementById("sw").href=fileUrl;
           $("#ws").click();//在执行a标签里面span的click
    },
    //文档预案下载
    DownLoadFile:function(){
        var fileUrl="../example/文档预案.xlsx";
        document.getElementById("pf").href=fileUrl;
           $("#fp").click();//在执行a标签里面span的click
    },
    begindateChange(val) {  
        console.log(val);  
        this.searchForm.begintime = val;
    },
    enddateChange(val) {  
        console.log(val);  
        this.searchForm.endtime = val;
    },
    //发送至邮箱
    openEmail:function(){
        this.emailDialogVisible = true;
    },
    closeEmailDialog:function(){
        this.emailDialogVisible = false;
        this.email="";
    },
    //信息分享
    openShare:function(){
        this.shareDialogVisible = true;
    },
    closeShareDialog:function(){
        this.shareDialogVisible = false;
    },
    //信息打印
    openPrinter:function(){
        window.print();
    },
    //表格重新加载数据
    loadingData: function() {
    var _self = this;
    _self.loading = true;
    setTimeout(function() {
        console.info("加载数据成功");
        _self.loading = false;
    }, 300);
    },
},
    
})