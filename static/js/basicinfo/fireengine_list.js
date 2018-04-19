//axios默认设置cookie
axios.defaults.withCredentials = true;	
new Vue({
    el: '#app',
    data: function () {
        return {
            visible: false,
            //搜索表单
            searchForm: {
                ssdz: "",
                cllx: "",
                cphm: "",
                clzt: "",
                sbll: [0,1000],
                zsl: [0,1000]
            },
            tableData: [],
            allTeamsData: [],
            allTypesData: [],
            allStatesData: [],
            props: {
                value: 'codeValue',
                label: 'codeName',
                children: 'children'
            },
            rowdata: '',
            //表高度变量
            tableheight: 443,
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
            total: 10,
            //行数据保存
            rowdata: {},
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
            //选中的值显示
            sels: [],
            //选中的序号
            selectIndex: -1,
            //树结构配置
            defaultProps: {
                children: 'children',
                label: 'codeName',
                value: 'codeValue'
            },

        }
    },
    created:function(){
        this.searchClick();
        this.getAllTypesData();
        this.getAllStatesData();
    },
    methods: {
        handleNodeClick(data) {
            console.log(data);
        },
        //表格查询事件
        searchClick: function () {
            this.loading=true;
            var _self = this;
            var params={
                ssdz :this.searchForm.ssdz,
                cllx :this.searchForm.cllx[4],
                cphm :this.searchForm.cphm,
                clzt :this.searchForm.clzt[1],
                sbll_min :this.searchForm.sbll[0],
                sbll_max :this.searchForm.sbll[1],
                zsl_min :this.searchForm.zsl[0],
                zsl_max :this.searchForm.zsl[1]
            };
            axios.post('/dpapi/fireengine/list',params).then(function(res){
                this.tableData = res.data.result;
                this.total = res.data.result.length;
                this.rowdata = this.tableData;
                this.loading=false;

                console.log(this.tableData);
            }.bind(this),function(error){
                console.log(error);
            })
        },
        clearClick: function () {
            this.searchForm.ssdz="";
            this.searchForm.cllx=[];
            this.searchForm.cphm="";
            this.searchForm.clzt=[];
            this.searchForm.sbll=[0,1000];
            this.searchForm.zsl=[0,1000];
        },
        getAllTypesData: function (){
            axios.get('/api/codelist/getCarTypes/CLLX').then(function(res){
                this.allTypesData=res.data.result;
            }.bind(this),function(error){
                console.log(error);
            })
        },
        getAllStatesData: function (){
            axios.get('/api/codelist/getCarStates/CLZT').then(function(res){
                this.allStatesData=res.data.result;
            }.bind(this),function(error){
                console.log(error);
            })
        },
        //表格勾选事件
        selectionChange: function (val) {
            for (var i = 0; i < val.length; i++) {
                var row = val[i];
            }
            this.multipleSelection = val;
            //this.sels = sels
            console.info(val);
        },
        detailClick(val) {
            window.location.href = "fireengine_detail.html?ID=" + val.id;
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
        // editClick: function () {
        //     var _self = this;
        //     var multipleSelection = this.multipleSelection;
        //     if (multipleSelection.length < 1) {
        //         _self.$message({
        //             message: "请至少选中一条记录",
        //             type: "error"
        //         });
        //         return;
        //     }
        //     else if (multipleSelection.length > 1) {
        //         _self.$message({
        //             message: "只能选一条记录进行编辑",
        //             type: "error"
        //         });
        //         return;
        //     }
        //     //var ids = "";
        //     var ids = [];
        //     for (var i = 0; i < multipleSelection.length; i++) {
        //         var row = multipleSelection[i];
        //         //ids += row.realname + ",";
        //         ids.push(row.permissionname);
        //     }
        //     for (var d = 0; d < ids.length; d++) {
        //         for (var k = 0; k < _self.tableData.length; k++) {
        //             if (_self.tableData[k].permissionname == ids[d]) {
        //                 _self.selectIndex = k;
        //             }
        //         }
        //     }
        //     this.editForm = Object.assign({}, _self.tableData[_self.selectIndex]);
        //     //this.editForm.sex=(row.sex == "男"?1:0);
        //     this.editFormVisible = true;
        // },
        //保存点击事件
        // editSubmit: function (val) {
        //     var _self = this;
        //     this.tableData[this.selectIndex].permissionname = val.permissionname;
        //     this.tableData[this.selectIndex].permissioninfo = val.permissioninfo;
        //     this.tableData[this.selectIndex].create_name = val.create_name;
        //     this.tableData[this.selectIndex].create_time = val.create_time;
        //     this.tableData[this.selectIndex].alter_name = val.alter_name;
        //     this.tableData[this.selectIndex].alter_time = val.alter_time;
        //     this.editFormVisible = false;
        //     _self.loadingData();//重新加载数据
        //     console.info(this.editForm);
        // },
        // //新建提交点击事件
        // addSubmit: function (val) {
        //     var _self = this;
        //     this.tableData.unshift({
        //         permissionname: val.permissionname,
        //         permissioninfo: val.permissioninfo,
        //         create_name: val.create_name,
        //         create_time: val.create_time,
        //         alter_name: val.alter_name,
        //         alter_time: val.alter_time
        //     });
        //     this.addFormVisible = false;
        //     _self.total = _self.tableData.length;
        //     _self.loadingData();//重新加载数据
        //     val.permissionname = "";
        //     val.permissioninfo = "";
        //     val.create_name = "";
        //     val.create_time = "";
        //     val.alter_name = "";
        //     val.alter_time = "";
        //     console.info(this.addForm);
        // },
        closeDialog: function (val) {
            this.addFormVisible = false;
            val.permissionname = "";
            val.permissioninfo = "";
            val.create_name = "";
            val.create_time = "";
            val.alter_name = "";
            val.alter_time = "";
        }
    },

})