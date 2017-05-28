$(".back").click(function(){
	history.back(-1);
})

//关联手机页
$(document).on("pageInit", "#checks", function(e, id, page) {
	var regPhone = /^1[34578]\d{9}$/,
		regTest1 = false;

	//手机号验证
	function checkPhone() {
		if(!(regPhone.test(phone))) {
			$.toast('请输入正确手机号', 2000, 'toast-tips top');
			regTest1 = false;
			return false;
		} else {
			regTest1 = true;
		}
	}

	//验证码
	$('.testcode-btn').click(function() {
		phone = $("#phone").val();
		console.log(phone);
		var timer = null; //timer变量，控制时间
		var count = 60; //间隔函数，1秒执行
		var curCount; //当前剩余秒数

		checkPhone();
		if(regTest1 == true) {
			curCount = count;
			$(".testcode-btn").val(curCount + "秒后重试")
				.attr("disabled", "disabled");
			$.ajax({
				type: "get",
				url: "",
				success: function() {

				},
				error: function() {
					$.toast('验证码发送失败', 2000, 'toast-tips top');
				}

			});

			timer = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次

			//timer处理函数
			function SetRemainTime() {
				if(curCount == 1) {
					clearInterval(timer); //停止计时器
					$(".testcode-btn").removeClass("btn-disabled")
						.val("重新发送")
						.removeAttr("disabled");

				} else {
					curCount--;
					$(".testcode-btn").addClass("btn-disabled")
						.val(curCount + "秒后重试");
				}
			}
		}
	});

	$(".check-phone").click(function() {
		phone = $("#phone").val();
		checkPhone();
		var code = $(".code").val(),
			regTest2 = true;
		if(regTest1) {
			if(code == "") {
				$.toast('请输入验证码', 2000, 'toast-tips top');
				regTest2 = false;
				return false;
			}
		}
		if(regTest1 && regTest2) {
			$(this).attr("disabled", "disabled");
			$.ajax({
				type: "post",
				url: "",
				async: true,
				data: $("#signup-form").serialize(),
				dataType: 'json',
				success: function() {

				},
				error: function() {
					$.toast('关联手机失败，请重试', 2000, 'toast-tips top');
					$(".check-phone").removeAttr("disabled");
				}
			});
		}

	})
})