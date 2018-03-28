//axios默认设置cookie
axios.defaults.withCredentials = true;
yazlOptions = [{ codeValue: "0", codeName: "全部" }];
dxzlOptions = [{ codeValue: "0", codeName: "全部" }];
yalxOptions = [{ codeValue: "0", codeName: "全部" }];
new Vue({
    el: '#app',
    data: function () {
        return {
            /**lxy start */
            fileList: [
                { name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100?isUpdated=true' },
                { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100?isUpdated=true' }
            ],

            upLoadData: {
                id: 1
            },
            /**lxy end */
            //搜索表单
            searchForm: {
                YAMC: "",
                YAZL: [],
                YADXZL: [],
                YALX: [],
                YALB: [],
                SFKQ: '全部',
                LRSJ: '全部',
                begintime_create: "",
                endtime_create: ""
            },
            tableData: [
                {
                    YAMC: "防火器材预案",
                    YALX: "指挥",
                    DXMC: "沈阳市消防局",
                    DXLX: "消防部队",
                    BZDW: "公安部",
                    LRSJ: "1997-01-12",
                    YALB: "二维预案",
                    ID: "1"
                },
                {
                    YAMC: "疏散预案",
                    YALX: "疏散",
                    DXMC: "沈河区消防局",
                    DXLX: "消防部队",
                    BZDW: "公安部",
                    LRSJ: "1999-04-21",
                    YALB: "二维预案",
                    ID: "2"
                },
                {
                    YAMC: "路线预案",
                    YALX: "指挥",
                    DXMC: "沈阳工业园区",
                    DXLX: "化工园区",
                    BZDW: "个体",
                    LRSJ: "2012-04-25",
                    YALB: "三维预案",
                    ID: "3"
                },
                {
                    YAMC: "合作预案",
                    YALX: "合作计划",
                    DXMC: "消防总部",
                    DXLX: "消防部队",
                    BZDW: "公安部",
                    LRSJ: "1983-02-05",
                    YALB: "二维预案",
                    ID: "4"
                },
                {
                    YAMC: "水源分布预案",
                    YALX: "水源",
                    DXMC: "北京市消防大队",
                    DXLX: "消防部队",
                    BZDW: "公安部",
                    LRSJ: "1973-10-05",
                    YALB: "三维预案",
                    ID: "5"
                },
                {
                    YAMC: "安全出口预案",
                    YALX: "调度",
                    DXMC: "和平区消防大队",
                    DXLX: "消防部队",
                    BZDW: "公安部",
                    LRSJ: "1993-05-20",
                    YALB: "二维预案",
                    ID: "6"
                },
                {
                    YAMC: "设备转移预案",
                    YALX: "调度",
                    DXMC: "金融中心",
                    DXLX: "大型综合体",
                    BZDW: "政府部门",
                    LRSJ: "1989-09-04",
                    YALB: "三维预案",
                    ID: "7"
                },
                {
                    YAMC: "救援预案",
                    YALX: "指挥",
                    DXMC: "辽宁省消防厅",
                    DXLX: "消防部队",
                    BZDW: "公安部",
                    LRSJ: "2007-11-12",
                    YALB: "文档预案",
                    ID: "8"
                },
                {
                    YAMC: "消防车辆预案",
                    YALX: "调度",
                    DXMC: "大东区消防分队",
                    DXLX: "消防部队",
                    BZDW: "公安部",
                    LRSJ: "2009-06-23",
                    YALB: "二维预案",
                    ID: "9"
                },
                {
                    YAMC: "相邻建筑预案",
                    YALX: "指挥",
                    DXMC: "沈阳市消防局",
                    DXLX: "消防部队",
                    BZDW: "公安部",
                    LRSJ: "2006-12-6",
                    YALB: "三维预案",
                    ID: "10"
                }
            ],

            //预案种类
            yazl_data: [],
            checkedYazl: ['全部'],
            //对象种类
            dxzl_data: [],
            checkedDxzl: ['全部'],
            //预案类型
            yalx_data: [],
            checkedYalx: ['全部'],
            //是否跨区
            sfkq_data: ['全部','是','否'],
            //录入时间
            lrsj_data: ['全部','今日','昨日','最近7日','最近30日','自定义时间'],
            //树结构配置
            defaultProps: {
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
            total: 10,
            //预案详情页
            detailData: [],
            //详情页日期
            detailYMD: "",
            //序号
            indexData: 0,
            //删除的弹出框
            deleteVisible: false,
            //选中的值显示
            sels: [],
            //选中的序号
            selectIndex: -1,
        }
    },
    created: function () {
        this.YAZL();
        this.DXLX();
        this.YALX();
        // var params = {
        // }
        // axios.post('/api/digitalplanlist/findByVO', params).then(function (res) {
        //     this.tableData = res.data.result;
        //     console.log("success")
        // }.bind(this), function (error) {
        //     console.log("failed")
        // })

    },
    methods: {
        handleNodeClick(data) {
            console.log(data);
        },




        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
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
            var params = {
                rolename: this.searchForm.rolename,
                createTimeBegin: this.searchForm.createTimeBegin,
                createTimeEnd: this.searchForm.createTimeEnd
            };

            axios.post('/api/role/findByVO', params).then(function (res) {
                this.tableData = res.data.result;
                this.total = res.data.result.length;
            }.bind(this), function (error) {
                console.log(error)
            })
            _self.total = _self.tableData.length;
            _self.loadingData(); //重新加载数据
        },
        //预案种类初始化
        YAZL: function () {
            axios.get('/api/codelist/getCodetype/YAZL').then(function (res) {
                for (var i = 0; i < res.data.result.length; i++) {
                    yazlOptions.push(res.data.result[i]);
                }
                this.yazl_data = yazlOptions;
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        //对象类型初始化
        DXLX: function () {
            axios.get('/api/codelist/getCodetype/YADXLX').then(function (res) {
                for (var i = 0; i < res.data.result.length; i++) {
                    dxzlOptions.push(res.data.result[i]);
                }
                this.dxzl_data = dxzlOptions;
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        //预案类型初始化
        YALX: function () {
            axios.get('/api/codelist/getCodetype/YALX').then(function (res) {
                for (var i = 0; i < res.data.result.length; i++) {
                    yalxOptions.push(res.data.result[i]);
                }
                this.yalx_data = yalxOptions;
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        //预案种类全选
        handleCheckedYazlChange(value) {
            if ("全部" == value.currentTarget.defaultValue) {
                if (value.currentTarget.checked == true) {
                    for (var i = 0; i < this.yazl_data.length; i++) {
                        this.checkedYazl.push(this.yazl_data[i].codeName);
                    }
                }
                if (value.currentTarget.checked == false) {
                    this.checkedYazl = [];
                }
            }
        },
        //对象种类全选
        handleCheckedDxzlChange(value) {
            if ("全部" == value.currentTarget.defaultValue) {
                if (value.currentTarget.checked == true) {
                    for (var i = 0; i < this.dxzl_data.length; i++) {
                        this.checkedDxzl.push(this.dxzl_data[i].codeName);
                    }
                }
                if (value.currentTarget.checked == false) {
                    this.checkedDxzl = [];
                }
            }
        },
        //预案类型全选
        handleCheckedYalxChange(value) {
            if ("全部" == value.currentTarget.defaultValue) {
                if (value.currentTarget.checked == true) {
                    for (var i = 0; i < this.yalx_data.length; i++) {
                        this.checkedYalx.push(this.yalx_data[i].codeName);
                    }
                }
                if (value.currentTarget.checked == false) {
                    this.checkedYalx = [];
                }
            }
        },
        clearClick: function () {
            this.searchForm.YAMC = "";
            this.searchForm.selected_YALX = [];
            this.searchForm.DXMC = "";
            this.searchForm.option_DXLX = [];
            this.searchForm.option_YALB = [];
            this.searchForm.begintime_create = "";
            this.searchForm.endtime_create = "";
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

            axios.get('/api/digitalplanlist/doFindById/' + val.pkid).then(function (res) {
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

                    this.detailYMD = [year, month, day].join('-');
                }
            }.bind(this), function (error) {
                console.log(error)
            })

        },
        //预案下载
        downloadPlan: function () {
            /*var params = ;
            axios.post('/api/resource/getResource/' + val.ID,params).then(function (res) {
                this.resourceList = res.data.result;
            }.bind(this), function (error) {
                console.log(error)
            })*/
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
            this.upLoadData = { id: 2 };
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