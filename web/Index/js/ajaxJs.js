/**
 * Created by Administrator on 2017/2/3.
 */
//初始化弹窗样式以及位置
Messenger.options = {
    extraClasses: 'messenger-fixed messenger-on-bottom messenger-on-right',
    theme: 'air'
};

var facIdd;     //全局变量 设备编号

//修改密码ajax
$(document).ready(function () {
    $("#uPass").click(function () {
        if($("#newPass").val()==$("#newPassAgain").val()) {
            $.ajax({
                type: "POST",
                url: "/updatePassServlet",
                dataType: "text",
                data: $("#updatePassForm").serialize(),
                success: function(data) {
                    if(data=="success"){
                        Messenger().post({message: '修改成功', type: 'success', showCloseButton: true});
                        $("#updatePass").modal('hide');
                    }
                    else if(data=="updateFail")
                        Messenger().post({message: '修改失败 请重试', type: 'error', showCloseButton: true});
                    else if(data=="checkFail")
                        Messenger().post({message: '原密码输入错误 请重试', type: 'error', showCloseButton: true});
                    else
                        Messenger().post({message: '未知错误', type: 'error', showCloseButton: true});
                }
            });
        } else {
            Messenger().post({message: '两次密码输入不符 请重试', type: 'error', showCloseButton: true});
        }
    });
});

//退出登录 页面重定向到login.jsp
$(document).ready(function () {
   $("#realOut").click(function () {
       location.href = "/Login/login.jsp";
   });
});

$(document).ready(function () {
    refresh_1();
    refresh_2();
    refresh_3();
    refresh_4();
    $("#refreshBtn1").click(function () {
       refresh_1();
    });
    $("#refreshBtn2").click(function () {
        refresh_2();
    });
    $("#refreshBtn3").click(function () {
        refresh_3();
    });
});

//添加设备ajax
$(document).ready(function () {
    $("#submitAdd").click(function () {
        $.ajax({
            type: "POST",
            url: "/addFacServlet",
            dataType: "text",
            data: $("#addFacForm").serialize(),
            success: function(data) {
                if(data=="success"){
                    Messenger().post({message: '添加成功', type: 'success', showCloseButton: true});
                    $("#addModal").modal('hide');
                    refresh_2();
                }
                else if(data=="insertFail")
                    Messenger().post({message: '添加失败 请重试', type: 'error', showCloseButton: true});
                else if(data=="repeatFail")
                    Messenger().post({message: '添加失败 设备重复 请重试', type: 'error', showCloseButton: true});
                else
                    Messenger().post({message: '未知错误', type: 'error', showCloseButton: true});
            }
        });
    });
});

//个人信息ajax
$(document).ready(function () {
    $("#personalBtn").click(function () {
        $.ajax({
            type: "POST",
            url: "/personalServlet",
            dataType: "text",
            data: $("#personalForm").serialize(),
            success: function(data) {
                if(data=="success") {
                    Messenger().post({message: '提交成功', type: 'success', showCloseButton: true});
                    refresh_4();
                }
                else if(data=="fail")
                    Messenger().post({message: '提交失败 请重试', type: 'error', showCloseButton: true});
                else
                    Messenger().post({message: '未知错误', type: 'error', showCloseButton: true});
            }
        });
    });
});

//判断个人信息
function checkInfo() {
    $("[name='borrowBtn']").click(function () {
        $.ajax({
            type: "POST",
            url: "/checkPersonInfoServlet",
            success: function(data) {
                if(data=="success"){
                    $("#borrowModal").modal('show');
                }
                else if(data=="fail") {
                    Messenger().post({message: '请先补全个人信息 之后才能执行此操作', type: 'error', showCloseButton: true});
                }
                else {
                    Messenger().post({message: '未知错误', type: 'error', showCloseButton: true});
                }
            }
        });
    });
}

//借用设备ajax
$(document).ready(function () {
    $("#submitBorrow").click(function () {
        $.ajax({
            type: "POST",
            url: "/borrowServlet",
            dataType: "text",
            data: $("#borrowForm").serialize(),
            success: function(data) {
                if(data=="success"){
                    Messenger().post({message: '提交成功', type: 'success', showCloseButton: true});
                    $("#borrowModal").modal('hide');
                    refresh_1();
                }
                else if(data=="fail")
                    Messenger().post({message: '提交失败 请重试', type: 'error', showCloseButton: true});
                else
                    Messenger().post({message: '未知错误', type: 'error', showCloseButton: true});
            }
        });
    });
});

//修改设备ajax
$(document).ready(function () {
    $("#submitUpdateFac").click(function () {
        $.ajax({
            type: "POST",
            url: "/updateFacServlet",
            dataType: "text",
            data: $("#updateFacForm").serialize(),
            success: function(data) {
                if(data=="success"){
                    Messenger().post({message: '修改成功', type: 'success', showCloseButton: true});
                    $("#updateModal").modal('hide');
                    refresh_2();
                }
                else if(data=="fail")
                    Messenger().post({message: '修改失败 请重试', type: 'error', showCloseButton: true});
                else
                    Messenger().post({message: '未知错误', type: 'error', showCloseButton: true});
            }
        });
    });
});

//删除设备ajax
$(document).ready(function () {
    $("#sureDelete").click(function () {
        $.ajax({
            type: "POST",
            url: "/deleteServlet",
            dataType: "text",
            data: {facid:facIdd},
            success: function(data) {
                if(data=="success"){
                    Messenger().post({message: '删除成功', type: 'success', showCloseButton: true});
                    $("#deleteModal").modal('hide');
                    refresh_2();
                }
                else if(data=="fail")
                    Messenger().post({message: '删除失败 请重试', type: 'error', showCloseButton: true});
                else
                    Messenger().post({message: '未知错误', type: 'error', showCloseButton: true});
            }
        });
    });
});

//获取设备编号
function deleteFac() {
    $("[name='deleteBtn']").click(function () {
        facIdd = $(this).parents("tr").find("td").eq(2).text().trim();  //删除设备编号
    });
}

function firstTable() {
   $("[name='borrowBtn']").click(function () {
       var facName = $(this).parents("tr").find("td").eq(2).text().trim();  //设备名称
       var facId = $(this).parents("tr").find("td").eq(1).text().trim();    //设备编号
       $("#borrowFacIn").val(facName);
       $("#borrowFacID").val(facId);
   });
}

function secondTable() {
   $("[name='updateBtn']") .click(function () {
       $("#upinputLabNo").val($(this).parents("tr").find("td").eq(1).text().trim());
       $("#upinputFacNo").val($(this).parents("tr").find("td").eq(2).text().trim());
       $("#upinputFacName").val($(this).parents("tr").find("td").eq(3).text().trim());
       $("#upinputFacMod").val($(this).parents("tr").find("td").eq(4).text().trim());
       $("#upStock").val($(this).parents("tr").find("td").eq(5).text().trim());
   });
}

//刷新table
function refresh_1() {
    $.post('/jsonServlet', {
        No : "1"
    }, function(data) {
        var jsonObj = eval( "(" + data + ")" );
        var content ="";
        $.each(jsonObj, function (index,obj) {
            var num = obj.Stock - obj.Used;
            if(num <= 0){
                return true;
            }
            content += "<tr>" +
                "<td>" + obj.LabNo + "</td>" +
                "<td>" + obj.FacNo + "</td>" +
                "<td>" + obj.FacName + "</td>" +
                "<td>" + obj.FacModel + "</td>" +
                "<td>" + num + "</td>" +
                "<td><a href=\"#\" data-container=\"body\" data-toggle=\"popover\" data-placement=\"right\" data-content=\"" + obj.Information + "\">详细信息</a></td>"+
                "<td><a href=\"#\" name=\"borrowBtn\">借用</a></td>" +
                "</tr>";
        });
        $("#firstTbody").html(content);
        $("#StateInfo").trigger("update");
        popover();
        firstTable();
        checkInfo();
    });
}

function refresh_2() {
    $.post('/jsonServlet', {
        No : "2"
    }, function(data) {
        var jsonObj = eval( "(" + data + ")" );
        var content ="";
        $.each(jsonObj, function (index,obj) {
            content += "<tr>" +
                "<td><input type=\"checkbox\" name=\"followBox\"></td>" +
                "<td>" + obj.LabNo + "</td>" +
                "<td>" + obj.FacNo + "</td>" +
                "<td>" + obj.FacName + "</td>" +
                "<td>" + obj.FacModel + "</td>" +
                "<td>" + obj.Stock + "</td>" +
                "<td><a href=\"#\" name=\"updateBtn\" data-toggle=\"modal\" data-target=\"#updateModal\">修改</a></td>" +
                "<td><a href=\"#\" name=\"deleteBtn\" data-toggle=\"modal\" data-target=\"#deleteModal\">删除</a></td>" +
                "</tr>";
        });
        $("#secondTbody").html(content);
        $("#ManageInfo").trigger("update");
        secondTable();
        deleteFac();
    });
}

function refresh_3() {
    $.post('/jsonServlet', {
        No : "3"
    }, function(data) {
        var jsonObj = eval( "(" + data + ")" );
        var content ="";
        $.each(jsonObj, function (index,obj) {
            content += "<tr>" +
                "<td>" + obj.ids + "</td>" +
                "<td>" + checkNull(obj.names) + "</td>" +
                "<td>" + checkNull(obj.college) + "</td>" +
                "<td>" + obj.sdate + "</td>" +
                "<td>" + obj.facname + "</td>" +
                "<td>" + checkNull(obj.tele) + "</td>" +
                "<td>" + obj.uselong + "</td>" +
                "<td><a href=\"#\" data-container=\"body\" data-toggle=\"popover\" data-placement=\"right\" data-content=\"" + checkNull(obj.aim) + "\">详细信息</a></td>"+
                "</tr>";
        });
        $("#thirdTbody").html(content);
        $("#BorrowInfo").trigger("update");
        popover();
    });
}

function refresh_4() {
    $.post('/jsonServlet', {
        No : "4"
    }, function(data) {
        var jsonObj = eval( "(" + data + ")" );
        $("#collegeInput").val(checkNull(jsonObj.college));
        $("#nameInput").val(checkNull(jsonObj.name));
        $("#telInput").val(checkNull(jsonObj.telphone));

        $("#college").val(checkNull(jsonObj.college));
        $("#StuName").val(checkNull(jsonObj.name));
        $("#Telenum").val(checkNull(jsonObj.telphone));
    });
}

function checkNull(str) {
    if(typeof (str) == "undefined")
        return "";
    else return str;
}

$(document).ready(function () {
   $("[data-target='#deleteAllModal']").click(function () {
       var checkedNum = $("input[name='followBox']:checked").length;
       if (checkedNum == 0) {
           Messenger().post({message: '请至少选择一条信息', type: 'error', showCloseButton: true});
       } else {
           $("#deleteAlert").text("确定要删除这" + checkedNum + "条信息么?");

           var checkedList = new Array();
           $("input[name='followBox']:checked").each(function () {
               checkedList.push($(this).parents("tr").find("td").eq(2).text().trim());
           });

           $("#sureDeleteAll").click(function () {
               $.ajax({
                   type: "POST",
                   url: "/deleteAllServlet",
                   dataType: "text",
                   data: {facList: checkedList.toString()},
                   success: function (data) {
                       if (data == "success") {
                           Messenger().post({message: '批量删除成功', type: 'success', showCloseButton: true});
                           $("#deleteAllModal").modal('hide');
                           refresh_2();
                       }
                       else if (data == "fail")
                           Messenger().post({message: '删除失败 请重试', type: 'error', showCloseButton: true});
                       else
                           Messenger().post({message: '未知错误', type: 'error', showCloseButton: true});
                   }
               });
           });
       }
   });
});
