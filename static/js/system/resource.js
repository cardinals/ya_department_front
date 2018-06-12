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
      } ,
    created: function () {
       //菜单选中
       $("#activeIndex").val(getQueryString("index"));
    }, 
    methods: {
        handleNodeClick(data) {
            this.resourceForm = data;
        },
        update: function(){
          var realName = '';
          var userid = '';
          //获取当前登录用户realname和userid
          axios.get('/api/shiro').then(function (res) {
            realName = res.data.realName;
            userid = res.data.userid;
          }.bind(this), function (error) {
              console.log(error)
          });
          var params = {
            resourceid : this.resourceForm.resourceid,
            resourcename : this.resourceForm.resourcename,
            resourceinfo:this.resourceForm.resourceinfo,
            parentId:this.resourceForm.parentId,
            seqno:this.resourceForm.seqno,
            icon:this.resourceForm.icon,
            type:this.resourceForm.type,
          //  alterId:userid,
          //  alterName:realName
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
        
    }
})