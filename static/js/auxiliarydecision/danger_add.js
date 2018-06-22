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
                publicSafety: ""
            },

        }
    },
    created: function () {
        //菜单选中
        var index = getQueryString("index");
        $("#activeIndex").val(index);
        this.activeIndex = index;

        this.getTypeData();
    },
    mounted: function () {
        this.status = getQueryString("ID");
        // this.searchClick();
    },
    methods: {
        handleNodeClick(data) {
        },
        //表格查询事件
        searchClick: function () {
            if (this.status == 0) {  //新增
            } else {//修改
                axios.post('/dpapi/danger/', params).then(function (res) {
                    this.tableData = res.data.result;
                    this.total = res.data.result.length;
                    _self.loading = false;
                }.bind(this), function (error) {
                    console.log(error);
                })
            }
        },
        getTypeData: function () {
            axios.get('/api/codelist/getCodetype/HXWXPLX').then(function (res) {
                this.typeData = res.data.result;
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        save: function () {
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
        }
    },

})