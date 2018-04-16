//axios默认设置cookie
axios.defaults.withCredentials = true;	
new Vue({
    el: '#app',
    data: function () {
        return {
             /**lxy start */
             fileList: [
                {name: '物美生活广场及地铁华苑站三维灭火预案.html', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100?isUpdated=true'}, 
                {name: '物美生活广场及地铁华苑站三维灭火预案.unity3d', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100?isUpdated=true'},
                {name: 'jquery.min.js', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100?isUpdated=true'}, 
                {name: 'UnityObject2.js', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100?isUpdated=true'}
              ],
           
            upLoadData:{
                id:1
            },
            /**lxy end */
            //搜索表单
            searchForm: {
                YAMC: "",
                selected_YALX: "",
                DXMC: "",
                option_DXLX: "",
                option_YAZL: "",
                BZRQ:new Array()
            },
            tableData: [],
            testData:{
                pkid:"67833B5FB1232169E053B077770AE86",
                yamc:"物美生活广场及地铁华苑站三维灭火预案",
                yalxdm:"人员密集场所",
                dxmc:"物美生活广场及地铁华苑站",
                dxlxdm:"灭火预案单位",
                zzdwmc:"",
                zzrq:"2016-03-16",
                yazl:"对象预案"
            },
            detailTestData:{
                pkid:"67833B5FB1232169E053B077770AE86",
                yamc:"物美生活广场及地铁华苑站三维灭火预案",
                dxmc:"物美生活广场及地铁华苑站",
                yalxdm:"人员密集场所",
                yazl:"对象预案",
                yabbh:"A",
                sfkqy:"是",
                zzdwmc:"",
                zzrmc:"zhuolh@ha",
                zzrq:"2016-03-16",
                bz:""
            },
            XFGX_data: [],
            selected_XFGX: [],
            YALX_data: [],
            DXLX_data: [],
            YAZL_data: [],
            defaultKeys: [],
            //后台返回编制单位列表
			 allFormationList:[
			 {
				 id: 1,
				 formationinfo: '系统管理',
				 children: [{
					 id: 3,
					 formationinfo: '用户管理',
					 children: [{
						 id: 9,
						 formationinfo: '查询'
					 },
					 {
						 id: 10,
						 formationinfo: '新增'
					 },
					 {
						 id: 11,
						 formationinfo: '修改'
					 },
					 {
						 id: 12,
						 formationinfo: '删除'
					 }]
				 },{
					 id: 4,
					 formationinfo: '角色管理',
					 children: [{
						 id: 13,
						 formationinfo: '查询'
					 },
					 {
						 id: 14,
						 formationinfo: '新增'
					 },
					 {
						 id: 15,
						 formationinfo: '修改'
					 },
					 {
						 id: 16,
						 formationinfo: '删除'
					 }]
				 },{
					 id: 5,
					 formationinfo: '权限管理',
					 children: [{
						 id: 17,
						 formationinfo: '查询'
					 },
					 {
						 id: 18,
						 formationinfo: '新增'
					 },
					 {
						 id: 19,
						 formationinfo: '修改'
					 },
					 {
						 id: 20,
						 formationinfo: '删除'
					 }]
				 },]
			 },
			 {
				 id: 2,
				 formationinfo: '重点单位',
				 children: [{
					 id: 6,
					 formationinfo: '公安部',
                 },
                 {
                    id: 7,
                    formationinfo: '个体',
                },
                {
                    id: 8,
                    formationinfo: '政府部门',
                },
                ]
			 }
			 ],
            //树结构配置
            treeDefaultProps: {
                children: 'children',
                label: 'formationinfo'
            },
            //资源列表是否显示
            planDetailVisible: false,
            //表高度变量
            tableheight: 443,
            //显示加载中样
            loading: false,
            //多选值
            multipleSelection: [],
            //当前页
            currentPage: 1,
            //分页大小
            pageSize: 10,
            //总记录数
            total: 0,
            //预案详情页
            detailData: [],
            //详情页日期
            detailYMD:"",
            //序号
            indexData: 0,
            //删除的弹出框
            deleteVisible: false,
            //新建页面是否显示
            addFormVisible: false,
            addLoading: false,
            addFormRules: {
            },
            //新建数据
            addForm: {
                YAMC: "",
                DWDJ: "",
                DXMC: "",
                YALX: "",
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
            editLoading: false,
            editFormRules: {
            },
            //编辑界面数据
            planDetail: {
                YAMC: "",
                DWDJ: "",
                DXMC: "",
                YALX: "",
                DWDZ: "",
                ZDMJ: "",
                XFGXJGID: ""
            },
            defaultProps:{
                value:'codeValue',
                label:'codeName'
            }
          
        }
    },
    created:function(){
        this.YALX();
        this.DXLX();
        this.YAZL();
        this.searchClick();
    },

    methods: {        
        handleNodeClick(data) {
            console.log(data);
        },
        handleChange(value) {
            console.log(value);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        
        //预案类型
        YALX: function(){
            axios.get('/api/codelist/getCodetype/YALX').then(function(res){
                this.YALX_data = res.data.result;
            }.bind(this),function(error){
                console.log(error);
            })
        },
        //对象类型
        DXLX: function(){
            axios.get('/api/codelist/getCodetype/YADXLX').then(function(res){
                this.DXLX_data = res.data.result;
            }.bind(this),function(error){
                console.log(error);
            }) 
        },
        //预案种类
        YAZL:function(){
            axios.get('/api/codelist/getCodetype/YAZL').then(function(res){
                this.YAZL_data = res.data.result;
            }.bind(this),function(error){
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
            _self.loading = true;//表格重新加载
            var params={
                yamc:this.searchForm.YAMC,
                yalxdm:this.searchForm.selected_YALX,
                dxmc:this.searchForm.DXMC,
                dxlxdm: this.searchForm.option_DXLX,
                yazl:this.searchForm.option_YAZL,
                begintime_create:this.searchForm.BZRQ[0],
                endtime_create:this.searchForm.BZRQ[1]
            }
            axios.post('/dpapi/digitalplanlist/findByVO',params).then(function(res){
                this.tableData = res.data.result;
                for(var i=0;i<this.tableData.length;i++){
                    for(var k=0;k<this.YALX_data.length;k++){
                        if(this.YALX_data[k].codeValue == this.tableData[i].yalxdm){
                            this.tableData[i].yalxdm = this.YALX_data[k].codeName;
                        }
                    }
                    for(var m=0;m<this.YAZL_data.length;m++){
                        if(this.YAZL_data[m].codeValue == this.tableData[i].yazl){
                            this.tableData[i].yazl = this.YAZL_data[m].codeName;
                        }
                    }
                    for(var h=0;h<this.DXLX_data.length;h++){
                        if(this.DXLX_data[h].codeValue == this.tableData[i].dxlxdm){
                            this.tableData[i].dxlxdm = this.DXLX_data[h].codeName;
                        }
                    }
                }
                this.tableData.unshift(this.testData);
                _self.total = _self.tableData.length;
                _self.loading = false;
                console.log("success")
            }.bind(this),function(error){
                console.log("failed")
            })
        },
        clearClick: function () {
            this.searchForm.YAMC="";
            this.searchForm.selected_YALX="";
            this.searchForm.DXMC="";
            this.searchForm.option_DXLX="";
            this.searchForm.option_YAZL="";
            this.searchForm.BZRQ.splice(0,this.searchForm.BZRQ.length);
            this.$refs.tree.setCheckedKeys([]);
        },
        //时间格式
        bzrqChange(val) {
            this.searchForm.BZRQ.splice(0,this.searchForm.BZRQ.length);
            this.searchForm.BZRQ.push(val.substring(0,val.indexOf("至")));
            this.searchForm.BZRQ.push(val.substring(val.indexOf("至")+1));
            console.log(this.searchForm.BZRQ);
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

        //表格勾选事件
        selectionChange: function (val) {
            this.multipleSelection = val;
            console.info(val);
        },

        //预案详情
        planDetails: function (val) {
            var _self = this;
            _self.planDetailVisible = true;
            var shortURL=top.location.href.substr(0,top.location.href.indexOf("?"))+"?pkid=" + val.pkid;
            history.pushState(null,null,shortURL)
            //异步加载详情页
            $(function() {  
                $.ajax({  
                    url : '../../../templates/digitalplan/digitalplan_detail.html',  
                    cache : true,  
                    async: true,
                    success : function(html) {  
                        $("#detailDialog").html(html);  
                    }  
                });  
            })
        },
        //预案预览
        openPlan:function(){
            window.open("http://10.119.119.232/upload/123456/2018-03-21/70932ac7-da58-4419-91b6-ebe0b3f53838/%E7%89%A9%E7%BE%8E%E7%94%9F%E6%B4%BB%E5%B9%BF%E5%9C%BA%E5%8F%8A%E5%9C%B0%E9%93%81%E5%8D%8E%E8%8B%91%E7%AB%99%E4%B8%89%E7%BB%B4%E7%81%AD%E7%81%AB%E9%A2%84%E6%A1%88.html");
        },
        //预案下载
        downloadPlan:function(){
            window.open("http://10.119.119.232/upload/123456/2018-03-21/70932ac7-da58-4419-91b6-ebe0b3f53838/web%E7%89%88%E4%B8%89%E7%BB%B4%E9%A2%84%E6%A1%88.ZIP");
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
            console.log("每页 " + val + " 条");
            this.pageSize = val;
            var _self = this;
            _self.loadingData(); //重新加载数据
        },
        //当前页修改事件
        currentPageChange: function (val) {
            this.currentPage = val;
            console.log("当前页: " + val);
            var _self = this;
            _self.loadingData(); //重新加载数据
        },
        closeDialog: function (val) {
            this.planDetailVisible = false;        
        }
        /**
        * lxy
        */
        ,
        submitUpload() {
            this.upLoadData= {id:2};
            this.$refs.upload.submit();
        },
        handleRemove(file, fileList) {

            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        }

    },

})