$("#header_box").load("../pages/header_box.html #header_box");

new Vue({        
    el: '#app',
    data() {
        return {
          data: [{
            label: '消防物资',
                    children: [
						{
                        label: '水源',
                        children: [{
							label: '辽河'
							},
							{
							label: '青海湖'
                        	}]
						},
						{
						label: '灭火器',
                        children: [{
							label: '干粉灭火器'
							},
							{
							label: '泡沫灭火器'
                        	}]
						}
					]
                    }, 
					{
                    label: '消防力量',
                    children: [{
                        label: '辽宁',
                        children: [{
                        label: '大连分局'
                        },
						{
                        label: '沈阳分局'
                        }]
                    }, {
                        label: '山东',
                        children: [{
                        label: '青岛分局'
                        },
						{
                        label: '德州分局'
                        }]
                    }]
                    }, {
                    label: '重点单位',
                    children: [
						{
                        label: '易燃品制造企业',
                        children: [{
                        label: '造纸厂'
                        },
						{
                        label: '油厂'
                        }]
                    }, {
                        label: '重要器材单位',
                        children: [{
                        label: '电力公司'
                        },
						{
                        label: '发电站'
                        },{
                        label: '数据信息中心'
                        }]
                    }]
          }],
          defaultProps: {
            children: 'children',
            label: 'label'
          }
        };
      },
      methods: {
        handleNodeClick(data) {
          console.log(data);
        }
      }
})