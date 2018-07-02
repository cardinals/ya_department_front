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
        //设置菜单选中
        $("#activeIndex").val(getQueryString("index"));

        /**面包屑 by li.xue 20180628*/
        var type = getQueryString("type");
        if(type == "GJSS"){
            loadBreadcrumb("高级搜索", "其他对象详情");
        }else if(type == "DT"){
            loadBreadcrumb("地图", "其他对象详情");
        }else{
            loadBreadcrumb("其他对象", "其他对象详情");
        }

        this.loading = true;
        this.uuid = getQueryString("id");
        //显示图片
        doFindPhoto("YADX","03");
        //数据显示
        axios.get('/dpapi/otherobjects/doFindById/' + this.uuid).then(function (res) {
            this.rowdata = res.data.result;
            this.loading = false;
        }.bind(this), function (error) {
            console.log(error)
        });
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
