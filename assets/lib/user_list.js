$("#header_box").load("../pages/header_box.html #header_box");
//axios默认设置cookie
axios.defaults.withCredentials = true;
new Vue({
    el: '#app',
    data: function() {
      return { visible: false,
      awa:"",
      //搜索表单
      searchForm: {
        id: "",
        username:"",
        realname: "",
        // deptname:'',
        // birth:"",
        // sex:"",
        // state: "",
        // position:"",
        // worklife:"",
        // position:"",
        // jobtype:"",
        // DRUS:""
      },
      //表数据
      tableData: [
        {
            userid:"12306",
            username:"lst",
            password:"123456",
            realname: "刘树田",
            birth: "1986-05-03",
            sex: "男",
            phone: "13242452511",
            email: "liushutian@syfri.com",
            roles:[
                {
                    roleid:"1",
                    rolename:"normal",
                    roleinfo:"普通用户",
                    delete_flag:"0"
                },
                {
                    roleid:"3",
                    rolename:"liaoning",
                    roleinfo:"辽宁省",
                    delete_flag:"0"
                },
            ]
        },
           {
            userid:"12307",
            username:"sbs",
            password:"654321",
            realname: "孙宝书",
            birth: "1991-01-02",
            sex: "男",
            phone: "13242124124",
            email: "sunbaoshu@syfri.com",
            roles:[
                {
                    roleid:"1",
                    rolename:"normal",
                    roleinfo:"普通用户",
                    delete_flag:"0"
                },
                {
                    roleid:"2",
                    rolename:"shandong",
                    roleinfo:"山东省",
                    delete_flag:"0"
                },
                {
                    roleid:"3",
                    rolename:"liaoning",
                    roleinfo:"辽宁省",
                    delete_flag:"0"
                }
            ]
        },
        {
            userid:"12308",
            username:"cc",
            password:"123789",
            realname: "曹德",
            birth: "1996-02-16",
            sex: "女",
            phone: "13932425651",
            email: "caode@syfri.com",
            roles:[
                {
                    roleid:"2",
                    rolename:"shandong",
                    roleinfo:"山东省",
                    delete_flag:"0"
                },
                {
                    roleid:"3",
                    rolename:"liaoning",
                    roleinfo:"辽宁省",
                    delete_flag:"0"
                },
                {
                    roleid:"4",
                    rolename:"admin",
                    roleinfo:"管理员",
                    delete_flag:"0"
                }
            ]
        },
        {
            userid:"12309",
            username:"lhz",
            password:"456789",
            realname: "刘海柱",
            birth: "1991-11-14",
            sex: "男",
            phone: "13987654212",
            email: "liuhaizhu@syfri.com",
            roles:[
                {
                    roleid:"2",
                    rolename:"shandong",
                    roleinfo:"山东省",
                    delete_flag:"0"
                },
                {
                    roleid:"3",
                    rolename:"liaoning",
                    roleinfo:"辽宁省",
                    delete_flag:"0"
                },
            ]
        },
        {
            userid:"12310",
            username:"zl",
            password:"987554",
            realname: "张文斌",
            birth: "1996-05-03",
            sex: "女",
            phone: "13987654321",
            email: "zhangwb@syfri.com",
            roles:[
                {
                    roleid:"1",
                    rolename:"normal",
                    roleinfo:"普通用户",
                    delete_flag:"0"
                },
            ]
        },
        {
            userid:"12311",
            username:"ss",
            password:"253456",
            realname: "孙尚",
            birth: "1989-10-09",
            sex: "女",
            phone: "13687994241",
            email: "sunshang@syfri.com",
            roles:[
                {
                    roleid:"1",
                    rolename:"normal",
                    roleinfo:"普通用户",
                    delete_flag:"0"
                },
                {
                    roleid:"2",
                    rolename:"shandong",
                    roleinfo:"山东省",
                    delete_flag:"0"
                },
                {
                    roleid:"3",
                    rolename:"liaoning",
                    roleinfo:"辽宁省",
                    delete_flag:"0"
                },
                {
                    roleid:"4",
                    rolename:"admin",
                    roleinfo:"管理员",
                    delete_flag:"0"
                }
            ]
        },
        {
            userid:"12312",
            username:"zax",
            password:"524324",
            realname: "张艾希",
            birth: "1993-08-12",
            sex: "女",
            phone: "13742141412",
            email: "aixi@syfri.com",
            roles:[
                {
                    roleid:"3",
                    rolename:"liaoning",
                    roleinfo:"辽宁省",
                    delete_flag:"0"
                },
                {
                    roleid:"4",
                    rolename:"admin",
                    roleinfo:"管理员",
                    delete_flag:"0"
                }
            ]
        },
        {
            userid:"12313",
            username:"ndl",
            password:"53521122",
            realname: "牛大力",
            birth: "1986-07-25",
            sex: "男",
            phone: "13242452511",
            email: "niudali@syfri.com",
            roles:[
                {
                    roleid:"2",
                    rolename:"shandong",
                    roleinfo:"山东省",
                    delete_flag:"0"
                }
            ]
        },
        {
            userid:"12314",
            username:"mz",
            password:"etqw1234",
            realname: "马昭",
            birth: "1997-03-28",
            sex: "男",
            phone: "13389852376",
            email: "mazhao@syfri.com",
            roles:[
                {
                    roleid:"4",
                    rolename:"admin",
                    roleinfo:"管理员",
                    delete_flag:"0"
                }
            ]
        },
        {
            userid:"12315",
            username:"fyb",
            password:"wda123",
            realname: "冯玉冰",
            birth: "1991-09-12",
            sex: "女",
            phone: "13485432376",
            email: "fengyubing@syfri.com",
            roles:[
                {
                    roleid:"2",
                    rolename:"shandong",
                    roleinfo:"山东省",
                    delete_flag:"0"
                }
            ]
        }
     ],
     //用户角色data
     /*userroleData: [
        {
            userid:"12306",
            roleid:"1"
        },
        {
            userid:"12306",
            roleid:"3"
        },
        {
            userid:"12307",
            roleid:"1"
        },
        {
            userid:"12307",
            roleid:"2"
        },
        {
            userid:"12307",
            roleid:"3"
        },
        {
            userid:"12308",
            roleid:"2"
        },
        {
            userid:"12308",
            roleid:"3"
        },
        {
            userid:"12308",
            roleid:"4"
        },
        {
            userid:"12309",
            roleid:"3"
        },
        {
            userid:"12310",
            roleid:"4"
        },
        {
            userid:"12311",
            roleid:"1"
        },
        {
            userid:"12312",
            roleid:"2"
        },
        {
            userid:"12313",
            roleid:"3"
        },
        {
            userid:"12314",
            roleid:"4"
        },
        {
            userid:"12315",
            roleid:"2"
        },
     ],
      //角色data
      roleData: [
        {
            roleid:"1",
            roleinfo:"普通用户"
        },
        {
            roleid:"2",
            roleinfo:"管理员"
        },
        {
            roleid:"3",
            roleinfo:"超级管理员"
        },
        {
            roleid:"4",
            roleinfo:"系统管理员"
        },
     ],*/
     roleList:[],
       rowdata:'',
       //表高度变量
       tableheight :465,
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
        //行数据保存
        rowdata:{

        },
        //序号
        indexData:0,
        //详情页是否显示
        itemFormVisible:false,
        //删除的弹出框
        deleteVisible: false,
        //新建页面是否显示
        addFormVisible:false,
        addLoading:false,
        addFormRules:{
            realname: [
            { required: true, message: '请输入真实姓名', trigger: 'blur' },
            { min: 2, max: 4, message: '长度在 2 到 4 个字符', trigger: 'blur' }
          ],
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 2, max: 16, message: '长度在 2 到 16 个字符', trigger: 'blur' }
          ],
          birth:[
          { type: 'date', required: false, message: '请选择出生日期', trigger: 'change' }
          ],
          sex: [
          { required: false, message: '请选择性别', trigger: 'change' }
          ],
          phone: [
          { required: false, message: '请输入手机号', trigger: 'blur' },
            { min: 11, max: 11, message: '手机号格式不正确', trigger: 'blur' }
          ],
          email: [
          { required: false, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
          ],
          password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
          ],

        },
        //新建数据
        addForm:{
            userid:"",
            username:"",
            password:"",
            checkPass:"",
            realname: "",
            birth:"",
            sex: -1,
            phone:"",
            email:"",
            rolelist:[]
        },
        //选中的序号
        selectIndex: -1, 
        //修改界面是否显示
        editFormVisible: false,
        editLoading: false,
        editFormRules: {
            realname: [
            { required: true, message: '请输入真实姓名', trigger: 'blur' },
            { min: 2, max: 4, message: '长度在 2 到 4 个字符', trigger: 'blur' }
          ],
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 2, max: 16, message: '长度在 2 到 16 个字符', trigger: 'blur' }
          ],
          birth:[
          { type: 'date', required: false, message: '请选择出生日期', trigger: 'change' }
          ],
          phone: [
          { required: false, message: '请输入手机号', trigger: 'blur' },
            { min: 11, max: 11, message: '手机号格式不正确', trigger: 'blur' }
          ],
          email: [
          { required: false, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
          ],
          password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
          ],
        },
        //修改界面数据
        editForm: {
            userid:"",
            username:"",
            password:"",
            checkPass:"",
            realname: "",
            birth:"",
            sex: -1,
            phone:"",
            email:"",
            rolelist:[]
        },
        tabledata:[]
       }
    },
    mounted:function(){
        
        axios.get('http://localhost:80/getMenu')				
        .then(function(res){
        console.log(res.data);
        console.log(240);
        
    }.bind(this),function(error){
        console.log(error)
    })
    this.total = this.tableData.length;
    

    },
    methods:{

    
    //表格查询事件
    searchClick: function() {
    var _self = this;
    var tableObject ={};
    var searchData=[];
    function isEmptyObject(obj) {
        for (var key in obj) {
            return false;
        }
        return true;
    }
     for(var i=0;i<_self.tableData.length;i++){
         searchData.push(_self.tableData[i]);
     }
    
    if(_self.searchForm.realname != ""&&_self.searchForm.username != ""){
        for(var i = 0;i<_self.tableData.length;i++){
            if((_self.tableData[i].realname == _self.searchForm.realname&&_self.tableData[i].username == _self.searchForm.username))//&&(tableObject.birth == this.searchForm.birth&&this.searchForm.birth!="")
            //&&(tableObject.position == this.searchForm.position&&this.searchForm.position!="")&&(tableObject.deptname == this.searchForm.deptname&&this.searchForm.deptname!="")
            //&&(tableObject.jobtype == this.searchForm.jobtype&&this.searchForm.jobtype!=""))//&&(tableObject.sex == (searchForm.sex==0?"女":"男")))
            {	
                tableObject = _self.tableData[i];
                
            }
            
        }
        _self.tableData.splice(0,_self.tableData.length);
        if(!isEmptyObject(tableObject)){
            _self.tableData.push(tableObject);
        }
    }
    else if(_self.searchForm.realname != ""&&_self.searchForm.username == ""){
        for(var i = 0;i<_self.tableData.length;i++){
            if(_self.tableData[i].realname == _self.searchForm.realname)
            {	
                tableObject = _self.tableData[i];
                
            }
            
        }
        _self.tableData.splice(0,_self.tableData.length);
        if(!isEmptyObject(tableObject)){
            _self.tableData.push(tableObject);
        }
    }
    else if(_self.searchForm.realname == ""&&_self.searchForm.username != ""){
        for(var i = 0;i<_self.tableData.length;i++){
            if(_self.tableData[i].username == _self.searchForm.username)
            {	
                tableObject = _self.tableData[i];
            }
            
        }
        _self.tableData.splice(0,_self.tableData.length);
        if(!isEmptyObject(tableObject)){	
            _self.tableData.push(tableObject);
        }
    }
    //搜索项为空时恢复全部数据
    else{
        _self.tableData = searchData;
    }
    
    //_self.tableData.filter((item)=>{return item.realname == _self.searchForm.realname	});
    _self.total = _self.tableData.length;
    _self.loadingData(); //重新加载数据
    },
    //表格勾选事件
    selectionChange: function(val) {
     for (var i = 0; i < val.length; i++) {
         var row = val[i];
     }
     this.multipleSelection = val;
    //this.sels = sels
    console.info(val);
    },
    //批量删除数据
    // delGroup() {  
    // 	var ids = this.sels.map(item => item.id).join()//获取所有选中行的id组成的字符串，以逗号分隔
          
    // },  
    //时间格式
    dateChangebirthday(val) {  
        console.log(val);  
        this.addForm.birth = val;
        this.editForm.birth = val;  
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
    //表格删除事件
    /*deleteClick: function(index,row) {
    var _self = this;
    this.$confirm("确认删除" + row.realname + "吗?", "提示", {
        type: "warning",
        confirmButtonText: '确定',
        cancelButtonText: '取消'
    })
        .then(function() {
        _self.tableData.splice(index,1);
        _self.$message({
            message: row.realname + "删除成功",
            type: "success"
        });
        _self.loadingData(); //重新加载数据
        })
        .catch(function(e) {
        if (e != "cancel") console.log("出现错误：" + e);
        });
    },*/
    //角色详情
    openRoleList:function(val){
        /*axios.post('',val).then(function(res){
            this.roleData=res.data;
            console.log(this.roleData);
        }.bind(this),function(error){
            console.log(error)
        })*/
        
        /*this.roleList.splice(0,this.roleList.length);
        var roleidList=[];
        for(var i=0;i<this.userroleData.length;i++){
            if(this.userroleData[i].userid == val){
            roleidList.push(this.userroleData[i].roleid);
            }
        }
        for(var k=0;k<this.roleData.length;k++){
            for(var d=0;d<roleidList.length;d++){
                if(this.roleData[k].roleid == roleidList[d]){
                    this.roleList.push(this.roleData[k].roleinfo);
                }
            }
        }*/
    },
    //新建事件
    addClick: function() {
        var _self = this;
        /*POST请求全部的角色role列表项传给add页面数据*/ /*此时尚无userid*/
        //this.addForm.rolelist = res.data.rolelist;
        this.addForm.birth = "";
        _self.addFormVisible = true;

    },
    //查看详情
    itemClick: function() {
    var _self = this;
    _self.itemFormVisible = true;
    
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
    var deletename =[];
    for (var i = 0; i < multipleSelection.length; i++) {
        var row = multipleSelection[i];
        //ids += row.realname + ",";
        //删除POST请求时传入ids里的userid作为删除唯一标识
        ids.push(row.userid);
        deletename.push(row.realname);
    }
    this.$confirm("确认删除" + deletename + "吗?", "提示", {
        type: "warning"
    })
        .then(function() {
        /*POST请求之后再对前台加载*/
        for(var d =0;d< ids.length;d++){
            for(var k=0;k< _self.tableData.length;k++)
                {
                    if(_self.tableData[k].userid == ids[d]){
                        _self.tableData.splice(k,1);
                    }
                }
        }
        _self.$message({
            message: deletename + "删除成功",
            type: "success"
        });
        _self.total = _self.tableData.length;
        _self.loadingData(); //重新加载数据
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
    var ids = [];
    for (var i = 0; i < multipleSelection.length; i++) {
        var row = multipleSelection[i];
        //ids += row.realname + ",";
        //编辑时POST传入唯一标识userid来取出特殊项
        ids.push(row.userid);
    }
    /*POST请求之后再对前台加载*/
    for(var d =0;d< ids.length;d++){
            for(var k=0;k< _self.tableData.length;k++)
                {
                    if(_self.tableData[k].userid == ids[d]){
                        _self.selectIndex = k;
                    }
                }
        }
    this.editForm = Object.assign({}, _self.tableData[_self.selectIndex]);
    this.editForm.sex=(row.sex == "男"?1:0);
    /*请求到的角色role列表传给edit页面数据*/
    //this.editForm.rolelist = res.data.rolelist;
    this.editForm.checkPass=row.password;
    this.editFormVisible = true;
    },
    //保存点击事件
    editSubmit: function(val) {
    var _self = this;
    /*this.$refs[val].validate((valid) => {
        if (valid) {
            //alert('submit!');*/
        
            /*POST请求递交editForm数据传入userid之后再对前台加载*/
            this.tableData[this.selectIndex].userid = val.userid;
            this.tableData[this.selectIndex].realname = val.realname;
            this.tableData[this.selectIndex].birth = val.birth;
            this.tableData[this.selectIndex].sex = (val.sex == 0?"女":"男");
            this.tableData[this.selectIndex].username = val.username;
            this.tableData[this.selectIndex].phone = val.phone;
            this.tableData[this.selectIndex].email = val.email;
            this.editFormVisible = false;
            _self.loadingData();//重新加载数据
            console.info(this.editForm);
        /*} 
        else 
        {
            console.log('error submit!!');
            return false;
        }
    });*/
    },
    //新建提交点击事件
    addSubmit: function(val) {
        var _self=this;
        /*POST请求递交addForm数据传入之后再对前台加载*/ /*此时尚无userid*/
        this.tableData.unshift({
            realname: val.realname,
            birth: val.birth,
            sex: (val.sex == 0?"女":"男"),
            username:val.username,
            phone:val.phone,
            email:val.email
        });
        this.addFormVisible = false;
        _self.total = _self.tableData.length;
        _self.loadingData();//重新加载数据
        val.realname = "";
        val.birth = "";
        val.sex = "";
        val.username ="";
        val.phone = "";
        val.email ="";
        console.info(this.addForm);
        
    },
    closeDialog:function(val){
        this.addFormVisible = false;
        val.realname = "";
        val.birth = "";
        val.sex = "";
        val.username ="";
        val.phone = "";
        val.email ="";
    },
    closeitemDialog:function(){
        this.itemFormVisible=false;
    }
},
    
})