$("#header_box").load("../pages/header_box.html #header_box");
// $("#menu_box").load("../pages/left-sidebar.html #menu_box");
//axios默认设置cookie
axios.defaults.withCredentials = true;
new Vue({
    el: '#app',
    data: function () {
        return {
            //搜索表单
            searchForm: {
                codetypename: "",
                begintime_create: "",
                endtime_create: ""
            },
            //表数据
            tableData: [
                // {
                //     codeid:"1",
                //     codetypename:"省份",
                //     codetype:"province",
                //     language:"zh_CN",
                //     create_name:"冯玉冰",
                //     create_time: "2008-05-03",
                //     alter_name:"马昭",
                //     alter_time: "2015-08-29",
                //     remark:"临时"
                // },{
                //     codeid:"2",
                //     codetypename:"性别",
                //     codetype:"sex",
                //     language:"zh_CN",
                //     create_name:"孙宝书",
                //     create_time: "2008-05-03",
                //     alter_name:"牛大力",
                //     alter_time: "2017-02-11",
                //     remark:"临时"
                // },{
                //     codeid:"3",
                //     codetypename:"单位名称",
                //     codetype:"organization",
                //     language:"zh_CN",
                //     create_name:"张艾希",
                //     create_time: "2012-11-24",
                //     alter_name:"孙尚",
                //     alter_time: "2013-12-07",
                //     remark:"临时"
                // },{
                //     codeid:"4",
                //     codetypename:"单位等级",
                //     codetype:"grade",
                //     language:"zh_CN",
                //     create_name:"刘海柱",
                //     create_time: "2013-07-16",
                //     alter_name:"张文斌",
                //     alter_time: "2016-01-01",
                //     remark:"临时"
                // },
            ],

            //删除成功后台返回数据
            delStatus: "success",
            //表高度变量
            tableheight: 445,
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
            //序号
            indexData: 0,
            //资源列表是否显示
            resourceVisible: false,
            //删除的弹出框
            deleteVisible: false,
            //新建页面是否显示
            addFormVisible: false,
            addLoading: false,
            addFormRules: {
                codetype: [
                    { required: true, message: '请输入代码类型', trigger: 'blur' },
                    { min: 5, max: 11, message: '长度在 5 到 11 个字符', trigger: 'blur' }
                ],
                codetypename: [
                    { required: true, message: '请输入代码类型名称', trigger: 'blur' },
                    { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' }
                ],
                language: [
                    { required: true, message: '请输入国际化信息', trigger: 'blur' },
                    { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' }
                ],
                remark: [
                    { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' }
                ],
            },
            //新建数据
            addForm: {
                codetype: "",
                codetypename: "",
                remark: "",
                language: ""
            },
            //选中的序号
            selectIndex: -1,
            //修改界面是否显示
            editFormVisible: false,
            editLoading: false,
            editFormRules: {
                codetype: [
                    { required: true, message: '请输入代码类型', trigger: 'blur' },
                    { min: 5, max: 11, message: '长度在 5 到 11 个字符', trigger: 'blur' }
                ],
                codetypename: [
                    { required: true, message: '请输入代码类型名称', trigger: 'blur' },
                    { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' }
                ],
                language: [
                    { required: true, message: '请输入国际化信息', trigger: 'blur' },
                    { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' }
                ],
                remark: [
                    { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' }
                ],
            },
            //修改界面数据
            editForm: {
                codeid: "",
                codetype: "",
                codetypename: "",
                language: "",
                remark: ""
            }
        }
    },
    mounted: function () {
        var params = {
            codetype: this.searchForm.codetypename,
            createTimeBegin: this.searchForm.begintime_create,
            createTimeEnd: this.searchForm.endtime_create
        };

        axios.post('http://localhost:80/codelist/findByVO', params).then(function (res) {
            this.tableData = res.data.result;
            // this.total = res.data.result.length;
            this.total = this.tableData.length;
        }.bind(this), function (error) {
            console.log(error)
        })
    },
    methods: {
        handleNodeClick(data) {
            console.log(data);
        },
        //新增checkbox
        handleCheckChange(data, checked, indeterminate) {
            console.log(data, checked, indeterminate);
        },
        //初始化数据查询
        searchClick: function () {
            var _self = this;
            var tableObject = {};
            var searchData = [];

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
            //创建起始时间的判断
            if (_self.searchForm.begintime_create != "" && _self.searchForm.endtime_create != "") {
                if (tab(_self.searchForm.begintime_create, _self.searchForm.endtime_create)) {
                    _self.$message({
                        message: "创建开始时间不能早于创建结束时间",
                        type: "error"
                    });
                    return;
                }
            }

            var params = {
                codetype: this.searchForm.codetypename,
                createTimeBegin: this.searchForm.begintime_create,
                createTimeEnd: this.searchForm.endtime_create
            };

            axios.post('http://localhost:80/codelist/findByVO', params).then(function (res) {
                this.tableData = res.data.result;
                this.total = res.data.result.length;
            }.bind(this), function (error) {
                console.log(error)
            })

            // _self.loadingData(); //重新加载数据
        },

        //表格勾选事件
        selectionChange: function (val) {
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
        loadingData: function () {
            var _self = this;
            _self.loading = true;
            setTimeout(function () {
                console.info("加载数据成功");
                _self.loading = false;
            }, 300);
        },
        //详情跳转
        informClick(val) {
            window.location.href = "codelist_detail.html?ID=" + val.codeid;
        },

        //新建事件
        addClick: function () {
            var _self = this;
            _self.addFormVisible = true;
        },

        //新建提交点击事件
        addSubmit: function (val) {
            var _self = this;
            if (val.language == "") {
                val.language = "zh_CN";
            }
            this.tableData.unshift({
                codetypename: val.codetype,
                codetypename: val.codetypename,
                language: val.language,
                remark: val.remark
            });
            this.addFormVisible = false;
            _self.total = _self.tableData.length;
            _self.loadingData();//重新加载数据
            val.codetype = "";
            val.codetypename = "";
            val.language = "";
            val.remark = "";
            console.info(this.addForm);
        },
        //表格修改事件
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
                    message: "只能选一条记录进行修改",
                    type: "error"
                });
                return;
            }
            // alert(multipleSelection.codeid);
            this.editForm = Object.assign({}, _self.tableData[multipleSelection]);
            this.editFormVisible = true;
        },
        //修改提交事件
        editSubmit: function (val) {
            var _self = this;
            /*POST请求递交editForm数据传入roleid之后再对前台加载*/
            this.tableData[this.selectIndex].codeid = val.codeid;
            this.tableData[this.selectIndex].codetype = val.codetype;
            this.tableData[this.selectIndex].codetypename = val.codetypename;
            this.tableData[this.selectIndex].language = val.language;
            this.tableData[this.selectIndex].remark = val.remark;
            this.editFormVisible = false;
            _self.loadingData();//重新加载数据
            console.info(this.editForm);

            // var params = {
            //     roleid: val.roleid,
            //     rolename: val.rolename,
            //     roleinfo: val.roleinfo
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
            var deletename = [];
            for (var i = 0; i < multipleSelection.length; i++) {
                var row = multipleSelection[i];
                //删除POST请求时传入ids里的roleid作为删除唯一标识
                ids.push(row.codeid);
                deletename.push(row.codetypename);
            }
            this.$confirm("确认删除" + deletename + "吗?", "提示", {
                type: "warning"
            })
                .then(function () {
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
                    //             if(_self.tableData[k].codeid == ids[d]){
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
                    /*POST请求之后再对前台加载*/
                    for (var d = 0; d < ids.length; d++) {
                        for (var k = 0; k < _self.tableData.length; k++) {
                            if (_self.tableData[k].codeid == ids[d]) {
                                _self.tableData.splice(k, 1);
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
                .catch(function (e) {
                    if (e != "cancel") console.log("出现错误：" + e);
                });
        },
        
        closeDialog: function (val) {
            this.addFormVisible = false;
            val.rolename = "";
            val.roleinfo = "";
            // val.resource.splice(0,val.resource.length);
        }
    },
})