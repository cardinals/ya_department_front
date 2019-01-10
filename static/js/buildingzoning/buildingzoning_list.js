//axios默认设置cookie
axios.defaults.withCredentials = true;	
var vue = new Vue({
    el: '#app',
    data: function () {
        return {
            visible: false,
            //菜单编码
            activeIndex: '',
            //搜索表单
            searchForm: {
                jzmc: "",
                option_JZLX:"",
                jzwz:""
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
        /**菜单选中 by li.xue 20180628*/
        /**
        var index = getQueryString("index");
        $("#activeIndex").val(index);
        this.activeIndex = index;
         */
        /**面包屑 by li.xue 20180628*/
        loadBreadcrumb("单位建筑信息", "-1");
        this.getJZFLData();
        this.searchClick('click');
    },
    methods: {
        handleNodeClick(data) {
        },
        //表格查询事件
        searchClick: function (type) {
            if(type == 'page'){
                this.tableData = [];
            }else{
                this.currentPage = 1;
            }
            var _self = this;
            _self.loading = true;//表格重新加载
            var params={
                jzmc:this.searchForm.jzmc.replace(/%/g,"\\%"),
                jzlx:this.searchForm.option_JZLX,
                jzwz:this.searchForm.jzwz,
                pageSize: this.pageSize,
                pageNum: this.currentPage
            };
            axios.post('/dpapi/building/page',params).then(function(res){
                var tableTemp = new Array((this.currentPage-1)*this.pageSize);
                this.tableData = tableTemp.concat(res.data.result.list);
                this.total = res.data.result.total;
                _self.loading = false;
            }.bind(this),function(error){
                console.log(error);
            })
        },
        clearClick: function () {
            this.searchForm.jzmc="";
            this.searchForm.option_JZLX="";
            this.searchForm.jzwz="";
            this.searchClick('reset');
        },
        getJZFLData: function (){
            axios.get('/api/codelist/getCodetype/JZLX').then(function(res){
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
            var params = {
                id: val.jzid,
                jzlx: val.jzlx
            }
            loadDivParam("buildingzoning/buildingzoning_detail", params);
            //window.location.href = "building_zoning_detail.html?id=" + val.jzid +"&jzlx=" +val.jzlx + "&index=" + this.activeIndex;
        },
        //表格重新加载数据
        loadingData: function () {
            var _self = this;
            _self.loading = true;
            setTimeout(function () {
                console.info("加载数据成功");
                _self.loading = false;
            }, 300);
        }
    },

})