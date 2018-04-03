//axios默认设置cookie
axios.defaults.withCredentials = true;	
new Vue({
    el: '#app',
    data: function () {
        return {
            visible: false,
            //搜索表单
            searchForm: {
                NAME: "",
                ALIAS: "",
                ENGLISH_NAME:"",
                option_LXDM:"",
                option_PROPERTY:""
            },
            tableData: [],
            LXDM_data:[],
            PROPERTY_data: [],
            
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
            rowdata: {

            },
            //序号
            indexData: 0,
            //删除的弹出框
            deleteVisible: false,
            //新建页面是否显示
            addFormVisible: false,
            addLoading: false,
            addFormRules: {
                permissionname: [{ required: true, message: "请输入权限名称", trigger: "blur" }]
            },
            //选中的值显示
            sels: [],
            //选中的序号
            selectIndex: -1,
             //树结构配置
             defaultProps: {
                children: 'children',
                label: 'codeName',
                value: 'codeValue'
            },

        }
    },
    created:function(){
        this.getLXDMData();
        this.getPROPERTYData();
        this.searchClick();
    },
    methods: {
        handleNodeClick(data) {
            console.log(data);
        },
        //表格查询事件
        searchClick: function () {
            var _self = this;
            _self.loading = true;//表格重新加载
            var params={
                name:this.searchForm.NAME,
                alias: this.searchForm.ALIAS,
                englishName: this.searchForm.ENGLISH_NAME,
                // lxdm: this.searchForm.option_LXDM,
                // property: this.searchForm.option_PROPERTY
            };
            axios.post('/dpapi/danger/findByVO',params).then(function(res){
                this.tableData = res.data.result;
                this.total = res.data.result.length;
                _self.loading = false;
            }.bind(this),function(error){
                console.log(error);
            })
        },
        clearClick: function () {
            this.searchForm.NAME="";
            this.searchForm.ENGLISH_NAME="";
            this.searchForm.ALIAS="";
            this.searchForm.option_LXDM=[];
            this.searchForm.option_PROPERTY=[];
            this.$refs.tree.setCheckedKeys([]);
        },
        getLXDMData: function (){
            axios.get('/api/codelist/getCodetype/CA01').then(function(res){
                this.LXDM_data=res.data.result;
            }.bind(this),function(error){
                console.log(error);
            })
        },
        getPROPERTYData: function (){
            axios.get('/api/codelist/getCodetype/CA01').then(function(res){
                this.PROPERTY_data=res.data.result;
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
            console.info(val);
        },
        detailClick(val) {
            window.location.href = "danger_detail.html?ID=" + val.id;
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
            console.log("每页 " + val + " 条");
            this.pageSize = val;
            var _self = this;
            _self.loadingData(); //重新加载数据
        },
        //当前页修改事件
        currentPageChange: function (val) {
            this.currentPage = val;
            console.log("当前页: " + val);
            var _self = this;
            _self.loadingData(); //重新加载数据
        },
       
        closeDialog: function (val) {
            this.addFormVisible = false;
            val.permissionname = "";
            val.permissioninfo = "";
            val.create_name = "";
            val.create_time = "";
            val.alter_name = "";
            val.alter_time = "";
        }
    },

})