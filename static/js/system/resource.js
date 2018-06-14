//加载面包屑
window.onload=function(){
    loadBreadcrumb("资源管理", "-1");
}
//axios默认设置cookie
axios.defaults.withCredentials = true;
new Vue({        
    el: '#app',
    data() {
        return {
          //表数据
          tableData: [],//Grid中数据
          defaultProps: {
            children: 'children',
            label: 'resourceinfo'
          },
          resourceForm:"",
          //全部资源列表
          allPermissionList:[],
          //资源权限列表
          permissionDetailList: [],
          permissionDetailSelect:[],
        };
      },
      mounted:function(){
        axios.get('http://localhost/api/resource/getAll').then(function(res){
            this.tableData = res.data.result;
        }.bind(this),function(error){
            console.log(error)
        }),
        this.total = this.tableData.length;
        
        // axios.get('http://localhost/api/role/getRole/{userid}').then(function(res){
        //     console.log(res.data.result);
        //     this.tableData = res.data.result;
        // }.bind(this),function(error){
        //     console.log(error)
        // }),
        // this.total = this.tableData.length;
        //  this.resourceList=val;
        //  var _self = this;
        //  _self.resourceVisible=true;
        this.getAllPermissions();
      } ,
    created: function () {
       //菜单选中
       $("#activeIndex").val(getQueryString("index"));
    }, 
    methods: {
        handleNodeClick(data) {
            this.findResourceById(data.resourceid);
            this.permissionDetailSelect = [],
            this.permissionDetails(data.resourceid);
        },
        update: function(){
          var permission = new Array();
          for(var i in this.permissionDetailSelect){
            var params = {
              permissionid:this.permissionDetailSelect[i]
            }
            permission.push(params);
          }
          var params = {
            resourceid : this.resourceForm.resourceid,
            resourcename : this.resourceForm.resourcename,
            resourceinfo:this.resourceForm.resourceinfo,
            parentId:this.resourceForm.parentId,
            seqno:this.resourceForm.seqno,
            icon:this.resourceForm.icon,
            type:this.resourceForm.type,
            permissions:permission
          }
          axios.post('/api/resource/updateByVO', params).then(function(res){
            this.resourceForm = res.data.result;
            this.$message({
              showClose: true,
              message: '更新成功',
              type: 'success'
            });
            
          }.bind(this),function(error){
            console.log(error)
          })
        },
        append(data) {
            const newChild = { id: id++, label: 'testtest', children: [] };
            if (!data.children) {
              this.$set(data, 'children', []);
            }
            data.children.push(newChild);
          },
    
          remove(node, data) {
            const parent = node.parent;
            const children = parent.data.children || parent.data;
            const index = children.findIndex(d => d.id === data.id);
            children.splice(index, 1);
          },
          getAllPermissions: function(){
            axios.get('/api/permission/getAll').then(function(res){
                this.allPermissionList = res.data.result;
            }.bind(this),function (error) {
                console.log(error);
            })
          },

        //获取复选框选中值
        getCheckValue(val){
          this.editFormSelect = val;
        },
        //资源详情
        findResourceById:function(resourceid){
          axios.get('/api/resource/'+resourceid).then(function(res){
            this.resourceForm = res.data.result;
          }.bind(this),function (error) {
              console.log(error);
          })
        },
        //权限详情
        permissionDetails: function(id){
          axios.get('/api/permission/getPermission/' + id).then(function(res){
              this.permissionDetailList = res.data.result;
              if(this.permissionDetailList.length>0){
                for(var i=0;i<this.permissionDetailList.length;i++){
                    this.permissionDetailSelect.push(this.permissionDetailList[i].permissionid);
                }
              }
          }.bind(this),function(error){
              console.log(error)
          })
      },
      cancel:function(){
        this.findResourceById(this.resourceForm.resourceid);
        this.permissionDetailSelect = [],
        this.permissionDetails(this.resourceForm.resourceid);
      },
    }
})