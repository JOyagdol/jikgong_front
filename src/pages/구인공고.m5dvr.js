import { getDataWithGetMethod } from "backend/dataFetcher";
import wixLocation from 'wix-location-frontend';
import { session } from "wix-storage-frontend";

$w.onReady(async function () {
  // 기존 데이터 초기화 + 데이터 받아오기
  var loginKey = session.getItem("loginKey");
  if(loginKey) {
    $w("#button4").label = "로그아웃"
    $w("#button4").onClick(() => {
      session.removeItem("loginKey");
      $w("#button4").label = "로그인"
      wixLocation.to(`/`);
    })
  }

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
    var url = `https://asdfdsas.p-e.kr/api/job-post/worker/list?size=12&`
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
    $w("#listRepeater").data = []
    var { data, message } = await getDataWithGetMethod({
    url: url,
  });
  for(let i=0;i < data.content.length;i++) {
    data.content[i]._id = `${i+1}`
  }
  console.log(data);
  $w("#listRepeater").data = []
  $w("#listRepeater").data = data.content;
}

function initRepeater() {
  $w("#listRepeater").onItemReady(($item, itemData, index) => {
    //initItemBackground($item, itemData)

    initItemWorkingDate($item, itemData)
    initItemTech($item, itemData)
    initItemTitle($item, itemData)
    initItemAddress($item, itemData)
    initItemConvenienceTag($item, itemData)
    initItemWage($item, itemData)
    initItemButtion($item, itemData)
    initItemCompany($item, itemData)
    initItemTime($item, itemData)
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

function initItemAddress($item, itemData) {
  $item("#text7").text = itemData.address;
}

function initItemTime($item, itemData) {
  var startTime = itemData.startTime;
  var endTime = itemData.endTime;
  var time = startTime.slice(0,5) + " ~ "+ endTime.slice(0,5);
  $item("#text157").text = time;
}

function initItemWage($item, itemData) {
  var amount = Number(itemData.wage);
  var formmatedAmout = amount.toLocaleString('ko-KR');
  $item("#text8").text = `${formmatedAmout}`+"원";
}

function initItemWorkingDate($item, itemData) {
  $item("#text2").text = itemData.startDate + " ~ " + itemData.endDate;
}

function initItemTech($item, itemData) {
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

function initItemCompany($item, itemData) {
  $item("#text156").text = itemData.companyName;
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
