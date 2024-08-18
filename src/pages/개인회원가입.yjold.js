// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/hello-world

var checkPhoneCode = "false";
var checkRepeatPhone = "false";
var checkRepeatId = "false";
var authPhoneCode;

var joinData = {}

$w.onReady(function () {
    $w("#text154").hide()
    $w("#text167").hide()
    $w("#text170").hide()


    
    
    $w("#button22").onClick(async () => {
        let phoneNum = $w("#input1").value
        joinData.phone = phoneNum
        if(validatePhoneNumber(phoneNum)) {
            const smsurl = "https://asdfdsas.p-e.kr/api/join/sms-verification"
            const data = {phone:phoneNum}
            const smsResponse = await fetch(smsurl, {
                method: "POST",
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify(data)
            })
            const responseData = await smsResponse.json()
            authPhoneCode = responseData.data.authCode
            console.log(authPhoneCode);
        }
        else {
            $w("#text154").show()
            $w("#text154").text = "- 제외하고 전화번호를 입력해주세요."
        }
    })

    $w("#button23").onClick(async () => {
        let authCode = $w("#input2").value
        if(authCode != authPhoneCode) {
            $w("#text154").show()
            $w("#text154").text = "인증번호가 잘못되었습니다."
        }
        else {
            const v_phoneUrl = "https://asdfdsas.p-e.kr/api/join/validation-phone"
            let phoneNum = joinData.phone
            const data = {phone:phoneNum}
            const phoneResponse = await fetch(v_phoneUrl, {
                method: "POST",
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify(data)
            })
            const responsePhoneData = await phoneResponse.json()
            console.log(responsePhoneData)
            if(responsePhoneData.message == "사용 가능한 휴대폰 입니다.") {
                $w("#text154").show()
                $w("#text154").text = "인증되었습니다."
                checkPhoneCode = "true"
                checkRepeatPhone = "true"
            }
            else {
                $w("#text154").show()
                $w("#text154").text = "이미 가입한 전화번호 입니다."
            }
        }
    })

    $w("#button24").onClick(async ()=> {
        let joinId = $w("#input10").value;
        const v_idUrl = "https://asdfdsas.p-e.kr/api/join/validation-loginId"
        const v_idData = {loginId:joinId}
        const vIdResponse = await fetch(v_idUrl, {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(v_idData)
        })
        const responseIdData = await vIdResponse.json()
        if(responseIdData.message == "사용 가능한 아이디 입니다.") {
            $w("#text167").show()
            $w("#text167").text = responseIdData.message
            checkRepeatId = "true"
            joinData.loginId = joinId
        }
        else {
            $w("#text167").show()
            $w("#text167").text = "이미 등록된 id입니다."
        }
        
    })



    $w("#button21").onClick(() => {
        let password = $w("#input11").value;
        let repassword = $w("#input12").value;

        if(checkPhoneCode == "false") {
            $w("#text154").show()
            $w("#text154").text = "전화번호 인증해야 합니다."
        }
        else if(checkRepeatPhone == "false") {
            $w("#text154").show()
            $w("#text154").text = "이미 가입하신 전화번호 입니다."
        }
        else if(checkRepeatId == "false") {
            $w("#text167").show()
            $w("#text167").text = "중복된 ID 입니다."
        }
        else if(password != repassword) {
            $w("#text170").show()
            $w("#text170").text = "입력하신 비밀번호와 일치하지 않습니다."
        }
        else {
            // 회원가입 패치
        }
    })
});

function validatePhoneNumber(phoneNumber) {
    const phoneRegex = /^010\d{8}$/;
    return phoneRegex.test(phoneNumber);
}