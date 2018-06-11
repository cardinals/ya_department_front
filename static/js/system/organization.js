//加载面包屑
window.onload=function(){
    loadBreadcrumb("组织机构管理", "-1");
}
//axios默认设置cookie
axios.defaults.withCredentials = true;
new Vue({
    el: '#app',
    
    watch: {
        filterText(val) {
            this.$refs.tree2.filter(val);
        }
    },

    data: function () {
        return {
            filterText: '',
            //搜索表单
            searchForm: {
                jgsearch: "",
            },
            //机构树数据
            tableData: [],
            //用户列表数据：
            userData: [],
            //机构详情数据
            detailData: {
                jgmc: '',
                jgjc: '',
                jgxzmc: '',
                jgdz: '',
                jgms: '',
                xzqhmc: '',
                czhm: '',
                lxr: '',
                lxdh: '',
                xqmj: '',
                xqfw: ''
            },
            jgidprops: {
                label: 'jgjc',
                children: 'children'
            },
            //当前页
            currentPage: 1,
            //分页大小
            pageSize: 10,
            //总记录数
            total: 0,
            //表高度变量
            tableheight: 185,
        };
    },

    created: function () {
        //设置菜单选中
        $("#activeIndex").val(getQueryString("index"));
        //取得选中行pkid
        // this.pkid = this.GetQueryString("pkid");
        // this.YALX();
        // history.back();
        // this.planDetails(this.pkid);
        this.getJgidData();
    },
    mounted: function () {
        
    },

    methods: {

        //过滤输入框
        filterNode(value, tableData) {
            if (!value) return true;
            return tableData.jgjc.indexOf(value) !== -1;
        },

        //获取所有机构
        getJgidData: function(){
            axios.post('/api/organization/getOrganizationtree').then(function(res){
               
                this.tableData = res.data.result;
                console.log(this.tableData);
            }.bind(this),function(error){
                console.log(error);
            }) 
        },

        //获取节点
        currentNodeChange: function (val) {
            //获取节点详情
            axios.get('/api/organization/doFindById/' + val.uuid).then(function (res) {
                this.detailData = res.data.result;
            }.bind(this), function (error) {
                console.log(error);
            });
            //获取组织机构下的用户列表
            var params = {
                organizationId: val.uuid,
                pageSize: this.pageSize,
                pageNum: this.currentPage
            };
            axios.get('/api/user/findByJGID/' + val.uuid).then(function (res) {
                this.userData = res.data.result;
                this.total = res.data.result.length;                
            }.bind(this), function (error) {
                console.log(error);
            });


        },
        
        //根据参数部分和参数名来获取参数值 
        GetQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        },
        
        //机构性质
        JGXZDM: function () {
            axios.get('/api/codelist/getCodetype/JGXZ').then(function (res) {
                this.YAZL_data = res.data.result;
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        //行政区划
        XZQH: function () {
            axios.get('/api/codelist/getCodetype/XZQH').then(function (res) {
                this.YAZL_data = res.data.result;
            }.bind(this), function (error) {
                console.log(error);
            })
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
        },
        //表格查询事件
        searchClick: function () {
            var _self = this;
            if (this.searchForm.createTimeBegin != "" && this.searchForm.createTimeEnd != "" && this.searchForm.createTimeBegin > this.searchForm.createTimeEnd) {
                _self.$message({
                    message: "时间选择错误！",
                    type: "error"
                });
                return;
            }
            // this.loading = true;//表格重新加载
            var params = {
                jgsearch: this.searchForm.jgsearch
            }
            axios.post('/api/organization/findByVO', params).then(function (res) {
                this.tableData = res.data.result;
                for (var i = 0; i < this.tableData.length; i++) {
                    //预案类型转码
                    for (var k = 0; k < this.yalxdmData.length; k++) {
                        if (this.yalxdmData[k].codeValue == this.tableData[i].yalxdm) {
                            this.tableData[i].yalxdm = this.yalxdmData[k].codeName;
                        }
                    }

                }
                // this.tableData.unshift(this.testData);
                _self.total = _self.tableData.length;
                this.loading = false;
                // console.log("success")
            }.bind(this), function (error) {
                console.log("failed")
            })
        },
        handleNodeClick(data) {
            console.log(data);
        }
    }

})