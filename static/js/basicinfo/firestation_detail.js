new Vue({
    el: "#detailDisplay",
    data: function () {
        return {
            //页面获取的id
            id:"",
            //页面获取的队站类型
            dzlx:"",
            //详情Data
            detailData: {},
            //显示flag
            isShow:"",

        }
    },
    created: function () {
        //取得选中行id
        this.id = this.GetQueryString("id");
        //取得选中行的队站类型
        this.dzlx = this.GetQueryString("dzlx");
        //如果是【其他消防队站】则显示不同tab页
        var str = this.dzlx.substr(0,2);
        if(str == "06")
            this.isShow = false;
        else
            this.isShow = true;
        history.back();
        
    },
    mounted:function(){
        this.xfdzDetails(this.id);
    },

    methods: {
        //根据参数部分和参数名来获取参数值 
        GetQueryString(name) {
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if(r!=null)return  unescape(r[2]); return null;
        },
       
        //根据dzid查询队站详情
        xfdzDetails: function (id) {
            axios.get('/dpapi/xfdz/' + id).then(function (res) {
                this.detailData = res.data.result;
            }.bind(this), function (error) {
                console.log(error)
            })

        },
    }
})
