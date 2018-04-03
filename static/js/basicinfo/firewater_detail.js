//axios默认设置cookie
axios.defaults.withCredentials = true;
new Vue({
    el: '#app',
    data: function () {
        return {
            activeName: "first",      
            urls: ['inform.html', 'inform2.html'],
            //表高度变量
            tableheight: 474,
            //显示加载中样
            loading: false,
            labelPosition: 'right',
            //多选值
            multipleSelection: [],
           /*
            //当前页
            currentPage: 1,
            //分页大小
            pageSize: 10,
            //总记录数
            total: 0,
            */

            //基本数据保存
            rowdata: { },
            //消火栓数据保存
            XHSdata: { },
            //消防水车数据保存
            XFSCdata: { },
            //消防水鹤数据保存
            XFSHdata:{ },
            //消防取水码头
            XFQSMTdata:{},
            //天然水源
            TRSYdata:{},
            //数据水源类型
            SYLX:{},
            //水源属性信息ID
            sysxxxid:[],
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
        this.loading=true;
        var url = location.search;
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            var ID = str.substring(3);
            var params = {
                id : ID,
            }
         
            axios.post('/dpapi/shuiyuan/findById', params).then(function (res) {
                this.rowdata = res.data.result;
                this.SYLX = res.data.result.sylx;
                this.sysxxxid = res.data.result.sysxxxid;
                this.loadingJCXX(this.SYLX,this.sysxxxid);
                this.loading=false;
            }.bind(this), function (error) {
                console.log(error)
            })
  
        }
    },
    methods: {
        handleNodeClick(data) {
            console.log(data);
        },
        //标签页
        handleClick: function (e) {
            console.log(e);
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
        //分类加载基础信息tab
        loadingJCXX: function(SYLX,id){          
            switch (SYLX) {
                case '1100':
                    var div=document.getElementById("XHS");
                    div.style.display = "";
                    var params = {
                        id : id
                    }
                    axios.get('/dpapi/xhs/'+ id).then(function (res) {
                        this.XHSdata = res.data.result;
                    }.bind(this), function (error) {
                        console.log(error)
                    })
                    break;
                case '1300':
                    var div=document.getElementById("XFSC");
                    div.style.display = "";
                    var params = {
                        id : id
                    }
                    axios.get('/dpapi/xfsc/'+ id).then(function (res) {
                        this.XFSCdata = res.data.result;
                    }.bind(this), function (error) {
                        console.log(error)
                    })
                    break;
                case '1200':
                    var div=document.getElementById("XFSH");
                    div.style.display = "";
                    var params = {
                        id : id
                    }
                    axios.get('/dpapi/xfsh/'+ id).then(function (res) {
                        this.XFSHdata = res.data.result;
                    }.bind(this), function (error) {
                        console.log(error)
                    })
                    break;
                case '2100':
                    var div=document.getElementById("XFQSMT");
                    div.style.display = "";
                    var params = {
                        id : id
                    }
                    axios.get('/dpapi/xfmt/'+ id).then(function (res) {
                        this.XFQSMTdata = res.data.result;
                    }.bind(this), function (error) {
                        console.log(error)
                    })
                    break;
                case '2000':
                    var div=document.getElementById("TRSY");
                    div.style.display = "";
                    var params = {
                        id : id
                    }
                    axios.post('/dpapi/trsy/'+ id).then(function (res) {
                        this.TRSYdata = res.data.result;
                    }.bind(this), function (error) {
                        console.log(error)
                    })
                    break;
            }
        },
    },

})