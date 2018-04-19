new Vue({
    el: "#detailDisplay",
    data: function () {
        return {
            //页面获取的pkid
            pkid:"",
            //详情Data
            detailData: {},
            //详情页日期
            detailYMD:"",
            //预案类型Data
            yalxdm: [],
            //测试Data
            // detailTestData: {
            //     pkid: "67833B5FB1232169E053B077770AE86",
            //     yamc: "物美生活广场及地铁华苑站三维灭火预案",
            //     dxmc: "物美生活广场及地铁华苑站",
            //     yalxdm: "人员密集场所",
            //     yazl: "对象预案",
            //     yabbh: "A",
            //     sfkqy: "是",
            //     zzdwmc: "",
            //     zzrmc: "zhuolh@ha",
            //     zzrq: "2016-03-16",
            //     bz: ""
            // },
            //上传文件部分个数
            // upLoadData:{
            //     id:1
            // },
            // fileList: [
            //     { name: '物美生活广场及地铁华苑站三维灭火预案.html', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100?isUpdated=true' },
            //     { name: '物美生活广场及地铁华苑站三维灭火预案.unity3d', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100?isUpdated=true' },
            //     { name: 'jquery.min.js', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100?isUpdated=true' },
            //     { name: 'UnityObject2.js', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100?isUpdated=true' }
            // ],
        }
    },
    created: function () {
        this.YALX();
        // this.DXLX();
        // this.YAZL();
        //取得选中行pkid
        this.pkid = this.GetQueryString("pkid");
        history.back();
        // this.planDetails(this.pkid);
    },
    mounted:function(){
        
        this.planDetails(this.pkid);
    },

    methods: {
        //根据参数部分和参数名来获取参数值 
        GetQueryString(name) {
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if(r!=null)return  unescape(r[2]); return null;
        },
        //预案类型
        YALX: function(){
            axios.get('/api/codelist/getCodetype/YALX').then(function(res){
                this.yalxdm = res.data.result;
            }.bind(this),function(error){
                console.log(error);
            })
        },
        //对象类型
        DXLX: function(){
            axios.get('/api/codelist/getCodetype/YADXLX').then(function(res){
                this.DXLX_data = res.data.result;
            }.bind(this),function(error){
                console.log(error);
            }) 
        },
        //预案种类
        YAZL:function(){
            axios.get('/api/codelist/getCodetype/YAZL').then(function(res){
                this.YAZL_data = res.data.result;
            }.bind(this),function(error){
                console.log(error);
            }) 
        },
        //预案详情
        planDetails: function (val) {
            var _self = this;    
            if(val == "67833B5FB1232169E053B077770AE86"){
                this.detailData = this.detailTestData;
                for(var k=0;k<this.yalxdm.length;k++){
                    if(this.yalxdm[k].codeValue == this.detailData.yalxdm){
                        this.detailData.yalxdm = this.yalxdm[k].codeName;
                    }
                }
            }
            else{
                axios.get('/dpapi/xfbwjw/doFindById/' + val).then(function (res) {
                    this.detailData = null;
                    this.detailData = res.data.result;
                    if (this.detailData.zzrq == null || this.detailData.zzrq == "") {
                        for(var k=0;k<this.yalxdm.length;k++){
                            if(this.yalxdm[k].codeValue == this.detailData.yalxdm){
                                this.detailData.yalxdm = this.yalxdm[k].codeName;
                            }
                        }
                        return '';
                    } else {
                        var date = new Date(this.detailData.zzrq);
                        if (date == undefined) {
                            return '';
                        }
                        var month = '' + (date.getMonth() + 1),
                            day = '' + date.getDate(),
                            year = date.getFullYear();
        
                        if (month.length < 2) month = '0' + month;
                        if (day.length < 2) day = '0' + day;
        
                        this.detailYMD=[year, month, day].join('-');
                    }
                    for(var k=0;k<this.yalxdm.length;k++){
                        if(this.yalxdm[k].codeValue == this.detailData.yalxdm){
                            this.detailData.yalxdm = this.yalxdm[k].codeName;
                        }
                    }
                    // for(var m=0;m<this.YAZL_data.length;m++){
                    //     if(this.YAZL_data[m].codeValue == this.detailData.yazl){
                    //         this.detailData.yazl = this.YAZL_data[m].codeName;
                    //     }
                    // }
                    // for(var h=0;h<this.DXLX_data.length;h++){
                    //     if(this.DXLX_data[h].codeValue == this.detailData.dxlxdm){
                    //         this.detailData.dxlxdm = this.DXLX_data[h].codeName;
                    //     }
                    // }
                    this.detailData.sfkqy = (this.detailData.sfkqy==1?"是":"否");
                    _self.planDetailVisible = true;
            }.bind(this), function (error) {
                console.log(error)
            })
        }

        },
        
        //时间格式
        cjsjChange(val) {
            this.searchForm.cjsj.splice(0,this.searchForm.cjsj.length);
            this.searchForm.cjsj.push(val.substring(0,val.indexOf("至")));
            this.searchForm.cjsj.push(val.substring(val.indexOf("至")+1));
            // console.log(this.searchForm.cjsj);
        },
        zzsjChange(val) {
            this.searchForm.zzsj.splice(0,this.searchForm.zzsj.length);
            this.searchForm.zzsj.push(val.substring(0,val.indexOf("至")));
            this.searchForm.zzsj.push(val.substring(val.indexOf("至")+1));
            // console.log(this.searchForm.cjsj);
        },
        xgsjChange(val) {
            this.searchForm.xgsj.splice(0,this.searchForm.xgsj.length);
            this.searchForm.xgsj.push(val.substring(0,val.indexOf("至")));
            this.searchForm.xgsj.push(val.substring(val.indexOf("至")+1));
            // console.log(this.searchForm.cjsj);
        },
        //时间格式化
        dateFormat: function (row, column) {
            var rowDate = row[column.property];
            if (rowDate == null || rowDate == "") {
                return '';
            } else {
                var date = new Date(rowDate);
                if (date == undefined) {
                    return '';
                }
                var month = '' + (date.getMonth() + 1),
                    day = '' + date.getDate(),
                    year = date.getFullYear();

                if (month.length < 2) month = '0' + month;
                if (day.length < 2) day = '0' + day;

                return [year, month, day].join('-')
            }
        },











        /**
        * lxy
        */
        submitUpload(){
            this.upLoadData= {id:2};
            this.$refs.upload.submit();
        },
        handleRemove(file, fileList){
            console.log(file, fileList);
        },
        handlePreview(file){
            console.log(file);
        },
        

    }
})
