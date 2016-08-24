var xiha = {
    postData: function(url, parameter, callback, dataType, ajaxType) {
        if (!dataType) dataType = 'JSON';
        $.ajax({
            type: "POST",
            url: url,
            async: true,
            dataType: dataType,
            json: "callback",
            data: parameter,
            success: function(data) {
                if (callback == null) {
                    return;

                }
                callback(data);

            },
            error: function(error) {
                alert('连接失败');
                $('#load').html('连接中断，连接出现错误');

            }

        });

    }

}
function login(uin, p, vcode, pt_verifysession) {
    $('#load').html('正在登陆，请稍等...');
    var pwd = $('#pwd').val();
    var loginurl = "/external/qqlogin.php?do=qqlogin";
    xiha.postData(loginurl, "uin=" + uin + "&pwd=" + encodeURIComponent(pwd) + "&p=" + p + "&vcode=" + vcode + "&pt_verifysession=" + pt_verifysession + "&r=" + Math.random(1), 
    function(d) {
        if (d.saveOK == 0) {
            $('#load').html('SID获取成功，请稍等...');
            save(d.uin, d.skey, d.pskey, d.mskey);

        } else if (d.saveOK == 4) {
            $('#load').html('验证码错误，请重新登录。');
            $('#submit').attr('do', 'submit');
            $('.code').hide();

        } else if (d.saveOK == 3) {
            $('#load').html('您输入的帐号或密码不正确，请重新输入密码！');
            $('#submit').attr('do', 'submit');
            $('.code').hide();

        } else {
            $('#load').html(d.msg);
            $('#submit').attr('do', 'submit');

        }

    });


}
function save(uin, skey, pskey, mskey) {
    $('#load').html('正在存入数据库，请稍等...');
    var loginurl = "/external/ajax.php?do=save";
    var pwd = $('#pwd').val();
    xiha.postData(loginurl, "uin=" + uin + "&skey=" + skey + "&pskey=" + pskey + "&mskey=" + mskey + "&pwd=" + pwd, 
    function(d) {
        if (d.saveOK == 0) {
            $('#load').html(d.msg);

        } else {
            $('#load').html(d.msg);

        }

    });

}
function getvc(uin, sig) {
    $('#load').html('获取验证码，请稍等...');
    var getvcurl = "/external/qqlogin.php?do=getvc";
    xiha.postData(getvcurl, 'uin=' + uin + '&sig=' + sig + '&r=' + Math.random(1), 
    function(d) {
        if (d.saveOK == 0) {
            $('#load').html('请输入验证码');
            $('#codeimg').attr('vc', d.vc);
            $('#codeimg').html('<img onclick="getvc(\'' + uin + '\',\'' + d.vc + '\')" src="/external/qqlogin.php?do=getvcpic&uin=' + uin + '&sig=' + d.vc + '&r=' + Math.random(1) + '">');
            $('#submit').attr('do', 'code');
            $('.code').show();

        } else {
            $('#load').html(d.msg);

        }

    });


}
function dovc(uin, code, vc) {
    $('#load').html('验证验证码，请稍等...');
    var getvcurl = "/external/qqlogin.php?do=dovc";
    xiha.postData(getvcurl, 'uin=' + uin + '&ans=' + code + '&sig=' + vc + '&r=' + Math.random(1), 
    function(d) {
        if (d.rcode == 0) {
            var pwd = $('#pwd').val();
            $('#load').html('获取P值，请稍等...');
            p = $.Encryption.getEncryption(pwd, uin, d.randstr.toUpperCase());
            $('#load').html('登录中，请稍等...');
            login(uin, p, d.randstr.toUpperCase(), d.sig);


        } else {
            $('#load').html('验证码错误，重新生成验证码，请稍等...');
            getvc(uin, vc);

        }

    });


}
$(document).ready(function() {
    $('#submit').click(function() {
        var self = $(this);
        $('#load').html('登录中，请稍候...');
        var uin = $('#uin').val(),
        pwd = $('#pwd').val();
        if (self.attr('do') == 'code') {
            var vcode = $('#code').val(),
            vc = $('#codeimg').attr('vc');
            dovc(uin, vcode, vc);

        } else {
            if (self.attr("data-lock") === "true") return;
            else self.attr("data-lock", "true");
            var checkvcurl = "/external/qqlogin.php?do=checkvc";
            xiha.postData(checkvcurl, 'uin=' + uin + '&r=' + Math.random(1), 
            function(d) {
                if (d.saveOK == 0) {
                    var strs = new Array();
                    //定义一数组
                    strs = d.data.split(",");
                    if (strs[0] == 0) {
                        pt_verifysession = strs[3];
                        p = getmd5(uin, pwd, strs[2]);
                        login(strs[1], p, strs[2], pt_verifysession);

                    } else {
                        getvc(uin, strs[2]);

                    }

                } else {
                    $('#load').html(d.msg);

                }
                self.attr("data-lock", "false");

            });

        }

    });

});