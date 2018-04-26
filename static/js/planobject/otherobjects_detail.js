new Vue({
    el: "#app",
    data: function () {
        return {
            activeName: "first",
            //页面获取的uuid
            uuid:"",
            //详情Data
            rowdata: {},
            //显示加载中样
            loading: false,
            labelPosition: 'right',
            //发送至邮箱是否显示
            emailDialogVisible: false,
            email: "",
            //信息分享是否显示
            shareDialogVisible: false,
            //信息打印是否显示
            printDialogVisible: false
        }
    },
    mounted: function () {
        this.loading = true;
        var url = location.href;
        if (url.indexOf("?") != -1) {
            var tmp1 = url.split("?")[1];
            this.ID = decodeURI(tmp1.split("=")[1]);
            this.uuid = this.ID;
            axios.get('/dpapi/otherobjects/' + this.uuid).then(function (res) {
                this.rowdata = res.data.result;
                this.loading = false;
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

        }
    }
})
