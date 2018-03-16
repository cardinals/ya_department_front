//axios默认设置cookie
axios.defaults.withCredentials = true;	
new Vue({
    el: '#app',
    data: function () {
        return {
            visible: false,
            awa: "",
            //搜索表单
            searchForm: {
                SYMC: "",
                SYDZ: "",
                SYLX: "",
                QSXS: ""
            },
            tableData: [
                {
                    SYBH: "001",
                    SYMC: "基础水源一",
                    SYDZ: "创新路91号",
                    SYLX: "XHS", 
                    QSXS: "001"
                },
                {
                    SYBH: "002",
                    SYMC: "基础水源二",
                    SYDZ: "创新路92号",
                    SYLX: "XFSC", 
                    QSXS: "002"
                },
                {
                    SYBH: "003",
                    SYMC: "基础水源三",
                    SYDZ: "创新路93号",
                    SYLX: "XHS", 
                    QSXS: "003"
                },
                {
                    SYBH: "004",
                    SYMC: "基础水源四",
                    SYDZ: "创新路94号",
                    SYLX: "XFSC", 
                    QSXS: "004"
                },
                {
                    SYBH: "005",
                    SYMC: "基础水源五",
                    SYDZ: "创新路95号",
                    SYLX: "XFSH", 
                    QSXS: "001"
                },
                {
                    SYBH: "006",
                    SYMC: "基础水源六",
                    SYDZ: "创新路96号",
                    SYLX: "XFSH", 
                    QSXS: "002"
                },
                {
                    SYBH: "007",
                    SYMC: "基础水源七",
                    SYDZ: "创新路97号",
                    SYLX: "TRSY", 
                    QSXS: "003"
                },
                {
                    SYBH: "008",
                    SYMC: "基础水源八",
                    SYDZ: "创新路98号",
                    SYLX: "XFSC", 
                    QSXS: "004"
                },
                {
                    SYBH: "009",
                    SYMC: "基础水源九",
                    SYDZ: "创新路99号",
                    SYLX: "TRSY", 
                    QSXS: "001"
                },
                {
                    SYBH: "010",
                    SYMC: "基础水源十",
                    SYDZ: "创新路100号",
                    SYLX: "TRSY", 
                    QSXS: "002"
                },
                {
                    SYBH: "011",
                    SYMC: "基础水源十一",
                    SYDZ: "创新路101号",
                    SYLX: "XHS", 
                    QSXS: "003"
                }
            ],
            SYLX_data: [
                {
                    value: 'XHS',
                    label: '消火栓'
                },{
                    value: 'XFSC',
                    label: '消防水池'
                },{
                    value: 'XFSH',
                    label: '消防水鹤'
                },{
                    value: 'XFQSMT',
                    label: '消防取水码头'
                },{
                    value: 'TRSY',
                    label: '天然水源'
                }
            ],
            selected_SYLX: [],
            QSXS_data: [
                {
                    value: '001',
                    label: '形式一'
                }, {
                    value: '002',
                    label: '形式二'
                }, {
                    value: '003',
                    label: '形式三'
                }, {
                    value: '004',
                    label: '形式四'
                }
            ],
            selected_QSXS: [],
            rowdata: '',
            //表高度变量
            tableheight: 450,
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
            rowdata: {

            },
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
                DWMC: "",
                DWDJ: "",
                DWXZ: "",
                XZQY: "",
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
            editForm: {
                DWMC: "",
                DWDJ: "",
                DWXZ: "",
                XZQY: "",
                DWDZ: "",
                ZDMJ: "",
                XFGXJGID: ""
            },


        }
    },
    methods: {
        handleNodeClick(data) {
            console.log(data);
        },
        handleChange(value) {
            console.log(value);
        },
        //表格查询事件
        searchClick: function () {
            var _self = this;
            var tableObject = {};
            var searchData = [];
            var resultData = [];
            //空表不显示
            function isEmptyObject(obj) {
                for (var key in obj) {
                    return false;
                }
                return true;
            }
            //数据还原
            for (var i = 0; i < _self.tableData.length; i++) {
                var flow = _self.tableData[i];
                searchData.push(flow);
            }
            for (var i = 0; i < _self.tableData.length; i++) {
                if ((!(_self.searchForm.SYMC == "" && _self.searchForm.SYDZ == "" && _self.selected_SYLX == "" && _self.selected_QSXS == "" && _self.searchForm.JGID == "")) 
                && (_self.searchForm.SYMC != "" ? (_self.tableData[i].SYMC == _self.searchForm.SYMC) : true) 
                && (_self.searchForm.SYDZ != "" ? (_self.tableData[i].SYDZ == _self.searchForm.SYDZ) : true)
                && (_self.searchForm.JGID != "" ? (_self.tableData[i].JGID == _self.searchForm.JGID) : true) 
                && (_self.selected_SYLX != "" ? (_self.tableData[i].SYLX == _self.selected_SYLX) : true) 
                && (_self.selected_QSXS != "" ? (_self.tableData[i].QSXS == _self.selected_QSXS) : true)) {
                    var row = _self.tableData[i];
                    resultData.push(row);

                }

            }
            _self.tableData.splice(0, _self.tableData.length);
            if (resultData.length >= 1) {
                _self.tableData = resultData;
            } else {
                _self.tableData.splice(0, _self.tableData.length);
                _self.tableData = searchData;
            }
            _self.total = _self.tableData.length;
            _self.loadingData(); //重新加载数据
        },
        clearClick: function () {
            
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
        //表格勾选事件
        selectionChange: function (val) {
            for (var i = 0; i < val.length; i++) {
                var row = val[i];
            }
            this.multipleSelection = val;
            //this.sels = sels
            console.info(val);
        },
        //水源类型格式化
        typeFormat: function (row, column) {
            switch (row[column.property]) {
                case 'XHS':
                    return '消火栓';
                    break;
                case 'XFSC':
                    return '消防水池';
                    break;
                case 'XFSH':
                    return '消防水鹤';
                    break;
                case 'XFQSMT':
                    return '消防取水码头';
                    break;
                case 'TRSY':
                    return '天然水源';
                    break;
            }
        },
        //取水形式格式化
        formsFormat: function (row, column) {
            switch (row[column.property]) {
                case '001':
                    return '形式一';
                    break;
                case '002':
                    return '形式二';
                    break;
                case '003':
                    return '形式三';
                    break;
                case '004':
                    return '形式四';
                    break;
            }
        }, 
        informClick(val) {
            window.location.href = "firewater_detail.html?SYBH=" + val.SYBH + "&SYLX=" + val.SYLX;
        },
        createdateChange(val) {
            console.log(val);
            this.addForm.create_time = val;
            this.editForm.create_time = val;
        },
        alterdateChange(val) {
            console.log(val);
            this.addForm.alter_time = val;
            this.editForm.alter_time = val;
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
        loadingData: function () {
            var _self = this;
            _self.loading = true;
            setTimeout(function () {
                console.info("加载数据成功");
                _self.loading = false;
            }, 300);
        },
        //表格删除事件
        // deleteClick: function(index,row) {
        // var _self = this;
        // this.$confirm("确认删除" + row.realname + "吗?", "提示", {
        // 	type: "warning",
        // 	confirmButtonText: '确定',
        // 	cancelButtonText: '取消'
        // })
        // 	.then(function() {
        // 	_self.tableData.splice(index,1);
        // 	_self.$message({
        // 		message: row.realname + "删除成功",
        // 		type: "success"
        // 	});
        // 	_self.loadingData(); //重新加载数据
        // 	})
        // 	.catch(function(e) {
        // 	if (e != "cancel") console.log("出现错误：" + e);
        // 	});
        // },
/*
        //新建事件
        addClick: function () {
            var _self = this;
            _self.addFormVisible = true;

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
            //var ids = "";
            var ids = [];
            for (var i = 0; i < multipleSelection.length; i++) {
                var row = multipleSelection[i];
                //ids += row.realname + ",";
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
    */
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