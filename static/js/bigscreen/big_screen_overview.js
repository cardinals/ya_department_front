var vm = new Vue({
    el: "#app",
    data: {
        szhya: '1451523',
        zddw: '2727468',
        jzxx: '2727468',
        xfdz: '2727468',
        city: '',
        color: {
            a : '#ff6364',//red
            b : '#fdc107',//yellow
            c : '#29bb9d',//green
            d : '#556ca6'//blue
        },
        pieData: [
            { value: 1335, name: '一级防火等级' },
            { value: 1310, name: '二级防火等级' },
            { value: 1234, name: '三级防火等级' },
            { value: 434, name: '其他' }
        ],
        barData: {
            name : ['化危品火灾爆炸', '建筑堆场类','交通运输类','危化品泄露事故','交通事故','建筑物坍塌事故','自然灾害事故','公共突发事件','群众遇险事件','群众求助救援'],
            value : [935, 535, 814, 232, 851 , 332, 235, 156, 72, 74],
        },
        top10: [
            { name: '北京', value: '2999' },
            { name: '河北', value: '1142' },
            { name: '天津', value: '1218' },
            { name: '辽宁', value: '1021' },
            { name: '湖北', value: '1455' },
            { name: '河南', value: '1919' },
            { name: '新疆', value: '1299' },
            { name: '西藏', value: '1999' },
            { name: '山西', value: '2751' },
            { name: '海南', value: '1313' }
        ],
        scrollData:[
            {uuid:'1', zddwmc: '辽宁省人民法院',type:'1'},
            {uuid:'2', zddwmc: '辽宁省政府',type:'1'},
            {uuid:'3', zddwmc: '辽宁省就业局',type:'2'},
            {uuid:'4', zddwmc: '沈阳市城市规划管理局',type:'2'},
            {uuid:'5', zddwmc: '沈阳市公安局',type:'1'},
            {uuid:'6', zddwmc: '沈阳市地铁二号线',type:'2'},
            {uuid:'7', zddwmc: '青岛市塑性加工园',type:'1'},
            {uuid:'8', zddwmc: '泰安市城建局',type:'2'},
            {uuid:'9', zddwmc: '河北省国土资源厅',type:'1'},
            {uuid:'10', zddwmc: '秦皇岛市林业局',type:'1'}
        ],
        mapData: [
            {name:'西藏', value:605.83},
            {name:'青海', value:41670.44},
            {name:'宁夏', value:2102.21},
            {name:'海南', value:2522.66},
            {name:'甘肃', value:5020.37},
            {name:'贵州', value:5701.84},
            {name:'新疆', value:6610.05},
            {name:'云南', value:8893.12},
            {name:'重庆', value:10011.37},
            {name:'吉林', value:10568.83},
            {name:'山西', value:11237.55},
            {name:'天津', value:11307.28},
            {name:'江西', value:11702.82},
            {name:'广西', value:11720.87},
            {name:'陕西', value:12512.3},
            {name:'黑龙江', value:12582},
            {name:'内蒙古', value:14359.88},
            {name:'安徽', value:15300.65},
            {name:'北京', value:36251.93},
            {name:'福建', value:17560.18},
            {name:'上海', value:49195.69},
            {name:'湖北', value:19632.26},
            {name:'湖南', value:19669.56},
            {name:'四川', value:21026.68},
            {name:'辽宁', value:22226.7},
            {name:'河北', value:34515.76},
            {name:'河南', value:26931.03},
            {name:'浙江', value:32318.85},
            {name:'山东', value:45361.85},
            {name:'江苏', value:49110.27},
            {name:'广东', value:53210.28}
        ],
        tagscloudData: [
            {uuid:'1', zddwmc: '辽宁省人民法院'},
            {uuid:'2', zddwmc: '辽宁省政府'},
            {uuid:'3', zddwmc: '辽宁省就业局'},
            {uuid:'4', zddwmc: '沈阳市城市规划管理局'},
            {uuid:'5', zddwmc: '沈阳市公安局'},
            {uuid:'6', zddwmc: '沈阳市地铁二号线'},
            {uuid:'7', zddwmc: '青岛市塑性加工园'},
            {uuid:'8', zddwmc: '泰安市城建局'},
            {uuid:'9', zddwmc: '河北省国土资源厅'},
            {uuid:'10', zddwmc: '秦皇岛市林业局'}
        ]
    },
    methods: {
        // 中央下部31总队柱状图
        echarts1: function () {
            var myBarChart = echarts.init(document.getElementById('barmax'));
            BarmaxOption = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                // color: ['#0f82ee'],
                grid: {
                    top: '10',
                    bottom: '0',
                    left: '2%',
                    right: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: ['北京', '河北', '天津', '辽宁', '湖北', '河南', '湖北', '新疆',
                            '西藏', '山西', '陕西', '西安', '南京', '杭州', '山东', '昆明', '重庆', '武汉', '北京', '河北', '天津', '辽宁', '湖北', '河南', '湖北', '新疆',
                            '西藏', '山西', '陕西', '西安', '内蒙古'],
                        axisLine: {
                            lineStyle: {
                                color: 'white'
                            }
                        },
                        axisLabel: {
                            interval: 0,
                            /*
                            formatter:function(value)  
                            {  
                               return value.split("").join("\n");  
                            },
                            */
                            rotate: "45"
                        },
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        axisLine: {
                            lineStyle: {
                                color: 'white'
                            }
                        },
                        splitLine: {
                            show: false
                        },
                    }
                ],
                series: [
                    {
                        name: '数字化预案',
                        type: 'bar',
                        barWidth: '100%',
                        stack: '预案',
                        barWidth: '10',
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        { offset: 0, color: '#83bff6' },
                                        { offset: 0.5, color: '#188df0' },
                                        { offset: 1, color: '#0f82ee' }
                                    ]
                                )
                            },
                            emphasis: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        { offset: 0, color: '#188df0' },
                                        { offset: 0.7, color: '#188df0' },
                                        { offset: 1, color: '#83bff6' }
                                    ]
                                )
                            }
                        },
                        data: [1335, 335, 1035, 935, 335, 1335, 335, 670, 335, 1335, 335, 335, 335, 1335, 335, 1335, 335, 1335, 335, 1335, 335, 1335, 335, 1335, 335, 1335, 335, 1335, 335, 1335, 335,]
                    }
                ]
            };
            myBarChart.setOption(BarmaxOption);
        },
        // 中央中部地图
        echarts2: function () {
            var myMapChart = echarts2.init(document.getElementById('map'));
            MapOption = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}<br/>预案总量:{c}'
                },
                dataRange: {
                    show: false,
                    min: 0,
                    max: 500,
                    calculable: true,
                    color: ['maroon', 'purple', 'red', 'orange', 'yellow', 'lightgreen']
                },
                // backgroundColor: 'rgba(255, 255, 255, 0.1)', //rgba设置透明度0.1
                dataRange: {
                    orient: 'vertical',
                    x: '20px',
                    y: 'bottom',
                    min: 0,
                    max: 60000,
                    text:['60000','0'],           // 文本，默认为数值文本
                    textStyle: {
                        color: '#FFFFFF',
                        fontSize: 12
                    },
                    splitNumber:0,
                    // inRange: {
                        color: ['#ff6364','rgba(255, 255, 255, 0.2)']
                    // }
                    
                },
                series: [
                    {
                        name: '预案数量',
                        type: 'map',
                        mapType: 'china',
                        hoverable: true,
                        roam: false,
                        //图形样式
                        itemStyle: {
                            //默认样式
                            normal: {
                                areaStyle: {
                                    color: 'rgba(255, 255, 255, 0.2)'
                                },
                                borderColor: '#89B1D4',
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#FFFFFF',
                                        fontSize: 12
                                    }
                                }
                            },
                            //强调样式（悬浮时样式）
                            emphasis: {
                                areaStyle: {
                                    color: 'rgba(255, 255, 255, 0.4)'
                                },
                                borderColor: '#89B1D4',
                                borderWidth: '2',
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#FFFFFF',
                                        fontSize: 12
                                    }
                                }
                            }
                        },
                        data: this.mapData,
                    }
                ]
            };
            myMapChart.setOption(MapOption);
            myMapChart.on('click', function (params) {
                vm.$options.data.city = params.name;
                vm.$options.methods.loadChart();
            });
        },
        // 重点单位类型环形图
        echarts3: function () {
            var myPieChart = echarts.init(document.getElementById('pie'));
            PieOption = {
                tooltip: {
                    trigger: 'item',
                    formatter: "{b} <br/>{a}: {c} ({d}%)"
                },
                color: ['#ff6364', '#fdc107', '#29bb9d','#556ca6'],
                legend: {
                    orient: 'vertical',
                    x: '60%',
                    y: 'center',
                    itemGap: 16,
                    itemWidth: 18,
                    data: ['一级防火等级', '二级防火等级', '三级防火等级','其他'],
                    textStyle: {
                        color: 'white'
                    },
                    align: 'left'
                },
                series: [
                    {
                        name: '重点单位数量',
                        type: 'pie',
                        center: ['30%', '50%'],
                        radius: ['50%', '80%'],
                        label: {
                            normal: {
                                show:true,
                                position:'inner', //标签的位置
                                textStyle : {
                                    fontWeight : 300 ,
                                    fontSize : 4    //文字的字体大小
                                },
                                formatter:'{d}%'
                            }
                        },
                        data: this.pieData
                    }
                ]
            };

            myPieChart.setOption(PieOption);
        },
        // 预案类型柱状图
        echarts4: function () {
            var myBarChart = echarts.init(document.getElementById('bar'));

            BarOption = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                color: ['#eecd0f', '#0fee6c', '#0f82ee'],
                grid: {
                    left: '30px',
                    right: '18px',
                    top: '10px',
                    bottom: '10px',
                    containLabel: true
                },
                // grid: {
                //     left: '20px',
                //     right: '60px',
                //     top: '5px',
                //     bottom: '-10px',
                //     containLabel: true
                // },
                xAxis: [
                    {
                        type: 'category',
                        data: this.barData.name,
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: 'white'
                            }
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLabel: {
                            show: true,
                            interval: 0,
                            rotate: "40",
                            fontSize: 12
                        },
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: 'white'
                            }
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLabel: {
                            show: true,
                        },
                        splitLine: {
                            show: true,
                        },
                    }
                ],
                series: [
                    {
                        name: '数字化预案数量',
                        type: 'bar',
                        barWidth: '40%',
                        // stack: '预案',
                        data: this.barData.value,
                        barWidth: 6,
                        barGap: 10,
                        smooth: true,
                        itemStyle: {
                            emphasis: {
                                barBorderRadius: 7
                            },
                            normal: {
                                barBorderRadius: 7,
                                // 绿+蓝
                                color: function (params) {
                                    var colorList = ['#29bb9d', '#556ca6', '#29bb9d', '#556ca6', '#29bb9d', '#556ca6', '#29bb9d', '#556ca6', '#29bb9d', '#556ca6'];
                                    return colorList[params.dataIndex];
                                }
                            }
                        }
                    }
                ]
            };

            myBarChart.setOption(BarOption);
            myBarChart.on('click', function (params) {
                //跳出父框架（iframe）
                window.parent.frames.location.href="../../templates/report/report3.html?type=DPYL"+"&index=82";
            });
        },
        // top10排名柱状图
        echarts5: function () {
            var myBarChart = echarts.init(document.getElementById('top10Bar'));
            var category = [];
            var barData = [];
            this.top10.sort(this.up);
            console.log(this.top10);
            for (var i = 0; i < this.top10.length; i++) {
                category.push(this.top10[i].name);    //挨个取出类别并填入类别数组
                barData.push(this.top10[i].value);
            }

            BarOption = {
                // title: {
                //     text: '预案总数排行(top10)',
                //     left: 'center',
                //     top: 2,
                //     textStyle: {
                //         color: '#ccc'
                //     }
                // },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    left: '20px',
                    right: '60px',
                    top: '5px',
                    bottom: '-10px',
                    containLabel: true
                },
                xAxis: {
                    show: false,
                    type: 'value',
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: 'white'
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                },
                yAxis: {
                    type: 'category',
                    data: category,
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: '#e6e6e6'
                        },
                    },
                    axisLabel: {
                        inside: false,
                    },
                    axisTick: {
                        show: false
                    },
                    z: 10,
                    nameTextStyle: {
                        fontSize: 15
                    }
                },
                series: [
                    {
                        name: '预案数量',
                        type: 'bar',
                        data: barData,
                        barWidth: 6,
                        barGap: 10,
                        smooth: true,
                        label: {
                            normal: {
                                show: true,
                                position: 'right',
                                offset: [5, 0],
                                textStyle: {
                                    color: function (params){
                                        var colorList = ['#e6e6e6','#e6e6e6','#e6e6e6','#e6e6e6','#e6e6e6','#e6e6e6','#e6e6e6','#29bb9d','#fdc107','#ff6364'];
                                        return colorList[params.dataIndex];
                                    },
                                    fontSize: 13
                                }
                            }
                        },
                        itemStyle: {
                            emphasis: {
                                barBorderRadius: 7
                            },
                            normal: {
                                barBorderRadius: 7,
                                // 蓝色渐变
                                // color: new echarts.graphic.LinearGradient(
                                //     0, 0, 1, 0,
                                //     [
                                //         { offset: 0, color: '#3977E6' },
                                //         { offset: 1, color: '#37BBF8' }
                                //     ]
                                // ),
                                // 彩虹颜色
                                color: function (params){
                                    var colorList = ['#e6e6e6','#e6e6e6','#e6e6e6','#e6e6e6','#e6e6e6','#e6e6e6','#e6e6e6','#29bb9d','#fdc107','#ff6364'];
                                    return colorList[params.dataIndex];
                                }
                            }
                        }
                    }
                ]
            };

            myBarChart.setOption(BarOption);
            myBarChart.on('click', function (params) {
                //跳出父框架（iframe）
                window.parent.frames.location.href="../../templates/report/report1.html?type=DPYL"+"&index=81";
            });
        },
        //top10 json串排序
        up: function (x, y) {
            return x.value - y.value
        },
        loadChart: function () {
            window.open("../../templates/bigscreen/big_screen_map_pro.html?city=" + vm.$options.data.city);
        
        },
        autoAdd: function () {
            this.szhya++
            this.zddw++
            this.jzxx++
            this.xfdz++
        },
        getOrder: function (Min, Max) {
            var Range = Max - Min;
            var Rand = Math.random();
            var num = Min + Math.round(Rand * Range);
            return num;
        },
        //左下列表跳转预案审核
        jump: function () {
            //跳出父框架（iframe）
            window.parent.frames.location.href="../../templates/digitalplan/digitalplan_approve.html?type=DPYL"+"&index=34";
        }
    },
    mounted() {
        // this.echarts1()
        this.echarts2()
        this.echarts3()
        this.echarts4()
        this.echarts5()
        setInterval(() => {
            this.autoAdd()
        }, 1200)
    }
})