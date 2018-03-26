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
                symc: '',
                sydz: '',
                sylx: '',
                qsxs: '',
                jgid: ''
            },
            tableData: [],
            SYLX_data: [],
            selected_SYLX: [],
            QSXS_data: [],
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
    created: function () {
        this.searchClick();
        this.searchSYLX_data();
        this.searchQSXS_data();
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
            // this.searchForm.sylx = '';
            // if (this.selected_SYLX.length > 0) {
            //     for (var i = 0; i < this.selected_SYLX.length; i++) {
            //         this.searchForm.sylx += '\'' + this.selected_SYLX[i] + '\',';
            //         // this.searchForm.sylx += this.selected_SYLX[i] + ',';
            //     }
            // }
            var params = {
                symc: this.searchForm.symc,
                sydz: this.searchForm.sydz,
                jgid: this.searchForm.jgid,
                qsxs: this.searchForm.qsxs,
                sylx: this.searchForm.sylx
            }
            axios.post('/dpapi/shuiyuan/findByVO', params).then(function (res) {
                console.log(res.data.result);
                this.tableData = res.data.result;
                this.total = this.tableData.length;
                this.loadingData();
            }.bind(this), function (error) {
                console.log(error)
            })
        },
        clearClick: function () {
            this.searchForm.symc = "";
            this.searchForm.sydz = "";
            this.searchForm.jgid = "";
            this.searchForm.qsxs = "";
            this.searchForm.sylx = "";
            this.selected_SYLX = [];

        },
        searchSYLX_data: function () {
            axios.get('/api/codelist/getCodetype/SYLX').then(function (res) {
                this.SYLX_data = res.data.result;
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        searchQSXS_data: function () {
            axios.get('/api/codelist/getCodetype/GSFS').then(function (res) {
                this.QSXS_data = res.data.result;
            }.bind(this), function (error) {
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
            window.location.href = "firewater_detail.html?id=" + val.id;
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