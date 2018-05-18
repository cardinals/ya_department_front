//axios默认设置cookie
axios.defaults.withCredentials = true;
new Vue({
    el: '#app',
    data: function () {
        return {
            //主页面------------------------------------------
            visible: false,
            disasterIndex:0,
            //新建数据
            addForm: {
                dwid: "",//重点单位
                dwmc: "",
                yamc: "",//预案名称
                yalxdm: [],//预案类型
                yajb: "",//预案级别
                yazt: "",//预案状态
                bz: ""//备注
            },
            //0新增
            status: '',
            loading1: false,
            loading2: false,
            YALX_dataTree: [],
            YAJB_data: [],
            YAZT_data: [],
            role_data: {},
            detailData: {},
            planDetailVisible: false,
            //树结构配置
            defaultProps: {
                children: 'children',
                label: 'codeName',
                value: 'codeValue'
            },
            rules: {
                dxmc: [
                    { required: true, message: '请选择预案对象', trigger: 'blur' }
                ],
                yamc: [
                    { required: true, message: '请输入预案名称', trigger: 'blur' }
                ],
                yalxdm: [
                    { type: 'array', required: true, message: '请选择预案类型', trigger: 'change' }
                ],
                yajb: [
                    { required: true, message: '请选择预案级别', trigger: 'change' }
                ]
            },
            fileList: [
                { name: '物美生活广场及地铁华苑站三维灭火预案.html', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100?isUpdated=true' },
                { name: '物美生活广场及地铁华苑站三维灭火预案.unity3d', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100?isUpdated=true' },
                { name: 'jquery.min.js', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100?isUpdated=true' },
                { name: 'UnityObject2.js', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100?isUpdated=true' }
            ],
            //弹出页---------------------------------------------------
            //搜索表单
            searchForm: {
                dwmc: ""
            },
            tableData: [],
            //表高度变量
            tableheight: 250,
            //显示加载中样
            loading: false,
            labelPosition: 'right',
            //多选值
            multipleSelection: [],
            //当前页
            currentPage: 1,
            //分页大小
            pageSize: 5,
            //总记录数
            total: 0,
            //序号
            indexData: 0,
            //选中的值显示
            sels: [],
            //选中的序号
            selectIndex: -1,
            dynamicValidateForm: {
                domains: [{
                    bwmc: '',
                    jzid: '',
                    rswz: '',
                    zqdj: '',
                    qhyy: '',
                    rsmj: '',
                    zhcs: '',
                    hzwxx: '',
                    qhbwgd: ''
                    // zqms: ''
                    // zqsdyj: '',
                    // llbs: [{
                    //     dzid: '',
                    //     djfalx: '',
                    //     tkwz: '',
                    //     clzbts: ''
                    // }],
                    // ydts: {
                    //     zsyd: '',
                    //     tbjs: ''
                    // }
                }]
            }
        }
    },
    created: function () {
        this.YALX_tree();
        this.YAJB();
        this.YAZT();
    },
    mounted: function () {
        var url = location.search;
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            this.status = str.substring(3);
        }
        this.searchClick();
    },
    methods: {
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        removeDomain(item) {
            var index = this.dynamicValidateForm.domains.indexOf(item)
            if (index !== -1) {
                this.dynamicValidateForm.domains.splice(index, 1)
            }
        },
        addDomain() {
            this.disasterIndex++;
            // debugger
            this.dynamicValidateForm.domains.push({
                zqIndex:this.disasterIndex,
                bwmc: '',
                jzid: '',
                rswz: '',
                zqdj: '',
                qhyy: '',
                rsmj: '',
                zhcs: '',
                hzwxx: '',
                qhbwgd: '',
                // zqms: '',
                // zqsdyj: '',
                // llbs: [{
                //     dzid: '',
                //     djfalx: '',
                //     tkwz: '',
                //     clzbts: ''
                // }],
                // ydts: {
                //     zsyd: '',
                //     tbjs: ''
                // }
                key: Date.now()
            });
        },

        //预案类型级联选择
        YALX_tree: function () {
            var params = {
                codetype: "YALX",
                list: [1, 2, 4, 6, 8]
            };
            axios.post('/api/codelist/getCodelisttree2', params).then(function (res) {
                this.YALX_dataTree = res.data.result;
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        //预案级别下拉框
        YAJB: function () {
            axios.get('/api/codelist/getCodetype/YAJB').then(function (res) {
                this.YAJB_data = res.data.result;
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        //预案状态下拉框
        YAZT: function () {
            axios.get('/api/codelist/getCodetype/YAZT').then(function (res) {
                this.YAZT_data = res.data.result;
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        //初始化查询（制作机构、制作人）
        searchClick: function () {
            this.loading1 = true;
            axios.post('/api/shiro').then(function (res) {
                this.role_data = res.data;
                this.addForm.zzrmc = this.role_data.realName;
                // this.addForm.zzjg=this.role_data.zzjgid;
            }.bind(this), function (error) {
                console.log(error);
            })
            if (this.status == 0) {
                this.addForm.yazt = '01';
                this.loading1 = false;
            } else {
                axios.get('/dpapi/digitalplanlist/doFindById/' + this.status).then(function (res) {
                    this.detailData = res.data.result;
                    this.addForm = this.detailData;
                    //制作时间格式化
                    if (this.addForm.zzsj == null || this.addForm.zzsj == "") {
                        this.addForm.zzsj = '无';
                    } else {
                        this.addForm.zzsj = this.dateFormat(this.addForm.zzsj);
                    }
                    //预案类型格式化
                    if (this.addForm.yalxdm.endsWith("0000")) {
                        var yalx = this.addForm.yalxdm;
                        this.addForm.yalxdm = [];
                        this.addForm.yalxdm.push(yalx);
                    } else {
                        var yalx1 = this.addForm.yalxdm.substring(0, 1) + '0000'
                        var yalx2 = this.addForm.yalxdm
                        this.addForm.yalxdm = [];
                        this.addForm.yalxdm.push(yalx1, yalx2);
                    }
                    this.loading1 = false;
                }.bind(this), function (error) {
                    console.log(error)
                })
            }
        },
        //重点单位选择弹出页
        keyunitList: function (val) {
            this.planDetailVisible = true;
            this.loading2 = true;
            var params = {
                dwmc: this.searchForm.dwmc
            };
            axios.post('/dpapi/importantunits/list', params).then(function (res) {
                this.tableData = res.data.result;
                this.total = res.data.result.length;
                this.loading2 = false;
            }.bind(this), function (error) {
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
        selectRow: function (val) {
            this.addForm.dxmc = val.dwmc;
            this.addForm.dxid = val.uuid;
            this.planDetailVisible = false;
            // this.closeDialog();
        },
        //时间格式化
        dateFormat: function (val) {
            var date = new Date(val);
            if (date == undefined) {
                return val;
            }
            var month = '' + (date.getMonth() + 1),
                day = '' + date.getDate(),
                year = date.getFullYear();

            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;

            var newDate = [year, month, day].join('-');
            return newDate;
        },
        //点击保存事件
        save: function (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.status == 0) {
                        var params = {
                            dxid: this.addForm.dwid,
                            yamc: this.addForm.yamc,
                            yalxdm: this.addForm.yalxdm[this.addForm.yalxdm.length - 1],
                            yazt: this.addForm.yazt,
                            yajb: this.addForm.yajb,
                            bz: this.addForm.bz,
                            // jgid: this.role_data.jgid,
                            // zzrid: this.role_data.userid,
                        };
                        axios.post('/dpapi/digitalplanlist/insertByVO', params).then(function (res) {
                            alert("成功保存" + res.data.result.length + "条预案");
                        }.bind(this), function (error) {
                            console.log(error);
                        })
                    } else {
                        var params = {
                            uuid: this.status,
                            dxid: this.addForm.dwid,
                            yamc: this.addForm.yamc,
                            yalxdm: this.addForm.yalxdm[this.addForm.yalxdm.length - 1],
                            yazt: this.addForm.yazt,
                            yajb: this.addForm.yajb,
                            bz: this.addForm.bz,
                            // jgid: this.role_data.jgid,
                            // zzrid: this.role_data.userid,
                        };
                        axios.post('/dpapi/digitalplanlist/doUpdateByVO', params).then(function (res) {
                            alert("成功修改" + res.data.result.length + "条预案");
                        }.bind(this), function (error) {
                            console.log(error);
                        })
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });


        },
        //提交点击事件
        submit: function (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.status == 0) {
                        var params = {
                            dxid: this.addForm.dwid,
                            yamc: this.addForm.yamc,
                            yalxdm: this.addForm.yalxdm[this.addForm.yalxdm.length - 1],
                            yazt: '03',
                            shzt: '01',
                            yajb: this.addForm.yajb,
                            bz: this.addForm.bz,
                            // jgid: this.role_data.jgid,
                            // zzrid: this.role_data.userid,
                        };
                        axios.post('/dpapi/digitalplanlist/insertByVO', params).then(function (res) {
                            alert("成功提交" + res.data.result.length + "条预案");
                        }.bind(this), function (error) {
                            console.log(error);
                        })
                    } else {
                        debugger
                        var params = {
                            uuid: this.status,
                            dxid: this.addForm.dwid,
                            yamc: this.addForm.yamc,
                            yalxdm: this.addForm.yalxdm[this.addForm.yalxdm.length - 1],
                            yazt: '03',
                            shzt: '01',
                            yajb: this.addForm.yajb,
                            bz: this.addForm.bz,
                            // jgid: this.role_data.jgid,
                            // zzrid: this.role_data.userid,
                        };
                        axios.post('/dpapi/digitalplanlist/doUpdateByVO', params).then(function (res) {
                            alert("成功提交" + res.data.result.length + "条预案");
                        }.bind(this), function (error) {
                            console.log(error);
                        })
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });

        },
        add_disaster: function () {

        },
        closeDialog: function (val) {
            this.planDetailVisible = false;
        },
        submitUpload() {
            this.upLoadData = { id: 2 };
            this.$refs.upload.submit();
        },
        handleRemove(file, fileList) {
        },
        handlePreview(file) {
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
    },

})