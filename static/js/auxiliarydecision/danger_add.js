//加载面包屑
// window.onload=function(){
//     loadBreadcrumb("化学危险品", "-1");
// }
//axios默认设置cookie
axios.defaults.withCredentials = true;
new Vue({
    el: '#app',
    data: function () {
        return {
            //菜单编号
            activeIndex: '',
            //新增修改标识（0新增，uuid修改）
            status: '',
            //显示加载中样
            loading: false,
            typeData: [],
            role_data: [],
            //搜索表单
            addForm: {
                name: "",
                englishName: "",
                cas: "",
                rtecs: "",
                un: "",
                dangerId: "",
                expression: "",
                type: "",
                flag: "",
                alias: "",
                gbId: "",
                property: "",
                airDetermine: "",
                waterDetermine: "",
                tabu: "",
                thesaurus: "",
                symptom: "",
                firstaid: "",
                defendWay: "",
                dispose: "",
                store: "",
                leakWay: "",
                traffic: "",
                caution: "",
                bernProperty: "",
                mainApplication: "",
                poisionProperty: "",
                seprarate: "",
                publicSafety: "",
                cjrid: "",
                cjrmc: "",
                xgrid: "",
                xgrmc: ""
            },

        }
    },
    created: function () {
        //菜单选中
        var index = getQueryString("index");
        $("#activeIndex").val(index);
        this.activeIndex = index;

        this.getTypeData();
        this.roleData();
    },
    mounted: function () {
        this.status = getQueryString("ID");
        this.searchClick();
    },
    methods: {
        handleNodeClick(data) {
        },
        //当前登录用户信息
        roleData: function () {
            axios.post('/api/shiro').then(function (res) {
                this.role_data = res.data;
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        //表格查询事件
        searchClick: function () {
            this.loading = true;
            if (this.status == 0) {  //新增
                this.loading = false;
            } else {//修改
                axios.get('/dpapi/danger/' + this.status).then(function (res) {
                    this.addForm = res.data.result;
                    this.loading = false;
                }.bind(this), function (error) {
                    console.log(error);
                })
            }
        },
        //化危品类型查询
        getTypeData: function () {
            axios.get('/api/codelist/getCodetype/HXWXPLX').then(function (res) {
                this.typeData = res.data.result;
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        //保存
        save: function () {
            if (this.addForm.name == "" || this.addForm == null) {
                this.$message.warning({
                    message: '请输入中文名',
                    showClose: true
                });
            } else {
                axios.post('/dpapi/danger/doCheckName', this.addForm).then(function (res) {
                    if (res.data.result > 0) {
                        this.$message.warning({
                            message: '中文名已存在，请重新命名',
                            showClose: true
                        });
                    } else {
                        if (this.status == 0) {//新增
                            this.addForm.cjrid = this.role_data.userid;
                            this.addForm.cjrmc = this.role_data.realName;
                            axios.post('/dpapi/danger/insertByVO', this.addForm).then(function (res) {
                                if (res.data.result >= 1) {
                                    this.$alert('成功保存' + res.data.result + '条化危品信息', '提示', {
                                        type: 'success',
                                        confirmButtonText: '确定',
                                        callback: action => {
                                            window.location.href = "danger_list.html?index=" + this.activeIndex
                                        }
                                    });
                                } else {
                                    this.$alert('保存失败', '提示', {
                                        type: 'error',
                                        confirmButtonText: '确定',
                                        callback: action => {
                                            window.location.href = "danger_list.html?index=" + this.activeIndex
                                        }
                                    });
                                }
                            }.bind(this), function (error) {
                                console.log(error);
                            })
                        } else {//修改
                            this.addForm.xgrid = this.role_data.userid;
                            this.addForm.xgrmc = this.role_data.realName;
                            axios.post('/dpapi/danger/doUpdateDanger', this.addForm).then(function (res) {
                                if (res.data.result >= 1) {
                                    this.$alert('成功修改' + res.data.result + '条化危品信息', '提示', {
                                        type: 'success',
                                        confirmButtonText: '确定',
                                        callback: action => {
                                            window.location.href = "danger_list.html?index=" + this.activeIndex
                                        }
                                    });
                                } else {
                                    this.$alert('修改失败', '提示', {
                                        type: 'error',
                                        confirmButtonText: '确定',
                                        callback: action => {
                                            window.location.href = "danger_list.html?index=" + this.activeIndex
                                        }
                                    });
                                }
                            }.bind(this), function (error) {
                                console.log(error);
                            })
                        }
                    }
                }.bind(this), function (error) {
                    console.log(error);
                })
            }
        }
    },

})