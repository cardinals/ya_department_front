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
				{ name: '部局', count: '999',  zongdui: null, zhidui: null, dazhongdui: null },
				{ name: '北京', count: '2999',  zongdui: '1335', zhidui: '1335', dazhongdui: '3335' },
				{ name: '天津', count: '1142',  zongdui: '335', zhidui: '335', dazhongdui: '1335' },
				{ name: '河北', count: '1218',  zongdui: '1035', zhidui: '670', dazhongdui: '6035' },
				{ name: '山西', count: '1021',  zongdui: '935', zhidui: '1035', dazhongdui: '1935' },
				{ name: '内蒙古', count: '1455',  zongdui: '335', zhidui: '500', dazhongdui: '1335' },
				{ name: '辽宁', count: '1919',  zongdui: '1335', zhidui: '670', dazhongdui: '4335' },
				{ name: '吉林', count: '1299',  zongdui: '335', zhidui: '335', dazhongdui: '1335' },
				{ name: '黑龙江', count: '1999',  zongdui: '400', zhidui: '500', dazhongdui: '1670' },
				{ name: '上海', count: '2751',  zongdui: '670', zhidui: '1335', dazhongdui: '1335' },
				{ name: '江苏', count: '1313',  zongdui: '1335', zhidui: '670', dazhongdui: '1335' },
				{ name: '浙江', count: '2999',  zongdui: '335', zhidui: '1335', dazhongdui: '1335' },
				{ name: '安徽', count: '1142',  zongdui: '335', zhidui: '1335', dazhongdui: '1335' },
				{ name: '福建', count: '1218',  zongdui: '1335', zhidui: '670', dazhongdui: '1670' },
				{ name: '江西', count: '1021',  zongdui: '670', zhidui: '335', dazhongdui: '3335' },
				{ name: '山东', count: '1455',  zongdui: '335', zhidui: '670', dazhongdui: '1335' },
				{ name: '河南', count: '1919',  zongdui: '670', zhidui: '500', dazhongdui: '1335' },
				{ name: '湖北', count: '1299',  zongdui: '335', zhidui: '670', dazhongdui: '6170' },
				{ name: '湖南', count: '1999',  zongdui: '1335', zhidui: '500', dazhongdui: '5335' },
				{ name: '广东', count: '1613',  zongdui: '335', zhidui: '335', dazhongdui: '1335' },
				{ name: '广西', count: '1313',  zongdui: '400', zhidui: '335', dazhongdui: '4335' },
				{ name: '海南', count: '2999',  zongdui: '670', zhidui: '670', dazhongdui: '3135' },
				{ name: '重庆', count: '1142',  zongdui: '335', zhidui: '1335', dazhongdui: '5335' },
				{ name: '四川', count: '1218',  zongdui: '400', zhidui: '500', dazhongdui: '1670' },
				{ name: '贵州', count: '1021',  zongdui: '335', zhidui: '1335', dazhongdui: '5335' },
				{ name: '云南', count: '1455',  zongdui: '670', zhidui: '670', dazhongdui: '1335' },
				{ name: '西藏', count: '1919',  zongdui: '1335', zhidui: '500', dazhongdui: '1335' },
				{ name: '陕西', count: '1299',  zongdui: '400', zhidui: '335', dazhongdui: '1335' },
				{ name: '甘肃', count: '1999',  zongdui: '1335', zhidui: '1335', dazhongdui: '4351' },
				{ name: '青海', count: '2751',  zongdui: '335', zhidui: '500', dazhongdui: '1670' },
				{ name: '宁夏', count: '1313',  zongdui: '400', zhidui: '335', dazhongdui: '4335' },
				{ name: '新疆', count: '1313',  zongdui: '1335', zhidui: '1335', dazhongdui: '1335' }
			],
			//表高度变量
			tableheight: 1360,
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
					iGap: 16,
					iWidth: 18,
					data: this.tabledata.name,
					align: 'left',
					iGap: 8,
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
						// data: ['部局','北京', '河北', '天津', '辽宁', '湖北', '河南', '湖北', '新疆',
						// 	'西藏', '山西', '陕西', '西安', '南京', '杭州', '山东', '昆明', '重庆', '武汉', '北京', '河北', '天津', '辽宁', '湖北', '河南', '湖北', '新疆',
						// 	'西藏', '山西', '陕西', '西安', '内蒙古'],
						data: this.getList('name'),
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
						// data: [1335],
						data: this.getList('buju'),
					},
					{
						name: '总队级预案数量',
						type: 'bar',
						barWidth: '100%',
						stack: '预案',
						barWidth: '10',
						// data: [null,1335, 335, 1035, 935, 335, 1335, 335, 670, 335, 1335, 335, 335, 335, 1335, 335, 1335, 335, 1335, 335, 1335, 335, 1335, 335, 1335, 335, 1335, 335, 1335, 335, 1335, 335,],
						data: this.getList('zongdui'),
					},
					{
						name: '支队级预案数量',
						type: 'bar',
						barWidth: '100%',
						stack: '预案',
						barWidth: '10',
						// data: [null,1335, 335, 1035, 935, 335, 1335, 335, 670, 335, 1335, 335, 335, 335, 1335, 335, 1335, 335, 1335, 335, 1335, 335, 1335, 335, 1335, 335, 1335, 335, 1335, 335, 1335, 335,],
						data: this.getList('zhidui'),
					},
					{
						name: '大中队级预案数量',
						type: 'bar',
						barWidth: '100%',
						stack: '预案',
						barWidth: '10',
						// data: [null,1335, 335, 1035, 935, 335, 1335, 335, 670, 335, 1335, 335, 335, 335, 1335, 335, 1335, 335, 1335, 335, 1335, 335, 1335, 335, 1335, 335, 1335, 335, 1335, 335, 1335, 335,],
						data: this.getList('dazhongdui'),
					}
				]
			};
			myBarChart.setOption(BarmaxOption);
		},
		//数据为空时显示‘-’
		dataFormat: function (row, column) {
			var rowDate = row[column.property];
			if (rowDate == null || rowDate == "") {
				return '-';
			} else {
				return rowDate;
			}
		},
		getList: function (column) {
			var list = new Array();
			if ('name' == column) {
				for (var i in this.tabledata) {
					list.push(this.tabledata[i].name)
				}
			} else if ('buju' == column) {
				for (var i in this.tabledata) {
					if ('部局' == this.tabledata[i].name) {
						list.push(this.tabledata[i].count)
					}
				}
			} else if ('zongdui' == column) {
				for (var i in this.tabledata) {
					list.push(this.tabledata[i].zongdui)
				}
			} else if ('zhidui' == column) {
				for (var i in this.tabledata) {
					list.push(this.tabledata[i].zhidui)
				}
			} else if ('dazhongdui' == column) {
				for (var i in this.tabledata) {
					list.push(this.tabledata[i].dazhongdui)
				}
			}
			return list;
		},
	}
})
