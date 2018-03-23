//axios默认设置cookie
axios.defaults.withCredentials = true;
new Vue({
    el: '#app',
    data: function () {
        return {
            activeName: "first",
            pkid: "",
            //表数据
            tableData: [],//基本数据
            yuData: [],//预案数据
            
            //表高度变量
            tableheight: 474,
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
            //基本数据保存
            rowdata: {},
            //预案数据保存
            yudata: {},
            //序号
            indexData: 0,
            //发送至邮箱是否显示
            emailDialogVisible: false,
            email: "",
            //信息分享是否显示
            shareDialogVisible: false,
            //信息打印是否显示
            printDialogVisible: false,
            //删除的弹出框
            deleteVisible: false,
            //新建页面是否显示
            addFormVisible: false,
            addLoading: false,
            addFormRules: {

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

        }
    },
    
    mounted: function () {
        var url = location.search;
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            // alert(str);  
            var ID = str.substring(3);
            this.pkid = ID;
            // alert(ID);
            axios.get('/dpapi/keyunit/doFindDetailById/'+ this.pkid).then(function (res) {
                this.tableData = res.data.result[0];
                this.rowdata = this.tableData;
                // this.yuData = res.data.result.YAJBXX;
                // for (var i = 0; i < this.tableData.length; i++) {
                //     if (this.tableData[i].ID == ID) {
                //         this.rowdata = this.tableData[i];
                //     }
                // }
                // for (var k = 0; k < this.yuData.length; k++) {
                //     if (this.yuData[k].ID == ID) {
                //         this.yudata = this.yuData[k];
                //     }
                //     console.log(this.yudata);
                // }
            }.bind(this), function (error) {
                console.log(error)
            })
        }
    },

    // created: function () {
    //     debugger
    //     this.pkid = pkid;
    //     axios.get('/dpapi/keyunit/doFindDetaiById' + this.pkid).then(function(res){
    //         this.tableData = res.data.result;
    //         this.total = res.data.result.length;
    //         this.rowdata = this.tableData;
    //     }.bind(this),function(error){
    //         console.log(error)
    //     })
    // },
    methods: {
        handleNodeClick(data) {
            console.log(data);
        },
        //标签页
        handleClick: function (e) {
            console.log(e);
        },
        //二维预案下载
        DownLoadTwoFile: function () {
            var fileUrl = "../example/二维预案.xlsx";
            document.getElementById("ew").href = fileUrl;
            $("#we").click();//在执行a标签里面span的click
        },
        //三维预案下载
        DownLoadThreeFile: function () {
            var fileUrl = "../example/三维预案.xlsx";
            document.getElementById("sw").href = fileUrl;
            $("#ws").click();//在执行a标签里面span的click
        },
        //文档预案下载
        DownLoadFile: function () {
            var fileUrl = "../example/文档预案.xlsx";
            document.getElementById("pf").href = fileUrl;
            $("#fp").click();//在执行a标签里面span的click
        },
        begindateChange(val) {
            console.log(val);
            this.searchForm.begintime = val;
        },
        enddateChange(val) {
            console.log(val);
            this.searchForm.endtime = val;
        },
        //发送至邮箱
        openEmail: function () {
            this.emailDialogVisible = true;
        },
        closeEmailDialog: function () {
            this.emailDialogVisible = false;
            this.email = "";
        },
        //信息分享
        openShare: function () {
            this.shareDialogVisible = true;
        },
        closeShareDialog: function () {
            this.shareDialogVisible = false;
        },
        //信息打印
        openPrinter: function () {
            window.print();
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
    },

})