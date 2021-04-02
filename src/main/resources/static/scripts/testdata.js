/*var demo_tasks = {
	"data":[
		{"id":11, "text":"刑事案件", "start_date":"28-03-2018", "duration":"11", "progress": 0.6, "open": true},
		{"id":1, "text":"未检业务", "start_date":"01-04-2018", "duration":"18", "progress": 0.4, "open": true},

		{"id":2, "text":" 丁真#杀人案件:新建", "start_date":"02-04-2018", "duration":"8", "parent":"1", "progress":0.5, "open": true},
		{"id":3, "text":" 丁真#贩毒案件:新建", "start_date":"11-04-2018", "duration":"8", "parent":"1", "progress": 0.6, "open": true},
		{"id":4, "text":" 段鸿飞#大量贩毒案件:修改", "start_date":"13-04-2018", "duration":"6", "parent":"1", "progress": 0.5, "open": true},
		{"id":5, "text":" 张伟#抢劫杀人案件:修改", "start_date":"02-04-2018", "duration":"7", "parent":"2", "progress": 0.6, "open": true},
		{"id":6, "text":" 张伟#放火杀人案件:修改", "start_date":"03-04-2018", "duration":"7", "parent":"2", "progress": 0.6, "open": true},
		{"id":7, "text":" 贾南风#交通案件:修改", "start_date":"11-04-2018", "duration":"8", "parent":"3", "progress": 0.6, "open": true},
		{"id":8, "text":" 贾南风#交通案件:修改", "start_date":"14-04-2018", "duration":"5", "parent":"4", "progress": 0.5, "open": true},
		{"id":9, "text":" 贾南风#交通案件:修改", "start_date":"14-04-2018", "duration":"4", "parent":"4", "progress": 0.5, "open": true},
		{"id":10, "text":" 贾南风#交通案件:修改", "start_date":"14-04-2018", "duration":"3", "parent":"4", "progress": 0.5, "open": true},

		{"id":12, "text":" 丁真#杀人案件:修改", "start_date":"03-04-2018", "duration":"5", "parent":"11", "progress": 1, "open": true},
		{"id":13, "text":" 丁真#杀人案件:修改", "start_date":"02-04-2018", "duration":"7", "parent":"11", "progress": 0.5, "open": true},
		{"id":14, "text":" 丁真#杀人案件:修改", "start_date":"02-04-2018", "duration":"6", "parent":"11", "progress": 0.8, "open": true},
		{"id":15, "text":" 丁真#杀人案件:修改", "start_date":"02-04-2018", "duration":"5", "parent":"11", "progress": 0.2, "open": true},
		{"id":16, "text":" 丁真#杀人案件:修改", "start_date":"02-04-2018", "duration":"7", "parent":"11", "progress": 0, "open": true},

		{"id":17, "text":" 刘飞#伤人案件:修改", "start_date":"03-04-2018", "duration":"2", "parent":"13", "progress": 1, "open": true},
		{"id":18, "text":" 刘飞#伤人案件:新建", "start_date":"06-04-2018", "duration":"3", "parent":"13", "progress": 0.8, "open": true},
		{"id":19, "text":" 刘飞#伤人案件:删除", "start_date":"10-04-2018", "duration":"4", "parent":"13", "progress": 0.2, "open": true},
		{"id":20, "text":" 刘飞#伤人案件:修改", "start_date":"10-04-2018", "duration":"4", "parent":"13", "progress": 0, "open": true},
		{"id":21, "text":" 刘飞#伤人案件:修改", "start_date":"03-04-2018", "duration":"4", "parent":"15", "progress": 0.5, "open": true},
		{"id":22, "text":" 刘飞#伤人案件:修改", "start_date":"03-04-2018", "duration":"4", "parent":"15", "progress": 0.1, "open": true},
		{"id":23, "text":" 刘飞#伤人案件:删除", "start_date":"03-04-2018", "duration":"5", "parent":"15", "progress": 0, "open": true}
	],
	"links":[
		{"id":"1","source":"1","target":"2","type":"1"},
		{"id":"2","source":"2","target":"3","type":"0"},
		{"id":"3","source":"3","target":"4","type":"0"},
		{"id":"4","source":"2","target":"5","type":"2"},
		{"id":"5","source":"2","target":"6","type":"2"},
		{"id":"6","source":"3","target":"7","type":"2"},
		{"id":"7","source":"4","target":"8","type":"2"},
		{"id":"8","source":"4","target":"9","type":"2"},
		{"id":"9","source":"4","target":"10","type":"2"},
		{"id":"10","source":"11","target":"12","type":"1"},
		{"id":"11","source":"11","target":"13","type":"1"},
		{"id":"12","source":"11","target":"14","type":"1"},
		{"id":"13","source":"11","target":"15","type":"1"},
		{"id":"14","source":"11","target":"16","type":"1"},
		{"id":"15","source":"13","target":"17","type":"1"},
		{"id":"16","source":"17","target":"18","type":"0"},
		{"id":"17","source":"18","target":"19","type":"0"},
		{"id":"18","source":"19","target":"20","type":"0"},
		{"id":"19","source":"15","target":"21","type":"2"},
		{"id":"20","source":"15","target":"22","type":"2"},
		{"id":"21","source":"15","target":"23","type":"2"}
	]
};*/

function generateData(count, dateFrom, dateTo){
	var tasks =  {
		data:[],
		links:[]
	};

	count = parseInt(count, 10) || 100;

	var date = new Date(dateFrom.getFullYear(),5,1);
	var project_id = 1;
	tasks.data.push({
		id:  project_id,
		text: "环节名称#1",
		start_date: date,
		type: gantt.config.types.project,
		open:true
	});
	huanjie_str = ['案件管理办公室 汉东省院1804 受理','第一检察部: 汉东省院0102 审查']
	for (var i = 1; i < count; i++) {
		date = gantt.date.add(date, 1, "day");
		var task = {
			id: i + 1,
			start_date: date,
			text: huanjie_str[i - 1],
			duration: 1,
			parent: project_id
		};

		if(gantt.date.add(date, 1, "day").valueOf() > dateTo.valueOf()){
			date = new Date(dateFrom);
			project_id = i + 1;
			delete task.parent;
			task.open = true;
		}
		tasks.data.push(task);

	}
	return tasks;
}