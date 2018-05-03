//axios默认设置cookie
axios.defaults.withCredentials = true;
new Vue({
    el: '#app',
    data: function () {
        return {
            activeName: "first",
            uuid: "",
            //表数据
            tableData: [],//基本数据
            jzl_zdbwData: [],//建筑类重点部位数据
            zzl_zdbwData: [],//装置类重点部位数据
            cgl_zdbwData: [],//储罐类重点部位数据
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

        }
    },
    mounted: function () {
        this.getDetails();
        //根据重点单位id获取建筑类重点部位详情集合
        this.getJzlListByZddwId(this.uuid);
        //根据重点单位id获取装置类重点部位详情集合
        this.getZzlListByZddwId(this.uuid);
        //根据重点单位id获取储罐类重点部位详情集合
        this.getCglListByZddwId(this.uuid);
    },
    methods: {
        handleNodeClick(data) {
            console.log(data);
        },
        //标签页
        handleClick: function (e) {
            console.log(e);
        },
        //获取重点单位详情
        getDetails: function () {
            this.loading = true;
            var url = location.href;
            if (url.indexOf("?") != -1) {
                var tmp1 = url.split("?")[1];
                var ID = decodeURI(tmp1.split("=")[1]);
                this.uuid = ID;
                axios.get('/dpapi/importantunits/' + this.uuid).then(function (res) {
                    this.tableData = res.data.result;
                    this.loading = false;
                }.bind(this), function (error) {
                    console.log(error)
                })
            }
        },
        //根据重点单位id获取建筑类重点部位详情
        getJzlListByZddwId: function (uuid) {
            axios.get('/dpapi/importantparts/doFindJzlListByZddwId/' + uuid).then(function (res) {
                this.jzl_zdbwData = res.data.result;
            }.bind(this), function (error) {
                console.log(error)
            })
        },
        //根据重点单位id获取装置类重点部位详情
        getZzlListByZddwId: function (uuid) {
            axios.get('/dpapi/importantparts/doFindZzlListByZddwId/' + uuid).then(function (res) {
                this.zzl_zdbwData = res.data.result;
            }.bind(this), function (error) {
                console.log(error)
            })
        },
        //根据重点单位id获取装置类重点部位详情
        getCglListByZddwId: function (uuid) {
            axios.get('/dpapi/importantparts/doFindCglListByZddwId/' + uuid).then(function (res) {
                this.cgl_zdbwData = res.data.result;
            }.bind(this), function (error) {
                console.log(error)
            })
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
            // 1.设置要打印的区域 div的className
            var newstr = document.getElementsByClassName('main-box')[0].innerHTML;
            // 2. 复制给body，并执行window.print打印功能
            document.body.innerHTML = newstr
            window.print()
            // 重新加载页面，以刷新数据
            window.location.reload();

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