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
            //表数据
            tableData: [],//Grid中数据
            detailData:[],
            //角色对应资源
            resourceList: [],
            defaultProps: {
                children: 'children',
                label: 'resourceinfo'
            }
        };
    },

    created: function () {
        //取得选中行pkid
        this.pkid = this.GetQueryString("pkid");
        this.YALX();
        // history.back();
        // this.planDetails(this.pkid);
    },
    mounted: function () {
        axios.get('http://localhost/api/resource/getAll').then(function (res) {
            console.log(res.data.result);
            this.tableData = res.data.result;
        }.bind(this), function (error) {
            console.log(error)
        }),
        this.total = this.tableData.length;
    },

    methods: {
        //过滤输入框
        filterNode(value, tableData) {
            if (!value) return true;
            return tableData.resourceinfo.indexOf(value) !== -1;
        },

        //获取节点
        currentNodeChange: function (val) {
            // val.jgid;
            val.resourceid='14111442';
            // debugger   
            axios.get('/dpapi/organization/doFindById/' + val.resourceid).then(function (res) {
                this.detailData = res.data.result[0];
            }.bind(this), function (error) {
                console.log(error);
            })   
        },

        //根据参数部分和参数名来获取参数值 
        GetQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        },
        //机构名称
        // JGMC: function () {
        //     axios.get('/api/codelist/getCodetype/JGMC').then(function (res) {
        //         this.detailData.jgmc = res.data.result;
        //         this.planDetails(this.pkid);
        //     }.bind(this), function (error) {
        //         console.log(error);
        //     })
        // },
        //机构简称
        JGJC: function () {
            axios.get('/api/codelist/getCodetype/JGJC').then(function (res) {
                this.DXLX_data = res.data.result;
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        //机构性质
        JGXZDM: function () {
            axios.get('/api/codelist/getCodetype/JGXZDM').then(function (res) {
                this.YAZL_data = res.data.result;
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        //机构地址
        JGDZ: function () {
            axios.get('/api/codelist/getCodetype/JGDZ').then(function (res) {
                this.YAZL_data = res.data.result;
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        //机构描述
        JGMS: function () {
            axios.get('/api/codelist/getCodetype/JGMS').then(function (res) {
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
        //联系人
        LXR: function () {
            axios.get('/api/codelist/getCodetype/LXR').then(function (res) {
                this.YAZL_data = res.data.result;
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        //联系电话
        LXDH: function () {
            axios.get('/api/codelist/getCodetype/LXDH').then(function (res) {
                this.YAZL_data = res.data.result;
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        //传真号码
        CZHM: function () {
            axios.get('/api/codelist/getCodetype/CZHM').then(function (res) {
                this.YAZL_data = res.data.result;
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        //辖区面积
        XQMJ: function () {
            axios.get('/api/codelist/getCodetype/XQMJ').then(function (res) {
                this.YAZL_data = res.data.result;
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        //辖区范围
        XQFW: function () {
            axios.get('/api/codelist/getCodetype/XQFW').then(function (res) {
                this.YAZL_data = res.data.result;
            }.bind(this), function (error) {
                console.log(error);
            })
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
            axios.post('/dpapi/organization/findByVO', params).then(function (res) {
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