//axios默认设置cookie
axios.defaults.withCredentials = true;
new Vue({
    el: '#app',
    data: function () {
        return {
            //显示加载中样
            loading: false,
            loading1: false,
            //主页面------------------------------------------
            visible: false,
            //0新增
            status: '',
            //新建数据
            addForm: {
                dxid: "",//重点单位
                dxmc: "",
                xzqh: "",
                yamc: "",//预案名称
                yalxdm: [],//预案类型
                yajb: "",//预案级别
                yazt: "",//预案状态
                bz: "",//备注
                disasterList: []
            },
            //灾情设定
            dynamicValidateForm: [],

            //预案基本信息data
            YALX_dataTree: [],
            YAJB_data: [],
            YAZT_data: [],
            role_data: {},
            detailData: {},
            //灾情信息data
            zqIndex: '',
            dzIndex: '',
            RSWZ_dataTree: [],
            ZQDJ_dataTree: [],
            QHYY_data: [],
            ZHCS_data: [],
            HZWXX_data: [],
            DJFALX_data: [],
            //树结构配置
            defaultProps: {
                children: 'children',
                label: 'codeName',
                value: 'codeValue'
            },
            //校验规则
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
                // { name: '物美生活广场及地铁华苑站三维灭火预案.html', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100?isUpdated=true' },
                // { name: '物美生活广场及地铁华苑站三维灭火预案.unity3d', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100?isUpdated=true' },
                // { name: 'jquery.min.js', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100?isUpdated=true' },
                // { name: 'UnityObject2.js', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100?isUpdated=true' }
            ],
            upLoadData: {
                yaid: ""
            },
            //重点单位弹出页---------------------------------------------------
            unitsListVisible: false,
            loading_units: false,
            //当前页
            currentPage_units: 1,
            //分页大小
            pageSize_units: 5,
            //总记录数
            total_units: 0,
            //搜索表单
            searchForm_units: {
                dwmc: ""
            },
            tableData_units: [],
            //表高度变量
            tableheight_units: 250,

            //灾情部位弹出页---------------------------------------------------
            partsListVisible: false,
            loading_parts: false,
            //当前页
            currentPage_parts: 1,
            //分页大小
            pageSize_parts: 5,
            //总记录数
            total_parts: 0,
            //搜索表单
            searchForm_parts: {
                zdbwmc: ""
            },
            tableData_parts: [],
            //表高度变量
            tableheight_parts: 250,

            //所属建筑弹出页---------------------------------------------------
            buildingListVisible: false,
            loading_building: false,
            //当前页
            currentPage_building: 1,
            //分页大小
            pageSize_building: 5,
            //总记录数
            total_building: 0,
            //搜索表单
            searchForm_building: {
                zdbwmc: ""
            },
            tableData_building: [],
            //表高度变量
            tableheight_building: 250,

            //消防队站弹出页---------------------------------------------------
            fireStaListVisible: false,
            loading_fireSta: false,
            //当前页
            currentPage_fireSta: 1,
            //分页大小
            pageSize_fireSta: 5,
            //总记录数
            total_fireSta: 0,
            //搜索表单
            searchForm_fireSta: {
                dzmc: ""
            },
            tableData_fireSta: [],
            //表高度变量
            tableheight_fireSta: 250,
            // labelPosition: 'right',
            //多选值
            // multipleSelection: [],

            //序号
            // indexData: 0,
            //选中的值显示
            // sels: [],
            //选中的序号
            // selectIndex: -1,

        }
    },
    created: function () {
        //设置菜单选中
        $("#activeIndex").val(getQueryString("index"));
        this.YALX_tree();
        this.RSWZ_tree();
        this.ZQDJ_tree();
        this.YAJB();
        this.YAZT();
        this.QHYY();
        this.ZHCS();
        this.HZWXX();
        this.DJFALX();
    },
    mounted: function () {
        this.status = getQueryString("ID");
        // var url = location.search;
        // if (url.indexOf("?") != -1) {
        //     var str = url.substr(1);
        //     this.status = str.substring(3);
        // }
        this.searchClick();
    },
    methods: {
        // resetForm(formName) {
        //     this.$refs[formName].resetFields();
        // },
        //灾情删除
        removeDomain(item) {
            var index = this.dynamicValidateForm.indexOf(item)
            if (index !== -1) {
                this.dynamicValidateForm.splice(index, 1)
            }
        },
        //力量部署删除
        removellbs(item, num) {
            var index = this.dynamicValidateForm[num].forcedevList.indexOf(item)
            if (index !== -1) {
                this.dynamicValidateForm[num].forcedevList.splice(index, 1)
            }
        },
        //灾情增加
        addDomain() {
            this.dynamicValidateForm.push({
                bwmc: '',
                zdbwid: '',
                jzmc: '',
                jzid: '',
                rswz: '',
                zqdj: '',
                qhyy: '',
                rsmj: '',
                zhcs: '',
                hzwxx: '',
                qhbwgd: '',
                zqms: '',
                zqsdyj: '',
                forcedevList: [],
                keypointsMap: {
                    zsyd: '',
                    tbjs: '',
                },
                key: Date.now()
            });
        },
        //力量部署增加
        addDomainllbs(val) {
            this.dynamicValidateForm[val].forcedevList.push({
                dzid: '',
                dzmc: '',
                djfalx: '',
                tkwz: '',
                clzbts: ''
            })
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
        //燃烧物质级联选择
        RSWZ_tree: function () {
            // var params = {
            //     codetype: "RSWZ",
            //     list: [1, 3]
            // };
            // axios.post('/api/codelist/getCodelisttree2', params).then(function (res) {
            //     this.RSWZ_dataTree = res.data.result;
            // }.bind(this), function (error) {
            //     console.log(error);
            // })
            axios.get('/api/codelist/getCodetype/RSWZ').then(function (res) {
                this.RSWZ_dataTree = res.data.result;
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        //灾情等级级联选择
        ZQDJ_tree: function () {
            // var params = {
            //     codetype: "ZQDJ",
            //     list: [1, 4]
            // };
            // axios.post('/api/codelist/getCodelisttree2', params).then(function (res) {
            //     this.ZQDJ_dataTree = res.data.result;
            // }.bind(this), function (error) {
            //     console.log(error);
            // })
            axios.get('/api/codelist/getCodetype/ZQDJ').then(function (res) {
                this.ZQDJ_dataTree = res.data.result;
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
        //起火原因下拉框
        QHYY: function () {
            axios.get('/api/codelist/getCodetype/QHYY').then(function (res) {
                this.QHYY_data = res.data.result;
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        //灾害场所下拉框
        ZHCS: function () {
            axios.get('/api/codelist/getCodetype/ZHCS').then(function (res) {
                this.ZHCS_data = res.data.result;
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        //火灾危险性下拉框
        HZWXX: function () {
            axios.get('/api/codelist/getCodetype/HZWXX').then(function (res) {
                this.HZWXX_data = res.data.result;
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        //调集方案类型下拉框
        DJFALX: function () {
            axios.get('/api/codelist/getCodetype/DJFALX').then(function (res) {
                this.DJFALX_data = res.data.result;
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        //初始化查询（制作机构、制作人）
        searchClick: function () {
            this.loading1 = true;
            axios.post('/api/shiro').then(function (res) {
                this.role_data = res.data;
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
        //重点单位选择弹出页---------------------------------------------------------------
        keyunitList: function (val) {
            this.unitsListVisible = true;
            this.loading_units = true;
            var params = {
                dwmc: this.searchForm_units.dwmc
            };
            axios.post('/dpapi/importantunits/list', params).then(function (res) {
                this.tableData_units = res.data.result;
                this.total_units = res.data.result.length;
                this.loading_units = false;
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        //当前页修改事件
        currentPageChange_units: function (val) {
            this.currentPage_units = val;
            // console.log("当前页: " + val);
            var _self = this;
            _self.loadingData(); //重新加载数据
        },
        //选择重点单位，返回单位名称和id
        selectRow_units: function (val) {
            this.addForm.dxmc = val.dwmc;
            this.addForm.dxid = val.uuid;
            this.addForm.xzqh = val.xzqh;
            this.unitsListVisible = false;
        },
        //重点单位弹出页关闭
        closeDialog_units: function (val) {
            this.unitsListVisible = false;
        },
        //灾情部位选择弹出页---------------------------------------------------------------
        partsList: function (val) {
            this.zqIndex = val;
            if (this.addForm.dxid == null || this.addForm.dxid == "") {
                this.$message({
                    message: "请先选择预案对象",
                    showClose: true,
                });
            } else {
                this.partsListVisible = true;
                this.loading_parts = true;
                var params = {
                    zddwid: this.addForm.dxid,
                    zdbwmc: this.searchForm_parts.zdbwmc
                };
                axios.post('/dpapi/importantparts/list', params).then(function (res) {
                    this.tableData_parts = res.data.result;
                    this.total_parts = res.data.result.length;
                    this.loading_parts = false;
                }.bind(this), function (error) {
                    console.log(error);
                })
            }
        },
        //当前页修改事件
        currentPageChange_parts: function (val) {
            this.currentPage_parts = val;
            // console.log("当前页: " + val);
            var _self = this;
            _self.loadingData(); //重新加载数据
        },
        //选择重点部位，返回重点部位名称和id
        selectRow_parts: function (val) {
            var index = this.zqIndex;
            this.dynamicValidateForm[index].zdbwid = val.zdbwid
            this.dynamicValidateForm[index].bwmc = val.zdbwmc
            this.partsListVisible = false;
        },
        //灾情部位弹出页关闭
        closeDialog_parts: function (val) {
            this.partsListVisible = false;
        },
        //所属建筑选择弹出页---------------------------------------------------------------
        buildingList: function (val) {
            this.zqIndex = val;
            if (this.addForm.dxid == null || this.addForm.dxid == "") {
                this.$message({
                    message: "请先选择预案对象",
                    showClose: true,
                });
            } else {
                this.buildingListVisible = true;
                this.loading_building = true;
                var params = {
                    zddwid: this.addForm.dxid,
                    jzmc: this.searchForm_building.jzmc
                };
                axios.post('/dpapi/digitalplanlist/doSearchJzListByZddwId', params).then(function (res) {
                    this.tableData_building = res.data.result;
                    this.total_building = res.data.result.length;
                    this.loading_building = false;
                }.bind(this), function (error) {
                    console.log(error);
                })
            }
        },
        //当前页修改事件
        currentPageChange_building: function (val) {
            this.currentPage_building = val;
            // console.log("当前页: " + val);
            var _self = this;
            _self.loadingData(); //重新加载数据
        },
        //选择建筑，返回建筑名称和id
        selectRow_building: function (val) {
            var index = this.zqIndex;
            this.dynamicValidateForm[index].jzid = val.jzid
            this.dynamicValidateForm[index].jzmc = val.jzmc
            this.buildingListVisible = false;
        },
        //所属建筑弹出页关闭
        closeDialog_building: function (val) {
            this.buildingListVisible = false;
        },
        //消防队站选择弹出页---------------------------------------------------------------
        fireStaList: function (val, val1) {
            this.zqIndex = val;
            this.dzIndex = val1;
            if (this.addForm.dxid == null || this.addForm.dxid == "") {
                this.$message({
                    message: "请先选择预案对象",
                    showClose: true,
                });
            } else {
                this.fireStaListVisible = true;
                this.loading_fireSta = true;
                var params = {
                    xzqh: this.addForm.xzqh,
                    dzmc: this.searchForm_fireSta.dzmc
                };
                axios.post('/dpapi/xfdz/list', params).then(function (res) {
                    this.tableData_fireSta = res.data.result;
                    this.total_fireSta = res.data.result.length;
                    this.loading_fireSta = false;
                }.bind(this), function (error) {
                    console.log(error);
                })
            }
        },
        //当前页修改事件
        currentPageChange_fireSta: function (val) {
            this.currentPage_fireSta = val;
            // console.log("当前页: " + val);
            var _self = this;
            _self.loadingData(); //重新加载数据
        },
        //选择消防队站，返回消防队站名称和id
        selectRow_fireSta: function (val) {
            debugger
            var index = this.zqIndex;
            var index1 = this.dzIndex;
            this.dynamicValidateForm[index].forcedevList[index1].dzid = val.dzid
            this.dynamicValidateForm[index].forcedevList[index1].dzmc = val.dzmc
            this.fireStaListVisible = false;
        },
        //消防队站弹出页关闭
        closeDialog_fireSta: function (val) {
            this.fireStaListVisible = false;
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
                    if (this.status == 0) {//新增
                        var params = {
                            dxid: this.addForm.dxid,
                            dxmc: this.addForm.dxmc,
                            yamc: this.addForm.yamc,
                            yalx: this.addForm.yalxdm[this.addForm.yalxdm.length - 1],
                            yazt: '01',
                            yajb: this.addForm.yajb,
                            bz: this.addForm.bz,
                            disasterList: this.dynamicValidateForm,
                            zzrid: this.role_data.userid,
                            zzrmc: this.role_data.realName
                        };
                        axios.post('/dpapi/digitalplanlist/insertByVO', params).then(function (res) {
                            this.upLoadData.yaid = res.data.result.uuid;
                            this.submitUpload();//附件上传
                        }.bind(this), function (error) {
                            console.log(error);
                        })
                    } else {//修改
                        var params = {
                            uuid: this.status,
                            dxid: this.addForm.dwid,
                            yamc: this.addForm.yamc,
                            yalxdm: this.addForm.yalxdm[this.addForm.yalxdm.length - 1],
                            yazt: this.addForm.yazt,
                            yajb: this.addForm.yajb,
                            bz: this.addForm.bz,
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
        //附件上传回调方法
        handleSuccess(response, file, fileList) {
            this.$message({
                message: "成功保存预案",
                showClose: true,
                duration: 0
            });
            window.location.href = "digitalplan_list.html";
        },

        //提交点击事件
        submit: function (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.status == 0) { //新增
                        var params = {
                            dxid: this.addForm.dxid,
                            dxmc: this.addForm.dxmc,
                            yamc: this.addForm.yamc,
                            yalx: this.addForm.yalxdm[this.addForm.yalxdm.length - 1],
                            yazt: '03',
                            shzt: '01',
                            yajb: this.addForm.yajb,
                            bz: this.addForm.bz,
                            disasterList: this.dynamicValidateForm,
                            zzrid: this.role_data.userid,
                            zzrmc: this.role_data.realName
                        };
                        axios.post('/dpapi/digitalplanlist/insertByVO', params).then(function (res) {
                            this.$message({
                                message: "成功提交预案",
                                showClose: true,
                            });
                            window.location.href = "digitalplan_list.html";
                        }.bind(this), function (error) {
                            console.log(error);
                        })
                    } else { //修改
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
        //附件上传
        submitUpload() {
            // this.upLoadData = { id: 2 };
            this.$refs.upload.submit();
        },
        //上传前格式校验
        beforeUpload(file) {
            const self = this;  //this必须赋值
            const isZip = file.type === 'file/zip';
            const isRAR = file.type === 'file/rar';
            if (!isZip && !isRAR) {
                this.$message.error('仅可上传zip格式压缩文件!');
                this.fileList.splice(0, this.fileList.length);
            }
            return isZip || isRAR;
        },
        //附件移除
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
    },

})