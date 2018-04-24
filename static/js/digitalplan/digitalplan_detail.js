new Vue({
    el: "#detailDisplay",
    data: function () {
        return {
            //页面获取的pkid
            pkid: "",
            //详情Data
            detailData: {},
            //详情页日期
            detail_zzsj: "",
            detail_shsj: "",
            //预案类型Data
            YALX_data: [],
            //审核状态Data
            SHZT_data: [],            
            //测试Data
            detailTestData: {
                pkid: "67833B5FB1232169E053B077770AE86",
                yamc: "物美生活广场及地铁华苑站三维灭火预案",
                dxmc: "物美生活广场及地铁华苑站",
                yalxdm: "人员密集场所",
                yazl: "对象预案",
                yabbh: "A",
                sfkqy: "是",
                zzdwmc: "",
                zzrmc: "zhuolh@ha",
                zzrq: "2016-03-16",
                bz: ""
            },
            //上传文件部分个数
            upLoadData: {
                id: 1
            },
            fileList: [
                { name: '物美生活广场及地铁华苑站三维灭火预案.html', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100?isUpdated=true' },
                { name: '物美生活广场及地铁华苑站三维灭火预案.unity3d', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100?isUpdated=true' },
                { name: 'jquery.min.js', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100?isUpdated=true' },
                { name: 'UnityObject2.js', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100?isUpdated=true' }
            ],
        }
    },
    created: function () {
        this.YALX();//预案类型
        // this.SHZT();//审核状态
        history.back();
    },
    mounted: function () {
        this.pkid = this.GetQueryString("pkid");//取得选中行pkid
        // this.planDetails(this.pkid);
    },

    methods: {
        //根据参数部分和参数名来获取参数值 
        GetQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        },
        //预案类型
        YALX: function () {
            axios.get('/api/codelist/getCodetype/YALX').then(function (res) {
                this.YALX_data = res.data.result;
                this.SHZT();//审核状态
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        //审核状态
        SHZT: function () {
            axios.get('/api/codelist/getCodetype/SHZT').then(function (res) {
                this.SHZT_data = res.data.result;
                this.planDetails(this.pkid);
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        //预案详情
        planDetails: function (val) {
            
            var _self = this;
            // if (val == "67833B5FB1232169E053B077770AE86") {
            //     this.detailData = this.detailTestData;
            // }
            // else {
            axios.get('/dpapi/digitalplanlist/doFindById/' + val).then(function (res) {
                this.detailData = null;
                this.detailData = res.data.result;
                //制作时间格式化
                if (this.detailData.zzsj == null || this.detailData.zzsj == "") {
                    this.detail_zzsj = '';
                } else {
                    this.detail_zzsj = this.dateFormat(this.detailData.zzsj);
                }
                //审核时间格式化
                if (this.detailData.shsj == null || this.detailData.shsj == "") {
                    this.detail_shsj = '';
                } else {
                    this.detail_shsj = this.dateFormat(this.detailData.shsj);
                }
                //预案类型转码
                for (var k = 0; k < this.YALX_data.length; k++) {
                    if (this.YALX_data[k].codeValue == this.detailData.yalxdm) {
                        this.detailData.yalxdm = this.YALX_data[k].codeName;
                    }
                }
                //审核状态转码
                for (var k = 0; k < this.SHZT_data.length; k++) {
                    if (this.SHZT_data[k].codeValue == this.detailData.shzt) {
                        this.detailData.shzt = this.SHZT_data[k].codeName;
                    }
                }
                this.detailData.sfkqy = (this.detailData.sfkqy == 1 ? "是" : "否");
                _self.planDetailVisible = true;
            }.bind(this), function (error) {
                console.log(error)
            })
            // }

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
        //预案预览
        openPlan: function () {
            window.open("http://10.119.119.232/upload/123456/2018-03-21/70932ac7-da58-4419-91b6-ebe0b3f53838/%E7%89%A9%E7%BE%8E%E7%94%9F%E6%B4%BB%E5%B9%BF%E5%9C%BA%E5%8F%8A%E5%9C%B0%E9%93%81%E5%8D%8E%E8%8B%91%E7%AB%99%E4%B8%89%E7%BB%B4%E7%81%AD%E7%81%AB%E9%A2%84%E6%A1%88.html");
        },
        //预案下载
        downloadPlan: function () {
            window.open("http://10.119.119.232/upload/123456/2018-03-21/70932ac7-da58-4419-91b6-ebe0b3f53838/web%E7%89%88%E4%B8%89%E7%BB%B4%E9%A2%84%E6%A1%88.ZIP");
        },
        /**
        * lxy
        */
        submitUpload() {
            this.upLoadData = { id: 2 };
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
