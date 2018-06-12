//加载面包屑
window.onload = function () {
	var type = getQueryString("type");
	if (type == "DPYL") {
		loadBreadcrumb("大屏预览", "31总队预案数量统计页面");
	} else {
		loadBreadcrumb("31总队预案数量统计页面", '-1');
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
		this.echarts1();
	},
	created: function () {
		//菜单选中
		$("#activeIndex").val(getQueryString("index"));
	},
	methods: {
		// 中央下部31总队柱状图
		echarts1: function () {
			var myBarChart = echarts.init(document.getElementById('bar'));
			BarmaxOption = {
				title: {
					text: '31总队预案总数柱状图',
					x: 'center'
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {            // 坐标轴指示器，坐标轴触发有效
						type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
					}
				},
				legend: {
					orient: 'horizontal',
					x: 'center',
					y: '20px',
					itemGap: 16,
					itemWidth: 18,
					data: this.tabledata.name,
					align: 'left',
					itemGap: 8,
				},
				color: ['#ff6364', '#fdc107', '#29bb9d', '#556ca6'],
				grid: {
					top: '50',
					bottom: '10',
					left: '15',
					right: '40',
					containLabel: true
				},
				xAxis: [
					{
						type: 'category',
						data: ['北京', '河北', '天津', '辽宁', '湖北', '河南', '湖北', '新疆',
							'西藏', '山西', '陕西', '西安', '南京', '杭州', '山东', '昆明', '重庆', '武汉', '北京', '河北', '天津', '辽宁', '湖北', '河南', '湖北', '新疆',
							'西藏', '山西', '陕西', '西安', '内蒙古'],
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
						name: '部局级预案数量',
						type: 'bar',
						barWidth: '100%',
						stack: '预案',
						barWidth: '10',
						data: [1335, 335, 1035, 935, 335, 1335, 335, 670, 335, 1335, 335, 335, 335, 1335, 335, 1335, 335, 1335, 335, 1335, 335, 1335, 335, 1335, 335, 1335, 335, 1335, 335, 1335, 335,]
					},
					{
						name: '总队级预案数量',
						type: 'bar',
						barWidth: '100%',
						stack: '预案',
						barWidth: '10',
						data: [1335, 335, 1035, 935, 335, 1335, 335, 670, 335, 1335, 335, 335, 335, 1335, 335, 1335, 335, 1335, 335, 1335, 335, 1335, 335, 1335, 335, 1335, 335, 1335, 335, 1335, 335,]
					},
					{
						name: '支队级预案数量',
						type: 'bar',
						barWidth: '100%',
						stack: '预案',
						barWidth: '10',
						data: [1335, 335, 1035, 935, 335, 1335, 335, 670, 335, 1335, 335, 335, 335, 1335, 335, 1335, 335, 1335, 335, 1335, 335, 1335, 335, 1335, 335, 1335, 335, 1335, 335, 1335, 335,]
					},
					{
						name: '大中队级预案数量',
						type: 'bar',
						barWidth: '100%',
						stack: '预案',
						barWidth: '10',
						data: [1335, 335, 1035, 935, 335, 1335, 335, 670, 335, 1335, 335, 335, 335, 1335, 335, 1335, 335, 1335, 335, 1335, 335, 1335, 335, 1335, 335, 1335, 335, 1335, 335, 1335, 335,]
					}
				]
			};
			myBarChart.setOption(BarmaxOption);
		},

	}
})
