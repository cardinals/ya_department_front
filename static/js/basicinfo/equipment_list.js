//加载面包屑
window.onload = function () {
    loadBreadcrumb("装备器材管理", "-1");
}
//axios默认设置cookie
axios.defaults.withCredentials = true;
new Vue({
    el: '#app',
    data: function () {
        return {
            visible: false,
            engineListVisible: false,
            //搜索表单
            searchForm: {
                zbmc: "",
                ssdz: "",
                zbbm: "",
                zblx: [],
                // kysl: [0, 1000]
            },
            tableData: [],
            allTypesDataTree: [],//装备类型级联选择数据
            allSsdzData: [],//消防队站下拉框数据（到总队级）
            rowdata: '',
            //表高度变量
            tableheight: 450,
            //显示加载中样
            loading: false,
            labelPosition: 'right',
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
            //树结构配置
            defaultProps: {
                children: 'children',
                label: 'codeName',
                value: 'codeValue'
            },
            //装备车辆弹出页-----------------------------------------------------------
            tableData_engine:[],
            tableheight_engine: 250,
            loading_engine: false,
            currentPage_engine: 1,
            pageSize_engine: 10,
            total_engine: 10,
        }
    },
    created: function () {
        //设置菜单选中
        $("#activeIndex").val(getQueryString("index"));
        this.getAllSszdData();//消防队站下拉框数据（到总队级）
        this.getAllTypesDataTree();//装备类型级联选择数据
        this.searchClick();
    },
    methods: {
        handleNodeClick(data) {
            console.log(data);
        },
        //表格查询事件
        searchClick: function () {
            this.loading = true;
            var _self = this;
            var reg = /0*$/;
            var zblx = '';
            if (this.searchForm.zblx.length > 0) {
                zblx = this.searchForm.zblx[this.searchForm.zblx.length - 1].replace(reg, ''); //替换匹配字符串
            }
            // var kysl_min = this.searchForm.kysl[0];
            // var kysl_max = this.searchForm.kysl[1];
            // if (this.searchForm.kysl[0] == 0 && this.searchForm.kysl[1] == 1000) {
            //     kysl_min = "";
            //     kysl_max = "";
            // }
            var params = {
                zbmc: this.searchForm.zbmc,
                zbbm: this.searchForm.zbbm,
                ssdz: this.searchForm.ssdz,
                zblx: zblx,
                // kysl_min: kysl_min,
                // kysl_max: kysl_max
            };
            axios.post('/dpapi/equipmentsource/list', params).then(function (res) {
                this.tableData = res.data.result;
                this.total = res.data.result.length;
                this.loading = false;
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        //清空查询条件
        clearClick: function () {
            this.searchForm.zbmc = "";
            this.searchForm.zbbm = "";
            this.searchForm.ssdz = "";
            this.searchForm.zblx = [];
            // this.searchForm.kysl = [0,1000];
        },
        //装备类型级联选择数据
        getAllTypesDataTree: function () {
            var params = {
                codetype: "ZBQCLX",
                list: [1, 2, 4, 6, 8]
            };
            axios.post('/api/codelist/getCodelisttree2', params).then(function (res) {
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
        detailClick: function (val) {
            window.location.href = "equipment_detail.html?ID=" + val.id;
        },
        engineDatail: function (val) {
            this.engineListVisible = true;
            this.loading_engine = true;
            var params = {
                zbid: val.uuid
            };
            axios.post('/dpapi/equipengine/list', params).then(function (res) {
                this.tableData_engine = res.data.result;
                this.total_engine = res.data.result.length;
                this.loading_engine = false;
            }.bind(this), function (error) {
                console.log(error);
            })
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
        //表格重新加载数据
        loadingData_engine: function () {
            var _self = this;
            _self.loading_engine = true;
            setTimeout(function () {
                console.info("加载数据成功");
                _self.loading_engine = false;
            }, 300);
        },
        //当前页修改事件(装备车辆)
        currentPageChange_engine: function (val) {
            this.currentPage_engine = val;
            console.log("当前页: " + val);
            var _self = this;
            _self.loadingData_engine(); //重新加载数据
        },
        closeDialog: function () {
            this.engineListVisible = fasle;
        }

    },

})