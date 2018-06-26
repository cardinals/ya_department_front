$("#header_box").load("../pages/header_box.html #header_box");
// $("#menu_box").load("../pages/left-sidebar.html #menu_box");
//axios默认设置cookie
axios.defaults.withCredentials = true;  
new Vue({
    el: '#app',
    data: function() {
        return {         
            //搜索表单
            searchForm: {
                codevalue:"",
                codename:""
            },
		    activeName:"first",
		    IDs:"",
            //表数据
            tableData: [],
            yuData: [
            {
                code_value:"1",
                codename:"辽宁省",
                codetypename:"省份",
                create_name:"冯玉冰",
                create_time: "2008-05-03",
                alter_name:"马昭",
                alter_time: "2015-08-29",
                remark:"",
                codeid:"1"           
            },{
                code_value:"2",
                codename:"吉林省",
                codetypename:"省份",
                create_name:"孙宝书",
                create_time: "2008-05-03",
                alter_name:"牛大力",
                alter_time: "2017-02-11",
                remark:"",
                codeid:"1"
            },{
                code_value:"3",
                codename:"黑龙江省",
                codetypename:"省份",
                create_name:"张艾希",
                create_time: "2012-11-24",
                alter_name:"孙尚",
                alter_time: "2013-12-07",
                remark:"",
                codeid:"1"
            },{
                code_value:"4",
                codename:"山东省",
                codetypename:"省份",
                create_name:"刘海柱",
                create_time: "2013-07-16",
                alter_name:"张文斌",
                alter_time: "2016-01-01",
                remark:"",
                codeid:"1"
            },{
                code_value:"1",
                codename:"男",
                codetypename:"性别",
                create_name:"冯玉冰",
                create_time: "2008-05-03",
                alter_name:"马昭",
                alter_time: "2015-08-29",
                remark:"",
                codeid:"2"           
            },{
                code_value:"2",
                codename:"女",
                codetypename:"性别",
                create_name:"孙宝书",
                create_time: "2008-05-03",
                alter_name:"牛大力",
                alter_time: "2017-02-11",
                remark:"",
                codeid:"2"
            },{
                code_value:"1",
                codename:"辽宁省人民法院",
                codetypename:"单位名称",
                create_name:"张艾希",
                create_time: "2012-11-24",
                alter_name:"孙尚",
                alter_time: "2013-12-07",
                remark:"",
                codeid:"3"
            },{
                code_value:"2",
                codename:"辽宁省政府",
                codetypename:"单位名称",
                create_name:"刘海柱",
                create_time: "2013-07-16",
                alter_name:"张文斌",
                alter_time: "2016-01-01",
                remark:"",
                codeid:"3"
            },{
                code_value:"3",
                codename:"辽宁省就业局",
                codetypename:"单位名称",
                create_name:"刘海柱",
                create_time: "2013-07-16",
                alter_name:"张文斌",
                alter_time: "2016-01-01",
                remark:"",
                codeid:"3"
            },{
                code_value:"1",
                codename:"省部级",
                codetypename:"单位等级",
                create_name:"刘海柱",
                create_time: "2013-07-16",
                alter_name:"张文斌",
                alter_time: "2016-01-01",
                remark:"",
                codeid:"4"
            },{
                code_value:"1",
                codename:"市厅级",
                codetypename:"单位等级",
                create_name:"刘海柱",
                create_time: "2013-07-16",
                alter_name:"张文斌",
                alter_time: "2016-01-01",
                remark:"",
                codeid:"4"
            }],
        

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
                codename:  [
                    { required: true, message: '请输入代码名称', trigger: 'blur' },
                    { min: 5, max: 11, message: '长度在 5 到 11 个字符', trigger: 'blur' }
                ],
                remark:  [
                    // { required: true, message: '请输入角色描述', trigger: 'blur' },
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
                    { type: '',required: true, message: '请输入代码名称', trigger: 'blur' },
                    { min: 5, max: 11, message: '长度在 5 到 11 个字符', trigger: 'blur' }
                ],
                remark:  [
                    // { required: true, message: '请输入角色描述', trigger: 'blur' },
                    { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' }
                ],
            },
            //修改界面数据
            editForm: {
                code_value:"",
                codename:"",
                remark: ""
            }            
        }
    },

    mounted:function(){
        var params = {
            codename: this.searchForm.codename,
            codevalue: this.searchForm.codevalue,
            //  pageSize: this.pageSize,
            //  pageNum: this.currentPage
        }
        axios.post('http://localhost:80/codelist/detail//findByVO', params).then(function(res){
            this.tableData = res.data.result;
            this.total = res.data.result.length;
        }.bind(this),function(error){
                console.log(error)
        });

        var url = location.search;
        if (url.indexOf("?") != -1) {  
            var str = url.substr(1);  
            var ID=str.substring(3);
            this.IDs = ID;   
            for(var i=0;i<this.yuData.length;i++){
                if(this.yuData[i].codeid==ID){
                    this.tableData.push(this.yuData[i]);
                }
            }       
        }    
    },
    methods:{
        handleNodeClick(data) {
            console.log(data);
        },
        //新增checkbox
        handleCheckChange(data, checked, indeterminate) {
            console.log(data, checked, indeterminate);
        },
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
            // //起始时间的判断大小的函数
            // function tab(begin,end){
            //     var oDate1 = new Date(begin);
            //     var oDate2 = new Date(end);
            //     if(oDate1.getTime() > oDate2.getTime()){
            //         return true;
            //     }
            //     return false;
            // }
            // //创建起始时间的判断
            // if(tab(_self.searchForm.begintime_create,_self.searchForm.endtime_create)){
            //     _self.$message({
            //         message: "创建开始时间不能早于创建结束时间",
            //         type: "error"
            //     });
            //     return;
            // }
           var params = {
            codename: this.searchForm.codename,
            codevalue: this.searchForm.codevalue,
            //  pageSize: this.pageSize,
            //  pageNum: this.currentPage
            }
            axios.post('/role/findByVO', params).then(function(res){
                this.tableData = res.data.result;
                this.total = res.data.result.length;
            }.bind(this),function(error){
                console.log(error)
            })
            // _self.loadingData(); //重新加载数据
        },

        //表格勾选事件
        selectionChange: function(val) {
            this.multipleSelection = val;
            console.info(val);
        },
        //时间格式
        begindateChange_create(val) {  
            console.log(val);  
            this.searchForm.begintime_create = val;
        },
        enddateChange_create(val) {  
            console.log(val);  
            this.searchForm.endtime_create = val;
        },
        begindateChange_alter(val) {  
            console.log(val);  
            this.searchForm.begintime_alter = val;
        },
        enddateChange_alter(val) {  
            console.log(val);  
            this.searchForm.endtime_alter = val;
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
            this.tableData.unshift({
                codename: val.codename,
                remark:val.remark,
                codeid:val.codeid
            });
            this.addFormVisible = false;
            _self.total = _self.tableData.length;
            _self.loadingData();//重新加载数据
            val.codename = "";
            val.remark = "";
            val.codeid = "";
            console.info(this.addForm);

        // var params = {
        //     codename: val.codename,
        //     remark: val.remark
        // }
        // axios.post('/role/insertByVO', params).then(function(res){
        //     var addData = res.data.result;
        //     _self.tableData.unshift(addData);
        //     _self.total = _self.tableData.length;
        // }.bind(this),function(error){
        //     console.log(error)
        // })
        // this.addFormVisible = false;
        // _self.loadingData();//重新加载数据
        
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
            }else if(multipleSelection.length>1){
                _self.$message({
                    message:"只能选一条记录进行修改",
                    type:"error"
                });
                return;
            }
            for(var k=0;k<_self.tableData.length;k++){
                if(_self.tableData[k].code_value == multipleSelection[0].code_value){
                    _self.selectIndex = k;
                }
            }
            //直接从table中取值放在form表单中   
            this.editForm = Object.assign({}, _self.tableData[_self.selectIndex]);
            this.editFormVisible = true;
        },
        //修改提交事件
        editSubmit: function(val) {
            var _self = this;
            /*POST请求递交editForm数据传入roleid之后再对前台加载*/
            this.tableData[this.selectIndex].code_value = val.code_value;
            this.tableData[this.selectIndex].codename = val.codename;
            this.tableData[this.selectIndex].remark = val.remark;
            this.editFormVisible = false;
            _self.loadingData();//重新加载数据
            console.info(this.editForm);

        // var params = {
        //     roleid: val.code_value,
        //     rolename: val.codename,
        //     roleinfo: val.remark
        // };
        // axios.post('/role/updateByVO', params).then(function(res){
        //     this.tableData[this.selectIndex].rolename = val.rolename;
        //     this.tableData[this.selectIndex].roleinfo = val.roleinfo;
        //     this.tableData[this.selectIndex].resource = val.resource;
        // }.bind(this),function(error){
        //     console.log(error)
        // })
        // this.editFormVisible = false;
        // _self.loadingData();
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
                ids.push(row.code_value);
                deletename.push(row.codename);
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
                // var params = {
                //     ids: ids
                // }
                // axios.post('/role/deleteByIds', params).then(function(res){
                //     for(var d =0;d< ids.length;d++){
                //         for(var k=0;k< _self.tableData.length;k++) {
                //             if(_self.tableData[k].roleid == ids[d]){
                //                 _self.tableData.splice(k,1);
                //             }
                //         }
                //     }
                //     _self.$message({
                //         message: "删除成功",
                //         type: "success"
                //     });
                //     _self.total = _self.tableData.length;
                //     _self.loadingData(); //重新加载数据
                // }.bind(this),function(error){
                //     console.log(error)
                // })
                for(var d =0;d< ids.length;d++){
                    for(var k=0;k< _self.tableData.length;k++){
                        if(_self.tableData[k].code_value == ids[d]){
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
        
        closeDialog:function(val){
            this.addFormVisible = false;
            val.rolename = "";
            val.roleinfo = "";
            val.resource.splice(0,val.resource.length);
        }
    },
    
})