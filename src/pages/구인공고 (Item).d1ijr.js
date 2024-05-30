// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/hello-world
//  content body
      // {
      //   "jobPostId": 1,
      //   "tech": "NORMAL",
      //   "recruitNum": 60,
      //   "title": "사하구  낙동5블럭  낙동강 온도 측정 센터 신축공사",
      //   "meal": true,
      //   "pickup": true,
      //   "park": "FREE",
      //   "startDate": "2024-07-01",
      //   "endDate": "2024-07-02",
      //   "startTime": "18:00:00",
      //   "endTime": "18:00:00",
      //   "address": "부산광역시 사하구 낙동대로 550번길 37",
      //   "distance": null,
      //   "companyName": "삼성",
      //   "wage": 150000,
      //   "isScrap": null,
      //   "thumbnailS3Url": "https://jikgong-resize-bucket.s3.ap-northeast-2.amazonaws.com/jobPost/thumbnail_3c8f0d5f-7fce-4c12-8b4f-475dedafe7db.jpg"
      // },


import wixLocation from 'wix-location-frontend';
import { getDataWithGetMethod } from "backend/dataFetcher";

$w.onReady(async function () {
    // Write your JavaScript here
    const query = wixLocation.query;
    var { data, message } = await getDataWithGetMethod({
        url: "http://43.203.86.121/api/job-post/worker/list",
      });
    for(let i=0;i < data.content.length;i++) {
      data.content[i]._id = `${i+1}`
      data.content[i].dlPP = `${i+1}`
      data.content[i].occupation = `${{"civil" : true, "electricity" : true}}`
    }
    
    const itemData = data.content[Number(query.id)-1] 
    
    // title
    $w("#title").text = itemData.title
    
    // 근무 환경
    var sectionTag = []
    if(itemData.pickup == true)
      sectionTag.push( {'label':'픽업버스','value':`${itemData.pickup}`})
    else if(itemData.meal == true)
      sectionTag.push( {'label':'식사','value':`${itemData.meal}`})
    $w("#selectionTags4").options = sectionTag
    
    // 모집 인원
    $w("#text1").text = itemData.dlPP;

    // 노동 기간
    $w("#text2").text = itemData.startDate + " ~ " + itemData.endDate;

    // 직종
    $w("#selectionTags3").options = [
      {'label':'토목','value':`${itemData.occupation["civil"]}`}, 
      {'label':'전기','value':`${itemData.occupation["electricity"]}`}, 
    ]
});
