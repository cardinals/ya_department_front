//加载面包屑
window.onload = function () {
    loadBreadcrumb("消防药剂管理", "-1");
}
//axios默认设置cookie
axios.defaults.withCredentials = true;
new Vue({
    el: '#app',
    data: function () {
        return {
            visible: false,
            drugDetailVisible: false,
            //搜索表单
            searchForm: {
                ssdz: "",
                yjlx: [],
                cbl: [0, 1000],
                czl: [0, 1000],
            },
            tableData: [],
            tableData_detail: {},
            allYjlxDataTree: [],//药剂类型级联选择器数据
            allSsdzData: [],//所属队站下拉框数据
            //表高度变量
            tableheight: 450,
            //显示加载中样
            loading: false,
            loading_detail: false,
            labelPosition: 'right',
            //多选值
            multipleSelection: [],
            //当前页
            currentPage: 1,
            //分页大小
            pageSize: 10,
            //总记录数
            total: 10,
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
        //设置菜单选中
        $("#activeIndex").val(getQueryString("index"));
        this.getAllSszdData();//消防队站下拉框数据（到总队级）
        this.getAllYjlxDataTree(); //药剂类型级联选择器数据
        this.searchClick();
    },
    methods: {
        handleNodeClick(data) {
            // console.log(data);
        },
        //药剂类型级联选择器数据
        getAllYjlxDataTree: function () {
            axios.post('/api/codelist/getYjlxTree/YJLX').then(function (res) {
                this.allYjlxDataTree = res.data.result;
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
        //表格查询事件
        searchClick: function () {
            this.loading = true;
            var _self = this;
            var cbl_min = this.searchForm.cbl[0];
            var cbl_max = this.searchForm.cbl[1];
            if (this.searchForm.cbl[0] == '0' && this.searchForm.cbl[1] == '1000') {
                cbl_min = '';
                cbl_max = '';
            }

            var czl_min = this.searchForm.czl[0];
            var czl_max = this.searchForm.czl[1];
            if (this.searchForm.czl[0] == '0' && this.searchForm.czl[1] == '1000') {
                czl_min = '';
                czl_max = '';
            }
            var params = {
                ssdz: this.searchForm.ssdz,
                yjlx: this.searchForm.yjlx[this.searchForm.yjlx.length - 1],
                zcbl_min: cbl_min,
                zcbl_max: cbl_max,
                czl_min: czl_min,
                czl_max: czl_max
            };
            axios.post('/dpapi/firedrug/list', params).then(function (res) {
                this.tableData = res.data.result;
                this.total = res.data.result.length;
                this.loading = false;
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        drugDatail: function (val) {
            this.drugDetailVisible = true;
            this.loading_detail = true;
            this.tableData_detail = val;
            this.tableData_detail.scsj = this.dateFormat(this.tableData_detail.scsj);
            this.loading_detail = false;

        },
        closeDialog: function (val) {
            this.drugDetailVisible = false;
        },
        //清空
        clearClick: function () {
            this.searchForm.ssdz = "";
            this.searchForm.yjlx = [];
            this.searchForm.cbl = [0, 1000];
            this.searchForm.czl = [0, 1000]
        },

        //时间格式化
        dateFormat: function (val) {
            var date = new Date(val);
            if (date == undefined) {
                return val;
            }
            var month = '' + (date.getMonth() + 1),
                day = '' + date.getDate(),
                year = date.getFullYear();

            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;

            var newDate = [year, month, day].join('-');
            return newDate;
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
            // console.log("每页 " + val + " 条");
            this.pageSize = val;
            var _self = this;
            _self.loadingData(); //重新加载数据
        },
        //当前页修改事件
        currentPageChange: function (val) {
            this.currentPage = val;
            // console.log("当前页: " + val);
            var _self = this;
            _self.loadingData(); //重新加载数据
        },

    },

})