//axios默认设置cookie
axios.defaults.withCredentials = true;	
new Vue({
    el: '#app',
    data: function () {
        return {
             /**lxy start */
             fileList: [
                {name: '物美生活广场及地铁华苑站三维灭火预案.html', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100?isUpdated=true'}, 
                {name: '物美生活广场及地铁华苑站三维灭火预案.unity3d', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100?isUpdated=true'},
                {name: 'jquery.min.js', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100?isUpdated=true'}, 
                {name: 'UnityObject2.js', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100?isUpdated=true'}
              ],
           
            upLoadData:{
                id:1
            },
            /**lxy end */
            //搜索表单
            searchForm: {
                YAMC: "",
                selected_YALX: "",
                DXMC: "",
                option_DXLX: "",
                option_YAZL: "",
                begintime_create:"",
                endtime_create:"",       
            },
            tableData: [],
            XFGX_data: [],
            selected_XFGX: [],
            YALX_data: [],
            DXLX_data: [],
            YAZL_data: [],
            defaultKeys: [],
            //后台返回编制单位列表
			 allFormationList:[
			 {
				 id: 1,
				 formationinfo: '系统管理',
				 children: [{
					 id: 3,
					 formationinfo: '用户管理',
					 children: [{
						 id: 9,
						 formationinfo: '查询'
					 },
					 {
						 id: 10,
						 formationinfo: '新增'
					 },
					 {
						 id: 11,
						 formationinfo: '修改'
					 },
					 {
						 id: 12,
						 formationinfo: '删除'
					 }]
				 },{
					 id: 4,
					 formationinfo: '角色管理',
					 children: [{
						 id: 13,
						 formationinfo: '查询'
					 },
					 {
						 id: 14,
						 formationinfo: '新增'
					 },
					 {
						 id: 15,
						 formationinfo: '修改'
					 },
					 {
						 id: 16,
						 formationinfo: '删除'
					 }]
				 },{
					 id: 5,
					 formationinfo: '权限管理',
					 children: [{
						 id: 17,
						 formationinfo: '查询'
					 },
					 {
						 id: 18,
						 formationinfo: '新增'
					 },
					 {
						 id: 19,
						 formationinfo: '修改'
					 },
					 {
						 id: 20,
						 formationinfo: '删除'
					 }]
				 },]
			 },
			 {
				 id: 2,
				 formationinfo: '重点单位',
				 children: [{
					 id: 6,
					 formationinfo: '公安部',
                 },
                 {
                    id: 7,
                    formationinfo: '个体',
                },
                {
                    id: 8,
                    formationinfo: '政府部门',
                },
                ]
			 }
			 ],
            //树结构配置
            treeDefaultProps: {
                children: 'children',
                label: 'formationinfo'
            },
            //资源列表是否显示
            planDetailVisible: false,
            //表高度变量
            tableheight: 458,
            //显示加载中样
            loading: false,
            //多选值
            multipleSelection: [],
            //当前页
            currentPage: 1,
            //分页大小
            pageSize: 10,
            //总记录数
            total: 0,
            //预案详情页
            detailData: [],
            //详情页日期
            detailYMD:"",
            //序号
            indexData: 0,
            //删除的弹出框
            deleteVisible: false,
            //新建页面是否显示
            addFormVisible: false,
            addLoading: false,
            addFormRules: {
                permissionname: [{ required: true, message: "请输入权限名称", trigger: "blur" }]
            },
            //新建数据
            addForm: {
                YAMC: "",
                DWDJ: "",
                DXMC: "",
                YALX: "",
                DWDZ: "",
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
            planDetail: {
                YAMC: "",
                DWDJ: "",
                DXMC: "",
                YALX: "",
                DWDZ: "",
                ZDMJ: "",
                XFGXJGID: ""
            },
            defaultProps:{
                value:'codeValue',
                label:'codeName'
            }
          
        }
    },
    created:function(){
        this.YALX();
        this.DXLX();
        this.YAZL();
        this.searchClick();
    },
    methods: {        
        handleNodeClick(data) {
            console.log(data);
        },
        handleChange(value) {
            console.log(value);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        
        //预案类型
        YALX: function(){
            axios.get('/api/codelist/getCodetype/YALX').then(function(res){
                this.YALX_data = res.data.result;
            }.bind(this),function(error){
                console.log(error);
            })
        },
        //对象类型
        DXLX: function(){
            axios.get('/api/codelist/getCodetype/YADXLX').then(function(res){
                this.DXLX_data = res.data.result;
            }.bind(this),function(error){
                console.log(error);
            }) 
        },
        //预案种类
        YAZL:function(){
            axios.get('/api/codelist/getCodetype/YAZL').then(function(res){
                this.YAZL_data = res.data.result;
            }.bind(this),function(error){
                console.log(error);
            }) 
        },
        //表格查询事件
        searchClick: function () {
            var _self = this;
            
            if (this.searchForm.createTimeBegin != "" && this.searchForm.createTimeEnd != "" && this.searchForm.createTimeBegin > this.searchForm.createTimeEnd) {
                _self.$message({
                    message: "时间选择错误！",
                    type: "error"
                });
                return;
            }
            var params={
                yamc:this.searchForm.YAMC,
                yalxdm:this.searchForm.selected_YALX,
                dxmc:this.searchForm.DXMC,
                dxlxdm: this.searchForm.option_DXLX,
                yazl:this.searchForm.option_YAZL,
                begintime_create:this.searchForm.begintime_create,
                endtime_create:this.searchForm.endtime_create
            }
            axios.post('/dpapi/digitalplanlist/findByVO',params).then(function(res){
                this.tableData = res.data.result;
                for(var i=0;i<this.tableData.length;i++){
                    for(var k=0;k<this.YALX_data.length;k++){
                        if(this.YALX_data[k].codeValue == this.tableData[i].yalxdm){
                            this.tableData[i].yalxdm = this.YALX_data[k].codeName;
                        }
                    }
                    for(var m=0;m<this.YAZL_data.length;m++){
                        if(this.YAZL_data[m].codeValue == this.tableData[i].yazl){
                            this.tableData[i].yazl = this.YAZL_data[m].codeName;
                        }
                    }
                    for(var h=0;h<this.DXLX_data.length;h++){
                        if(this.DXLX_data[h].codeValue == this.tableData[i].dxlxdm){
                            this.tableData[i].dxlxdm = this.DXLX_data[h].codeName;
                        }
                    }
                }
                _self.total = _self.tableData.length;
                console.log("success")
            }.bind(this),function(error){
                console.log("failed")
            })
            _self.loadingData(); //重新加载数据
        },
        clearClick: function () {
            this.searchForm.YAMC="";
            this.searchForm.selected_YALX=[];
            this.searchForm.DXMC="";
            this.searchForm.option_DXLX=[];
            this.searchForm.option_YAZL=[];
            this.searchForm.begintime_create="";
            this.searchForm.endtime_create="";
            this.$refs.tree.setCheckedKeys([]);
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
         //时间格式化
         dateFormat: function (row, column) {
            var rowDate = row[column.property];
            if (rowDate == null || rowDate == "") {
                return '';
            } else {
                var date = new Date(rowDate);
                if (date == undefined) {
                    return '';
                }
                var month = '' + (date.getMonth() + 1),
                    day = '' + date.getDate(),
                    year = date.getFullYear();

                if (month.length < 2) month = '0' + month;
                if (day.length < 2) day = '0' + day;

                return [year, month, day].join('-')
            }
        },

        //表格勾选事件
        selectionChange: function (val) {
            this.multipleSelection = val;
            console.info(val);
        },
        //资源详情
        planDetails: function (val) {
            var _self = this;
            _self.planDetailVisible = true;
            
            axios.get('/dpapi/digitalplanlist/doFindById/' + val.pkid).then(function (res) {
                this.detailData = res.data.result;
                if (this.detailData.zzrq == null || this.detailData.zzrq == "") {
                    return '';
                } else {
                    var date = new Date(this.detailData.zzrq);
                    if (date == undefined) {
                        return '';
                    }
                    var month = '' + (date.getMonth() + 1),
                        day = '' + date.getDate(),
                        year = date.getFullYear();
    
                    if (month.length < 2) month = '0' + month;
                    if (day.length < 2) day = '0' + day;
    
                    this.detailYMD=[year, month, day].join('-');
                }
            }.bind(this), function (error) {
                console.log(error)
            })

        },
        //预案下载
        openPlan:function(){
            /*var params = ;
            axios.post('/api/resource/getResource/' + val.ID,params).then(function (res) {
                this.resourceList = res.data.result;
            }.bind(this), function (error) {
                console.log(error)
            })*/
            window.open("/upload/123456/2018-03-21/70932ac7-da58-4419-91b6-ebe0b3f53838/物美生活广场及地铁华苑站三维灭火预案.html");
        },
        downloadPlan:function(){
            //window.open("/upload/123456/2018-03-21/70932ac7-da58-4419-91b6-ebe0b3f53838.zip");
            /*var $form = $('<form method="GET"></form>');
            $form.attr('action', 'http://10.119.119.232:18080/upload/123456/2018-03-21/70932ac7-da58-4419-91b6-ebe0b3f53838/web%E7%89%88%E4%B8%89%E7%BB%B4%E9%A2%84%E6%A1%88.ZIP');
            $form.appendTo($('body'));
            $form.submit();*/
            window.open("http://10.119.119.232:18080/upload/123456/2018-03-21/70932ac7-da58-4419-91b6-ebe0b3f53838/web%E7%89%88%E4%B8%89%E7%BB%B4%E9%A2%84%E6%A1%88.ZIP");
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

        //新建事件
        addClick: function () {
            var _self = this;
            _self.addFormVisible = true;

        },
        //新建提交点击事件
        addSubmit: function (val) {
            var _self = this;
            this.tableData.unshift({
                permissionname: val.permissionname,
                permissioninfo: val.permissioninfo,
                create_name: val.create_name,
                create_time: val.create_time,
                alter_name: val.alter_name,
                alter_time: val.alter_time
            });
            this.addFormVisible = false;
            _self.total = _self.tableData.length;
            _self.loadingData();//重新加载数据
            val.permissionname = "";
            val.permissioninfo = "";
            val.create_name = "";
            val.create_time = "";
            val.alter_name = "";
            val.alter_time = "";
            console.info(this.addForm);

        },
        //删除所选，批量删除
        removeSelection: function () {
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
            for (var i = 0; i < multipleSelection.length; i++) {
                var row = multipleSelection[i];
                ids.push(row.permissionname);
            }
            this.$confirm("确认删除" + ids + "吗?", "提示", {
                type: "warning"
            })
                .then(function () {
                    for (var d = 0; d < ids.length; d++) {
                        for (var k = 0; k < _self.tableData.length; k++) {
                            if (_self.tableData[k].permissionname == ids[d]) {
                                _self.tableData.splice(k, 1);
                            }
                        }
                    }
                    _self.$message({
                        message: ids + "删除成功",
                        type: "success"
                    });
                    _self.total = _self.tableData.length;
                    _self.loadingData(); //重新加载数据
                })
                .catch(function (e) {
                    if (e != "cancel") console.log("出现错误：" + e);
                });
        },
        //分页大小修改事件
        pageSizeChange: function (val) {
            console.log("每页 " + val + " 条");
            this.pageSize = val;
            var _self = this;
            _self.loadingData(); //重新加载数据
        },
        //当前页修改事件
        currentPageChange: function (val) {
            this.currentPage = val;
            console.log("当前页: " + val);
            var _self = this;
            _self.loadingData(); //重新加载数据
        },
        //表格编辑事件
        editClick: function () {
            var _self = this;
            var multipleSelection = this.multipleSelection;
            if (multipleSelection.length < 1) {
                _self.$message({
                    message: "请至少选中一条记录",
                    type: "error"
                });
                return;
            }
            else if (multipleSelection.length > 1) {
                _self.$message({
                    message: "只能选一条记录进行编辑",
                    type: "error"
                });
                return;
            }
            //var ids = "";
            var ids = [];
            for (var i = 0; i < multipleSelection.length; i++) {
                var row = multipleSelection[i];
                //ids += row.realname + ",";
                ids.push(row.permissionname);
            }
            for (var d = 0; d < ids.length; d++) {
                for (var k = 0; k < _self.tableData.length; k++) {
                    if (_self.tableData[k].permissionname == ids[d]) {
                        _self.selectIndex = k;
                    }
                }
            }
            this.editForm = Object.assign({}, _self.tableData[_self.selectIndex]);
            //this.editForm.sex=(row.sex == "男"?1:0);
            this.editFormVisible = true;
        },
        //保存点击事件
        editSubmit: function (val) {
            var _self = this;
            this.tableData[this.selectIndex].permissionname = val.permissionname;
            this.tableData[this.selectIndex].permissioninfo = val.permissioninfo;
            this.tableData[this.selectIndex].create_name = val.create_name;
            this.tableData[this.selectIndex].create_time = val.create_time;
            this.tableData[this.selectIndex].alter_name = val.alter_name;
            this.tableData[this.selectIndex].alter_time = val.alter_time;
            this.editFormVisible = false;
            _self.loadingData();//重新加载数据
            console.info(this.editForm);
        },
        closeDialog: function (val) {
            this.planDetailVisible = false;
            val.permissionname = "";
            val.permissioninfo = "";
            val.create_name = "";
            val.create_time = "";
            val.alter_name = "";
            val.alter_time = "";
        }
        /**
        * lxy
        */
        ,
        submitUpload() {
            this.upLoadData= {id:2};
            this.$refs.upload.submit();
        },
        handleRemove(file, fileList) {

            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        }

    },

})