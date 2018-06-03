new Vue({
    el: "#app",
    data: function () {
        return {
            activeName: "first",

            pkid: "",//页面获取的预案id

            basicDetailData: {},//基础信息Data
            disasterSetData: {},//灾情设定Data
            unitDetailData: {},//重点单位Data
            loading: false,
            fileList: [],
            fjDetailData: ''
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
        GetQueryString(name) {
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
        //信息打印
        openPrinter: function () {
            window.open("http://localhost:8005/planShare/page/" + this.pkid + "/web");
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
                    }else{
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

            // window.open("http://10.119.119.232/upload/123456/2018-03-21/70932ac7-da58-4419-91b6-ebe0b3f53838/%E7%89%A9%E7%BE%8E%E7%94%9F%E6%B4%BB%E5%B9%BF%E5%9C%BA%E5%8F%8A%E5%9C%B0%E9%93%81%E5%8D%8E%E8%8B%91%E7%AB%99%E4%B8%89%E7%BB%B4%E7%81%AD%E7%81%AB%E9%A2%84%E6%A1%88.html");
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
            }else {
                this.$message({
                    message: "无可下载预案",
                    showClose: true
                });
            }
            
            // window.open("http://10.119.119.232/upload/123456/2018-03-21/70932ac7-da58-4419-91b6-ebe0b3f53838/%E7%89%A9%E7%BE%8E%E7%94%9F%E6%B4%BB%E5%B9%BF%E5%9C%BA%E5%8F%8A%E5%9C%B0%E9%93%81%E5%8D%8E%E8%8B%91%E7%AB%99%E4%B8%89%E7%BB%B4%E7%81%AD%E7%81%AB%E9%A2%84%E6%A1%88.zip");
        },
        /**
        * lxy
        */
        submitUpload() {
            this.$refs.upload.submit();
        },
        handleRemove(file, fileList) {
        },
        handlePreview(file) {
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },


    }
})
