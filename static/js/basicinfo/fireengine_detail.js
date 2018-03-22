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
        var url = location.search;
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            // alert(str);  
            var ID = str.substring(3);
            this.id = ID;
            // alert(ID);
            axios.get('/dpapi/fireengine/doFindDetailById/' + this.id).then(function (res) {
                this.tableData = res.data.result[0];
                this.rowdata = this.tableData;
            }.bind(this), function (error) {
                console.log(error)
            })
        }
    },

    // created: function () {
    //     this.searchClick();
    // },
    methods: {
        searchClick: function () {
            this.id = id;
            axios.get('/dpapi/fireengine/doFindDetailById/' + this.id).then(function (res) {
                this.tableData = res.data.result;
                this.total = res.data.result.length;
                this.rowdata = this.tableData;
            }.bind(this), function (error) {
                console.log(error)
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