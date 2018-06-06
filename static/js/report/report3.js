var vm = new Vue({
	el: "#app",
	data: function () {
		return {
			//页面获取的uuid
			uuid: "",
			//搜索表单
			searchForm: {
				dateStart: "",
				dateEnd: "",
			},
			//barData
			barData: {
				name: ['化危品火灾爆炸', '建筑堆场类', '交通运输类', '危化品泄露事故', '交通事故', '建筑物坍塌事故', '自然灾害事故', '公共突发事件', '群众遇险事件', '群众求助救援'],
				value: [935, 535, 814, 232, 851, 332, 235, 156, 72, 74],
			},
			//pieTitle
			pieTitle: '各类型预案数量比例图',
			pieTitle1: '化危品火灾爆炸1',
			pieTitle2: '化危品火灾爆炸2',
			pieTitle3: '化危品火灾爆炸3',
			pieTitle4: '化危品火灾爆炸4',
			pieTitle5: '化危品火灾爆炸5',
			pieTitle6: '化危品火灾爆炸6',
			pieTitle7: '化危品火灾爆炸7',
			pieTitle8: '化危品火灾爆炸8',
			pieTitle9: '化危品火灾爆炸9',
			pieTitle10: '化危品火灾爆炸10',
			//pieData
			pieData: [
				{ value: 400, name: '氧化剂和有机过氧化物1' },
				{ value: 310, name: '自燃物品和遇温易燃物品2' },
				{ value: 204, name: '易燃固体3' },
				{ value: 175, name: '易燃液体4' },
				{ value: 120, name: '爆炸5' },
				{ value: 400, name: '氧化剂和有机过氧化物6' },
				{ value: 310, name: '自燃物品和遇温易燃物品7' },
				{ value: 204, name: '易燃固体8' },
				{ value: 175, name: '易燃液体9' },
				{ value: 90, name: '可燃气体10' }
			],
			pieData1: [
				{ value: 400, name: '氧化剂和有机过氧化物' }
			],
			pieData2: [
				{ value: 400, name: '氧化剂和有机过氧化物' },
				{ value: 310, name: '自燃物品和遇温易燃物品' },
				{ value: 204, name: '易燃固体' }
			],
			pieData3: [
				{ value: 400, name: '氧化剂和有机过氧化物' },
				{ value: 310, name: '自燃物品和遇温易燃物品' },
				{ value: 204, name: '易燃固体' },
				{ value: 175, name: '易燃液体' },
				{ value: 120, name: '爆炸' },
				{ value: 90, name: '可燃气体' }
			],
			pieData4: [
				{ value: 90, name: '可燃气体' }
			],
			pieData5: [
				{ value: 400, name: '氧化剂和有机过氧化物' },
				{ value: 310, name: '自燃物品和遇温易燃物品' },
				{ value: 204, name: '易燃固体' },
				{ value: 175, name: '易燃液体' },
				{ value: 120, name: '爆炸' },
				{ value: 90, name: '可燃气体' }
			],
			pieData6: [
				{ value: 204, name: '易燃固体' },
				{ value: 175, name: '易燃液体' }
			],
			pieData7: [
				{ value: 400, name: '氧化剂和有机过氧化物' },
				{ value: 90, name: '可燃气体' }
			],
			pieData8: [
				{ value: 120, name: '爆炸' },
				{ value: 90, name: '可燃气体' }
			],
			pieData9: [
				{ value: 400, name: '氧化剂和有机过氧化物' },
				{ value: 310, name: '自燃物品和遇温易燃物品' },
				{ value: 204, name: '易燃固体' },
				{ value: 175, name: '易燃液体' },
				{ value: 120, name: '爆炸' },
				{ value: 90, name: '可燃气体' },
				{ value: 175, name: '易燃液体' },
				{ value: 120, name: '爆炸' },
				{ value: 90, name: '可燃气体' }
			],
			pieData10: [
				{ value: 400, name: '氧化剂和有机过氧化物' },
				{ value: 310, name: '自燃物品和遇温易燃物品' },
				{ value: 120, name: '爆炸' },
				{ value: 90, name: '可燃气体' }
			],
			//tabledata
			tabledata: [
				{ name: '北京', count: '2999', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '河北', count: '1142', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '天津', count: '1218', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '辽宁', count: '1021', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '湖北', count: '1455', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '河南', count: '1919', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '新疆', count: '1299', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '西藏', count: '1999', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '山西', count: '2751', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '海南', count: '1313', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '北京', count: '2999', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '河北', count: '1142', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '天津', count: '1218', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '辽宁', count: '1021', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '湖北', count: '1455', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '河南', count: '1919', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '新疆', count: '1299', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '西藏', count: '1999', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '山西', count: '2751', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '海南', count: '1313', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '北京', count: '2999', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '河北', count: '1142', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '天津', count: '1218', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '辽宁', count: '1021', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '湖北', count: '1455', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '河南', count: '1919', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '新疆', count: '1299', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '西藏', count: '1999', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '山西', count: '2751', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '海南', count: '1313', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '海南', count: '1313', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' }
			],
			//表高度变量
			tableheight: 1320,
			//显示加载中样
			loading: false,
			labelPosition: 'right',
		}
	},
	mounted: function () {
		this.barChart();
		this.pieChart();
	},

	methods: {
		// 左侧柱状图
		barChart: function () {
			var myChart = echarts.init(document.getElementById('bar'));
			option = {
				title: {
					text: '各类型预案数量柱状图',
					x: 'center'
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {            // 坐标轴指示器，坐标轴触发有效
						type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
					}
				},
				grid: {
					top: '30',
					bottom: '10',
					left: '15',
					right: '40',
					containLabel: true
				},
				xAxis: [
					{
						type: 'category',
						data: this.barData.name,
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
						splitLine: {
							show: false
						},
					}
				],
				series: [
					{
						name: '预案数量',
						type: 'bar',
						barWidth: '100%',
						stack: '预案',
						barWidth: '16',
						data: this.barData.value,
						smooth: true,
						itemStyle: {
							normal: {
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
			myChart.on('click', function (param) {
				var index = param.dataIndex + 1;
				vm.pieData = eval("vm.pieData" + index);
				vm.pieTitle = eval("vm.pieTitle" + index);
				var pieChart = echarts.getInstanceByDom(document.getElementById("pie"));
				if (pieChart != null && pieChart != "" && pieChart != undefined) {  
					pieChart.dispose();  
				} 
				vm.pieChart();
			});
			// 此外param参数包含的内容有：
			// param.seriesIndex：系列序号（series中当前图形是第几个图形第几个，从0开始计数）
			// param.dataIndex：数值序列（X轴上当前点是第几个点，从0开始计数）
			// param.seriesName：legend名称
			// param.name：X轴值
			// param.data：Y轴值
			// param.value：Y轴值
			// param.type：点击事件均为click
			myChart.setOption(option);
		},
		// 右侧玫瑰图
		pieChart: function () {
			var myChart = echarts.init(document.getElementById('pie'));
			var option = {
				title: {
					text: this.pieTitle,
					left: 'center',
					top: 2,
				},
				tooltip: {
					trigger: 'item',
					formatter: "{a} <br/>{b} : {c} ({d}%)"
				},
				legend: {
					orient: 'vertical',
					x: '50%',
					y: 'center',
					itemGap: 16,
					itemWidth: 18,
					data: this.pieData.name,
					align: 'left',
					itemGap: 8,
				},
				series: [
					{
						name: this.pieTitle,
						type: 'pie',
						radius: '55%',
						center: ['25%', '50%'],
						data: this.pieData
							.sort(function (a, b) { return a.value - b.value; }),
						roseType: 'radius',
						label: {
							show: false,
						},
						animationType: 'scale',
						animationEasing: 'elasticOut',
						animationDelay: function (idx) {
							return Math.random() * 200;
						}
					}
				]
			};
			myChart.setOption(option);
		},
	}
})
