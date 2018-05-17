//axios默认设置cookie
axios.defaults.withCredentials = true;	
new Vue({
    el: '#app',
    data: function () {
        return {
            visible: false,
            //搜索表单
            searchForm: {
                jzmc: "",
                option_JZLX:"",
                fqwz:""
            },
            tableData: [],
            JZFL_data:[],
            
            //表高度变量
            tableheight: 450,
            //显示加载中样
            loading: false,
            labelPosition: 'right',
            //多选值
            multipleSelection: [],
            //当前页
            currentPage: 1,
            //分页大小
            pageSize: 10,
            //总记录数
            total: 10,
            //行数据保存
            rowdata: {},
            //序号
            indexData: 0,
            //选中的值显示
            sels: [],
            //选中的序号
            selectIndex: -1,

        }
    },
    created:function(){
        this.getJZFLData();
        this.searchClick();
    },
    methods: {
        handleNodeClick(data) {
        },
        //表格查询事件
        searchClick: function () {
            var _self = this;
            _self.loading = true;//表格重新加载
            var params={
                jzmc:this.searchForm.jzmc,
                jzlx:this.searchForm.option_JZLX,
                fqwz:this.searchForm.fqwz
            };
            axios.post('/dpapi/building/list',params).then(function(res){
                this.tableData = res.data.result;
                this.total = res.data.result.length;
                _self.loading = false;
            }.bind(this),function(error){
                console.log(error);
            })
        },
        //表格数据格式化
        dataFormat: function (row, column) {
            var rowDate = row[column.property];
            if (rowDate == null || rowDate == "") {
                return '无';
            } else {
                return rowDate;
            }
        },
        clearClick: function () {
            this.searchForm.jzmc="";
            this.searchForm.option_JZLX="";
            this.searchForm.fqwz="";
        },
        getJZFLData: function (){
            axios.get('/api/codelist/getCodetype/JZFL').then(function(res){
                this.JZFL_data=res.data.result;
            }.bind(this),function(error){
                console.log(error);
            })
        },
        //表格勾选事件
        selectionChange: function (val) {
            for (var i = 0; i < val.length; i++) {
                var row = val[i];
            }
            this.multipleSelection = val;
        },
        detailClick(val) {
            window.location.href = "building_zoning_detail.html?id=" + val.jzid +"&jzlx=" +val.jzlx;;
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
        //分页大小修改事件
        pageSizeChange: function (val) {
            this.pageSize = val;
            var _self = this;
            _self.loadingData(); //重新加载数据
        },
        //当前页修改事件
        currentPageChange: function (val) {
            this.currentPage = val;
            var _self = this;
            _self.loadingData(); //重新加载数据
        }
    },

})