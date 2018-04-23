//axios默认设置cookie
axios.defaults.withCredentials = true;
new Vue({
    el: '#app',
    data: function () {
        return {
            visible: false,
            //搜索表单
            searchForm: {
                zbmc: "",
                ssdz: "",
                zblx: "",
                kcsl: ""
            },
            tableData: [],
            allTypesData: [],//装备类型table转码数据
            allTypesDataTree: [],//装备类型级联选择数据
            allSsdzData: [],//消防队站下拉框数据（到总队级）
            allXzqhData: [],//行政区划table转码数据
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
    created: function () {
        this.getAllSszdData();//消防队站下拉框数据（到总队级）
        this.getAllTypesDataTree();//装备类型级联选择数据
        this.getAllTypesData();//装备类型table转码数据
        this.getAllXzqhData();//行政区划table转码数据
        // this.searchClick();
    },
    methods: {
        handleNodeClick(data) {
            console.log(data);
        },
        //表格查询事件
        searchClick: function () {
            // this.loading = true;
            var _self = this;
            var params = {
                zbmc: this.searchForm.zbmc,
                ssdz: this.searchForm.ssdz,
                xssd: this.searchForm.zblx[this.searchForm.zblx.length - 1],
                kcsl_min: this.searchForm.kcsl[0],
                kcsl_max: this.searchForm.kcsl[1]
            };
            axios.post('/dpapi/equipmentsource/findByVO', params).then(function (res) {
                this.tableData = res.data.result;
                //行政区划转码
                for (var i = 0; i < this.tableData.length; i++) {
                    for (var k = 0; k < this.allXzqhData.length; k++) {
                        if (this.allXzqhData[k].codeValue == this.tableData[i].xzqy) {
                            this.tableData[i].xzqy = this.allXzqhData[k].codeName;
                        }
                    }
                }
                this.total = res.data.result.length;
                this.loading = false;
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        //清空查询条件
        clearClick: function () {
            this.searchForm.zbmc = "";
            this.searchForm.ssdz = "";
            this.searchForm.zblx = [];
            this.searchForm.kcsl = [];
        },
        //行政区划数据
        getAllXzqhData: function () {
            axios.get('/api/codelist/getCodetype/XZQH').then(function (res) {
                this.allXzqhData = res.data.result;
                this.searchClick();
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        //装备类型转码数据
        getAllTypesData: function () {
            axios.get('/api/codelist/getCodetype/ZBQCLB').then(function (res) {
                this.allTypesData = res.data.result;
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        //装备类型级联选择数据
        getAllTypesDataTree: function () {
            axios.get('/api/codelist/getCarTypes/ZBQCLB').then(function (res) {
                this.allTypesDataTree = res.data.result;
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        //所属队站下拉框数据
        getAllSszdData: function () {
            axios.get('/dpapi/util/doSearchContingents').then(function (res) {
                this.allSsdzData = res.data.result;

            }.bind(this), function (error) {
                console.log(error);
            })
        },
        //表格数据格式化
        dataFormat: function (row, column) {
            var rowDate = row[column.property];
            if (rowDate == null || rowDate == "") {
                return '无';
            } else {
                return rowDate;
            }
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
        //跳转至详情页
        detailClick(val) {
            window.location.href = "equipment_detail.html?ID=" + val.id;
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

    },

})