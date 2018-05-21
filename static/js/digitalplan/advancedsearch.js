//axios默认设置cookie
axios.defaults.withCredentials = true;
new Vue({
    el: '#app',
    data: function () {
        return {
            activeName: "first",  
            isZddw:false,
            isDtjz:false,
            isJzl:false,
            isZzl:false,
            /**lxy start */
            fileList: [
                { name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100?isUpdated=true' },
                { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100?isUpdated=true' }
            ],

            upLoadData: {
                id: 1
            },
            /**lxy end */
            //预案搜索表单
           yuAnSearchForm: {
                YAMC:"",
                YADX:"",
                YALX:"",
                YAJB:"",
                SHZT:"",
                LRSJ:"",
                begintime_create: "",
                endtime_create: ""
            },
            //预案对象搜索表单
            YADXSearchForm: {
                DXMC:"",
                YADX:"",
                XFGX:"",
                DWXZ:"",
                XZQH:"",
                FHDJ:"",
                DWJZQK:""
            },
            //单位建筑搜索表单
            DWJZSearchForm:{
                JZMC:"",
                JZLX:"",
                JZSYXZ:"",
                JZJG:"",
                JZGD:"",
            },
            tableData: [],
            DWJZtableData: [],
            
            //详情页显示
            planDetailVisible: false,
            //预案对象
            yadx_data: [
                { codeValue: "", codeName: "全部" },
                { codeValue: "zddw", codeName: "重点单位" },
                { codeValue: "bwjw", codeName: "消防保卫警卫" },
                { codeValue: "others", codeName: "其他对象" }],
            //预案类型
            yalx_data: [{ codeValue: "", codeName: "全部" }],
            //预案级别
            yajb_data: [{ codeValue: "", codeName: "全部" }],
            //审核状态
            shzt_data: [{ codeValue: "", codeName: "全部" }],
            //录入时间
            lrsj_data: [
                { codeValue: "", codeName: "全部" },
                { codeValue: "today", codeName: "今日" },
                { codeValue: "yesterday", codeName: "昨日" },
                { codeValue: "lastweek", codeName: "最近7日" },
                { codeValue: "lastmonth", codeName: "最近30日" },
                { codeValue: "others", codeName: "自定义时间" }],
            //消防管辖
            xfgx_data:[{ codeValue: "", codeName: "全部" }],
            //单位性质
            dwxz_data:[{ codeValue: "", codeName: "全部" }],
            //行政区划
            xzqh_data:[{ codeValue: "", codeName: "全部" }],
            //防火等级
            fhdj_data:[{ codeValue: "", codeName: "全部" }],
            //单位建筑情况
            dwjzqk_data:[{ codeValue: "", codeName: "全部" }],
            //建筑使用性质
            jzsyxz_data:[{ codeValue: "", codeName: "全部" }],
            //建筑结构
            jzjg_data:[{ codeValue: "", codeName: "全部" }],
            //建筑高度
            jzgd_data:[{ codeValue: "", codeName: "全部" },
            { codeValue: "1", codeName: "<=50m" },
            { codeValue: "2", codeName: ">50m且<=100m" },
            { codeValue: "3", codeName: ">100m" }],
            
            //资源列表是否显示
            planDetailVisible: false,
            //显示加载中样
            loading: false,
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
     //   this.YADX();
        this.YALX();
        this.YAJB();
        this.SHZT();
        this.XFGX();
        this.DWXZ();
        this.XZQH();
        this.FHDJ();
        this.DWJZQK();
        this.JZSYXZ();
        this.JZJG();
      //  this.searchClick();
        this.searchDWJZClick();
    },
    methods: {
        handleNodeClick(data) {
            console.log(data);
        },
        //当前页修改事件
        handleCurrentChange(val) {
            this.currentPage = val;
            console.log("当前页: " + val);
            var _self = this;
            _self.loadingData(); //重新加载数据
        },

        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        //表格查询事件
        searchClick: function () {
            this.loading = true;
            var _self = this;
            var params = {
                yamc: this.yuAnSearchForm.yamc,
                // createTimeBegin: this.yuAnSearchForm.createTimeBegin,
                // createTimeEnd: this.yuAnSearchForm.createTimeEnd
            };
            axios.post('/dpapi/digitalplanlist/findByVO', params).then(function (res) {
                this.tableData = res.data.result;
                this.total = res.data.result.length;
                for (var i = 0; i < this.tableData.length; i++) {
                    for (var k = 0; k < this.yalx_data.length; k++) {
                        if (this.yalx_data[k].codeValue == this.tableData[i].yalxdm) {
                            this.tableData[i].yalxdm = this.yalx_data[k].codeName;
                        }
                    }
                }
                this.loading = false;
            }.bind(this), function (error) {
                console.log(error)
            })
            _self.total = _self.tableData.length;
        },
        //预案对象查询事件
        searchYADXClick:function(){

        },
        //单位建筑信息查询事件
        searchDWJZClick:function(){
            this.loading = true;
            var params = {
                jzmc:this.DWJZSearchForm.JZMC,
                jzlx:this.DWJZSearchForm.JZLX,
                jzl_jzsyxz:this.DWJZSearchForm.JZSYXZ.substr(0,1),
                jzl_jzjg:this.DWJZSearchForm.JZJG,
                jzl_dsgd:this.DWJZSearchForm.JZGD
            };
            axios.post('/dpapi/advancedsearch/gjssList', params).then(function (res) {
                this.DWJZtableData = res.data.result;
                this.total = res.data.result.length;
                this.loading = false;
            }.bind(this), function (error) {
                console.log(error)
            })
        },
        //预案类型初始化
        YALX: function () {
            axios.get('/api/codelist/getCodetype/YALX').then(function (res) {
                for (var i = 0; i < res.data.result.length; i++) {
                    if(res.data.result[i].codeValue.substr(1,4) == '0000')
                        this.yalx_data.push(res.data.result[i]);
                }
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        //预案级别初始化
        YAJB:function(){
            axios.get('/api/codelist/getCodetype/YAJB').then(function (res) {
                for (var i = 0; i < res.data.result.length; i++) {
                    this.yajb_data.push(res.data.result[i]);
                }
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        //审核状态初始化
        SHZT:function(){
            axios.get('/api/codelist/getCodetype/YASHZT').then(function (res) {
                for (var i = 0; i < res.data.result.length; i++) {
                    this.shzt_data.push(res.data.result[i]);
                }
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        //消防管辖初始化
        XFGX:function(){
            axios.get('/dpapi/util/doSearchContingents').then(function (res) {
                for (var i = 0; i < res.data.result.length; i++) {
                    this.xfgx_data.push(res.data.result[i]);
                }
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        //单位性质初始化
        DWXZ:function(){
            axios.get('/api/codelist/getCodetype/ZDDWLB').then(function (res) {
                for (var i = 0; i < res.data.result.length; i++) {
                    if(res.data.result[i].codeValue.substr(2,4) == '000')
                        this.dwxz_data.push(res.data.result[i]);
                }
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        //行政区划初始化
        XZQH:function(){
            axios.get('/api/codelist/getXzqh/XZQH').then(function (res) {
                for (var i = 0; i < res.data.result.length; i++) {
                    this.xzqh_data.push(res.data.result[i]);
                }
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        //防火等级初始化
        FHDJ:function(){
            axios.get('/api/codelist/getCodetype/FHDJ').then(function (res) {
                for (var i = 0; i < res.data.result.length; i++) {
                    this.fhdj_data.push(res.data.result[i]);
                }
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        //单位建筑情况初始化
        DWJZQK:function(){
            axios.get('/api/codelist/getCodetype/JZFL').then(function (res) {
                for (var i = 0; i < res.data.result.length; i++) {
                    this.dwjzqk_data.push(res.data.result[i]);
                }
            }.bind(this), function (error) {
                console.log(error);
            }) 
        },
        //建筑使用性质初始化
        JZSYXZ:function(){
            axios.get('/api/codelist/getCodetype/JZSYXZ').then(function (res) {
                for (var i = 0; i < res.data.result.length; i++) {
                    if(res.data.result[i].codeValue.substr(1,3) == '000')
                    this.jzsyxz_data.push(res.data.result[i]);
                }
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        //建筑结构初始化
        JZJG:function(){
            axios.get('/api/codelist/getCodetype/JZJG').then(function (res) {
                for (var i = 0; i < res.data.result.length; i++) {
                    this.jzjg_data.push(res.data.result[i]);
                }
            }.bind(this), function (error) {
                console.log(error);
            })
        },
       

        //预案对象信息中对象类型为重点单位时显示其他搜索条件
        isZddwShow:function(){
            if(this.YADXSearchForm.YADX == "zddw")
                this.isZddw = true;
            else{
                this.isZddw = false;
                this.YADXSearchForm.DWXZ="";
                this.YADXSearchForm.XZQH="";
                this.YADXSearchForm.FHDJ="";
                this.YADXSearchForm.DWJZQK="";
            }
        },
        //根据建筑类型展示不同的查询条件
        selectJzlx:function(){
            switch(this.DWJZSearchForm.JZLX){
                case '':
                    this.isZzl = false;
                    this.isJzl = false;
                    this.isDtjz = false;
                    break;
                case '10':
                    this.isDtjz = true;
                    this.isJzl = false;
                    this.isZzl = false;
                    break;
                case '20':
                    this.isJzl = true;
                    this.isDtjz = false;
                    this.isZzl = false;
                    break;
                case '30':
                    this.isZzl = true;
                    this.isJzl = false;
                    this.isDtjz = false;
                    break;
                case '40':
                    this.isZzl = false;
                    this.isJzl = false;
                    this.isDtjz = false;
                    break;
            }
            this.DWJZSearchForm.JZSYXZ="";
            this.DWJZSearchForm.JZJG="";
            this.DWJZSearchForm.JZGD="";
        },
        /* 
        //预案种类全选
        handleCheckedYazlChange(value) {
            if (value.currentTarget.defaultValue == "全部") {
                this.checkedYazl = [];
                if (value.currentTarget.checked == true) {
                    for (var i = 0; i < this.yazl_data.length; i++) {
                        this.checkedYazl.push(this.yazl_data[i].codeName);
                    }
                }
            } else {
                if (value.currentTarget.checked == false) {
                    for (var i = 0; i < this.checkedYazl.length; i++) {
                        if (this.checkedYazl[i] == "全部") {
                            this.checkedYazl.splice(i, 1);
                        }
                    }
                } else if (value.currentTarget.checked == true) {
                    if (this.checkedYazl.length == this.yazl_data.length - 1) {
                        this.checkedYazl.push('全部');
                    }
                }
            }
        },
        //对象种类全选
        handleCheckedDxzlChange(value) {
            if (value.currentTarget.defaultValue == "全部") {
                this.checkedDxzl = [];
                if (value.currentTarget.checked == true) {
                    for (var i = 0; i < this.dxzl_data.length; i++) {
                        this.checkedDxzl.push(this.dxzl_data[i].codeName);
                    }
                }
            } else {
                if (value.currentTarget.checked == false) {
                    for (var i = 0; i < this.checkedYazl.length; i++) {
                        if (this.checkedDxzl[i] == "全部") {
                            this.checkedDxzl.splice(i, 1);
                        }
                    }
                } else if (value.currentTarget.checked == true) {
                    if (this.checkedDxzl.length == this.dxzl_data.length - 1) {
                        this.checkedDxzl.push('全部');
                    }
                }
            }
        },
        //预案类型全选
        handleCheckedYalxChange(value) {
            if (value.currentTarget.defaultValue == "全部") {
                this.checkedYalx = [];
                if (value.currentTarget.checked == true) {
                    for (var i = 0; i < this.yalx_data.length; i++) {
                        this.checkedYalx.push(this.yalx_data[i].codeName);
                    }
                }
            } else {
                if (value.currentTarget.checked == false) {
                    for (var i = 0; i < this.checkedYazl.length; i++) {
                        if (this.checkedYalx[i] == "全部") {
                            this.checkedYalx.splice(i, 1);
                        }
                    }
                } else if (value.currentTarget.checked == true) {
                    if (this.checkedYalx.length == this.yalx_data.length - 1) {
                        this.checkedYalx.push('全部');
                    }
                }
            }
        },*/
        //预案详情
        planDetails: function (val) {
            var _self = this;
            _self.planDetailVisible = true;
            var shortURL = top.location.href.substr(0, top.location.href.indexOf("?")) + "?pkid=" + val.pkid;
            history.pushState(null, null, shortURL)
            //异步加载详情页
            $(function () {
                $.ajax({
                    url: '../../../templates/digitalplan/digitalplan_detail.html',
                    cache: true,
                    async: true,
                    success: function (html) {
                        $("#detailDialog").html(html);
                    }
                });
            })
        },
        clearClick: function () {
            this.yuAnSearchForm.YAMC = "";
            this.yuAnSearchForm.selected_YALX = [];
            this.yuAnSearchForm.DXMC = "";
            this.yuAnSearchForm.option_DXLX = [];
            this.yuAnSearchForm.option_YALB = [];
            this.yuAnSearchForm.begintime_create = "";
            this.yuAnSearchForm.endtime_create = "";
            this.$refs.tree.setCheckedKeys([]);
        },
        clearYADXClick:function(){

        },
        //单位建筑
        clearDWJZClick:function(){
            this.DWJZSearchForm.JZMC="";
            this.DWJZSearchForm.JZLX="";
        },
        //时间格式
        begindateChange_create(val) {
            console.log(val);
            this.yuAnSearchForm.begintime_create = val;
        },
        enddateChange_create(val) {
            console.log(val);
            this.yuAnSearchForm.endtime_create = val;
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