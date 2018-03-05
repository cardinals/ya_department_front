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
                DWMC: "",
                DWDJ: "",
                DWXZ: "",
                XZQY: ""
            },
            tableData: [
                {
                    DWMC: "辽宁省人民法院",
                    XZQY: "辽宁省",
                    DWDZ: "霞飞路29号",
                    XFGXJGNAME: "沈阳市消防局",
                    CJSJ: "2012-02-23",
                    DWDJ: "省部级",
                    DWXZ: "司法",
                    ID: "1"
                },
                {
                    DWMC: "辽宁省政府",
                    DWDJ: "省部级",
                    DWXZ: "行政",
                    XZQY: "辽宁省",
                    DWDZ: "霞飞路30号",
                    ZDMJ: 50000,
                    XFGXJGNAME: "沈阳市消防局",
                    CJSJ: "2012-02-23",
                    ID: "2"
                },
                {
                    DWMC: "辽宁省就业局",
                    DWDJ: "省部级",
                    DWXZ: "民事",
                    XZQY: "辽宁省",
                    DWDZ: "霞飞路31号",
                    ZDMJ: 20000,
                    XFGXJGNAME: "沈阳市消防局",
                    CJSJ: "2012-02-23",
                    ID: "3"
                },
                {
                    DWMC: "沈阳市城市规划管理局",
                    DWDJ: "市厅级",
                    DWXZ: "城市管理",
                    XZQY: "辽宁省",
                    DWDZ: "霞飞路32号",
                    ZDMJ: 10000,
                    XFGXJGNAME: "沈阳市消防和平分队",
                    CJSJ: "2012-02-23",
                    ID: "4"
                },
                {
                    DWMC: "沈阳市公安局",
                    DWDJ: "市厅级",
                    DWXZ: "司法",
                    XZQY: "辽宁省",
                    DWDZ: "霞飞路33号",
                    ZDMJ: 12000,
                    XFGXJGNAME: "沈阳市消防沈河分队",
                    CJSJ: "2012-02-23",
                    ID: "5"
                },
                {
                    DWMC: "沈阳市地铁二号线",
                    DWDJ: "市厅级",
                    DWXZ: "民事",
                    XZQY: "辽宁省",
                    DWDZ: "霞飞路34号",
                    ZDMJ: 1000,
                    XFGXJGNAME: "沈阳市消防浑南分队",
                    CJSJ: "2012-02-23",
                    ID: "6"
                },
                {
                    DWMC: "青岛市塑性加工园",
                    DWDJ: "市厅级",
                    DWXZ: "城市管理",
                    XZQY: "山东省",
                    DWDZ: "文明路39号",
                    ZDMJ: 2000,
                    XFGXJGNAME: "青岛市市消防大东分队",
                    CJSJ: "2012-02-23",
                    ID: "7"
                },
                {
                    DWMC: "泰安市城建局",
                    DWDJ: "市厅级",
                    DWXZ: "城市管理",
                    XZQY: "山东省",
                    DWDZ: "法防路36号",
                    ZDMJ: 2000,
                    XFGXJGNAME: "泰安市消防塔湾分队",
                    CJSJ: "2012-02-23",
                    ID: "8"
                },
                {
                    DWMC: "河北省国土资源厅",
                    DWDJ: "省部级",
                    DWXZ: "城市管理",
                    XZQY: "河北省",
                    DWDZ: "格调路46号",
                    ZDMJ: 3000,
                    XFGXJGNAME: "河北省消防总队",
                    CJSJ: "2012-02-23",
                    ID: "9"
                },
                {
                    DWMC: "秦皇岛市林业局",
                    DWDJ: "市厅级",
                    DWXZ: "城市管理",
                    XZQY: "河北省",
                    DWDZ: "发文路64号",
                    ZDMJ: 4000,
                    XFGXJGNAME: "秦皇岛市消防大队",
                    CJSJ: "2012-02-23",
                    ID: "10"
                }
            ],
            XFGX_data: [
                {
                    value: 'liaoning',
                    label: '辽宁省消防总队',
                    children: [{
                        value: 'shenyang',
                        label: '沈阳市消防总队',
                        children: [{
                            value: 'heping',
                            label: '沈阳市消防和平分队'
                        }, {
                            value: 'dadong',
                            label: '沈阳市消防大东分队'
                        }]
                    }, {
                        value: 'dalian',
                        label: '大连市消防总队'
                    }, {
                        value: 'anshan',
                        label: '鞍山市消防总队'
                    }]
                }, {
                    value: 'shandong',
                    label: '山东省消防总队',
                    children: [{
                        value: 'shenyang',
                        label: '青岛市消防总队'
                    }, {
                        value: 'dalian',
                        label: '烟台市消防总队'
                    }, {
                        value: 'anshan',
                        label: '淄博市消防总队'
                    }]
                }, {
                    value: 'hebei',
                    label: '河北省消防总队',
                    children: [{
                        value: 'qinhuangdao',
                        label: '秦皇岛市消防总队'
                    }, {
                        value: 'dalian',
                        label: '石家庄消防总队'
                    }]
                }
            ],
            selected_XFGX: [],
            XZQY_data: [
                {
                    value: 'liaoning',
                    label: '辽宁省',
                    children: [{
                        value: 'shenyang',
                        label: '沈阳市',
                        children: [{
                            value: 'heping',
                            label: '沈阳市和平'
                        }, {
                            value: 'dadong',
                            label: '沈阳市大东'
                        }]
                    }, {
                        value: 'dalian',
                        label: '大连市队'
                    }, {
                        value: 'anshan',
                        label: '鞍山市'
                    }]
                }, {
                    value: 'shandong',
                    label: '山东省',
                    children: [{
                        value: 'shenyang',
                        label: '青岛市'
                    }, {
                        value: 'dalian',
                        label: '烟台市'
                    }, {
                        value: 'anshan',
                        label: '淄博市'
                    }]
                }, {
                    value: 'hebei',
                    label: '河北省',
                    children: [{
                        value: 'qinhuangdao',
                        label: '秦皇岛'
                    }, {
                        value: 'dalian',
                        label: '石家庄'
                    }]
                }
            ],
            selected_XZQY: [],
            BHXJ_data: [
                {
                    value: '沈阳市中级人民法院',
                    label: '沈阳市中级人民法院'
                }, {
                    value: '大连市中级人民法院',
                    label: '大连市中级人民法院'
                }, {
                    value: '鞍山市中级人民法院',
                    label: '鞍山市中级人民法院'
                }, {
                    value: '抚顺市中级人民法院',
                    label: '抚顺市中级人民法院'
                }
            ],
            option_BHXJ: [],
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
            //起始时间的判断大小的函数
            function tab(begin, end) {
                var oDate1 = new Date(begin);
                var oDate2 = new Date(end);
                if (oDate1.getTime() > oDate2.getTime()) {
                    return true;
                }
                return false;
            }
            //数据还原
            for (var i = 0; i < _self.tableData.length; i++) {
                var flow = _self.tableData[i];
                searchData.push(flow);
            }
            for (var i = 0; i < _self.tableData.length; i++) {
                if ((!(_self.searchForm.DWMC == "" && _self.searchForm.DWDJ == "" && _self.searchForm.DWXZ == "" && _self.searchForm.XZQY == "")) && (_self.searchForm.DWMC != "" ? (_self.tableData[i].DWMC == _self.searchForm.DWMC) : true) && (_self.searchForm.DWDJ != "" ? (_self.tableData[i].DWDJ == _self.searchForm.DWDJ) : true)
                    && (_self.searchForm.DWXZ != "" ? (_self.tableData[i].DWXZ == _self.searchForm.DWXZ) : true) && (_self.searchForm.XZQY != "" ? (_self.tableData[i].XZQY == _self.searchForm.XZQY) : true)) {
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
            // this.searchForm.
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
        //批量删除数据
        // delGroup() {  
        // 	var ids = this.sels.map(item => item.id).join()//获取所有选中行的id组成的字符串，以逗号分隔

        // },  
        //时间格式
        // dateChange(val) {  
        // 	console.log(val);  
        // 	this.addForm.create_time = val;
        // 	this.editForm.create_time = val;
        // },
        informClick(val) {
            window.location.href = "inform_list.html?ID=" + val.ID;
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