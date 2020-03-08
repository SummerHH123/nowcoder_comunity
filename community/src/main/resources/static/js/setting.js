$(function(){
    $("#head-image").blur(function () {
        var fileInput = $('#head-image').get(0).files[0];
        console.info(fileInput);
        if(!fileInput){
            $("#head_msg").text("请上传图片").show();
        }else {
            if (!read_picture()){
                $("#head_msg").text("请上传图片（格式BMP、JPG、JPEG、PNG、GIF等）!").show();;
            }else {
                $("#head_msg").hide();
            }

        }
    });
    $("#uploadForm").submit(upload);
});

function upload() {

    if (read_picture()){
        $.ajax({
            url: "http://upload.qiniup.com",
            method: "post",
            processData: false,
            contentType: false,
            data: new FormData($("#uploadForm")[0]),
            success: function(data) {
                if(data && data.code == 0) {
                    // 更新头像访问路径
                    $.post(
                        CONTEXT_PATH + "/user/header/url",
                        {"fileName":$("input[name='key']").val()},
                        function(data) {
                            data = $.parseJSON(data);
                            if(data.code == 0) {
                                alert("更新成功");
                                setTimeout(function () {
                                    window.location.reload();
                                }, 3000);
                            } else {
                                alert(data.msg);
                            }
                        }
                    );
                } else {
                    alert("上传失败!");
                }
            }
        });
    }

        return false;
}

function read_picture() {
    if(typeof FileReader != 'undefined') {
        var file = document.getElementById("head-image").files[0];
        if ((file.type).indexOf("image/") == -1) {
            $("#head_msg").text("请上传图片").show();

            return false;
        }else {
            return true;
        }


    }else {
        return false;
    }

    // }else{
    //     // var fileName=document.getElementById("head-image").value;
    //     // var suffixIndex=fileName.lastIndexOf(".");
    //     // var suffix=fileName.substring(suffixIndex+1).toUpperCase();
    //     // if(suffix!="BMP"&&suffix!="JPG"&&suffix!="JPEG"&&suffix!="PNG"&&suffix!="GIF"){
    //     //     $("#hint_text").text("请上传图片（格式BMP、JPG、JPEG、PNG、GIF等）!");
    //     //     $("#hint_text").css("color","red");
    //     //
    //     // }
    //
    // }
}




