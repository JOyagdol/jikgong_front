// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/hello-world

var checkPhoneCode = "false";
var checkRepeatPhone = "false";
var checkRepeatId = "false";

$w.onReady(function () {
    $w("#text154").collapse()
    $w("#text167").collapse()
    $w("#text170").collapse()


    



    $w("#button21").onClick(() => {
        let password = $w("#input11").value;
        let repassword = $w("#input12").value;

        if(checkPhoneCode == "false") {
            $w("#text154").expand()
            $w("#text154").text = "전화번호 인증해야 합니다."
        }
        else if(checkRepeatPhone == "false") {
            $w("#text154").expand()
            $w("#text154").text = "이미 가입하신 전화번호 입니다."
        }
        else if(checkRepeatId == "false") {
            $w("#text167").expand()
            $w("#text167").text = "중복된 ID 입니다."
        }
        else if(password != repassword) {
            $w("#text170").expand()
            $w("#text170").text = "입력하신 비밀번호와 일치하지 않습니다."
        }
        else {
            // 회원가입 패치
        }
    })
});
