function getMyLocation() {
	return new Promise((resolved, rejected) => {
		uni.getLocation({
			type: 'wgs84',
			geocode: true, //设置该参数为true可直接获取经纬度及城市信息
			success: function(res) {
				console.log(res)
				var data = [res.longitude, res.latitude]
				console.log(data)
				resolved(data)
			},
			fail: function(err) {
				uni.showToast({
					title: '获取地址失败，将导致部分功能不可用',
					icon: 'none'
				});
				rejected(err)
			},
		});
	});
}
//转换后台返回的这种时间格式2019-04-24T02:30:00.000+0000
function resolvingDate(date) {
	//date是传入的时间
	let d = new Date(date);

	let month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1);
	let day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
	let hours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
	let min = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
	let sec = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();

	let times = d.getFullYear() + '-' + month + '-' + day + ' ' + hours + ':' + min + ':' + sec;

	return times
}

function formateDate(datetime, type) {
	var year = datetime.getFullYear(),
		month = ("0" + (datetime.getMonth() + 1)).slice(-2),
		date = ("0" + datetime.getDate()).slice(-2),
		hour = ("0" + datetime.getHours()).slice(-2),
		minute = ("0" + datetime.getMinutes()).slice(-2),
		second = ("0" + datetime.getSeconds()).slice(-2);
	if (type === "Y-M-D h:min:s") {
		var result = year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
	} else if (type === "Y-M-D") {
		var result = year + "-" + month + "-" + date;
	}
	if (type === "h:min:s") {
		var result = hour + ":" + minute + ":" + second;
	} else if (type === "h") {
		var result = hour;
	} else if (type === "min") {
		var result = minute;
	}
	return result;
}
module.exports = {
	resolvingDate,
	formateDate,
	getMyLocation
}
