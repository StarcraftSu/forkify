
!(function () {
    var integral = {};

    /*用户信息*/
    integral.user = "";
    /*正则表达式*/
    integral.number = /^(?:0|[1-9]\d*)(?:\.\d*[1-9])?$/;
    integral.regPosNumber = /^\d+(\.\d+)?$/; //非负浮点数
    integral.mobileAndTel = /^[\d()\-\s]{3,}$/;
    integral.mailVerify = /^[A-Z_a-z0-9-\.]+@([A-Z_a-z0-9-]+\.)+[a-z0-9A-Z]{2,4}$/;
    integral.postalCodeRes = /^\d{6}\b/;
    integral.idCardVerify = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    //18位，只能为A-Z,0-9 但不可包含I、O、Z、S、V
    integral.unifiedSocialCreditCodeVerify = /^(((?![IOZSV])[A-Z])|[0-9]){18}$/;
    /*企业端 横向标题*/
    integral.titleSwitch = function (className) {
        if ($("#" + className).hasClass("manage-title-text-selected")) {
            return;
        } else {
            $("#" + className).parent().find("div").removeClass("manage-title-text-selected");
            $("#" + className).addClass("manage-title-text-selected");
        }
        switch (className) {
            case "enterprises_submit":
                $("#enterprises_submit").find("img").attr("src", "../images/icon_baosong_o.png");
                $("#point_management").find("img").attr("src", "../images/icon_jifen_w.png");
                // $("#check_process").find("img").attr("src", "../images/u101.png");

                $(".enterprises_submit").removeClass("hidden");
                $(".point_management").addClass("hidden");
                // $(".check_process").addClass("hidden");
                break;
            case "point_management":
                $("#enterprises_submit").find("img").attr("src", "../images/icon_baosong_w.png");
                $("#point_management").find("img").attr("src", "../images/icon_jifen_o.png");
                // $("#check_process").find("img").attr("src", "../images/u101.png");

                $(".point_management").removeClass("hidden");
                $(".enterprises_submit").addClass("hidden");
                // $(".check_process").addClass("hidden");
                break;
            // case "check_process":
            //     $("#enterprises_submit").find("img").attr("src", "../images/icon_baosong_w.png");
            //     $("#point_management").find("img").attr("src", "../images/icon_jifen_w.png");
            //     $("#check_process").find("img").attr("src", "../images/u1446.png");

            //      $(".check_process").removeClass("hidden");
            //      $(".point_management").addClass("hidden");
            //      $(".enterprises_submit").addClass("hidden");
            //      break;
            case "system_inform":
                $("#enterprises_submit").find("img").attr("src", "../images/icon_baosong_w.png");
                $("#point_management").find("img").attr("src", "../images/icon_jifen_w.png");
                // $("#check_process").find("img").attr("src", "../images/u101.png");

                // $(".check_process").addClass("hidden");
                $(".point_management").addClass("hidden");
                $(".enterprises_submit").addClass("hidden");
                $(".system_set").addClass("hidden");
                $(".system_inform").removeClass("hidden");

                $("#system_inform").css({"font-size": "14px", "font-weight": "unset", "background-color": "unset"});
                break;
            case "system_set":
                $("#enterprises_submit").find("img").attr("src", "../images/icon_baosong_w.png");
                $("#point_management").find("img").attr("src", "../images/icon_jifen_w.png");
                // $("#check_process").find("img").attr("src", "../images/u101.png");

                // $(".check_process").addClass("hidden");
                $(".point_management").addClass("hidden");
                $(".enterprises_submit").addClass("hidden");
                $(".system_set").removeClass("hidden");
                $(".system_inform").addClass("hidden");
                break;
            default:
                break;
        }
    };

    /*管理端 横向标题*/
    integral.adminTitleSwitch = function () {
        // todo 添加剩余tab按钮跳转
        var pageType = $("#page-type").text();
        $("#" + pageType).parent().parent().find("div").removeClass("manage-tags-selected");
        $("#" + pageType).parent().addClass("manage-tags-selected");
        switch (pageType) {
            case "submit_management":
                $("#post_management_sub").addClass("hidden");

                $("#submit_management").find("img").attr("src", "../images/icon_baosonggl_o.png");
                $("#post_management").find("img").attr("src", "../images/icon_fawen_w.png");
                $("#integral_trading").find("img").attr("src", "../images/icon_jiaoyi_w.png");
                $("#integral_transferee").find("img").attr("src", "../images/icon_shourang_w.png");
                break;
            case "post_management":
                $("#post_management_sub").removeClass("hidden");

                $("#submit_management").find("img").attr("src", "../images/icon_baosonggl_w.png");
                $("#post_management").find("img").attr("src", "../images/icon_fawen_o.png");
                $("#integral_trading").find("img").attr("src", "../images/icon_jiaoyi_w.png");
                $("#integral_transferee").find("img").attr("src", "../images/icon_shourang_w.png");
                break;
            case "integral_trading":
                $("#post_management_sub").addClass("hidden");

                $("#submit_management").find("img").attr("src", "../images/icon_baosonggl_w.png");
                $("#post_management").find("img").attr("src", "../images/icon_fawen_.png");
                $("#integral_trading").find("img").attr("src", "../images/icon_jiaoyi_o.png");
                $("#integral_transferee").find("img").attr("src", "../images/icon_shourang_w.png");
                break;
            case "integral_transferee":
                $("#post_management_sub").addClass("hidden");

                $("#submit_management").find("img").attr("src", "../images/icon_baosonggl_w.png");
                $("#post_management").find("img").attr("src", "../images/icon_fawen_w.png");
                $("#integral_trading").find("img").attr("src", "../images/icon_jiaoyi_w.png");
                $("#integral_transferee").find("img").attr("src", "../images/icon_shourang_o.png");
                break;
            default:
                $("#post_management_sub").removeClass("hidden");
                break;
        }
    };

    /*管理端 横向标题*/
    // todo 二级标题跳转
    integral.adminSubTitleSwitch = function () {
        var pageType = $("#sub-page-type").text();
        $("#" + pageType).parent().parent().find("a").removeClass("selected");
        $("#" + pageType).parent().parent().find("img").addClass("hidden");
        $("#" + pageType).addClass("selected");
        $("#" + pageType).find("img").removeClass("hidden");
    };

    /*当前系统时间展示*/
    integral.getCurDate = function () {
        var d = new Date();
        var week;
        switch (d.getDay()) {
            case 1:
                week = "星期一";
                break;
            case 2:
                week = "星期二";
                break;
            case 3:
                week = "星期三";
                break;
            case 4:
                week = "星期四";
                break;
            case 5:
                week = "星期五";
                break;
            case 6:
                week = "星期六";
                break;
            default:
                week = "星期天";
        }
        var years = d.getFullYear();
        var month = add_zero(d.getMonth() + 1);
        var days = add_zero(d.getDate());
        var hours = add_zero(d.getHours());
        var minutes = add_zero(d.getMinutes());
        var seconds = add_zero(d.getSeconds());
        var ndate = years + "年" + month + "月" + days + "日 " + " " + week;
        $("#systemTime").text(ndate);
        return ndate;
    };

    var add_zero = function (temp) {
        if (temp < 10) return "0" + temp;
        else return temp;
    };

    /*时间格式化yy-mm-dd*/
    integral.formatDateTime = function (inputTime) {
        var date = new Date(inputTime);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        var second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        return y + '-' + m + '-' + d;
    };

    /*单页打印*/
    integral.print = function () {
        bindData();
        var newWindow = window.open("打印窗口", "_blank");
        var docStr = document.getElementById("print").innerHTML;
        newWindow.document.write(docStr);
        newWindow.document.close();
        newWindow.print();
        newWindow.close();
    };

    /*处理打印时的数据绑定*/
    var bindData = function () {
        //搞定 type=text, 同时如果checkbox,radio,select>option的值有变化, 也绑定一下, 这里忽略button
        $("input,select option").each(function () {
            $(this).attr('value', $(this).val());
        });

        //搞定 type=checkbox,type=radio 选中状态
        $("input[type='checkbox'],input[type='radio']").each(function () {
            if ($(this).attr('checked'))
                $(this).attr('checked', true);
            else
                $(this).removeAttr('checked');
        });

        //搞定select选中状态
        $("select option").each(function () {
            if ($(this).prop('selected'))
                $(this).attr('selected', true);
            else
                $(this).removeAttr('selected');
        });

        //搞定 textarea
        $("textarea").each(function () {
            $(this).html($(this).val());
        });

    };

    /*ajax请求*/
    integral.request = function (url, type, params, callback) {
        var requestStart = new Date().getTime();
        var option = {
            url: url,
            type: type,
            timeout: 200000,
            success: function (data) {
                var date = integral.getCurDate();
                console.info(date + "  " + type + "请求成功  " + url + "  用时  " + ((new Date().getTime() + requestStart) / 1000 + "s"));
                callback(data);
            },
            error: function () {
                var date = integral.getCurDate();
                console.warn(date + "  " + type + "请求失败  " + url + "  用时  " + ((new Date().getTime() + requestStart) / 1000 + "s"));
                showErrorMessage("请求错误！");
                return;
            },
            complete: function (XMLHttpRequest, status) {
                if (status === 'timeout') {
                    showErrorMessage("请求超时，请重试！");
                    return;
                }
            }
        };
        if (type === "post" || type === "put") {
            params = JSON.stringify(params);
            option.contentType = "application/json;charset=utf-8";
        }

        if (type === "delete") {
            option.type = "post";
        }

        if (params !== null) {
            option.data = params;
        }
        $.ajax(option);
    };

    /*验证数据不为空*/
    integral.isEmpty = function (data) {
        data = $.trim(data);
        if (data === null || data === "" || data === undefined || data === "null") {
            return true;
        } else {
            return false;
        }
    };

    /*年份下拉框*/
    integral.yearSelect = function () {
        var myDate = new Date();
        var startYear = myDate.getFullYear() - 5;//起始年份
        var endYear = myDate.getFullYear() + 5;//结束年份
        for (var i = startYear; i <= endYear; i++) {
            $("#yearSelect").append($("<option></option>").attr("value", i).text(i));
        }
        $("#yearSelect").val(myDate.getFullYear());

        $("#yearSelect").bind("change", function () {
            $("#year").val($("#yearSelect").val());
        })
    };

    /*判断浏览器类型*/
    integral.getBrowserName = function () {
        var userAgent = navigator ? navigator.userAgent.toLowerCase() : "other";
        if (userAgent.indexOf("chrome") > -1)
            return "chrome";
        else if (userAgent.indexOf("safari") > -1)
            return "safari";
        else if (userAgent.indexOf("msie") > -1 || userAgent.indexOf("trident") > -1)
            return "ie";
        else if (userAgent.indexOf("firefox") > -1)
            return "firefox";
        return userAgent;
    };

    //针对IE返回ActiveXObject
    integral.getActiveXObject = function (name) {
        try {
            return new ActiveXObject(name);
        } catch (e) {
        }
    };

    //针对除了IE之外浏览器
    integral.getNavigatorPlugin = function (name) {
        for (var key in navigator.plugins) {
            var plugin = navigator.plugins[key];
            if (plugin.name === name)
                return plugin;
        }
    };
    /*全选操作*/
    integral.selectAll = function (elem, ele) {
        if ($(ele).html() === "取消全选") {
            $(ele).html("全选");
            $(elem + " input[type='checkbox']").prop("checked", false);
        } else {
            $(ele).html("取消全选");
            $(elem + " input[type='checkbox']").prop("checked", true);
        }
    };

    /*提示框*/
    integral.swal = function (title, text, type, callback) {
        swal({
                title: title,
                text: text,
                type: type,
                showCancelButton: true,
                confirmButtonColor: "#a1d9f2",
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                closeOnConfirm: true
            },
            function (isConfirm) {
                callback(isConfirm);
            });
    };
    /*表单序列化*/
    $.fn.serializeJson = function () {
        var serializeObj = {};
        var array = this.serializeArray();
        var str = this.serialize();
        $(array).each(
            function () {
                if (serializeObj[this.name]) {
                    if ($.isArray(serializeObj[this.name])) {
                        serializeObj[this.name].push(this.value);
                    } else {
                        serializeObj[this.name] = [
                            serializeObj[this.name], this.value];
                    }
                } else {
                    serializeObj[this.name] = this.value;
                }
            });
        return serializeObj;
    };
    /*1.用正则表达式实现html转码*/
    integral.htmlEncodeByRegExp = function (str) {
        var s = "";
        if (str.length === 0) return "";
        s = str.replace(/&/g, "&amp;");
        s = s.replace(/</g, "&lt;");
        s = s.replace(/>/g, "&gt;");
        s = s.replace(/ /g, "&nbsp;");
        s = s.replace(/\'/g, "&#39;");
        s = s.replace(/\"/g, "&quot;");
        return s;
    };

    /*2.用正则表达式实现html解码*/
    integral.htmlDecodeByRegExp = function (str) {
        var s = "";
        if (str.length === 0) return "";
        s = str.replace(/&amp;/g, "&");
        s = s.replace(/&lt;/g, "<");
        s = s.replace(/&gt;/g, ">");
        s = s.replace(/&nbsp;/g, " ");
        s = s.replace(/&#39;/g, "\'");
        s = s.replace(/&quot;/g, "\"");
        return s;
    };
    integral.getQueryString = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    };

    integral.uploadFile = function (ue) {
        $("#uploadAttachment").fileupload({
            url: "../api/v1/ueditor/file/upload",
            dataType: 'json',
            singleFileUploads: true,
            done: function (e, data) {
                console.info("上传成功");
                console.log(data);
                var result = data.result;
                var $div = $("<div></div>").append($("<a></a>").attr("href", "../api/v1/file/download?name=" + result.title + "&suffix=" + result.suffix).text(result.name));
                ue.execCommand("inserthtml", $div.html());
                showSuccessMessage("上传成功！");
            },
            progressall: function (e, data) {
                var progress = parseInt(data.loaded / data.total * 100);
                console.info(progress);
            },
            fail: function () {
                alert("上传失败！！");
            }
        });
    };
    integral.layuialert = function (msg, num) {
        layui.use(['layer'], function () {
            layer.msg(msg, {icon: num});
        });
    };

    integral.getCookie = function (name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    };

    integral.setSession = function (user) {
        // if (!integral.isEmpty(user)) {
        //     $("#loginUser").text(integral.user["legalPerson"]);
        //     return;
        // }
        var cookieName = integral.getCookie("USER_AUTHORIZATION");
        integral.request("../api/v1/set/session", "get", {token: cookieName}, function (res) {
            console.log(res.result);
            integral.user = res.data;
            $("#loginUser").text(integral.user["legalPerson"]);
        })
    };

    window.integral = integral;
})();