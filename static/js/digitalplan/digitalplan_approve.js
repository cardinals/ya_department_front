//axios默认设置cookie
axios.defaults.withCredentials = true;
new Vue({
    el: '#app',
    data: function () {
        return {
            //菜单编号
            activeIndex: '',
            //搜索表单
            searchForm: {
                YAMC: "",
                YALX: "",
                YAJB: "",
                ZZJG: "",
                SHZT: "",
                shsj:""
            },
            //审批表单
            approveForm: {
                shzt: -1
            },
            //审批人姓名
            shrmc:"",
            //审批人id
            shrid:"",
            //预案id
            uuid:"",

            tableData: [],
            YALX_dataTree: [],//预案类型级联选择
            YALX_data: [],//预案类型table转码
            ZZJG_dataTree: [],//制作机构级联选择
            ZZJG_data: [],//制作机构table转码
            YAJB_data: [],//预案级别下拉框
            SHZT_data: [],//审核状态下拉框
            jgidprops: {
                value: 'uuid',
                label: 'jgjc',
                children: 'children'
            },
            //资源列表是否显示
            planDetailVisible: false,
            approveFormVisible:false,
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
           
            
            //选中的值显示
            sels: [],
            //选中的序号
            selectIndex: -1,
            defaultProps: {
                value: 'codeValue',
                label: 'codeName',
                children: 'children'
            },
            radio:"",
            data_index:"",

        }
    },
    created: function () {
        this.YALX_tree();//预案类型级联选择
        this.ZZJG_tree();//制作机构级联选择
        this.YAJB();//预案级别下拉框
        this.SHZT();//审核状态下拉框
    },
    mounted:function(){
        //菜单选中
        var index = getQueryString("index");
        $("#activeIndex").val(index);
        this.activeIndex = index;
        this.searchClick();//条件查询
    },

    methods: {
        handleNodeClick(data) {
        },
        handleChange(value) {
        },
        
        //预案类型级联选择
        YALX_tree: function () {
            var params= {
                codetype : "YALX",
                list : [1,2,4,6,8]
            };
            axios.post('/api/codelist/getCodelisttree2',params).then(function(res){
                this.YALX_dataTree=res.data.result;
            }.bind(this),function(error){
                console.log(error);
            })
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
            axios.get('/api/codelist/getCodetype/YASHZT').then(function (res) {
                this.SHZT_data = res.data.result;
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        
        ZZJG_tree: function () {
            axios.post('/dpapi/organization/getOrganizationtree').then(function(res){
                this.ZZJG_dataTree = res.data.result;
            }.bind(this),function(error){
                console.log(error);
            })
        },
        //表格查询事件
        searchClick: function () {
            this.loading = true;//表格重新加载
            var params = {
                yamc: this.searchForm.YAMC,
                yalx: this.searchForm.YALX[this.searchForm.YALX.length - 1], 
                yajb: this.searchForm.YAJB,
                // jgbm:this.searchForm.ZZJG[this.searchForm.ZZJG.length - 1],
                shzt: this.searchForm.SHZT,
                begintime: this.searchForm.shsj[0],
                endtime: this.searchForm.shsj[1],
            }
            axios.post('/dpapi/digitalplanlist/list', params).then(function (res) {
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
            this.searchForm.YALX = [];
            this.searchForm.YAJB = "";
            this.searchForm.ZZJG = [];
            this.searchForm.SHZT = "";
            this.searchForm.shsj.splice(0,this.searchForm.shsj.length);
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
        //预案详情
        planDetails(val) {
            window.location.href = "digitalplan_detail.html?ID=" + val.uuid + "&index=" + this.activeIndex;
            //     window.location.href = this.$http.options.root + "/dpapi" + "/keyunit/detail/" + val.pkid;
        },
        /** 
        planDetails: function (val) {
            var _self = this;
            _self.planDetailVisible = true;
            var shortURL = top.location.href.substr(0, top.location.href.indexOf("?")) + "?pkid=" + val.uuid;
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
        */
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
            //单选框清空
            this.radio = "";
            //数据序号清空
            this.data_index = "";
            this.currentPage = val;
            var _self = this;
            _self.loadingData(); //重新加载数据
        },
        closeDialog: function (val) {
            this.planDetailVisible = false;
            val.shzt = '';
            this.approveFormVisible = false;
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
        },

        //add by yushch 
        timeChange(val) {
            this.searchForm.shsj.splice(0,this.searchForm.shsj.length);
            this.searchForm.shsj.push(val.substring(0,val.indexOf("至")));
            this.searchForm.shsj.push(val.substring(val.indexOf("至")+1));
        },
        //获取选中的行号（从0开始）
        showRow(row){
            this.data_index = this.tableData.indexOf(row);
            //赋值给radio
            this.radio = this.data_index - (this.currentPage - 1)*this.pageSize;
            //console.info(this.radio);
        },
        //审批所选
        approve: function () {
            if (this.radio.length < 1) {
                this.$message({
                    message: "请至少选中一条记录",
                    type: "error"
                });
                return;
            }
            //获取预案uuid
            var row = this.tableData[this.data_index];
            this.uuid = row.uuid;
            //获取当前登录用户realname和userid
            axios.get('/api/shiro').then(function (res) {
                this.shrmc = res.data.realName;
                this.shrid = res.data.userid;
            }.bind(this), function (error) {
                console.log(error)
            });
            this.approveForm = Object.assign({},row);
            this.approveFormVisible = true;
        },
        //保存点击事件
        approveSubmit: function (val) {
            //审核状态改变才调用后台approveByVO方法
        if(val.shzt !=this.tableData[this.data_index].shzt){
            var params = {
                shzt: val.shzt,
                shrid:this.shrid,
                shrmc:this.shrmc,
                uuid:this.uuid
            };
            //console.log(params);
            axios.post('/dpapi/digitalplanlist/approveByVO', params).then(function (res) {
                //this.searchClick();
                this.tableData[this.data_index].shztmc = res.data.result.shztmc;
                this.tableData[this.data_index].shzt = res.data.result.shzt;
            }.bind(this), function (error) {
                console.log(error)
                })
            this.approveFormVisible = false;
            this.loadingData();
        }else{
            this.$alert('当前审核状态未改变');
        }
        },
    },

})