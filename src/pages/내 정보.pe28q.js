// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/hello-world
import wixLocation from 'wix-location-frontend';
import wixWindow from 'wix-window-frontend';
import { session } from 'wix-storage-frontend';

var loginKey = session.getItem("loginKey");
let tech_list = {"NORMAL":"보통인부","FOREMAN":"작업반장","SKILLED_LABORER":"특별인부","HELPER":"조력공","SCAFFOLDER":"비계공","FORMWORK_CARPENTER":"형틀목공","REBAR_WORKER":"철근공","STEEL_STRUCTURE_WORKER":"철골공","WELDER":"용접공","CONCRETE_WORKER":"콘크리트공","BRICKLAYER":"조적공","DRYWALL_FINISHER":"견출공","CONSTRUCTION_CARPENTER":"건축목공","WINDOW_DOOR_INSTALLER":"창호공","GLAZIER":"유리공","WATERPROOFING_WORKER":"방수공","PLASTERER":"미장공","TILE":"타일","PAINTER":"도장공","INTERIOR_FINISHER":"내장공","WALLPAPER_INSTALLER":"도배공","POLISHER":"연마공","STONEMASON":"석공","GROUT_WORKER":"줄눈공","PANEL_ASSEMBLER":"판넬조립공","ROOFER":"지붕잇기공","LANDSCAPER":"조경공","CAULKER":"코킹공","PLUMBER":"배관공","BOILER_TECHNICIAN":"보일러공","SANITARY_TECHNICIAN":"위생공","DUCT_INSTALLER":"덕트공","INSULATION_WORKER":"보온공","MECHANICAL_EQUIPMENT_TECHNICIAN":"기계설비공","ELECTRICIAN":"내선전공","TELECOMMUNICATIONS_INSTALLER":"통신내선공","TELECOMMUNICATIONS_EQUIPMENT_INSTALLER":"통신설비공"};

$w.onReady(async function () {

    $w("#button25").onClick(async () => {
        let result = await wixWindow.openLightbox("경력추가");
        
        let tag = `${tech_list[result.tech]}`+" : "+result.year+"년 "+result.month+"개월"
        workExperienceTag.push({
            'value':tag,
            'label':tag
        })
        $w("#selectionTags2").options = workExperienceTag

    })

    $w("#button26").onClick(() => {
        workExperienceTag = []
        $w("#selectionTags2").options = workExperienceTag
    })

    $w("#input1").disable();
    $w("#selectionTags2").options = [];

    let myInfoUrl = "https://asdfdsas.p-e.kr/api/member-info/worker"

    const myInfoResponse = await fetch(myInfoUrl, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${loginKey}`
            }
        })

    var responseData = await myInfoResponse.json()
    console.log(responseData)
    //personal info
    $w("#input1").value = responseData.data.phone;

    $w("#input3").value = responseData.data.workerName;

    $w("#datePicker1").value = new Date(responseData.data.birth);

    $w("#dropdown1").value = responseData.data.nationality;

    $w("#selectionTags1").value = responseData.data.gender;

    //주소 표시
    let addressUrl = "https://asdfdsas.p-e.kr/api/location/list"

    const addressResponse = await fetch(addressUrl, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${loginKey}`
            }
        })
    
    var addressResponseData = await addressResponse.json();
    console.log(addressResponseData)

    //workExperience
    var workExperienceTag = []
    for(let i=0;i<responseData.data.workExperienceResponseList.length;i++) {
        let tech = responseData.data.workExperienceResponseList[i].tech
        let d = Number(responseData.data.workExperienceResponseList[i].experienceMonths)
        let y = parseInt(d/12);
        let m = d%12;
        workExperienceTag.push({
            'value': `${tech_list[tech]} : ${y}년 ${m}개월`,
            'label': `${tech_list[tech]} : ${y}년 ${m}개월`
        })
    }
    $w("#selectionTags2").options = workExperienceTag;


    //bank
    $w("#dropdown2").value = responseData.data.bank;
    $w("#input9").value = responseData.data.account;

    //has
    if(responseData.data.hasVisa == true) {
        $w("#checkbox1").checked = true
    }
    if(responseData.data.hasEducationCertificate == true) {
        $w("#checkbox2").checked = true
    }
    if(responseData.data.hasWorkerCard == true) {
        $w("#checkbox3").checked = true
    }


    // 개인 정보 수정하기 + 주소 수정하기

    $w("#button21").onClick(() => {

    })
    
});
