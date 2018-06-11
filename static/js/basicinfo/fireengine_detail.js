//axios默认设置cookie
axios.defaults.withCredentials = true;
new Vue({
    el: '#app',
    data: function () {
        return {
            activeName: "first",
            id: "",
            //表数据
            tableData: [],//基本数据

            //显示加载中样
            loading: false,
            labelPosition: 'right',
            //基本数据保存
            rowdata: {},
        }
    },

    mounted: function () {
        this.loadDetails();
    },
    methods: {
        //根据参数部分和参数名来获取参数值 
        GetQueryString(name) {
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if(r!=null)return  unescape(r[2]); return null;
        },
        loadDetails:function(){
            //取得选中行id
            this.id = this.GetQueryString("ID");
            axios.get('/dpapi/fireengine/' + this.id).then(function (res) {
                this.rowdata = res.data.result;
                this.loading=false;
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        //表格重新加载数据
        loadingData: function () {
            var _self = this;
            _self.loading = true;
            setTimeout(function () {
                console.info("加载数据成功");
                _self.loading = false;
            }, 300);
        },
    },

})