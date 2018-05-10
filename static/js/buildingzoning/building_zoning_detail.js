new Vue({
    el: "#app",
    data: function () {
        return {
            activeName: "first",
            //页面获取的id
            id: "",
            //页面获取的分区类型
            fqlx:"",
            //详情Data
            detailData: {},
            loading: false,
            //建筑类显示标识
            isJzlShow:false,
            //装置类显示标识
            isZzlShow:false,
            //储罐类显示标识
            isCglShow:false,
            //单个储罐信息
            chuGuanData:[],
            //安全疏散措施显示标识
            AQSSCS:false,
                //安全出口显示标识
                isAqckShow:false,
                //疏散楼梯显示标识
                isSsltShow:false,
                //消防电梯显示标识
                isXfdtShow:false,
                //避难层显示标识
                isBncShow:false,
                //应急广播显示标识
                isYjgbShow:false,
            //消防水系统显示标识
            XFSXT:false,
                //消防泵房显示标识
                isXfbfShow:false,
                //消防水箱显示标识
                isXfsxShow:false,
                //消防水池显示标识
                isXfscShow:false,
                //室内消火栓显示标识
                isSnxhsShow:false,
                //室外消火栓显示标识
                isSwxhsShow:false,
                //水泵接合器显示标识
                isSbjhqShow:false,
                //喷淋系统显示标识
                isPlxtShow:false,
                //冷却水系统显示标识
                isLqsxtShow:false,
                //固定水炮显示标识
                isGdspShow:false,
                //半固定设施显示标识
                isBgdssShow:false,
            //安全出口data
            aqckData:[],
            //疏散楼梯data
            ssltData:[],
            //消防电梯data
            xfdtData:[],
            //避难层data
            bncData:[],
            //应急广播data
            yjgbData:[],
            //消防泵房data
            xfbfData:[],
            //消防水箱data
            xfsxData:[],
            //消防水池
            xfscData:[],
            //室内消火栓
            snxhsData:[],
            //室外消火栓
            swxhsData:[],
            //水泵接合器
            sbjhqData:[],
            //喷淋系统
            plxtData:[],
            //冷却水系统
            lqsxtData:[],
            //固定水炮
            gdspData:[],
            //半固定设施
            bgdssData:[],
        }
    },
   /* created: function () {
    },*/
     mounted: function () {
        this.loading = true;
        //取得选中行id
        this.id = this.GetQueryString("id");
        this.fqlx = this.GetQueryString("fqlx");
        this.details();
        switch(this.fqlx){
            case "30":
                this.isZzlShow = true;
                break;
            case "40":
                this.isCglShow = true;
                break;
            default:
                this.isJzlShow = true;
                break;
        };
        
    },

    methods: {
        //标签页
        handleClick: function (tab, event) {
           // console.log(tab.label)
        },
        //根据参数部分和参数名来获取参数值 
        GetQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        },
        
        //详情
        details: function () {
            var params = {
                fqid : this.id,
                fqlx : this.fqlx
            }
            axios.post('/dpapi/building/findFqDetailByVo', params).then(function (res) {
                this.detailData = res.data.result;
                var num = this.detailData.cgl_czsl;
                var uuid = this.detailData.cgl_uuid;
                if(num > 0){
                    var chuguan = {
                        pkid : uuid
                    };
                    this.addChuGuanInfo(chuguan);
                }
                //通过建筑分区id查询消防设施
                this.loadXfss();
                this.loading=false;
            }.bind(this), function (error) {
                console.log(error);
            })

        },
        //追加罐组中每个储罐情况
        addChuGuanInfo:function(chuguan){
            axios.post('/dpapi/building/findChuGuanList', chuguan).then(function (res) {
                this.chuGuanData = res.data.result;
            }.bind(this), function (error) {
                console.log(error);
            })
            
        },
        //通过建筑分区id查询消防设施
        loadXfss:function(){
            var params = {
                jbxx_fqid:this.id
            }
            axios.post('/dpapi/firefacilities/doFindlist', params).then(function (res) {
                var data = res.data.result;
                for(var i in data){
                    switch(i){
                    //安全疏散措施
                        case'1000':
                            break;
                        case'1001':
                            this.AQSSCS = true;
                            this.isAqckShow = true;
                            this.aqckData = data[i];
                            break;
                        case'1002':
                            this.AQSSCS = true;
                            this.isSsltShow = true;
                            this.ssltData = data[i];
                            break;
                        case'1003':
                            this.AQSSCS = true;
                            this.isXfdtShow = true;
                            this.xfdtData = data[i];
                            break;
                        case'1004':
                            this.AQSSCS = true;
                            this.isBncShow = true;
                            this.bncData = data[i];
                            break;
                        case'1005':
                            this.AQSSCS = true;
                            this.isYjgbShow = true;
                            this.yjgbData = data[i];
                            break;
                    //消防水系统
                        case'2000':
                            this.XFSXT = true;
                            break;
                        case'2001':
                            this.XFSXT = true;
                            this.isXfbfShow = true;
                            this.xfbfData = data[i];
                            break;
                        case'2002':
                            this.XFSXT = true;
                            this.isXfsxShow = true;
                            this.xfsxData = data[i];
                            break;
                        case'2003':
                            this.XFSXT = true;
                            this.isXfscShow = true;
                            this.xfscData = data[i];
                            break;
                        case'2004':
                            this.XFSXT = true;
                            this.isSnxhsShow = true;
                            this.snxhsData = data[i];
                            break;
                        case'2005':
                            this.XFSXT = true;
                            this.isSwxhsShow = true;
                            this.swxhsData = data[i];
                            break;
                        case'2006':
                            this.XFSXT = true;
                            this.isSbjhqShow = true;
                            this.sbjhqData = data[i];
                            break;
                        case'2007':
                            this.XFSXT = true;
                            this.isPlxtShow = true;
                            this.plxtData = data[i];
                            break;
                        case'2008':
                            this.XFSXT = true;
                            this.isLqsxtShow = true;
                            this.lqsxtData = data[i];
                            break;
                        case'2009':
                            this.XFSXT = true;
                            this.isGdspShow = true;
                            this.gdspData = data[i];
                            break;
                        case'2010':
                            this.XFSXT = true;
                            this.isBgdssShow = true;
                            this.bgdssData = data[i];
                            break;
                    //泡沫系统
                        case'3000':
                            break;
                        case'3001':
                            break;
                        case'3002':
                            break;
                        case'3003':
                            break;
                        case'3004':
                            break;
                        case'3005':
                            break;
                    //蒸汽灭火系统
                        case'4000':
                            break;
                        case'4001':
                            break;
                        case'4002':
                            break;
                    //消防控制室
                        case'5000':
                            break;
                    //防排烟设施
                        case'6000':
                            break;
                        case'6001':
                            break;
                        case'6002':
                            break;
                    //防火分区
                        case'7000':
                            break;
                    //其他灭火系统
                        case'8000':
                            break;
                        case'8001':
                            break;
                        case'8002':
                            break;
                    //其他消防设施
                        case'9000':
                            break;
                    }
                }
            }.bind(this), function (error) {
                console.log(error);
            })
        }
    }
})
