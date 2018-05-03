//axios默认设置cookie
axios.defaults.withCredentials = true;
new Vue({
    el: '#app',
    data: function () {
        return {
            visible: false,
            //搜索表单
            searchForm: {
                dwmc: "",
                dwlb: "",
                jzfl: "",
                fhdj: "",
                mhdzid: "",
                xfdwlx: ""
            },
            tableData: [],

            dwlbData: [],
            jzflData: [],
            fhdjData: [],
            xfdwlxData: [{
                codeValue: '全部',
                codeName: '全部'
            }, {
                codeValue: '1',
                codeName: '有'
            }, {
                codeValue: '0',
                codeName: '无'
            }],
            mhdzidData: [],

            XFGX_data: [],
            selected_XFGX: [],

            XZQY_data: [],
            selected_XZQY: [],

            rowdata: '',
            //表高度变量
            tableheight: 443,
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
            total: 0,
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
            //树结构配置
            defaultProps: {
                children: 'children',
                label: 'codeName',
                value: 'codeValue'
            },

        }
    },
    created: function () {
        this.getfhdjData();
        this.getjzflData();
        this.searchClick();
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
            this.loading = true;
            var params = {
                dwmc: this.searchForm.dwmc,
                dwlb: this.searchForm.dwlb,
                jzfl: this.searchForm.jzfl,
                fhdj: this.searchForm.fhdj,
                mhdzid: this.searchForm.mhdzid,
                xfdwlx: this.searchForm.xfdwlx
            };
            axios.post('/dpapi/importantunits/list', params).then(function(res){
                this.tableData = res.data.result;
                this.total = res.data.result.length;
                this.loading = false;
            }.bind(this),function(error){
                console.log(error);
            })
        },
        clearClick: function () {
            this.searchForm.dwmc="";
            this.searchForm.dwlb="";
            this.searchForm.jzfl="";
            this.searchForm.fhdj="";
            this.searchForm.mhdzid="";
            this.searchForm.xfdwlx="";
        },
        getfhdjData: function () {
            axios.get('/api/codelist/getCodetype/FHDJ').then(function (res) {
                this.fhdjData = res.data.result;
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        getjzflData: function () {
            axios.get('/api/codelist/getCodetype/JZFL').then(function (res) {
                this.jzflData = res.data.result;
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
        //点击进入详情页
        informClick(val) {
            window.location.href = "importantunits_detail.html?ID=" + val.uuid;
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
        }
    }
})