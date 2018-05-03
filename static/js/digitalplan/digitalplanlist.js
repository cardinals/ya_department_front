//axios默认设置cookie
axios.defaults.withCredentials = true;
new Vue({
    el: '#app',
    data: function () {
        return {
            /**lxy start */
            // fileList: [
            //     { name: '物美生活广场及地铁华苑站三维灭火预案.html', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100?isUpdated=true' },
            //     { name: '物美生活广场及地铁华苑站三维灭火预案.unity3d', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100?isUpdated=true' },
            //     { name: 'jquery.min.js', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100?isUpdated=true' },
            //     { name: 'UnityObject2.js', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100?isUpdated=true' }
            // ],

            // upLoadData: {
            //     id: 1
            // },
            /**lxy end */
            //搜索表单
            searchForm: {
                YAMC: "",
                DXMC: "",
                YALX: "",
                YAJB: "",
                ZZJG: "",
                SHZT: ""
            },
            tableData: [],
            YALX_dataTree: [],//预案类型级联选择
            YALX_data: [],//预案类型table转码
            ZZJG_dataTree: [],//制作机构级联选择
            ZZJG_data: [],//制作机构table转码
            YAJB_data: [],//预案级别下拉框
            SHZT_data: [],//审核状态下拉框

            //资源列表是否显示
            planDetailVisible: false,
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
            total: 0,
            //预案详情页
            detailData: [],
            //详情页日期
            detailYMD: "",
            //序号
            indexData: 0,
            //删除的弹出框
            deleteVisible: false,
            //新建页面是否显示
            addFormVisible: false,
            addLoading: false,
            addFormRules: {
            },
            //新建数据
            addForm: {
                YAMC: "",
                DWDJ: "",
                DXMC: "",
                YALX: "",
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
            },
            //编辑界面数据
            planDetail: {
                YAMC: "",
                DWDJ: "",
                DXMC: "",
                YALX: "",
                DWDZ: "",
                ZDMJ: "",
                XFGXJGID: ""
            },
            defaultProps: {
                value: 'codeValue',
                label: 'codeName',
                children: 'children'
            }

        }
    },
    created: function () {
        this.YALX_tree();//预案类型级联选择
        this.ZZJG_tree();//制作机构级联选择
        this.YAJB();//预案级别下拉框
        this.SHZT();//审核状态下拉框
        // this.YALX();//预案类型table转码
        // this.ZZJG();//制作机构table转码
    },
    mounted: function () {
        this.searchClick();//条件查询
    },

    methods: {
        handleNodeClick(data) {
        },
        handleChange(value) {
        },
        //预案类型级联选择
        YALX_tree: function () {
            // axios.get('/api/codelist/getCarTypes/YALX').then(function (res) {
            //     this.YALX_dataTree = res.data.result;
            // }.bind(this), function (error) {
            //     console.log(error);
            // })
            var params = {
                codetype: "YALX",
                list: [1, 2, 4, 6, 8]
            };
            axios.post('/api/codelist/getCodelisttree2', params).then(function (res) {
                this.YALX_dataTree = res.data.result;
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        //制作机构级联选择(暂无表)
        ZZJG_tree: function () {
            // axios.get('/api/codelist/getCarTypes/YALX').then(function (res) {
            //     this.YALX_dataTree = res.data.result;
            // }.bind(this), function (error) {
            //     console.log(error);
            // })
        },
        //预案级别下拉框
        YAJB: function () {
            axios.get('/api/codelist/getCodetype/YAJB').then(function (res) {
                this.YAJB_data = res.data.result;
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        //审核状态下拉框
        SHZT: function () {
            axios.get('/api/codelist/getCodetype/SHZT').then(function (res) {
                this.SHZT_data = res.data.result;
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        //表格查询事件
        searchClick: function () {
            this.loading = true;//表格重新加载
            var params = {
                yamc: this.searchForm.YAMC,
                dxmc: this.searchForm.DXMC,
                yalxdm: this.searchForm.YALX[this.searchForm.YALX.length - 1],
                yajb: this.searchForm.YAJB,
                // jgbm:this.searchForm.ZZJG[this.searchForm.ZZJG.length - 1],
                shzt: this.searchForm.SHZT
            }
            axios.post('/dpapi/digitalplanlist/findByVO', params).then(function (res) {
                this.tableData = res.data.result;
                this.total = this.tableData.length;
                this.loading = false;
            }.bind(this), function (error) {
                console.log(error)
            })
        },
        //清空查询条件
        clearClick: function () {
            this.searchForm.YAMC = "";
            this.searchForm.DXMC = "";
            this.searchForm.YALX = "";
            this.searchForm.YAJB = "";
            this.searchForm.ZZJG = "";
            this.searchForm.SHZT = "";
        },
        //表格勾选事件
        selectionChange: function (val) {
            this.multipleSelection = val;
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
        //预案详情跳转
        planDetails(val) {
            window.location.href = "digitalplan_detail.html?ID=" + val.uuid;
            //     window.location.href = this.$http.options.root + "/dpapi" + "/keyunit/detail/" + val.pkid;
        },
        addClick() {
            window.location.href = "digitalplan_add.html?ID=" + 0;
        },
        handleEdit(row) {
            if(row.yazt=='01'){
                window.location.href = "digitalplan_add.html?ID=" + row.uuid;
            }else{
                alert("仅编辑中和已驳回状态预案可编辑！");
            }
            
        },

        //预案预览
        openPlan: function () {
            window.open("http://10.119.119.232/upload/123456/2018-03-21/70932ac7-da58-4419-91b6-ebe0b3f53838/%E7%89%A9%E7%BE%8E%E7%94%9F%E6%B4%BB%E5%B9%BF%E5%9C%BA%E5%8F%8A%E5%9C%B0%E9%93%81%E5%8D%8E%E8%8B%91%E7%AB%99%E4%B8%89%E7%BB%B4%E7%81%AD%E7%81%AB%E9%A2%84%E6%A1%88.html");
        },
        //预案下载
        downloadPlan: function () {
            window.open("http://10.119.119.232/upload/123456/2018-03-21/70932ac7-da58-4419-91b6-ebe0b3f53838/web%E7%89%88%E4%B8%89%E7%BB%B4%E9%A2%84%E6%A1%88.ZIP");
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
            this.pageSize = val;
            var _self = this;
            _self.loadingData(); //重新加载数据
        },
        //当前页修改事件
        currentPageChange: function (val) {
            this.currentPage = val;
            var _self = this;
            _self.loadingData(); //重新加载数据
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
        },
        handlePreview(file) {
        }

    },

})