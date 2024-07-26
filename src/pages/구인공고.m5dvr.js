import { getDataWithGetMethod } from "backend/dataFetcher";
import wixLocation from 'wix-location-frontend';
import wixStorage from'wix-storage'; 
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
      //   "thumbnailS3Url": "https://jikgong-resize-bucket.s3.ap-northeast-2.amazonaws.com/jobPost/thumbnail_3c8f0d5f-7fce-4c12-8b4f-475dedafe7db.jpg",
      //   "occupation : { "civil" : true, "electricity" : true }
      // },

$w.onReady(async function () {
  // 기존 데이터 초기화 + 데이터 받아오기
  $w('#listRepeater').data = []
  initComponents()
  render()
  // 데이터 할당 시작
  $w('#button18').onClick( (event) => {
    $w('#listRepeater').data = []
    initComponents()
    render();
  })
});

function initComponents() {
  initRepeater()
}

async function render(){
    var tech_search = $w("#dropdown4").value;
    var date_search = $w("#input1").value;
    var meal_search = $w("#dropdown2").value;
    var park_search = $w("#dropdown3").value;
    var url = `https://asdfdsas.p-e.kr/api/job-post/worker/list?`
    if(tech_search != null && tech_search != "") {
      url += `tech=${tech_search}&`
    }
    
    if(date_search != null && date_search != "") {
      url += `workDateList=${date_search}&`
    }
    if(meal_search != null && meal_search != "") {
      url += `meal=${meal_search}&`
    }
    if(park_search != null && park_search != "") {
      url += `park=${park_search}`
    }
    else {
      url = url.slice(0, url.length-1)
    }

    if(url[url.length-1] == "&") {
      url = url.slice(0, url.length-1)
    }

    console.log(url)

    $w("#listRepeater").data = []
    var { data, message } = await getDataWithGetMethod({
    url: url,
  });
  for(let i=0;i < data.content.length;i++) {
    data.content[i]._id = `${i+1}`
    data.content[i].dlPP = `${i+1}`
    data.content[i].occupation = `${{"civil" : true, "electricity" : true}}`
  }
  console.log(data);
  $w("#listRepeater").data = []
  $w("#listRepeater").data = data.content;
}

function initRepeater() {
  $w("#listRepeater").onItemReady(($item, itemData, index) => {
    //initItemBackground($item, itemData)

    initItemWorkingDate($item, itemData)
    initItemTechTag($item, itemData)
    initItemTitle($item, itemData)
    initItemDeadlinePP($item, itemData)
    initItemConvenienceTag($item, itemData)
    initItemWage($item, itemData)
    initItemButtion($item, itemData)
  });
}


function initItemTitle($item, itemData) {
  $item("#text13").text = itemData.title;
}

function initItemBackground($item, itemData) {
  $item("#image1").background.src = itemData.thumbnailS3Url;
}

function initItemConvenienceTag($item, itemData) {
  //console.log(itemData.meal, itemData.pickup)
  var sectionTag = []
  if(itemData.pickup == true)
    sectionTag.push( {'label':'픽업지원','value':`${itemData.pickup}`})
  if(itemData.meal == true)
    sectionTag.push( {'label':'식사','value':`${itemData.meal}`})
  $item("#selectionTags4").options = sectionTag
}

function initItemDeadlinePP($item, itemData) {
  $item("#text7").text = itemData.dlPP;
}

function initItemWage($item, itemData) {
  $item("#text8").text = `${itemData.wage}`+"원";
}

function initItemWorkingDate($item, itemData) {
  $item("#text2").text = itemData.startDate + " ~ " + itemData.endDate;
}

function initItemTechTag($item, itemData) {
  //console.log(itemData.meal, itemData.pickup)
  if (itemData.tech == "NORMAL")
    $item("#text154").text = "보통인부"
  else if (itemData.tech == "TILE")
    $item("#text154").text = "모집"
}

function initItemButtion($item, itemData) {
  $item("#container1").onClick(() => {
    wixLocation.to(`/courses-2?jobPostId=${itemData.jobPostId}`);
  })
}


// function initItemDescription($item, itemData, itemIndex) {
//   const itemDescription = itemData.description;

//   if (itemDescription.length > MAX_DESCRIPTION_LENGTH) {
//     $item("#description").text = elipsisText(
//       itemDescription,
//       MAX_DESCRIPTION_LENGTH
//     );
//   } else {
//     $item("#description").text = itemDescription;
//   }
// }
