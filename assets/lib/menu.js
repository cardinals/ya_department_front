$('#oscar-nav-btn').click(function () {
    $('.dada2').toggle();
});
//axios默认设置cookie
axios.defaults.withCredentials = true;
var menuData=[];
//var menuData=[{"resourceid":"18","resourcename":null,"resourceinfo":"首页","url":"/home","seqno":null,"index":"1","icon":null,"type":null,"parentId":"-1","children":[]},{"resourceid":"17","resourcename":null,"resourceinfo":"系统管理","url":"","seqno":null,"index":"2","icon":null,"type":null,"parentId":"-1","children":[{"resourceid":"1","resourcename":null,"resourceinfo":"用户管理","url":"/user","seqno":null,"index":"21","icon":null,"type":null,"parentId":"17","children":null},{"resourceid":"6","resourcename":null,"resourceinfo":"角色管理","url":"/role","seqno":null,"index":"22","icon":null,"type":null,"parentId":"17","children":null},{"resourceid":"19","resourcename":null,"resourceinfo":"资源管理","url":"/resource","seqno":null,"index":"23","icon":null,"type":null,"parentId":"17","children":null},{"resourceid":"24","resourcename":null,"resourceinfo":"权限管理","url":"/permission","seqno":null,"index":"24","icon":null,"type":null,"parentId":"17","children":null},{"resourceid":"12","resourcename":null,"resourceinfo":"代码集管理","url":"/codelist","seqno":null,"index":"25","icon":null,"type":null,"parentId":"17","children":null}]}];
axios.get('http://localhost:80/getMenu')				
        .then(function(res){
        console.log(240);   
        for(var i=0;i<res.data.result.length;i++){
            var obj=res.data.result[i];
            menuData.push({
                "index":obj.index,
                "resourceinfo":obj.resourceinfo,
                "children":obj.children,
                "url":obj.url,
            });
        }
        console.log(menuData);
    }.bind(this),function(error){
        console.log(error)
    });   

// 定义树节点
var treeMenuTemplate = [];
treeMenuTemplate.push('<li class="el-submenu" :class="[open ? \'\': \'\', selected ? \'is-active\':\'\']">');
treeMenuTemplate.push('<a class="db el-submenu__title" :id="model.index" @click="toggle" v-menu-animation="open" :style="{paddingLeft: paddingLeft + \'px\'}" :href="getUrl">');
treeMenuTemplate.push('<i class="el-icon-message" v-if="level == 1"></i>');
treeMenuTemplate.push('<template v-if="hasChildren()">');
treeMenuTemplate.push('<i class="el-submenu__icon-arrow" :class="[open ? \'el-icon-arrow-up\': \'el-icon-arrow-down\']"></i>');
treeMenuTemplate.push('</template>');
treeMenuTemplate.push('{{ model.resourceinfo }}');
treeMenuTemplate.push('</a>');
treeMenuTemplate.push('<ul class="el-menu" :class="[open ? \'\' : \'dn\']" v-if="hasChildren()">');
treeMenuTemplate.push('<tree-menu v-for="item in model.children" :model="item" :level="level + 1" :theId="theId"></tree-menu>');
treeMenuTemplate.push('</ul>');
treeMenuTemplate.push('</li>');

 Vue.component('tree-menu', {
    template: treeMenuTemplate.join(''),

    created: function () {
        var index = this.model.index;
        var hasIndex = this.theId.search(index);
        var lala = index.replace(this.theId, '');
        if (hasIndex == 0) {
            this.open = true;
        }
        if (hasIndex == 0 && lala.length == 0) {
            this.selected = true;
        }
    },

    props: ['model', 'level', 'theId'],

    computed: {
        getUrl: function () {
            if (this.hasChildren()) {
                return "javascript:;";
            }
            var realUrl="";
            if(this.model.url=="/user"){
                realUrl="../pages/user-list2.html"
            }
            else if(this.model.url=="/role"){
                realUrl="../pages/role_list.html"
            }
            else if(this.model.url=="/permission"){
                realUrl="../pages/permission_list.html"
            }
            else if(this.model.url=="/codelist"){
                realUrl="../pages/codelist.html"
            }
            else if(this.model.url=="/index"){
                realUrl="../pages/index.html"
            }
            return realUrl;
        }
    },

    data: function () {
        return {
            open: true,
            paddingLeft: this.level * 20,
            selected: false,
            
        };
    },

    methods: {
        hasChildren: function () {
            return this.model.children && this.model.children.length;
        },

        toggle: function () {
            if (this.hasChildren()) {
                this.open = !this.open;
            }
        },
    }

});

Vue.directive('menu-animation', function (el, binding) {
    var open = (binding.value);
    var ulElement = $(el).parent().children('ul');
    if (open) {
        ulElement.slideDown(200);
    } else {
        ulElement.slideUp(200);
    }
});

// 定义外围树
var bigTreeTemplate = [];
bigTreeTemplate.push('<div class="tree-menu">');
bigTreeTemplate.push('<ul v-for="menuItem in theModel" class="el-menu">');
bigTreeTemplate.push('<tree-menu :model="menuItem" :level="theLevel" :theId="defaultActive"></tree-menu>');
bigTreeTemplate.push('</ul>');
bigTreeTemplate.push('</div>');

Vue.component('big-tree', {
    template: bigTreeTemplate.join(''),

    props: ['defaultActive'],

    created: function () {

     },

    data: function () {
        return {
            theModel: menuData,
            theLevel: 1
        };
    },


});

var bigTree = Vue.extend({
   
});

new bigTree().$mount('big-tree');
//左侧菜单的开合
$('#menu-toggle-btn').click(function () {
    var left = $('.left-sidebar'),
        main = $('.main-box'),
        $this = $(this);
    if (left.hasClass('damin')) {
        left.removeClass('damin').css('left', '0');
        main.css('padding-left', '240px');
        setTimeout(function () {
            $this.removeClass('menu-toggle-bg').css({ "right": "0", "transform": "rotateY(0)" });
        }, 300);
    } else {
        left.addClass('damin').css('left', '-240px');
        main.css('padding-left', 0);
        setTimeout(function () {
            $this.addClass('menu-toggle-bg').css({ "right": "-26px", "transform": "rotateY(180deg)" });
        }, 300);
    }
});

