//axios默认设置cookie
axios.defaults.withCredentials = true;	
new Vue({
    el: '#app',
    data: function () {
        return {
            //搜索表单
            searchForm: {
                dxmc: '',
                dxdz: '',
                xfgx: '',
                //高级搜索-预案对象-保卫警卫 点击后跳转到查询页面，通过UUID直接查询其对象
                uuid:""
            },
            tableData: [],
            xfgxData: [],
            props: {
                value: 'codeValue',
                label: 'codeName',
                children: 'children'
            },
            defaultKeys: [],
            //树结构配置
            treeDefaultProps: {
                children: 'children',
                label: 'formationinfo'
            },
            //资源列表是否显示
            planDetailVisible: false,
            //表高度变量
            tableheight: 443,
            //显示加载中样
            loading: false,
            //多选值
            multipleSelection: [],
            //当前页
            currentPage: 1,
            //分页大小
            pageSize: 10,
            //总记录数
            total: 0,
            //预案详情页
            detailData: [],
            //序号
            indexData: 0,
            //删除的弹出框
            deleteVisible: false,
            //新建页面是否显示
            addFormVisible: false,
            addLoading: false,
            addFormRules: {
            },
            //选中的值显示
            sels: [],
            //选中的序号
            selectIndex: -1,
            //编辑界面是否显示
            editFormVisible: false,
            editLoading: false,
            editFormRules: {
            },
            defaultProps:{
                value:'codeValue',
                label:'codeName'
            }
          
        }
    },
    created:function(){
        this.searchClick();
    },

    methods: {
        //表格查询事件
        searchClick: function () {
            this.loading=true;
            var _self = this;
            //高级搜索-预案对象-保卫警卫 点击后跳转到查询页面，通过UUID直接查询其对象
            this.searchForm.uuid = this.GetQueryString("id");
            var params={
                //add by yushch
                uuid : this.searchForm.uuid,
                //end add
                dxmc :this.searchForm.dxmc,
                dxdz :this.searchForm.dxdz,
                xfgx :this.searchForm.xfgx,
            };
            axios.post('/dpapi/otherobjects/list',params).then(function(res){
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
            this.searchForm.dxmc="";
            this.searchForm.dxdz="";
            this.searchForm.xfgx="";
        },
        //数据为空时显示‘无’
        dataFormat: function (row, column) {
            var rowDate = row[column.property];
            if (rowDate == null || rowDate == "") {
                return '无';
            } else {
                return rowDate;
            }
        },

        //表格勾选事件
        selectionChange: function (val) {
            for (var i = 0; i < val.length; i++) {
                var row = val[i];
            }
            this.multipleSelection = val;
            //this.sels = sels
            console.info(val);
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
        //点击进入详情页
        informClick(val) {
            window.location.replace("otherobjects_detail.html?ID=" + val.uuid);
        },
        //根据参数部分和参数名来获取参数值 
        GetQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        },
    }
})