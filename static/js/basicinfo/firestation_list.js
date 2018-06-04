//axios默认设置cookie
axios.defaults.withCredentials = true;	
new Vue({
    el: '#app',
    data: function () {
        return {
            //搜索表单
            searchForm: {
                dzmc: "",
                dzdz: "",
                dzlx: ""
            },
            tableData: [],
            dzlxData:[],
            props: {
                value: 'codeValue',
                label: 'codeName',
                children: 'children'
            },
            //资源列表是否显示
            detailVisible: false,
            //表高度变量
            tableheight: 443,
            //显示加载中样式
            loading: false,
            //当前页
            currentPage: 1,
            //分页大小
            pageSize: 10,
            //总记录数
            total: 0,
            //序号
            indexData: 0,
            //选中的值显示
            sels: [],
            //选中的序号
            selectIndex: -1,
        }
    },
    created:function(){
        //设置菜单选中
        $("#activeIndex").val(getQueryString("index"));
        this.getDzlxData();
        this.searchClick();
    },

    methods: {       
        //队站类型下拉框加载
        getDzlxData: function(){
            axios.get('/api/codelist/getDzlxTree/DZLX').then(function(res){
                this.dzlxData = res.data.result;
               /** 
                //队站类型只显示 ：总队、支队、大队、中队、其他消防队伍
                var lx_show_list = ["02","03","05","09","0A"];
                for(var i in lxdata){
                    var start_dzlx = lxdata[i].codeValue.substring(0,2);
                    if(lx_show_list.toString().indexOf(start_dzlx) > -1)
                        this.dzlxData.push(lxdata[i]);
                }*/
            }.bind(this),function(error){
                console.log(error);
            })
        },
        
        //表格查询事件
        searchClick: function () {
            this.loading=true;
            var _self = this;
            var params={
                dzmc:this.searchForm.dzmc,
                dzdz:this.searchForm.dzdz,
                dzlx :this.searchForm.dzlx[this.searchForm.dzlx.length-1],
            };
            axios.post('/dpapi/xfdz/list',params).then(function(res){
                this.tableData = res.data.result;
                this.total = res.data.result.length;
                this.rowdata = this.tableData;
                this.loading=false;
            }.bind(this),function(error){
                console.log(error);
            })
        },
        //清空查询条件
        clearClick: function () {
            this.searchForm.dzmc = "",
            this.searchForm.dzdz = "",
            this.searchForm.dzlx = []
        },
        /** 
        //数据为空时显示‘无’
        dataFormat: function (row, column) {
            var rowData = row[column.property];
            if (rowData == null || rowData == "") {
                return '无';
            } else {
                return rowData;
            }
        },*/
        //如果队站类型为其他消防队伍，管辖水源数、管辖重点单位数为”-“
        dataFormat2: function(row, column){
            var rowData = row[column.property];
            var dzlx = row.dzlx;
            dzlx = dzlx.substr(0,2);
            if(dzlx =="0A"){
                return '——';
            }
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
            // console.log("每页 " + val + " 条");
            this.pageSize = val;
            var _self = this;
            _self.loadingData(); //重新加载数据
        },
        //当前页修改事件
        currentPageChange: function (val) {
            this.currentPage = val;
            // console.log("当前页: " + val);
            var _self = this;
            _self.loadingData(); //重新加载数据
        },
        //打开详情页
        details: function (val) {
            if(val.dzbm != '01000000'){
                this.detailVisible = true;
                var shortURL = top.location.href.substr(0, top.location.href.indexOf("?")) + "?id=" + val.dzid +"&dzlx=" +val.dzlx;
                history.pushState(null, null, shortURL)
                //异步加载详情页
                $(function () {
                    $.ajax({
                        url: '../../../templates/basicinfo/firestation_detail.html',
                        cache: true,
                        async: true,
                        success: function (html) {
                            $("#detailDialog").html(html);
                        }
                    });
                })
            }
        },
        //关闭详情页
        closeDialog: function (val) {
            this.detailVisible = false;        
        }
    }
})