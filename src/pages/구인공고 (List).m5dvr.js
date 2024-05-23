import { getDataWithGetMethod } from "backend/dataFetcher";
    //  content body
    //   {
    //     "jobPostId": 1,
    //     "tech": "NORMAL",
    //     "recruitNum": 60,
    //     "title": "사하구  낙동5블럭  낙동강 온도 측정 센터 신축공사",
    //     "meal": true,
    //     "pickup": true,
    //     "park": "FREE",
    //     "startDate": "2024-07-01",
    //     "endDate": "2024-07-02",
    //     "startTime": "18:00:00",
    //     "endTime": "18:00:00",
    //     "address": "부산광역시 사하구 낙동대로 550번길 37",
    //     "distance": null,
    //     "companyName": "삼성",
    //     "wage": 150000,
    //     "isScrap": null,
    //     "thumbnailS3Url": "https://jikgong-resize-bucket.s3.ap-northeast-2.amazonaws.com/jobPost/thumbnail_3c8f0d5f-7fce-4c12-8b4f-475dedafe7db.jpg"
    //   },

$w.onReady(async function () {
  // 기존 데이터 초기화 + 데이터 받아오기
  initRepeater()
  initData()
  // 데이터 할당 시작
});

async function initData(){
    $w("#listRepeater").data = []
    var { data, message } = await getDataWithGetMethod({
    url: "http://43.203.86.121/api/job-post/worker/list",
  });
  console.log(data.content);
  $w("#listRepeater").data = data;
}

function initRepeater() {
  $w("#listRepeater").onItemReady(($item, itemData, index) => {
    initItemTitle($item, itemData)
    initItemBackground($item, itemData)
    initItemSelectionTag($item, itemData)
  });
}

function initItemTitle($item, itemData) {
  $item("#text13").text = itemData.title;
}

function initItemBackground($item, itemData) {
  $item("#image1").style.background = itemData.thumbnailS3Url;
}

function initItemSelectionTag($item, itemData) {
  $item("#selectionTags5").elipsisText = itemData.meal
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
