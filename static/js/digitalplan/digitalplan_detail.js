//加载面包屑
window.onload = function () {
    var type = getQueryString("type");
    if (type == "GJSS") {
        loadBreadcrumb("高级搜索", "预案详情");
    } else if (type == "YASH") {
        loadBreadcrumb("预案审核", "预案详情");
    } else if (type == "YAFF") {
        loadBreadcrumb("预案分发", "预案详情");
    } else {
        loadBreadcrumb("重点单位预案", "重点单位预案详情");
    }
}
new Vue({
    el: "#app",
    data: function () {
        return {
            activeName: "first",

            pkid: "",//页面获取的预案id
            shareVisible: false,
            basicDetailData: {},//基础信息Data
            disasterSetData: {},//灾情设定Data
            unitDetailData: {},//重点单位Data
            loading: false,
            fileList: [],
            fjDetailData: '',
            //word模板选择
            downVisible: false,
            fmChecked: true,
            dwjbqkChecked: true,
            dwjzxxChecked: true,
            zdbwChecked: true,
            zqsdChecked: true,
            tpChecked: true

            , SelectDownVisible: false
        }
    },
    created: function () {
        //设置菜单选中
        $("#activeIndex").val(getQueryString("index"));
        this.loading = true;
        this.pkid = getQueryString("ID");
        this.planDetails(this.pkid);
        this.disasterSet(this.pkid);
        this.fjDetail(this.pkid);
    },

    methods: {
        //标签页
        handleClick: function (e) {
            console.log(e);
        },
        //根据参数部分和参数名来获取参数值 
        GetQueryString: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        },
        //预案详情基本信息
        planDetails: function (val) {
            this.loading = true;
            axios.get('/dpapi/digitalplanlist/' + val).then(function (res) {
                this.basicDetailData = res.data.result;
                //制作时间格式化
                if (this.basicDetailData.zzsj == null || this.basicDetailData.zzsj == "") {
                    this.basicDetailData.zzsj = '';
                } else {
                    this.basicDetailData.zzsj = this.dateFormat(this.basicDetailData.zzsj);
                }
                //审核时间格式化
                if (this.basicDetailData.shsj == null || this.basicDetailData.shsj == "") {
                    this.basicDetailData.shsj = '';
                } else {
                    this.basicDetailData.shsj = this.dateFormat(this.basicDetailData.shsj);
                }
                doFindPhoto("YAJB", this.basicDetailData.yajb);
                this.unitDetail(this.basicDetailData.dxid);
                this.loading = false;
            }.bind(this), function (error) {
                console.log(error)
            })
        },
        //灾情设定信息
        disasterSet: function (val) {
            axios.get('/dpapi/disasterset/doFindByPlanId/' + val).then(function (res) {
                this.disasterSetData = res.data.result;
            }.bind(this), function (error) {
                console.log(error)
            })
        },
        //重点单位信息
        unitDetail: function (val) {
            axios.get('/dpapi/importantunits/' + val).then(function (res) {
                this.unitDetailData = res.data.result;
            }.bind(this), function (error) {
                console.log(error)
            })
        },
        //附件查询
        fjDetail: function (val) {
            axios.get('/dpapi/yafjxz/doFindByPlanId/' + val).then(function (res) {
                this.fjDetailData = res.data.result.length;
                // if (res.data.result.length > 0) {

                // this.fileList = [{
                //     name: res.data.result[0].wjm,
                //     url: "http://localhost:8090/upload/" + res.data.result[0].xzlj
                // }]
                // }

            }.bind(this), function (error) {
                console.log(error)
            })
        },
        //日期格式化
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
        //选择信息分享模板界面
        openShareVisible: function () {
            this.shareVisible = true;
        },
        openDownVisible: function () {
            this.downVisible = true;
        },
        openSelectDownVisible: function () {
            this.SelectDownVisible = true;
        },
        closeShareDialog: function () {
            this.shareVisible = false;
        },
        closeDownDialog: function () {
            this.downVisible = false;
        },
        //信息分享
        openDown: function (val) {
            if (val == 'detail') {
                this.openDownVisible();
            }
            if (val == 'summary') {
                if (this.pkid == 'dlwddzd') {
                    window.open("http://localhost/dpapi/yafjxz/downTempYa?yawjmc=大连万达_简版.docx");
                }
                if (this.pkid == 'dljy') {
                    window.open("http://localhost/dpapi/yafjxz/downTempYa?yawjmc=大连锦源_简版.docx");
                }
            }
        },
        closeSelectDownDialog: function () {
            this.SelectDownVisible = false;
        },
        //信息分享
        openShare: function (val) {
            window.open("http://localhost:8005/planShare/page/" + this.pkid + "/" + val + "/web");
        },
        downShare: function () {

            var title = 'fm-';
            //单位基本情况
            if (this.dwjbqkChecked) {
                title += 'dwjbqk' + '-'
            }//单位建筑信息和消防设施
            if (this.dwjzxxChecked) {
                title += 'dwjzxx' + '-'
            }//重点部位
            if (this.zdbwChecked) {
                title += 'zdbw' + '-'
            }//灾情设定
            if (this.zqsdChecked) {
                title += 'zqsd' + '-'
            }//附件
            if (this.tpChecked) {
                title += 'tp'
            }
            window.open("http://localhost:8005/planShare/downWord/" + this.pkid + "/" + title);
        },
        //预案预览
        openPlan: function () {
            if (this.fjDetailData > 0) {
                axios.get('/dpapi/yafjxz/doFindByPlanId/' + this.pkid).then(function (res) {
                    var yllj = res.data.result[0].yllj;
                    if (yllj == null || yllj == '') {
                        this.$message({
                            message: "无可预览文件",
                            showClose: true
                        });
                    } else {
                        window.open("http://localhost:8090/upload/" + yllj);
                    }
                }.bind(this), function (error) {
                    console.log(error)
                })
            } else {
                this.$message({
                    message: "该预案无附件",
                    showClose: true
                });
            }
        },
        //预案下载
        downloadPlan: function () {
            if (this.fjDetailData > 0) {
                axios.get('/dpapi/yafjxz/doFindByPlanId/' + this.pkid).then(function (res) {
                    var xzlj = res.data.result[0].xzlj;
                    window.open("http://localhost:8090/upload/" + xzlj);
                }.bind(this), function (error) {
                    console.log(error)
                })
            } else {
                if (this.pkid == 'dlwddzd' || this.pkid == 'dljy') {
                    this.openSelectDownVisible();
                } else {
                    this.openDownVisible();
                }
            }
        }

    }
})
