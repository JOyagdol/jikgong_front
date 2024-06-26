// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/hello-world
//  content body
// {
//   "data": {
//     "jobPostId": 2,
//     "title": "부산 강서구 명지동 빌리브 명시 듀클래스",
//     "tech": "NORMAL",
//     "startTime": "09:30:00",
//     "endTime": "18:00:00",
//     "workAddress": "부산 강서구 명지동 3605-6",
//     "distance": null,
//     "meal": false,
//     "pickup": true,
//     "pickupAddressList": [
//       "부산광역시 사하구 낙동대로 550번길 37",
//       "대한민국 부산광역시 서구 구덕로 225"
//     ],
//     "park": "FREE",
//     "parkDetail": "2번 GateWay 옆 공간",
//     "preparation": "작업복, 작업화",
//     "workDateResponseList": [
//       {
//         "workDateId": 3,
//         "date": "2024-08-01"
//       },
//       {
//         "workDateId": 4,
//         "date": "2024-08-02"
//       }
//     ],
//     "companyName": "삼성",
//     "manager": "이재용",
//     "phone": "01012345678",
//     "imageUrls": []
//   },
//   "message": "모집 공고 상세 화면 - 일반 반환 완료"
// }

import wixLocation from 'wix-location-frontend';
import wixWindow from 'wix-window-frontend';
import { getDataWithGetMethod } from "backend/dataFetcher";
import { getApiKey, kakaoApiKey } from "backend/apikey.jsw";

$w.onReady(async function () {
    // Write your JavaScript here
    const query = wixLocation.query;
    const url = "https://asdfdsas.p-e.kr/api/job-post/worker/"+`${query.jobPostId}`
    var { data, message } = await getDataWithGetMethod({
        url: url,
      });
    
    // title
    $w("#title").text = data.title
    $w("#text134").text = data.title

    // 근무 환경
    var sectionTag = []
    if(data.pickup == true)
      sectionTag.push( {'label':'픽업버스','value':`${data.pickup}`})
    if(data.meal == true)
      sectionTag.push( {'label':'식사','value':`${data.meal}`})
    if(data.park == "FREE")
      sectionTag.push( {'label':'주차무료','value':`${data.park}`})
    $w("#selectionTags4").options = sectionTag
    $w("#selectionTags1").options = sectionTag
    $w("#text154").text = data.parkDetail
    
    // 모집 인원
    $w("#text127").text = `${0}`;
    $w("#text1").text = `${0}`;

    // 노동 기간
    var startDate = data.workDateResponseList[0].date
    var endDate = data.workDateResponseList[data.workDateResponseList.length-1].date
    var resultDate = startDate + " ~ \n" + endDate;
    var lightBoxDate = startDate + " ~ " + endDate;
    $w("#text2").text = resultDate;
    $w("#text128").text = resultDate;

    //노동 시간
    var resultTime = data.startTime + " ~ " + data.endTime;
    $w("#text153").text = resultTime

    //급여
    $w("#text163").text = `${data.wage}`

    // 직종
    if (data.tech == "NORMAL") {
      $w("#selectionTags3").options = [
        {'label':'보통인부','value':`${data.tech}`}, 
      ]
      $w("#selectionTags2").options = [
        {'label':'보통인부','value':`${data.tech}`}, 
      ]
    }
      
    else if (data.tech == "TILE") {
      $w("#selectionTags2").options = [
        {'label':'타일','value':`${data.tech}`}, 
      ]
      $w("#selectionTags3").options = [
        {'label':'타일','value':`${data.tech}`}, 
      ]
    }
      
    //작업 장소
    $w("#text129").text = data.workAddress
    // 지도
    const mapUrl = `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(data.workAddress)}`
    const ApiKey = await getApiKey() //"483e4425efc50d6891881bece6845a9e"
    const mapResponse = await fetch(mapUrl, {
      method: "GET",
      headers: {
        'Authorization': `KakaoAK ${ApiKey}`
      },
    })
    const mapdata = await mapResponse.json();
    if (mapdata.documents && mapdata.documents.length > 0) {
      const { x, y, description } = mapdata.documents[0];
      $w("#googleMaps1").location = {
        "latitude": y*1,
        "longitude": x*1,
        "description": description
      };
    } else {
      console.log('No documents found');
    }

    //픽업 장소
    $w("#text133").text = ""
    var pickupAddressList = data.pickupAddressList
    for(let i=0;i<pickupAddressList.length;i++) {
      var pickupText = $w("#text133").text
      $w("#text133").text = pickupText + "\n" + pickupAddressList[i]
    }

    $w("#text156").text = data.preparation
    $w("#text159").text = data.companyName
    $w("#text160").text = data.phone

    var workDateList = []
    var workDateResponseList = data.workDateResponseList
    for(let i=0;i<workDateResponseList.length;i++) {
      workDateList.push(workDateResponseList[i].workDateId)
    }

    var lightBoxData = {
      'title':`${data.title}`,
      'date' :`${lightBoxDate}`,
      'workDateList' :workDateList,
      'jobPostId' : `${data.jobPostId}`
    }
    $w("#button1").onClick(() => {
      wixWindow.openLightbox("지원하기",lightBoxData)
    })
});
