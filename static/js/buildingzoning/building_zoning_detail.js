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
           chuGuanData:[]
        }
    },
    created: function () {
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
    // mounted: function () {
    // },

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
            
        }
    }
})
