//加载面包屑
window.onload=function(){
    var type = getQueryString("type");
    if(type == "DT"){
        loadBreadcrumb("地图", "消防队站详情");
    }else{
        loadBreadcrumb("消防队站管理", "消防队站详情");
    }
}
new Vue({
    el: "#detailDisplay",
    data: function () {
        return {
            activeName:'first',
            //页面获取的id
            id:"",
            //页面获取的队站类型
            dzlx:"",
            //详情Data
            detailData: {},
            zongddetailData: {},
            zhiddetailData: {},
            daddetailData: {},
            zhongddetailData: {},
            qtxfdwdetailData: {},

            isZongDui:false,
            isZhiDui:false,
            isDaDui:false,
            isZhongDui:false,
            isQiTaXiaoFangDuiWu:false

        }
    },
    created: function () {
        //取得选中行id
        this.id = this.GetQueryString("id");
        //取得选中行的队站类型(父类)
        this.dzlx = this.GetQueryString("dzlx");
        history.back();
        
    },
    mounted:function(){
        this.xfdzDetails(this.id,this.dzlx);
    },

    methods: {
        //根据参数部分和参数名来获取参数值 
        GetQueryString(name) {
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if(r!=null)return  unescape(r[2]); return null;
        },
       
        //根据dzid查询队站详情
        xfdzDetails: function (id,dzlx) {
            var params = {
                dzid : id,
                dzlx : dzlx
            }
            axios.post('/dpapi/xfdz/findDzDetailByVo',params).then(function (res) {
                this.detailData = res.data.result;
                this.classification();
                //this.zongddetailData = this.detailData.xfdzzongdVO[0];
               // debugger;
            }.bind(this), function (error) {
                console.log(error)
            })

        },
        classification:function(){
            var str = this.dzlx.substr(0,2);
            switch(str){
                case '02':
                    this.isZongDui = true;
                    if(this.detailData.zongdVO != null)
                        this.zongddetailData = this.detailData.zongdVO;
                    break;
                case '03':
                    this.isZhiDui = true;
                    if(this.detailData.zhidVO != null)
                        this.zhiddetailData = this.detailData.zhidVO;
                    break;
                case '05':
                    this.isDaDui = true;
                    if(this.detailData.dadVO != null)
                        this.daddetailData = this.detailData.dadVO;
                    break;
                case '09':
                    this.isZhongDui = true;
                    if(this.detailData.zhongdVO != null)
                        this.zhongddetailData = this.detailData.zhongdVO;
                    break;
                case '0A':
                    break;
            }
        },
        //跳转到地图页面并带上UUID和点击参数水源
        tz:function(){
            // console.log(this.tableData);
            var uuid = this.detailData.uuid;
            var dzlx = this.detailData.dzlx;
            window.location.href = "../bigscreen/big_screen_map_pro.html?uuid="+uuid+"&dzlx="+dzlx+"&shuidj=1";
        }

    }
})
