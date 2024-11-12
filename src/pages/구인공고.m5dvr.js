import { getDataWithGetMethod } from "backend/dataFetcher";
import { sort } from "wix-data";
import wixLocation from 'wix-location-frontend';
import { session } from "wix-storage-frontend";
import wixWindowFrontend from "wix-window-frontend";

let currentPage = 0;
const itemsPerPage = 8;


$w.onReady(async function () {
  

  $w('#listRepeater').data = []
  initComponents()
  render()
  // 데이터 할당 시작
  $w('#button18').onClick( (event) => {
    $w('#listRepeater').data = []
    initComponents()
    render();
  })

  $w("#nextButton").onClick(() => {
    currentPage++;
    render();
  });

  $w("#prevButton").onClick(() => {
    if (currentPage > 0) {
      currentPage--;
      render();
    }
  });
});

function initComponents() {
  initRepeater()
}

async function render(){
  var tech_search = $w("#dropdown4").value;
  var date_search = $w("#datePicker1").value;
  var meal_search = $w("#dropdown2").value;
  var park_search = $w("#dropdown3").value;
  var sort_serach = $w("#dropdown5").value;
  var url = `https://asdfdsas.p-e.kr/api/job-post/worker/list?page=${currentPage}&size=${itemsPerPage}&`
  if(tech_search != null && tech_search != "") {
    url += `tech=${tech_search}&`
  }
  
  if(date_search != null && date_search != "") {
    url += `workDateList=${formatDate(date_search)}&`
  }
  if(meal_search != null && meal_search != "") {
    url += `meal=${meal_search}&`
  }
  if(park_search != null && park_search != "") {
    url += `park=${park_search}`
  }
  if(sort_serach != null && sort_serach != "") {
    url += `sortType=${sort_serach}`
  }
  else {
    url = url.slice(0, url.length-1)
  }

  if(url[url.length-1] == "&") {
    url = url.slice(0, url.length-1)
  }

  $w("#prevButton").enable();
  $w("#nextButton").enable();

  var { data, message } = await getDataWithGetMethod({
    url: url,
  });
  if(data.content.length == 0) {
    $w("#nextButton").disable();
    currentPage--;
  }
  else {
    $w("#currentPageText").text = `${currentPage + 1}`;
    for(let i=0;i < data.content.length;i++) {
      data.content[i]._id = `${i+1}`
    }
    $w("#listRepeater").data = []
    $w("#listRepeater").data = data.content;
  }
  if(data.content.length <= 7) {
    $w("#nextButton").disable();
  }
  if (currentPage == 0) {
    $w("#prevButton").disable();
  }
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
    wixLocation.to(`/구인공고-상세보기?jobPostId=${itemData.jobPostId}`);
  })
}

function initItemCompany($item, itemData) {
  $item("#text156").text = itemData.companyName;
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2); 
  const day = ('0' + date.getDate()).slice(-2); 

  return `${year}-${month}-${day}`;
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
