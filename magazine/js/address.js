$(".save-address").click(function() {
	var username = $(".username").val(),
		phone = $(".phone").val(),
		ecode = $(".ecode").val(),
		areainfo = $("#area-select").val(),
		addressInfo = $(".addressinfo").val(),
		default_switch = !!($(".default_addr:checked").val());
	/*console.log(username + "|" + phone + "|" + ecode + "|" + areainfo + "|" + addressInfo + "|" + default_switch);*/
	var regName = /^[a-z\u4E00-\u9FA5]{2,7}$/i,
		regPhone = /^1[34578]\d{9}$/;
	if(!(regName.test(username))) {
		$.toast('请输入正确姓名', 2000, 'toast-tips top');
		return false;
	}
	if(!(regPhone.test(phone))) {
		$.toast('请输入正确手机号码', 2000, 'toast-tips top');
		return false;
	}
	if(areainfo == "") {
		$.toast('请选择所在地区', 2000, 'toast-tips top');
		return false;
	}
	if(addressInfo == "") {
		$.toast('请填写详细地址', 2000, 'toast-tips top');
		return false;
	} else {
		$.ajax({
			type: "post",
			url: "",
			async: true,
			data: {
				username: username,
				phone: phone,
				ecode: ecode,
				areainfo: areainfo + addressInfo,
				default_switch: default_switch
			},
			dataType:"json",
			success:function(data){
				
			},
			error:function(data){
				$.toast('保存失败，请重试', 2000, 'toast-tips top');
			}
		});
	}
})