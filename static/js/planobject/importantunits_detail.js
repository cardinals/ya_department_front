//axios默认设置cookie
axios.defaults.withCredentials = true;
new Vue({
    el: '#app',
    data: function () {
        return {
            activeName: "first",//tab页缺省标签
            uuid: "",
            //表数据
            tableData: [],//基本数据
            xfllData: [],//消防队伍数据
            jzl_zdbwData: [],//建筑类重点部位数据
            zzl_zdbwData: [],//装置类重点部位数据
            cgl_zdbwData: [],//储罐类重点部位数据
            jzl_jzfqData: [],//建筑类建筑分区数据
            zzl_jzfqData: [],//建筑类建筑分区数据
            cgl_jzfqData: [],//建筑类建筑分区数据
            yaData: [],//预案数据
            //消防措施显示标识：
            //安全疏散措施显示标识
            AQSSCS:false,
            //安全出口显示标识
            isAqckShow:false,
            //疏散楼梯显示标识
            isSsltShow:false,
            //消防电梯显示标识
            isXfdtShow:false,
            //避难层显示标识
            isBncShow:false,
            //应急广播显示标识
            isYjgbShow:false,
            //消防水系统显示标识
            XFSXT:false,
            //消防泵房显示标识
            isXfbfShow:false,
            //消防水箱显示标识
            isXfsxShow:false,
            //消防水池显示标识
            isXfscShow:false,
            //室内消火栓显示标识
            isSnxhsShow:false,
            //室外消火栓显示标识
            isSwxhsShow:false,
            //水泵接合器显示标识
            isSbjhqShow:false,
            //喷淋系统显示标识
            isPlxtShow:false,
            //冷却水系统显示标识
            isLqsxtShow:false,
            //固定水炮显示标识
            isGdspShow:false,
            //半固定设施显示标识
            isBgdssShow:false,
            //泡沫系统显示标识
            PMXT:false,
            //泡沫系统-泡沫泵房
            isPmbfShow:false,
            //泡沫系统-泡沫消火栓
            isPmxhsShow:false,
            //泡沫系统-固定泡沫炮
            isGdpmpShow:false,
            //泡沫系统-泡沫发生器
            isPmfsqShow:false,
            //泡沫系统-半固定设施
            isPmBgdssShow:false,
            //蒸汽灭火系统显示标识
            ZQMHXT:false,
            //蒸汽灭火系统-固定式
            isGdsShow:false,
            //蒸汽灭火系统-半固定式
            isBgdsShow:false,
            //消防控制室
            XFKZS:false,
            //防排烟措施
            FPYCS:false,
            //排烟口/出烟口
            isPycykShow:false,
            //防排烟措施-防排烟系统
            isFpyxtShow:false,
            //防火分区
            FHFQ:false,
            //其他灭火系统
            QTMHXT:false,
            //其他灭火系统-气体灭火系统
            isQtmhxtShow:false,
            //其他灭火系统-干粉灭火系统
            isGfmhxtShow:false,
            //其他消防设施
            QTXFSS:false,
            //消防措施数据：
            //安全出口data
            aqckData:[],
            //疏散楼梯data
            ssltData:[],
            //消防电梯data
            xfdtData:[],
            //避难层data
            bncData:[],
            //应急广播data
            yjgbData:[],
            //消防泵房data
            xfbfData:[],
            //消防水箱data
            xfsxData:[],
            //消防水池
            xfscData:[],
            //室内消火栓
            snxhsData:[],
            //室外消火栓
            swxhsData:[],
            //水泵接合器
            sbjhqData:[],
            //喷淋系统
            plxtData:[],
            //冷却水系统
            lqsxtData:[],
            //固定水炮
            gdspData:[],
            //半固定设施
            bgdssData:[],
            //泡沫系统-泡沫泵房
            pmbfData:[],
            //泡沫系统-泡沫消火栓
            pmxhsData:[],
            //泡沫系统-固定泡沫炮
            gdpmpData:[],
            //泡沫系统-泡沫发生器
            pmfsqData:[],
            //泡沫系统-半固定设施
            pmBgdssData:[],
            //蒸汽灭火系统-固定式
            gdsData:[],
            //蒸汽灭火系统-半固定式
            bgdsData:[],
            //消防控制室
            xfkzsData:[],
            //排烟口/出烟口
            pycykData:[],
            //防排烟措施-防排烟系统
            fpyxtData:[],
            //防火分区
            fhfqData:[],
            //其他灭火系统-气体灭火系统
            qtmhxtData:[],
            //其他灭火系统-干粉灭火系统
            gfmhxtData:[],
            //其他消防设施
            qtxfssData:[],

            //表高度变量
            tableheight: 474,
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
            total: 0,
            //基本数据保存
            rowdata: {},
            //预案数据保存
            yudata: {},
            //序号
            indexData: 0,
            //发送至邮箱是否显示
            emailDialogVisible: false,
            email: "",
            //信息分享是否显示
            shareDialogVisible: false,
            //信息打印是否显示
            printDialogVisible: false,
            //删除的弹出框
            deleteVisible: false,
            //新建页面是否显示
            addFormVisible: false,
            addLoading: false,
            addFormRules: {

            },
            //新建数据
            addForm: {
                DWMC: "",
                DWDJ: "",
                DWXZ: "",
                XZQY: "",
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

        }
    },
    mounted: function () {
        //根据重点单位id获取重点单位详情
        this.getDetails();
        //根据重点单位id获取消防队伍信息
        this.getXfllListByZddwIdo();
        //根据重点单位id获取建筑类重点部位详情集合
        this.getJzlListByZddwId();
        //根据重点单位id获取装置类重点部位详情集合
        this.getZzlListByZddwId();
        //根据重点单位id获取储罐类重点部位详情集合
        this.getCglListByZddwId();
        //根据重点单位id获取消防设施信息
        this.getXfssDetailByVo();
        //根据重点单位id获取预案信息
        this.getYaListByVo();
        
    },
    methods: {
        handleNodeClick(data) {
            console.log(data);
        },
        //标签页
        handleClick: function (e) {
            console.log(e);
        },
        //获取重点单位详情
        getDetails: function () {
            this.loading = true;
            var url = location.href;
            if (url.indexOf("?") != -1) {
                var tmp1 = url.split("?")[1];
                var ID = decodeURI(tmp1.split("=")[1]);
                this.uuid = ID;
                axios.get('/dpapi/importantunits/' + ID).then(function (res) {
                    this.tableData = res.data.result;
                    this.loading = false;
                    if (this.tableData !== []) {
                        //根据重点单位id获取包含的分区详情
                        this.getJzfqDetailByVo();
                    }
                }.bind(this), function (error) {
                    console.log(error)
                })
            }
        },
        //根据重点单位id获取消防队伍信息
        getXfllListByZddwIdo: function () {
            axios.get('/dpapi/importantunits/doFindXfllListByZddwId/' + this.uuid).then(function (res) {
                this.xfllData = res.data.result;
            }.bind(this), function (error) {
                console.log(error)
            })
        },
        //根据重点单位id获取建筑类重点部位详情
        getJzlListByZddwId: function () {
            axios.get('/dpapi/importantparts/doFindJzlListByZddwId/' + this.uuid).then(function (res) {
                this.jzl_zdbwData = res.data.result;
            }.bind(this), function (error) {
                console.log(error)
            })
        },
        //根据重点单位id获取装置类重点部位详情
        getZzlListByZddwId: function () {
            axios.get('/dpapi/importantparts/doFindZzlListByZddwId/' + this.uuid).then(function (res) {
                this.zzl_zdbwData = res.data.result;
            }.bind(this), function (error) {
                console.log(error)
            })
        },
        //根据重点单位id获取装置类重点部位详情
        getCglListByZddwId: function () {
            axios.get('/dpapi/importantparts/doFindCglListByZddwId/' + this.uuid).then(function (res) {
                this.cgl_zdbwData = res.data.result;
            }.bind(this), function (error) {
                console.log(error)
            })
        },
        //根据重点单位id获取建筑分区信息
        getJzfqDetailByVo: function () {
            var params = {
                uuid: this.tableData.uuid,
                jzfl: this.tableData.jzfl
            };
            axios.post('/dpapi/importantunits/doFindBuildingDetailsByVo/', params).then(function (res) {
                if (this.tableData.jzfl == 10 || this.tableData.jzfl == 20) {
                    this.jzl_jzfqData = res.data.result;
                } else if (this.tableData.jzfl == 30) {
                    this.zzl_jzfqData = res.data.result;
                } else if (this.tableData.jzfl == 40) {
                    this.cgl_jzfqData = res.data.result;
                }
            }.bind(this), function (error) {
                console.log(error)
            })
        },
        //通过重点单位id查询消防设施
        getXfssDetailByVo:function(){
            var params = {
                uuid:this.uuid
            }
            axios.post('/dpapi/importantunits/doFindFireFacilitiesDetailsByVo', params).then(function (res) {
                var data = res.data.result;
                for(var i in data){
                    switch(i){
                    //安全疏散措施
                        case'1000':
                            break;
                        case'1001':
                            this.AQSSCS = true;
                            this.isAqckShow = true;
                            this.aqckData = data[i];
                            break;
                        case'1002':
                            this.AQSSCS = true;
                            this.isSsltShow = true;
                            this.ssltData = data[i];
                            break;
                        case'1003':
                            this.AQSSCS = true;
                            this.isXfdtShow = true;
                            this.xfdtData = data[i];
                            break;
                        case'1004':
                            this.AQSSCS = true;
                            this.isBncShow = true;
                            this.bncData = data[i];
                            break;
                        case'1005':
                            this.AQSSCS = true;
                            this.isYjgbShow = true;
                            this.yjgbData = data[i];
                            break;
                    //消防水系统
                        case'2000':
                            break;
                        case'2001':
                            this.XFSXT = true;
                            this.isXfbfShow = true;
                            this.xfbfData = data[i];
                            break;
                        case'2002':
                            this.XFSXT = true;
                            this.isXfsxShow = true;
                            this.xfsxData = data[i];
                            break;
                        case'2003':
                            this.XFSXT = true;
                            this.isXfscShow = true;
                            this.xfscData = data[i];
                            break;
                        case'2004':
                            this.XFSXT = true;
                            this.isSnxhsShow = true;
                            this.snxhsData = data[i];
                            break;
                        case'2005':
                            this.XFSXT = true;
                            this.isSwxhsShow = true;
                            this.swxhsData = data[i];
                            break;
                        case'2006':
                            this.XFSXT = true;
                            this.isSbjhqShow = true;
                            this.sbjhqData = data[i];
                            break;
                        case'2007':
                            this.XFSXT = true;
                            this.isPlxtShow = true;
                            this.plxtData = data[i];
                            break;
                        case'2008':
                            this.XFSXT = true;
                            this.isLqsxtShow = true;
                            this.lqsxtData = data[i];
                            break;
                        case'2009':
                            this.XFSXT = true;
                            this.isGdspShow = true;
                            this.gdspData = data[i];
                            break;
                        case'2010':
                            this.XFSXT = true;
                            this.isBgdssShow = true;
                            this.bgdssData = data[i];
                            break;
                    //泡沫系统
                        case'3000':
                            break;
                        case'3001':
                            this.PMXT = true;
                            this.isPmbfShow = true;
                            this.pmbfData = data[i];
                            break;
                        case'3002':
                            this.PMXT = true;
                            this.isPmxhsShow = true;
                            this.pmxhsData = data[i];
                            break;
                        case'3003':
                            this.PMXT = true;
                            this.isGdpmpShow = true;
                            this.gdpmpData = data[i];
                            break;
                        case'3004':
                            this.PMXT = true;
                            this.isPmfsqShow = true;
                            this.pmfsqData = data[i];
                            break;
                        case'3005':
                            this.PMXT = true;
                            this.isPmBgdssShow = true;
                            this.pmBgdssData = data[i];
                            break;
                    //蒸汽灭火系统
                        case'4000':
                            break;
                        case'4001':
                            this.ZQMHXT = true;
                            this.isGdsShow = true;
                            this.gdsData = data[i];
                            break;
                        case'4002':
                            this.ZQMHXT = true;
                            this.isBgdsShow = true;
                            this.bgdsData = data[i];
                            break;
                    //消防控制室
                        case'5000':
                            this.XFKZS = true;
                            this.xfkzsData = data[i];
                            break;
                    //防排烟措施
                        case'6000':
                            break;
                        case'6001':
                            this.FPYCS = true;
                            this.isPycykShow = true;
                            this.pycykData = data[i];
                            break;
                        case'6002':
                            this.FPYCS = true;
                            this.isFpyxtShow = true;
                            this.fpyxtData = data[i];
                            break;
                    //防火分区
                        case'7000':
                            this.FHFQ = true;
                            this.fhfqData = data[i];
                            break;
                    //其他灭火系统
                        case'8000':
                            break;
                        case'8001':
                            this.QTMHXT = true;
                            this.isQtmhxtShow = true;
                            this.qtmhxtData = data[i];
                            break;
                        case'8002':
                            this.QTMHXT = true;
                            this.isGfmhxtShow = true;
                            this.gfmhxtData = data[i];
                            break;
                    //其他消防设施
                        case'9000':
                            this.QTXFSS = true;
                            this.qtxfssData = data[i];
                            break;
                    }
                }
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        //根据重点单位id获取预案信息
        getYaListByVo: function () {
            var params = {
                dxid: this.uuid,
            }
            axios.post('/dpapi/digitalplanlist/list', params).then(function (res) {
                this.yaData = res.data.result;
                console.log(this.yaData);
            }.bind(this), function (error) {
                console.log(error)
            })
        },
        //预案预览
        openPlan: function () {
            window.open("http://10.119.119.232/upload/123456/2018-03-21/70932ac7-da58-4419-91b6-ebe0b3f53838/%E7%89%A9%E7%BE%8E%E7%94%9F%E6%B4%BB%E5%B9%BF%E5%9C%BA%E5%8F%8A%E5%9C%B0%E9%93%81%E5%8D%8E%E8%8B%91%E7%AB%99%E4%B8%89%E7%BB%B4%E7%81%AD%E7%81%AB%E9%A2%84%E6%A1%88.html");
        },
        //预案下载
        downloadPlan: function () {
            window.open("http://10.119.119.232/upload/123456/2018-03-21/70932ac7-da58-4419-91b6-ebe0b3f53838/web%E7%89%88%E4%B8%89%E7%BB%B4%E9%A2%84%E6%A1%88.ZIP");
        },
        //预案详情跳转
        planDetails(val) {
            window.location.href = "../digitalplan/digitalplan_detail.html?ID=" + val.uuid;
            //     window.location.href = this.$http.options.root + "/dpapi" + "/keyunit/detail/" + val.pkid;
        },
        //发送至邮箱
        openEmail: function () {
            this.emailDialogVisible = true;
        },
        closeEmailDialog: function () {
            this.emailDialogVisible = false;
            this.email = "";
        },
        //信息分享
        openShare: function () {
            this.shareDialogVisible = true;
        },
        closeShareDialog: function () {
            this.shareDialogVisible = false;
        },
        //信息打印
        openPrinter: function () {
            // 1.设置要打印的区域 div的className
            var newstr = document.getElementsByClassName('main-box')[0].innerHTML;
            // 2. 复制给body，并执行window.print打印功能
            document.body.innerHTML = newstr
            window.print()
            // 重新加载页面，以刷新数据
            window.location.reload();

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
    },

})