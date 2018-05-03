//axios默认设置cookie
axios.defaults.withCredentials = true;
new Vue({
    el: '#app',
    data: function () {
        return {
            visible: false,
            //新建数据
            addForm: {
                dwid: "",//重点单位
                dwmc: "",
                yamc: "",//预案名称
                yalxdm: [],//预案类型
                yajb: "",//预案级别
                yazt: "",//预案状态
                sfkqy: "",//是否跨区域
                zzrmc: "",
                zzjg: "",
                zzsj: "",
                bz: ""//备注
            },
            //0新增
            status: '',
            loading: false,
            YALX_dataTree: [],
            YAJB_data: [],
            YAZT_data: [],
            SFKQY_data: [
                {
                    codeName: "是",
                    codeValue: "1"
                },
                {
                    codeName: "否",
                    codeValue: "0"
                }
            ],
            role_data: {},
            detailData: {},
            selectedZDDW: {},
            planDetailVisible: false,
            //树结构配置
            defaultProps: {
                children: 'children',
                label: 'codeName',
                value: 'codeValue'
            },
            fileList: [
                { name: '物美生活广场及地铁华苑站三维灭火预案.html', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100?isUpdated=true' },
                { name: '物美生活广场及地铁华苑站三维灭火预案.unity3d', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100?isUpdated=true' },
                { name: 'jquery.min.js', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100?isUpdated=true' },
                { name: 'UnityObject2.js', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100?isUpdated=true' }
            ],

        }
    },
    created: function () {

        this.YALX_tree();
        this.YAJB();
        this.YAZT();
        var url = location.search;
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            this.status = str.substring(3);
        }
    },
    mounted: function () {
        this.searchClick();
    },
    methods: {
        handleNodeClick(data) {
            console.log(data);
        },
        handleChange(value) {
            console.log(value);
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
            axios.post('/api/shiro').then(function (res) {
                this.role_data = res.data;
                this.addForm.zzrmc = this.role_data.realName;
                // this.addForm.zzjg=this.role_data.zzjgid;
            }.bind(this), function (error) {
                console.log(error);
            })
            if (this.status == 0) {
                this.addForm.yazt = '01';
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
                        this.addForm.yalxdm=[];
                        this.addForm.yalxdm.push(yalx);
                    } else {
                        var yalx1 = this.addForm.yalxdm.substring(0,1) +'0000'
                        var yalx2 = this.addForm.yalxdm
                        this.addForm.yalxdm=[];
                        this.addForm.yalxdm.push(yalx1,yalx2);
                    }
                    this.loading = false;
                }.bind(this), function (error) {
                    console.log(error)
                })
            }
        },
        //重点单位选择弹出页
        keyunitList: function (val) {
            var _self = this;
            _self.planDetailVisible = true;
            var shortURL = top.location.href.substr(0, top.location.href.indexOf("?"));
            history.pushState(null, null, shortURL)
            //异步加载详情页
            $(function () {
                $.ajax({
                    url: '../../../templates/digitalplan/digitalplan_addKeyunit.html',
                    cache: true,
                    async: true,
                    success: function (html) {
                        $("#detailDialog").html(html);
                    }
                });
            })
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
        //提交保存事件
        save: function () {
            if(this.status == 0){
                var params = {
                    dxid: this.addForm.dwid,
                    yamc: this.addForm.yamc,
                    yalxdm: this.addForm.yalxdm[this.addForm.yalxdm.length - 1],
                    yazt: this.addForm.yazt,
                    yajb: this.addForm.yajb,
                    sfkqy: this.addForm.sfkqy,
                    bz: this.addForm.bz,
                    // jgid: this.role_data.jgid,
                    // zzrid: this.role_data.userid,
                };
                axios.post('/dpapi/digitalplanlist/insertByVO', params).then(function (res) {
                    alert("成功保存"+res.data.result.length+"条预案");
                }.bind(this), function (error) {
                    console.log(error);
                })
            }else{
                var params = {
                    uuid: this.status,
                    dxid: this.addForm.dwid,
                    yamc: this.addForm.yamc,
                    yalxdm: this.addForm.yalxdm[this.addForm.yalxdm.length - 1],
                    yazt: this.addForm.yazt,
                    yajb: this.addForm.yajb,
                    sfkqy: this.addForm.sfkqy,
                    bz: this.addForm.bz,
                    // jgid: this.role_data.jgid,
                    // zzrid: this.role_data.userid,
                };
                axios.post('/dpapi/digitalplanlist/doUpdateByVO', params).then(function (res) {
                    alert("成功修改"+res.data.result.length+"条预案");
                }.bind(this), function (error) {
                    console.log(error);
                })
            }
            

        },
        //提交点击事件
        submit: function () {
            if(this.status == 0){
                var params = {
                    dxid: this.addForm.dwid,
                    yamc: this.addForm.yamc,
                    yalxdm: this.addForm.yalxdm[this.addForm.yalxdm.length - 1],
                    yazt: '03',
                    yajb: this.addForm.yajb,
                    sfkqy: this.addForm.sfkqy,
                    bz: this.addForm.bz,
                    // jgid: this.role_data.jgid,
                    // zzrid: this.role_data.userid,
                };
                axios.post('/dpapi/digitalplanlist/insertByVO', params).then(function (res) {
                    alert("成功提交"+res.data.result.length+"条预案");
                }.bind(this), function (error) {
                    console.log(error);
                })
            }else{
                debugger
                var params = {
                    uuid: this.status,
                    dxid: this.addForm.dwid,
                    yamc: this.addForm.yamc,
                    yalxdm: this.addForm.yalxdm[this.addForm.yalxdm.length - 1],
                    yazt: '03',
                    yajb: this.addForm.yajb,
                    sfkqy: this.addForm.sfkqy,
                    bz: this.addForm.bz,
                    // jgid: this.role_data.jgid,
                    // zzrid: this.role_data.userid,
                };
                axios.post('/dpapi/digitalplanlist/doUpdateByVO', params).then(function (res) {
                    alert("成功提交"+res.data.result.length+"条预案");
                }.bind(this), function (error) {
                    console.log(error);
                })
            }
            
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