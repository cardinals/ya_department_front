$("#header_box").load("../pages/header_box.html #header_box");
//axios默认设置cookie
axios.defaults.withCredentials = true;	
new Vue({
    el: '#app',
    data: function() {
      return {
      //搜索表单
      searchForm: {
        permissionname:"",
        permissioninfo:"",
        begintime:"",
        endtime:"",
      },
    //表数据
    tableData: [],//Grid中数据
    /*
      tableData: [
        {
            permissionid:"1905",
            permissionname:"Create",
            permissioninfo: "新增",
            create_name:"冯玉冰",
            create_time: "2015-01-03",
            alter_name:"刘树田",
            alter_time: "2018-01-13",
        },
           {
            permissionid:"1906",
            permissionname:"Delete",
            permissioninfo: "删除",
            create_name:"张艾希",
            create_time: "2008-05-03",
            alter_name:"曹德",
            alter_time: "2016-05-14",
        },
        {
            permissionid:"1907",
            permissionname:"Update",
            permissioninfo: "修改",
            create_name:"孙宝书",
            create_time: "2010-05-03",
            alter_name:"刘海柱",
            alter_time: "2016-11-21",
        },
        {
            permissionid:"1908",
            permissionname:"Read",
            permissioninfo: "查询",
            create_name:"孙尚",
            create_time: "2008-05-03",
            alter_name:"马昭",
            alter_time: "2012-09-15",
        },{
            permissionid:"1909",
            permissionname:"Import",
            permissioninfo: "导入",
            create_name:"刘树田",
            create_time: "2010-05-03",
            alter_name:"刘海柱",
            alter_time: "2016-11-21",
        },
        {
            permissionid:"1910",
            permissionname:"export",
            permissioninfo: "导出",
            create_name:"孙尚",
            create_time: "2008-05-03",
            alter_name:"张文斌",
            alter_time: "2012-09-15",
        },
     ],*/
       //表高度变量
       tableheight :445,
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
        //序号
        indexData:0,
        //删除的弹出框
        deleteVisible: false,
        //新建页面是否显示
        addFormVisible:false,
        addLoading:false,
        addFormRules:{
            permissionname: [
                { required: true, message: '请输入角色名称', trigger: 'blur' },
                { min: 5, max: 11, message: '长度在 5 到 11 个字符', trigger: 'blur' }
              ],
              permissioninfo:  [
            { required: true, message: '请输入角色描述', trigger: 'blur' },
            { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' }
            ],
        },
        //新建数据
        addForm:{
            permissionid:"",
            permissionname:"",
            permissioninfo: "",
        },
        //选中的值显示
        sels: [], 
        //选中的序号
        selectIndex: -1, 
        //修改界面是否显示
        editFormVisible: false,
        editLoading: false,
        editFormRules: {
            permissionname: [
                { required: true, message: '请输入角色名称', trigger: 'blur' },
                { min: 5, max: 11, message: '长度在 5 到 11 个字符', trigger: 'blur' }
              ],
              permissioninfo:  [
            { required: true, message: '请输入角色描述', trigger: 'blur' },
            { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' }
            ],
        },
        //修改界面数据
        editForm: {
            permissionid:"",
            permissionname:"",
            permissioninfo: "",
        },
       
       }
    },
    mounted:function(){

        this.total = this.tableData.length;
    } ,
    methods:{
    handleNodeClick(data) {
        console.log(data);
    },
    //表格查询事件
    searchClick: function() {
    var _self = this;
    var tableObject ={};
    var searchData=[];
    var resultData=[];
    //空表不显示
    function isEmptyObject(obj) {
        for (var key in obj) {
            return false;
        }
        return true;
    }
    //起始时间的判断大小的函数
    function tab(begin,end){
        var oDate1 = new Date(begin);
        var oDate2 = new Date(end);
        if(oDate1.getTime() > oDate2.getTime()){
            return true;
        }
        return false;
    }
     //起始时间的判断
     if(tab(_self.searchForm.begintime,_self.searchForm.endtime))
     {
         _self.$message({
             message: "开始时间不能早于结束时间",
             type: "error"
             });
             return;
     }
        var params = {
            permissionname: this.searchForm.permissionname,
            permissioninfo: this.searchForm.permissioninfo,
            pageSize: this.pageSize,
            pageNum: this.currentPage
        }
        axios.post('/permission/findByVO', params).then(function(res){
            this.tableData = res.data.result;
            this.total = res.data.result.length;
        }.bind(this),function(error){
            console.log(error)
        })
    },
    //表格勾选事件
    selectionChange: function(val) {
     this.multipleSelection = val;
    console.info(val);
    },

    begindateChange(val) {  
        console.log(val);  
        this.searchForm.begintime = val;
    },
    enddateChange(val) {  
        console.log(val);  
        this.searchForm.endtime = val;
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

    //新建事件
    addClick: function() {
    var _self = this;
    _self.addFormVisible = true;
    
    },
    //新建提交点击事件
    addSubmit: function(val) {
        var _self=this;
        var params = {
            permissioninfo: val.permissioninfo,
            permissionname: val.permissionname
        }
        axios.post('/permission/insertByVO', params).then(function(res){
            var addData = res.data.result;
            _self.tableData.unshift(addData);
            _self.total = _self.tableData.length;
        }.bind(this),function(error){
            console.log(error)
        })
        this.addFormVisible = false;
        _self.loadingData();//重新加载数据
        
        
    },
     //表格修改事件
     editClick: function() {
        var _self = this;
        var multipleSelection = this.multipleSelection;
        if (multipleSelection.length < 1) {
            _self.$message({
            message: "请至少选中一条记录",
            type: "error"
            });
            return;
        }
        else if(multipleSelection.length>1){
            _self.$message({
                message:"只能选一条记录进行修改",
                type:"error"
            });
            return;
        }
        var permissionid = multipleSelection[0].permissionid;
        for(var k=0;k< _self.tableData.length;k++)
            {
                if(_self.tableData[k].permissionid == ids[d]){
                    _self.selectIndex = k;
                }
            }
            
        this.editForm = Object.assign({}, _self.tableData[_self.selectIndex]);
        //this.editForm.sex=(row.sex == "男"?1:0);
        this.editFormVisible = true;
        },
        //保存点击事件
        editSubmit: function(val) {
        var _self = this;
        /*POST请求递交editForm数据传入permissionid之后再对前台加载*/
        /* this.tableData[this.selectIndex].permissionname = val.permissionname;
        this.tableData[this.selectIndex].permissioninfo = val.permissioninfo;
        this.tableData[this.selectIndex].create_name = val.create_name;
        this.tableData[this.selectIndex].create_time = val.create_time;
        this.tableData[this.selectIndex].alter_name = val.alter_name;
        this.tableData[this.selectIndex].alter_time = val.alter_time;
        this.editFormVisible = false;
        _self.loadingData();//重新加载数据
        console.info(this.editForm);*/
        var params = {
            permissionid: val.permissionid,
            permissionname: val.permissionname,
            permissioninfo: val.permissioninfo
        };
        axios.post('/permission/updateByVO', params).then(function(res){
            this.tableData[this.selectIndex].permissionname = val.permissionname;
            this.tableData[this.selectIndex].permissioninfo = val.permissioninfo;
        }.bind(this),function(error){
            console.log(error)
        })
        this.editFormVisible = false;
        _self.loadingData();
        },
    //删除所选，批量删除
    removeSelection: function() {
    var _self = this;
    var multipleSelection = this.multipleSelection;
    if (multipleSelection.length < 1) {
        _self.$message({
        message: "请至少选中一条记录",
        type: "error"
        });
        return;
    }
    //var ids = "";
    var ids = [];
    var deletename=[];
    for (var i = 0; i < multipleSelection.length; i++) {
        var row = multipleSelection[i];
        //ids += row.realname + ",";
        //删除POST请求时传入ids里的permissionid作为删除唯一标识
        ids.push(row.permissionid);
        deletename.push(row.permissioninfo);
    }
    this.$confirm("确认删除" + deletename + "吗?", "提示", {
        type: "warning"
    })
        .then(function() {

            var params = {
                ids: ids
            }
            axios.post('/permission/deleteByIds', params).then(function(res){
                for(var d =0;d< ids.length;d++){
                    for(var k=0;k< _self.tableData.length;k++) {
                        if(_self.tableData[k].permissionid == ids[d]){
                            _self.tableData.splice(k,1);
                        }
                    }
                }
                _self.$message({
                    message: "删除成功",
                    type: "success"
                });
                _self.total = _self.tableData.length;
                _self.loadingData(); //重新加载数据
            }.bind(this),function(error){
                console.log(error)
            })
    
        })
        .catch(function(e) {
            if (e != "cancel") console.log("出现错误：" + e);
        });
    },
    
    closeDialog:function(val){
        this.addFormVisible = false;
        val.permissionname = "";
        val.permissioninfo = "";
    }
},
    
})