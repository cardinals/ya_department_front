//axios默认设置cookie
axios.defaults.withCredentials = true;	
new Vue({
    el: '#app',
    data: function() {
      return { 
      //搜索表单
      searchForm: {
        rolename:"",
        roleinfo:"",
        begintime:"",
        endtime:"",
      },
       //表数据
      tableData: [],//Grid中数据
      //所有资源
      allResourceList:[],
      //表数据
      /*tableData: [
        {
            roleid:"1",
            rolename:"normal",
            roleinfo: "普通用户",
            create_name:"冯玉冰",
            create_time: "2008-05-03",
            alter_name:"马昭",
            alter_time: "2015-08-29",
            //资源列表
            resource:[
            {
                id:1,
                label1: '系统管理',
                children1: [{
                    id:3,
                    label1: '用户管理',
                    children1: [{
                        id:7,
                        label1: '查询'
                    }]
                },{
                    id:4,
                    label1: '角色管理',
                    children1: [{
                        id:8,
                        label1: '查询'
                    }]
                },{
                    id:5,
                    label1: '权限管理',
                    children1: [{
                        id:9,
                        label1: '查询'
                    }]
                },]
            },
            {
                id:2,
                label1: '重点单位',
                children1: [{
                    id:6,
                    label1: '查询',
                }]
            }
            ],
        },
           {
            roleid:"2",
            rolename:"shandong",
            roleinfo: "山东省",
            create_name:"孙宝书",
            create_time: "2008-05-03",
            alter_name:"牛大力",
            alter_time: "2017-02-11",
            resource:[
            {
                id:1,
                label1: '系统管理',
                children1: [{
                    id:3,
                    label1: '用户管理',
                    children1: [{
                        id:7,
                        label1: '查询'
                    },
                    {
                        id:8,
                        label1: '新增'
                    },
                    {
                        id:9,
                        label1: '修改'
                    },
                    {
                        id:10,
                        label1: '删除'
                    }]
                },{
                    id:4,
                    label1: '角色管理',
                    children1: [{
                        id:11,
                        label1: '查询'
                    }]
                },{
                    id:5,
                    label1: '权限管理',
                    children1: [{
                        id:12,
                        label1: '查询'
                    }]
                },]
            },
            {
                id:2,
                label1: '重点单位',
                children1: [{
                    id:6,
                    label1: '查询',
                }]
            }
            ]
        },
        {
            roleid:"3",
            rolename:"liaoning",
            roleinfo: "辽宁省",
            create_name:"张艾希",
            create_time: "2012-11-24",
            alter_name:"孙尚",
            alter_time: "2013-12-07",
            resource:[
            {
                id:1,
                label1: '系统管理',
                children1: [{
                    id:3,
                    label1: '用户管理',
                    children1: [{
                        id:7,
                        label1: '查询'
                    },
                    {
                        id:8,
                        label1: '新增'
                    },
                    {
                        id:9,
                        label1: '修改'
                    },
                    {
                        id:10,
                        label1: '删除'
                    }]
                },{
                    id:4,
                    label1: '角色管理',
                    children1: [{
                        id:11,
                        label1: '查询'
                    },
                    {
                        id:12,
                        label1: '新增'
                    },
                    {
                        id:13,
                        label1: '修改'
                    },
                    {
                        id:14,
                        label1: '删除'
                    }]
                },{
                    id:5,
                    label1: '权限管理',
                    children1: [{
                        id:15,
                        label1: '查询'
                    }]
                },]
            },
            {
                id:"2",
                label1: '重点单位',
                children1: [{
                    id:"6",
                    label1: '查询',
                }]
            }
            ]
        },
        {
            roleid:"4",
            rolename:"admin",
            roleinfo: "管理员",
            create_name:"刘海柱",
            create_time: "2013-07-16",
            alter_name:"张文斌",
            alter_time: "2016-01-01",
            resource:[
            {
                id: 1,
                label1: '系统管理',
                children1: [{
                    id: 3,
                    label1: '用户管理',
                    children1: [{
                        id: 7,
                        label1: '查询'
                    },
                    {
                        id: 8,
                        label1: '新增'
                    },
                    {
                        id: 9,
                        label1: '修改'
                    },
                    {
                        id: 10,
                        label1: '删除'
                    }]
                },{
                    id: 4,
                    label1: '角色管理',
                    children1: [{
                        id: 11,
                        label1: '查询'
                    },
                    {
                        id: 12,
                        label1: '新增'
                    },
                    {
                        id: 13,
                        label1: '修改'
                    },
                    {
                        id: 14,
                        label1: '删除'
                    }]
                },{
                    id: 5,
                    label1: '权限管理',
                    children1: [{
                        id: 15,
                        label1: '查询'
                    },
                    {
                        id: 16,
                        label1: '新增'
                    },
                    {
                        id: 17,
                        label1: '修改'
                    },
                    {
                        id: 18,
                        label1: '删除'
                    }]
                },]
            },
            {
                id: 2,
                label1: '重点单位',
                children1: [{
                    id: 6,
                    label1: '查询',
                }]
            }
            ]
        },
      ],*/
     //后台返回全部资源列表
     allResourceList:[
     {
         id: 1,
         label1: '系统管理',
         children1: [{
             id: 3,
             label1: '用户管理',
             children1: [{
                 id: 7,
                 label1: '查询'
             },
             {
                 id: 8,
                 label1: '新增'
             },
             {
                 id: 9,
                 label1: '修改'
             },
             {
                 id: 10,
                 label1: '删除'
             }]
         },{
             id: 4,
             label1: '角色管理',
             children1: [{
                 id: 11,
                 label1: '查询'
             },
             {
                 id: 12,
                 label1: '新增'
             },
             {
                 id: 13,
                 label1: '修改'
             },
             {
                 id: 14,
                 label1: '删除'
             }]
         },{
             id: 5,
             label1: '权限管理',
             children1: [{
                 id: 15,
                 label1: '查询'
             },
             {
                 id: 16,
                 label1: '新增'
             },
             {
                 id: 17,
                 label1: '修改'
             },
             {
                 id: 18,
                 label1: '删除'
             }]
         },]
     },
     {
         id: 2,
         label1: '重点单位',
         children1: [{
             id: 6,
             label1: '查询',
         }]
     }
     ],

     //删除成功后台返回数据
     delStatus:"success",			   
       //表高度变量
       tableheight :445,
       //显示加载中样
       loading: false,
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
        //资源列表是否显示
        resourceVisible:false,
        //删除的弹出框
        deleteVisible: false,
        //新建页面是否显示
        addFormVisible:false,
        addLoading:false,
        addFormRules:{
            rolename:  [
                { required: true, message: '请输入角色名称', trigger: 'blur' },
                { min: 5, max: 11, message: '长度在 5 到 11 个字符', trigger: 'blur' }
              ],
            roleinfo:  [
            { required: true, message: '请输入角色描述', trigger: 'blur' },
            { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' }
            ],
        },
        //新建数据
        addForm:{
            roleid:"",
            rolename:"",
            roleinfo: "",
            resource:[]
        },
        //选中的序号
        selectIndex: -1, 
        //修改界面是否显示
        editFormVisible: false,
        editLoading: false,
        editFormRules: {
            rolename:  [
                { type: '',required: true, message: '请输入角色名称', trigger: 'blur' },
                { min: 5, max: 11, message: '长度在 5 到 11 个字符', trigger: 'blur' }
              ],
            roleinfo:  [
            { required: true, message: '请输入角色描述', trigger: 'blur' },
            { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' }
            ],
        },
        //修改界面数据
        editForm: {
            roleid:"",
            rolename:"",
            roleinfo: "",
            resource:[]
        },

            //树结构配置
            defaultProps: {
            children: 'children1',
            label: 'label1'
            },

            //角色对应资源
            resourceList:[],

            //新修改页面的复选树
            checkprops: {
            label: 'name',
            children: 'zones'
            },
            count: 1,
            
       }
    },
    mounted:function(){
        axios.get('http://localhost/api/role/getAll').then(function(res){
            console.log(res.data.result);
            this.tableData = res.data.result;
        }.bind(this),function(error){
            console.log(error)
        }),
        this.total = this.tableData.length;
    } ,
    methods:{
    handleNodeClick(data) {
        console.log(data);
    },
    //新增checkbox
    handleCheckChange(data, checked, indeterminate) {
        console.log(data, checked, indeterminate);
    },

    //资源详情
    openResourceList:function(val){
        /*axios.post('',val).then(function(res){
            this.resourceData=res.data;
            console.log(this.resourceData);
        }.bind(this),function(error){
            console.log(error)
        })*/

        //将本行的resource传给dialog资源列表
        this.resourceList=val;
        var _self = this;
        _self.resourceVisible=true;
    },
    //表格查询事件
    /*searchClick: function() {
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
    //数据还原
      for(var i=0;i<_self.tableData.length;i++){
        var flow=_self.tableData[i];
        searchData.push(flow);
      }
   
   
    if(_self.searchForm.begintime != ""&&_self.searchForm.endtime != ""){
        //起始时间的判断
        if(tab(_self.searchForm.begintime,_self.searchForm.endtime))
        {
            _self.$message({
                message: "开始时间不能早于结束时间",
                type: "error"
                });
                return;
        }
        if(_self.searchForm.roleinfo != "")
        {
            for(var i = 0;i<_self.tableData.length;i++){
                if(_self.tableData[i].roleinfo == _self.searchForm.roleinfo&&(_self.tableData[i].create_time >= _self.searchForm.begintime&&_self.tableData[i].create_time <= _self.searchForm.endtime))
                {	
                    var row=_self.tableData[i];
                    resultData.push(row);
                    
                }
                
            }
        }
        else{
            for(var i = 0;i<_self.tableData.length;i++){
                if(_self.tableData[i].create_time >= _self.searchForm.begintime&&_self.tableData[i].create_time <= _self.searchForm.endtime)
                {	
                    var row=_self.tableData[i];
                    resultData.push(row);   
                }
            }
        }
        _self.tableData.splice(0,_self.tableData.length);
        if(resultData.length>=1){
            _self.tableData=resultData;
        }
    }
    else if(_self.searchForm.begintime == ""&&_self.searchForm.endtime != ""){
        if(_self.searchForm.roleinfo != "")
        {
            for(var i = 0;i<_self.tableData.length;i++){
                if(_self.tableData[i].roleinfo == _self.searchForm.roleinfo&&_self.tableData[i].create_time <= _self.searchForm.endtime)
                {	
                    var row=_self.tableData[i];
                    resultData.push(row);
                    
                }
                
            }
        }
        else{
            for(var i = 0;i<_self.tableData.length;i++){
                if(_self.tableData[i].create_time <= _self.searchForm.endtime)
                {	
                    var row=_self.tableData[i];
                    resultData.push(row);   
                }
            }
        }
        _self.tableData.splice(0,_self.tableData.length);
        if(resultData.length>=1){
            _self.tableData=resultData;
        }	
    }
    else if(_self.searchForm.begintime != ""&&_self.searchForm.endtime == ""){
        
        if(_self.searchForm.roleinfo != "")
        {
            for(var i = 0;i<_self.tableData.length;i++){
                if(_self.tableData[i].roleinfo == _self.searchForm.roleinfo&&_self.tableData[i].create_time >= _self.searchForm.begintime)
                {	
                    var row=_self.tableData[i];
                    resultData.push(row);
                    
                }
                
            }
        }
        else{
            for(var i = 0;i<_self.tableData.length;i++){
                if(_self.tableData[i].create_time >= _self.searchForm.begintime)
                {	
                    var row=_self.tableData[i];
                    resultData.push(row);   
                }
            }
        }
        _self.tableData.splice(0,_self.tableData.length);
        if(resultData.length>=1){
            _self.tableData=resultData;
        }
    }
    else if(_self.searchForm.begintime == ""&&_self.searchForm.endtime == ""){
        if(_self.searchForm.roleinfo != "")
        {
            for(var i = 0;i<_self.tableData.length;i++){
                if(_self.tableData[i].roleinfo == _self.searchForm.roleinfo)
                {	
                    var row=_self.tableData[i];
                    resultData.push(row);
                    
                }
                
            }
            _self.tableData.splice(0,_self.tableData.length);
            if(resultData.length>=1){
                _self.tableData=resultData;
            }
        }
        else{
            _self.tableData.splice(0,_self.tableData.length);
            _self.tableData = searchData;
        }
    }
    
    _self.total = _self.tableData.length;
    _self.loadingData(); //重新加载数据
    },
    */
    //初始化数据
    searchClick: function(){
        var _self = this;
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
            rolename: this.searchForm.rolename,
            roleinfo: this.searchForm.roleinfo
        }
        axios.post('http://localhost/api/role/findByVO', params).then(function(res){
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
    //时间格式
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

     //获取所有的资源
     getAllResources: function(){
        var _self = this;
            _self.roleDetailVisible = true;
            axios.get('/resource/getAll').then(function(res){
                this.allResourceList = res.data.result;
                /*for(var i=0;i<this.roleDetailList.length;i++){
                    this.roleDetailSelect.push(this.roleDetailList[i].rolename);
                }*/
            }.bind(this),function(error){
                console.log(error)
            })
    },

    //新建事件
    addClick: function() {
    var _self = this;
    _self.addFormVisible = true; 
    /*POST请求全部的资源列表项传给add页面数据*/ /*此时尚无roleid*/
    this.getAllResources();  
    },
 //新建提交点击事件
    addSubmit: function(val) {
        var _self=this;
        val.resource = this.$refs.tree.getCheckedKeys();
        /*POST请求递交addForm数据传入之后再对前台加载*/ /*此时尚无roleid*/
        /*axios.post('/user/insertByVO', params).then(function(res){
            var addData = res.data.result;
            _self.tableData.unshift(addData);
            _self.total = _self.tableData.length;
        }.bind(this),function(error){
            console.log(error)
        })
        this.tableData.unshift({
            rolename: val.rolename,
            roleinfo: val.roleinfo,
            create_name:val.create_name,
            create_time:val.create_time,
            alter_name:val.alter_name,
            alter_time:val.alter_time,
            resource:val.resource
        });
        this.addFormVisible = false;
        _self.total = _self.tableData.length;
        _self.loadingData();//重新加载数据
        val.rolename = "";
        val.roleinfo = "";
        val.create_name = "";
        val.create_time ="";
        val.alter_name = "";
        val.alter_time ="";
        val.resource=this.allResourceList;
        console.info(this.addForm);*/

        var params = {
            roleinfo: val.roleinfo,
            rolename: val.rolename,
            resource: val.resource
        }
        axios.post('/role/insertByVO', params).then(function(res){
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
        //var ids = "";
        var roleid = multipleSelection[0].roleid;
        /*var ids = [];
        for (var i = 0; i < multipleSelection.length; i++) {
            var row = multipleSelection[i];
            //ids += row.realname + ",";
            //编辑时POST传入唯一标识roleid来取出特殊项
            ids.push(row.roleid);
        }*/
        /*POST请求之后再对前台加载*/
        /*for(var d =0;d< ids.length;d++){}*/
                for(var k=0;k< _self.tableData.length;k++)
                    {
                        if(_self.tableData[k].roleid == ids[d]){
                            _self.selectIndex = k;
                        }
                    }
        //直接从table中取值放在form表单中   
        this.editForm = Object.assign({}, _self.tableData[_self.selectIndex]);
        this.getAllResources();
        this.$refs.tree.setCheckedKeys([_self.tableData[_self.selectIndex].resource]);
        /*请求到的resource列表传给edit页面数据*/
        //this.editForm.resourcelist = res.data.resourcelist;
        this.editFormVisible = true;
        },
        //修改提交事件
        editSubmit: function(val) {
        var _self = this;
        /*POST请求递交editForm数据传入roleid之后再对前台加载*/
       /* this.tableData[this.selectIndex].rolename = val.rolename;
        this.tableData[this.selectIndex].roleinfo = val.roleinfo;
        this.tableData[this.selectIndex].create_name = val.create_name;
        this.tableData[this.selectIndex].create_time = val.create_time;
        this.tableData[this.selectIndex].alter_name = val.alter_name;
        this.tableData[this.selectIndex].alter_time = val.alter_time;
        this.editFormVisible = false;
        _self.loadingData();//重新加载数据
        console.info(this.editForm);*/

        val.resource = this.$refs.tree.getCheckedKeys();
        var params = {
            roleid: val.roleid,
            rolename: val.rolename,
            roleinfo: val.roleinfo,
            resource: val.resource
        };
        axios.post('/role/updateByVO', params).then(function(res){
            this.tableData[this.selectIndex].rolename = val.rolename;
            this.tableData[this.selectIndex].roleinfo = val.roleinfo;
            this.tableData[this.selectIndex].resource = val.resource;
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
    var ids = [];
    var deletename =[];
    for (var i = 0; i < multipleSelection.length; i++) {
        var row = multipleSelection[i];
        //ids += row.realname + ",";
        //删除POST请求时传入ids里的roleid作为删除唯一标识
        ids.push(row.roleid);
        deletename.push(row.roleinfo);
    }
    this.$confirm("确认删除" + deletename + "吗?", "提示", {
        type: "warning"
    })
        .then(function() {
        /*axios.post('',ids).then(function(res){
            this.delStatus=res.data.status
            console.log(res.data)
        }.bind(this),function(error){
            console.log(error)
        })
        this.delStatus="success";
        if(this.delStatus=="success"){}*/
        var params = {
            ids: ids
        }
        axios.post('/role/deleteByIds', params).then(function(res){
            for(var d =0;d< ids.length;d++){
                for(var k=0;k< _self.tableData.length;k++) {
                    if(_self.tableData[k].roleid == ids[d]){
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
    //分页大小修改事件
    pageSizeChange: function(val) {
    console.log("每页 " + val + " 条");
    this.pageSize = val;
    var _self = this;
    _self.loadingData(); //重新加载数据
    },
    //当前页修改事件
    currentPageChange: function(val) {
    this.currentPage = val;
    console.log("当前页: " + val);
    var _self = this;
    _self.loadingData(); //重新加载数据
    },
    closeDialog:function(val){
        this.addFormVisible = false;
        val.rolename = "";
        val.roleinfo = "";
        val.resource.splice(0,val.resource.length);
    },
    closeresourceDialog:function(){
        this.resourceVisible=false;
    },
}  
})