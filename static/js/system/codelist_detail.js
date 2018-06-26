//加载面包屑
window.onload=function(){
    loadBreadcrumb("代码集管理", "代码集详情");
}
//axios默认设置cookie
axios.defaults.withCredentials = true;
var vue = new Vue({
    el: '#app',
    data: function () {
        return {
            visible: false,
            codeid: null,
            //搜索表单
            searchForm: {
                codeValue: '',
                codeName: ''
            },
            tableData: [],
            //表高度变量
            tableheight: 443,
            //显示加载中样
            loading: false,
            //多选值
            multipleSelection: [],
            //当前页
            currentPage: 1,
            //分页大小
            pageSize: 10,
            //总记录数
            total: 10,
            //新建页面是否显示
            addFormVisible: false,
            addFormRules: {
                codeValue: [{ required: true, message: "请输入代码值", trigger: "blur" }],
                codeName: [{ required: true, message: "请输入代码名称", trigger: "blur" }]
            },
            //新建数据
            addForm: {
                permissionname: "",
                permissioninfo: ""
            },
            //选中的序号
            selectIndex: -1,
            //修改界面是否显示
            editFormVisible: false,
            editFormRules: {
                codeValue: [{ required: true, message: "请输入代码值", trigger: "blur" }],
                codeName: [{ required: true, message: "请输入代码名称", trigger: "blur" }]
            },
            //修改界面数据
            editForm: {
                codetype: "",
                codetypeName: ""
            }
        }
    },
    created: function () {
        //设置菜单选中
        $("#activeIndex").val(getQueryString("index"));
        
        this.loading = true; //重新加载数据
        this.codeid = getQueryString("codeid");
        axios.get('/api/codelist/detail/doFindById/' + this.codeid).then(function (res) {
            this.tableData = res.data.result;
            this.total = res.data.result.length;
            this.loading = false;
        }.bind(this), function (error) {
            console.log(error)
        })
    },
    methods: {
        handleNodeClick(data) {
        },

        //日期控件格式化
        begindateChange(val) {
            this.searchForm.createTimeBegin = val;
        },
        enddateChange(val) {
            this.searchForm.createTimeEnd = val;
        },

        codetypeCilck: function (val) {
            window.location.href = this.$http.options.root + "/api/codelist/getDetailPage/" + val.codeid;
        },

        //查询，初始化
        searchClick: function(type) {
            //按钮事件的选择
            if(type == 'page'){     
            }else{
                this.currentPage = 1;
            }
            this.loading = true;
            var params = {
                codeid: this.codeid,
                codeValue: this.searchForm.codeValue.trim(),
                codeName: this.searchForm.codeName.trim()
            };

            axios.post('/api/codelist/detail/findByVO', params).then(function (res) {
                this.tableData = res.data.result;
                this.total = res.data.result.length;
                this.loading = false;
            }.bind(this), function (error) {
                console.log(error)
            })
        },

        //表格勾选事件
        selectionChange: function (val) {
            this.multipleSelection = val;
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

        //新建：弹出Dialog
        addClick: function () {
            var _self = this;
            _self.addFormVisible = true;

        },

        //新建：保存
        addSubmit: function (val) {
            var _self = this;
            debugger;
            axios.get('/api/codelist/detail/getNum/' + this.codeid + '/' + this.addForm.codeValue).then(function (res) {
                if (res.data.result != 0) {
                    _self.$message({
                        message: "代码值已存在!",
                        type: "error"
                    });
                } else {
                    var params = {
                        codeid: this.codeid,
                        codeValue: val.codeValue.trim(),
                        codeName: val.codeName.trim()
                    }
                    axios.post('/api/codelist/detail/insertByVO', params).then(function (res) {
                        var addData = res.data.result;
                        addData.createTime = new Date();
                        _self.tableData.unshift(addData);
                        _self.total = _self.tableData.length;
                    }.bind(this), function (error) {
                        console.log(error)
                    })
                    this.addFormVisible = false;
                    _self.loadingData();//重新加载数据
                }
            }.bind(this), function (error) {
                console.log(error)
            })
        },

        //修改：弹出Dialog
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

            var pkid = multipleSelection[0].pkid;

            //获取选择的行号
            for (var k = 0; k < _self.tableData.length; k++) {
                if (_self.tableData[k].pkid == pkid) {
                    _self.selectIndex = k;
                }
            }

            //直接从table中取值放在form表单中
            this.editForm = Object.assign({}, _self.tableData[_self.selectIndex]);
            this.editFormVisible = true;
        },

        //修改：保存
        editSubmit: function (val) {
            var params = {
                pkid: val.pkid,
                codeValue: val.codeValue.trim(),
                codeName: val.codeName.trim(),
                remark: val.remark
            };
            axios.post('/api/codelist/detail/updateByVO', params).then(function (res) {
                this.tableData[this.selectIndex].codeValue = val.codeValue;
                this.tableData[this.selectIndex].codeName = val.codeName;
                this.tableData[this.selectIndex].remark = val.remark;
                this.tableData[this.selectIndex].alterName = res.data.result.alterName;
                this.tableData[this.selectIndex].alterTime = new Date();
            }.bind(this), function (error) {
                console.log(error)
            })
            this.editFormVisible = false;
        },

        //删除:批量删除
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
                ids.push(row.pkid);
            }
            this.$confirm("确认删除吗？", "提示", { type: "warning" }).then(function () {
                var params = {
                    ids: ids
                };
                axios.post('/api/codelist/detail/deleteByIds', params).then(function (res) {
                    for (var d = 0; d < ids.length; d++) {
                        for (var k = 0; k < _self.tableData.length; k++) {
                            if (_self.tableData[k].pkid == ids[d]) {
                                _self.tableData.splice(k, 1);
                            }
                        }
                    }
                    _self.$message({
                        message: "删除成功",
                        type: "success"
                    });
                    _self.total = _self.tableData.length;
                    _self.loadingData(); //重新加载数据
                }.bind(this), function (error) {
                    console.log(error)
                })

            })
                .catch(function (e) {
                    if (e != "cancel") console.log("出现错误：" + e);
                });
        },
    
        closeDialog: function (val) {
            this.addFormVisible = false;
            val.permissionname = "";
            val.permissioninfo = "";
            this.$refs["addForm"].resetFields();
        }
    },

})