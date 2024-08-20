// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/hello-world

import wixLocation from 'wix-location-frontend';

var checkPhoneCode = "false";
var checkRepeatPhone = "false";
var checkRepeatId = "false";
var checkJoinData = "true";
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



    $w("#button21").onClick(async () => {
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
            joinData.password = password
            joinData.workerName = $w("#input3").value
            if(!joinData.workerName) {
                checkJoinData = "false"
                $w("#button21").label = "이름을 입력해주세요."
            }
            joinData.role = "ROLE_WORKER"

            joinData.deviceToken = "token"
            joinData.isNotification = true
            let birthDate = $w("#datePicker1").value
            joinData.birth = formatDate(birthDate)

            joinData.nationality = $w("#dropdown1").value 
            if(!joinData.nationality) {
                checkJoinData = "false"
                $w("#button21").label = "국적을 선택해주세요."
            }
            
            let gender = $w("#selectionTags1").value[0]
            joinData.gender = gender
            if(!joinData.gender) {
                checkJoinData = "false"
                $w("#button21").label = "성별을 선택해주세요."
            }
            
            let address = $w("#addressInput1").value
            
            if(!address) {
                checkJoinData = "false"
                $w("#button21").label = "주소를 입력해주세요."
            }
            joinData.address = address.formatted
            joinData.latitude = address.location.latitude
            joinData.longitude = address.location.longitude
        
            let rrn = $w("#input7").value + "-" + $w("#input8").value
            joinData.rrn = rrn
            if(!joinData.rrn) {
                checkJoinData = "false"
                $w("#button21").label = "주민등록번호를 입력해주세요."
            }
           
            joinData.bank = $w("#dropdown2").value
            if(!joinData.bank) {
                checkJoinData = "false"
                $w("#button21").label = "은행을 선택해주세요."
            }
            joinData.account = $w("#input9").value
            if(!joinData.account) {
                checkJoinData = "false"
                $w("#button21").label = "계좌번호를 입력해주세요."
            }

            if(checkJoinData == "true") {
                const joinUrl = "https://asdfdsas.p-e.kr/api/join/worker/join"
                const joinResponse = await fetch(joinUrl, {
                    method: "POST",
                    headers: {
                        'Content-Type' : 'application/json',
                    },
                    body: JSON.stringify(joinData)
                })
                const responseJoinData = await joinResponse.json()
    
                if (responseJoinData.message == "노동자 회원 가입 완료") {
                    $w("#button21").label = responseJoinData.message
                    
                    setTimeout(() => wixLocation.to(`/로그인`),3000)
                }
                else {
                    $w("#button21").label = "회원 가입 오류 : 재작성 및 재시도 부탁드립니다."
                }
            }
        }
    })
});

function validatePhoneNumber(phoneNumber) {
    const phoneRegex = /^010\d{8}$/;
    return phoneRegex.test(phoneNumber);
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); 
    const day = ('0' + date.getDate()).slice(-2); 

    return `${year}${month}${day}`;
}