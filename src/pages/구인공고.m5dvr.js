import { getDataWithGetMethod } from "backend/dataFetcher";
import { sort } from "wix-data";
import wixLocation from 'wix-location-frontend';
import { session } from "wix-storage-frontend";
import wixWindowFrontend from "wix-window-frontend";

let currentPage = 0;
const itemsPerPage = 8;
let tech_list = {"NORMAL":"보통인부","FOREMAN":"작업반장","SKILLED_LABORER":"특별인부","HELPER":"조력공","SCAFFOLDER":"비계공","FORMWORK_CARPENTER":"형틀목공","REBAR_WORKER":"철근공","STEEL_STRUCTURE_WORKER":"철골공","WELDER":"용접공","CONCRETE_WORKER":"콘크리트공","BRICKLAYER":"조적공","DRYWALL_FINISHER":"견출공","CONSTRUCTION_CARPENTER":"건축목공","WINDOW_DOOR_INSTALLER":"창호공","GLAZIER":"유리공","WATERPROOFING_WORKER":"방수공","PLASTERER":"미장공","TILE":"타일","PAINTER":"도장공","INTERIOR_FINISHER":"내장공","WALLPAPER_INSTALLER":"도배공","POLISHER":"연마공","STONEMASON":"석공","GROUT_WORKER":"줄눈공","PANEL_ASSEMBLER":"판넬조립공","ROOFER":"지붕잇기공","LANDSCAPER":"조경공","CAULKER":"코킹공","PLUMBER":"배관공","BOILER_TECHNICIAN":"보일러공","SANITARY_TECHNICIAN":"위생공","DUCT_INSTALLER":"덕트공","INSULATION_WORKER":"보온공","MECHANICAL_EQUIPMENT_TECHNICIAN":"기계설비공","ELECTRICIAN":"내선전공","TELECOMMUNICATIONS_INSTALLER":"통신내선공","TELECOMMUNICATIONS_EQUIPMENT_INSTALLER":"통신설비공"};

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

  $w("#nextButton").onClick(() => {
    currentPage++;
    $w('#listRepeater').data = []
    render();
  });

  $w("#prevButton").onClick(() => {
    if (currentPage > 0) {
      currentPage--;
      $w('#listRepeater').data = []
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
  
  if(data.content.length == 0 && currentPage > 0) {
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

  $item("#text154").text = tech_list[itemData.tech]
  
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
