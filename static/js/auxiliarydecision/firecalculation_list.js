//axios默认设置cookie
axios.defaults.withCredentials = true;
new Vue({
    el: '#app',
    data: function () {
        return {
            activeName:'first',
            visible: false,
            tableheight: 441,//表高度变量
            //角色下拉框
            allRoles: [],
            //查询表单
            searchForm: {
                GSMC: '',
                selected_GSLB:'',
                SFQY:''
            },
            //表数据
            tableData: [],
            //公式类别数据
            GSLB_data:[],
            //参数类型数据
            CSLX_data:[],
            //后台返回全部资源列表
            defaultKeys: ['17'],

            //删除成功后台返回数据
            delStatus: "success",
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
            //序号
            indexData: 0,
            //计算dialog是否显示
            calculateVisible: false,
            //计算数据
            calculateForm: {
                gsmc:'',
                gssm:'',
                jsgs:'',

            },
            calculateFormRules:{

            },
            //删除的弹出框
            deleteVisible: false,
            //新建页面是否显示
            addFormVisible: false,
            addFormRules: {
                gsmc: [{ required: true, message: "请输入公式名称", trigger: "blur" }],
                gsmc: [{ required: true, message: "请输入公式名称", trigger: "blur" }],
                jsgs: [{ required: true, message: "请输入计算公式", trigger: "blur" }],
                jsgsdw: [{ required: true, message: "请输入计算公式单位", trigger: "blur" }]
            },
            //新建数据
            addFormulaForm: {
                gsmc: "",
                gssm: "",
                jsgs: "",
                jsgsdw: "",
                gslb:""
            },
            addParamForm: {

                domains: [{
                    value: ''
                }]
            },
            //选中的序号
            selectIndex: -1,
            //修改界面是否显示
            editFormVisible: false,
            editFormRules: {
                gsmc: [{ required: true, message: "请输入公式名称", trigger: "blur" }],
                gsmc: [{ required: true, message: "请输入公式名称", trigger: "blur" }],
                jsgs: [{ required: true, message: "请输入计算公式", trigger: "blur" }],
                jsgsdw: [{ required: true, message: "请输入计算公式单位", trigger: "blur" }]
            },
            //修改界面数据
            editFormulaForm: {
                gsmc: "",
                gssm: "",
                jsgs: "",
                jsgsdw: "",
                gslb:""
            },
            editParamForm: {

                domains: [{
                    value: ''
                }]
            },
            //树状选中状态
            defaultCheckKeys: [],

            //树结构配置
            defaultProps: {
                children: 'children',
                label: 'resourceinfo'
            },

            //角色对应资源
            resourceList: [],

            //新修改页面的复选树
            checkprops: {
                label: 'name',
                children: 'zones'
            },
            count: 1,

        }
    },
    created: function () {
        this.GSLB();
        this.CSLX();
        this.searchClick();
    },
    methods: {
        //公式类别下拉框
        GSLB: function () {
            axios.get('/api/codelist/getCodetype/GSLB').then(function (res) {
                this.GSLB_data = res.data.result;
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        //参数类型下拉框
        CSLX: function () {
            axios.get('/api/codelist/getCodetype/CSLX').then(function (res) {
                this.CSLX_data = res.data.result;
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        //查询，初始化
        searchClick: function () {
            var _self = this;
            _self.loading = true;//表格重新加载
            var params = {
                gsmc:this.searchForm.GSMC,
                gslb:this.searchForm.selected_GSLB,
                sfqy:this.searchForm.SFQY
            };

            axios.post('/dpapi/firecalculationlist/findByVO', params).then(function (res) {
                this.tableData = res.data.result;
                this.total = res.data.result.length;
                _self.loading = false;
            }.bind(this), function (error) {
                console.log(error)
            })
        },
        //日期控件变化时格式化
        dateChange(val) {
            this.searchForm.createTime.splice(0,this.searchForm.createTime.length);
            this.searchForm.createTime.push(val.substring(0,val.indexOf("至")));
            this.searchForm.createTime.push(val.substring(val.indexOf("至")+1));
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
        //新增页面增加参数表单
        addDomain() {
            this.addParamForm.domains.push({
              value: '',
              key: Date.now()
            });
        },
        //修改页面增加参数表单
        editDomain() {
            this.editParamForm.domains.push({
              value: '',
              key: Date.now()
            });
        },
        //新增页面删除参数
        removeAddDomain(item) {
            var index = this.addParamForm.domains.indexOf(item)
            if (index !== -1) {
                this.addParamForm.domains.splice(index, 1)
            }
        },
        //修改页面删除参数
        removeEditDomain(item) {
            var index = this.editParamForm.domains.indexOf(item)
            if (index !== -1) {
                this.editParamForm.domains.splice(index, 1)
            }
        },
        //预案详情
        calculateDetails: function (val) {
            var _self = this;
            _self.calculateVisible = true;
            this.calculateForm.gsmc=val.gsmc;
            this.calculateForm.gssm=val.gssm;
            this.calculateForm.jsgs=val.jsgs;
        },
        //火场计算
        calculate:function(val){
        
        },
        resetDialog:function(val){
        
        },
        closeCalculate:function(val){

        },
        //清空
        clearClick: function () {
            this.searchForm.GSMC="";
            this.searchForm.selected_GSLB="";
            this.searchForm.SFQY="";
        },

        handleNodeClick(data) {
        },

        //表格勾选事件
        selectionChange: function (val) {
            this.multipleSelection = val;
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

        //新建：弹出Dialog
        addClick: function () {
            var _self = this;
            _self.addFormVisible = true;
        },
        //新建：提交
        addSubmit: function (val1,val2) {
            var _self = this;
            axios.get('/dpapi/firecalculationlist/getNum/' + this.val1.gsmc).then(function (res) {
                if (res.data.result != 0) {
                    _self.$message({
                        message: "角色名已存在!",
                        type: "error"
                    });
                } else {
                    var params = {
                        gsmc: val1.gsmc,
                        gslb: val1.gslb,
                        gssm: val1.gssm,
                        jsgs: val1.jsgs,
                        jsgsdw: val1.jsgsdw,
        
                    }
                    axios.post('/dpapi/firecalculationlist/insertByVO', params).then(function (res) {
                        var addData = res.data.result;
                        addData.createTime = new Date();
                        _self.tableData.unshift(addData);
                        _self.total = _self.tableData.length;
                    }.bind(this), function (error) {
                        console.log(error)
                    })
                    this.addFormVisible = false;
                    _self.loadingData();//重新加载数据
                }
            }.bind(this), function (error) {
                console.log(error)
            })
        },

        //删除：批量删除
        removeSelection: function () {
            var _self = this;
            var multipleSelection = this.multipleSelection;
            if (multipleSelection.length < 1) {
                _self.$message({
                    message: "请至少选中一条记录",
                    type: "error"
                });
                return;
            }
            var ids = [];
            for (var i = 0; i < multipleSelection.length; i++) {
                var row = multipleSelection[i];
                ids.push(row.uuid);
            }
            this.$confirm("确认删除吗？", "提示", { type: "warning" })
                .then(function () {
                    var params = {
                        ids: ids
                    }
                    axios.post('/dpapi/firecalculationlist/deleteByIds', params).then(function (res) {
                        for (var d = 0; d < ids.length; d++) {
                            for (var k = 0; k < _self.tableData.length; k++) {
                                if (_self.tableData[k].uuid == ids[d]) {
                                    _self.tableData.splice(k, 1);
                                }
                            }
                        }
                        _self.$message({
                            message: "删除成功",
                            type: "success"
                        });
                        _self.total = _self.tableData.length;
                        _self.loadingData(); //重新加载数据
                    }.bind(this), function (error) {
                        console.log(error)
                    })

                })
                .catch(function (e) {
                    if (e != "cancel") console.log("出现错误：" + e);
                });
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

        //修改：弹出Dialog
        editClick: function (val) {
            var _self = this;
            var uuid = val.uuid;
            axios.get('/dpapi/firecalculationlist/doFindById/' + uuid).then(function (res) {
                this.editParamForm = res.data.result;
                this.editFormulaForm = val;
            }.bind(this), function (error) {
                console.log(error)
            })
            this.editFormVisible = true;
        },

        //修改：保存按钮
        editSubmit: function (val1,val2) {

            var params = {
                uuid: val1.uuid,
                gsmc: val1.gsmc,
                gslb: val1.gslb,
                gssm: val1.gssm,
                jsgs: val1.jsgs,
                jsgsdw: val1.jsgsdw,

            };
            axios.post('/dpapi/firecalculationlist/updateByVO', params).then(function (res) {
                this.tableData[this.selectIndex].rolename = val.rolename;
                this.tableData[this.selectIndex].roleinfo = val.roleinfo;
                this.tableData[this.selectIndex].alterName = res.data.result.alterName;
                this.tableData[this.selectIndex].alterTime = new Date();
                this.tableData[this.selectIndex].resources = val.resource;
            }.bind(this), function (error) {
                console.log(error)
            })
            this.editFormVisible = false;
        },

        closeDialog: function (val1,val2) {
            this.addFormVisible = false;
            val.rolename = "";
            val.roleinfo = "";
        }
    },

})