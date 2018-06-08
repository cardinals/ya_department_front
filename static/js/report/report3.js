//加载面包屑
window.onload = function () {
	var type = getQueryString("type");
	if (type == "DPYL") {
		loadBreadcrumb("大屏预览", "report3");
	} else {
		loadBreadcrumb("report3", '-1');
	}
}

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
				name: ['化危品火灾爆炸', '建筑堆场类', '交通运输类', '危化品泄露事故', '交通事故',
					'建筑物坍塌事故', '自然灾害事故', '公共突发事件', '群众遇险事件', '群众求助救援'],
				value: [935, 535, 814, 232, 851, 332, 235, 156, 72, 74],
			},
			//pieTitle
			pieTitle: '各类型预案数量比例图',
			pieTitle1: '化危品火灾爆炸',
			pieTitle2: '建筑堆场类',
			pieTitle3: '交通运输类',
			pieTitle4: '危化品泄露事故',
			pieTitle5: '交通事故',
			pieTitle6: '建筑物坍塌事故',
			pieTitle7: '自然灾害事故',
			pieTitle8: '公共突发事件',
			pieTitle9: '群众遇险事件',
			pieTitle10: '群众求助救援',
			//pieData
			pieData: [
				{ value: 400, name: '化危品火灾爆炸' },
				{ value: 310, name: '建筑堆场类' },
				{ value: 204, name: '交通运输类' },
				{ value: 175, name: '危化品泄露事故' },
				{ value: 120, name: '交通事故' },
				{ value: 400, name: '建筑物坍塌事故' },
				{ value: 310, name: '自然灾害事故' },
				{ value: 204, name: '公共突发事件' },
				{ value: 175, name: '群众遇险事件' },
				{ value: 90, name: '群众求助救援' }
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
				{ name: '化危品火灾爆炸', childrenName: '化危品火灾爆炸1', count: '2999', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '化危品火灾爆炸', childrenName: '化危品火灾爆炸2', count: '1142', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '化危品火灾爆炸', childrenName: '化危品火灾爆炸3', count: '1218', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '化危品火灾爆炸', childrenName: '化危品火灾爆炸4', count: '1021', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '化危品火灾爆炸', childrenName: '化危品火灾爆炸5', count: '1455', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '化危品火灾爆炸', childrenName: '化危品火灾爆炸6', count: '1919', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '化危品火灾爆炸', childrenName: '化危品火灾爆炸7', count: '1299', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '化危品火灾爆炸', childrenName: '化危品火灾爆炸8', count: '1999', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '建筑堆场类', childrenName: '建筑堆场类1', count: '2751', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '交通运输类', childrenName: '交通运输类1', count: '1313', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '交通运输类', childrenName: '交通运输类2', count: '2999', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '交通运输类', childrenName: '交通运输类3', count: '1142', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '交通运输类', childrenName: '交通运输类4', count: '1218', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '危化品泄露事故', childrenName: '危化品泄露事故1', count: '1021', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '交通事故', childrenName: '交通事故1', count: '1455', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '交通事故', childrenName: '交通事故2', count: '1919', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '交通事故', childrenName: '交通事故3', count: '1299', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '交通事故', childrenName: '交通事故4', count: '1999', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '建筑物坍塌事故', childrenName: '建筑物坍塌事故1', count: '2751', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '建筑物坍塌事故', childrenName: '建筑物坍塌事故2', count: '1313', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '自然灾害事故', childrenName: '自然灾害事故1', count: '2999', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '自然灾害事故', childrenName: '自然灾害事故2', count: '1142', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '自然灾害事故', childrenName: '自然灾害事故3', count: '1218', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '自然灾害事故', childrenName: '自然灾害事故4', count: '1021', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '自然灾害事故', childrenName: '自然灾害事故5', count: '1455', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '公共突发事件', childrenName: '公共突发事件1', count: '1919', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '公共突发事件', childrenName: '公共突发事件2', count: '1299', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '群众遇险事件', childrenName: '群众遇险事件1', count: '1999', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '群众遇险事件', childrenName: '群众遇险事件2', count: '2751', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '群众遇险事件', childrenName: '群众遇险事件3', count: '1313', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '群众求助救援', childrenName: '群众求助救援1', count: '1313', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' }
			],
			//表高度变量
			tableheight: 482,//多选值
			multipleSelection: [],
			//当前页
			currentPage: 1,
			//分页大小
			pageSize: 10,
			//总记录数
			total: 31,
			//行数据保存
			rowdata: {

			},
			//序号
			indexData: 0,
			//显示加载中样
			loading: false,
			labelPosition: 'right',
		}
	},
	mounted: function () {
		this.barChart();
		this.pieChart();
	},
	created: function () {
		//菜单选中
		var index = getQueryString("index");
		$("#activeIndex").val(index);
		this.activeIndex = index;
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
		//表格重新加载数据
		loadingData: function () {
			var _self = this;
			_self.loading = true;
			setTimeout(function () {
				console.info("加载数据成功");
				_self.loading = false;
			}, 300);
		},
		//当前页修改事件
		currentPageChange: function (val) {
			this.currentPage = val;
			// console.log("当前页: " + val);
			var _self = this;
			_self.loadingData(); //重新加载数据
		},
		//根据参数部分和参数名来获取参数值 
		GetQueryString: function (name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if (r != null) return unescape(r[2]); return null;
		},
	}
})
