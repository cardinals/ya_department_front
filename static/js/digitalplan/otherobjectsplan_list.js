//axios默认设置cookie
axios.defaults.withCredentials = true;	
new Vue({
    el: '#app',
    data: function () {
        return {
            //搜索表单
            searchForm: {
                yamc: "",
                dxmc: "",
                yalxdm: "",
                sfkqy: "",
                jgid: "",
                cjsj: new Array()
            },
            tableData: [],
            yalxdmData: [],
            jgidData: [],
            sfkqyData: [{
                codeValue: '1',
                codeName: '是'
            }, {
                codeValue: '0',
                codeName: '否'
            }],
            defaultKeys: [],
            //树结构配置
            props: {
                value: 'codeValue',
                label: 'codeName',
                children: 'children'
            },
            jgidprops: {
                value: 'uuid',
                label: 'jgjc',
                children: 'children'
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
            //详情页日期
            detailYMD:"",
            //序号
            indexData: 0,
            //删除的弹出框
            deleteVisible: false,
            //新建页面是否显示
            addFormVisible: false,
            addLoading: false,
            addFormRules: {
            },
            //新建数据
            addForm: {
                YAMC: "",
                DWDJ: "",
                DXMC: "",
                YALX: "",
                DWDZ: "",
                ZDMJ: "",
                XFGXJGID: ""
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
            //编辑界面数据
            planDetail: {
                YAMC: "",
                DWDJ: "",
                DXMC: "",
                YALX: "",
                DWDZ: "",
                ZDMJ: "",
                XFGXJGID: ""
            },
            defaultProps:{
                value:'codeValue',
                label:'codeName'
            }
          
        }
    },
    created:function(){
        //设置菜单选中
        $("#activeIndex").val(getQueryString("index"));
        this.getYalxdmData();
        this.getJgidData();
        this.searchClick();
    },

    methods: {       
        //预案类型
        getYalxdmData: function(){
            var params= {
                codetype : "YALX",
                list : [1,2]
            };
            axios.post('/api/codelist/getCodelisttree2',params).then(function(res){
                this.yalxdmData = res.data.result;
            }.bind(this),function(error){
                console.log(error);
            })
        },
        //制作机构
        getJgidData: function(){
            axios.post('/dpapi/organization/getOrganizationtree').then(function(res){
                this.jgidData = res.data.result;
            }.bind(this),function(error){
                console.log(error);
            }) 
        },
        //表格查询事件
        searchClick: function () {
            this.loading=true;
            var _self = this;
            var params={
                yamc :this.searchForm.yamc,
                dxmc :this.searchForm.dxmc,
                yalx :this.searchForm.yalxdm[this.searchForm.yalxdm.length-1],
                sfkqy :this.searchForm.sfkqy,
                jgid :this.searchForm.jgid[this.searchForm.jgid.length-1],
            };
            axios.post('/dpapi/otherobjectsplan/findByVO',params).then(function(res){
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
            this.searchForm.yamc="";
            this.searchForm.dxmc="";
            this.searchForm.yalxdm=[];
            this.searchForm.sfkqy="";
            this.searchForm.jgid=[];
        },
        //时间格式
        cjsjChange(val) {
            this.searchForm.cjsj.splice(0,this.searchForm.cjsj.length);
            this.searchForm.cjsj.push(val.substring(0,val.indexOf("至")));
            this.searchForm.cjsj.push(val.substring(val.indexOf("至")+1));
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
        //打开预案详情页
        planDetails: function (val) {
            var _self = this;
            _self.planDetailVisible = true;
            var shortURL = top.location.href.substr(0, top.location.href.indexOf("?")) + "?uuid=" + val.uuid;
            history.pushState(null, null, shortURL)
            //异步加载详情页
            $(function () {
                $.ajax({
                    url: '../../../templates/digitalplan/otherobjectsplan_detail.html',
                    cache: true,
                    async: true,
                    success: function (html) {
                        $("#detailDialog").html(html);
                    }
                });
            })
        },
        //关闭详情页
        closeDialog: function (val) {
            this.planDetailVisible = false;        
        }
    }
})