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
                yalxdm: "",//预案类型
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
                    // debugger
                    this.detailData = res.data.result;
                    this.addForm = this.detailData;
                    //制作时间格式化
                    if (this.addForm.zzsj == null || this.addForm.zzsj == "") {
                        this.addForm.zzsj = '无';
                    } else {
                        this.addForm.zzsj = this.dateFormat(this.addForm.zzsj);
                    }
                    
                    // if (this.addForm.yalxdm.endsWith("0000")) {
                    //     this.addForm.yalxdm[0] = this.addForm.yalxdm;
                    // } else {
                    //     // this.addForm.yalxdm[0]=this.addForm.yalxdm;
                    // }
                    this.addForm.sfkqy = (this.addForm.sfkqy == 1 ? "是" : "否");
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
        dateFormat: function (row, column) {
            var rowDate = row[column.property];
            if (rowDate == null || rowDate == "") {
                return '';
            } else {
                var date = new Date(rowDate);
                if (date == undefined) {
                    return '';
                }
                var month = '' + (date.getMonth() + 1),
                    day = '' + date.getDate(),
                    year = date.getFullYear();

                if (month.length < 2) month = '0' + month;
                if (day.length < 2) day = '0' + day;

                return [year, month, day].join('-')
            }
        },
        // endsWith:function (String) {
        //     //判断当前字符串是否以str结束  
        //     if (typeof String.prototype.endsWith != 'function') {
        //         String.prototype.endsWith = function (str) {
        //             return this.slice(-str.length) == str;
        //         };
        //     }
        // },
        save: function () {
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
                alert("success");
                // res.data.result;
            }.bind(this), function (error) {
                console.log(error);
            })

        },
        //提交点击事件
        submit: function () {
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