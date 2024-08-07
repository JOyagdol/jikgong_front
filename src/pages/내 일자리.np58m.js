// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/hello-world
import { fetch, getJSON } from 'wix-fetch';
import { getDataWithGetMethod } from "backend/dataFetcher";
import wixLocation from 'wix-location-frontend';
import wixWindow from 'wix-window-frontend';
import { session } from 'wix-storage-frontend';

var loginKey = session.getItem("loginKey");
$w.onReady(async function () {
    // Write your JavaScript here

    // To select an element by ID use: $w('#elementID')

    // Click 'Preview' to run your code
    //button 8 확정
    
    if(loginKey) {
      $w("#button4").label = "로그아웃"
      $w("#button4").onClick(() => {
          session.removeItem("loginKey");
          $w("#button4").label = "로그인"
          wixLocation.to(`/`);
      })
      initComponents()
      render()
    }
    else {
      $w('#section1regulartitle1').text = "로그인 후 이용 가능합니다"
      $w('#text155').text = "회원가입 후 로그인 부탁드립니다"
      $w('#section1').collapse();
      wixLocation.to(`/로그인`);
    }
});

function initComponents() {
    initRepeater()
  }

async function render(){
  const jobUrl = "https://asdfdsas.p-e.kr/api/apply/worker/future"

  const jobResponse = await fetch(jobUrl, {
  method: "GET",
  headers: {
      'Authorization': `Bearer ${loginKey}`
  }
  })
  
  // repeater 개수 늘어나는 경우 페이지 처리?
  var responseData = await jobResponse.json()
  if (responseData.data.errorMessage == "만료된 access token 입니다.") {
      $w('#section1regulartitle1').text = "로그인이 만료되었습니다!"
      $w('#text155').text = "다시 로그인 시도 부탁드려요"
      $w('#section1').collapse();
  }
  else if (responseData.data.errorMessage) {
    $w('#section1regulartitle1').text = responseData.data.errorMessage
    $w('#text155').collapse();
    $w('#section1').collapse();
  }
  else {
    if(responseData.data.length == 0) {
      $w('#section1regulartitle1').text = "지원하신 일자리가 없습니다!"
      $w('#text155').text = "구인공고로 가서 일자리를 지원해보세요"
      $w('#section1').collapse();
    }
    else {
      $w('#Section1Regular').collapse();
      console.log(responseData)
      for(let i=0;i<responseData.data.length;i++) {
        responseData.data[i]._id = `${i+1}`
      }
      $w('#listRepeater').data = []
      $w('#listRepeater').data = responseData.data
    }
    
  }
}  

function initRepeater() {
  $w('#listRepeater').onItemReady(($item, itemData, index) => {

    initItemWorkingDate($item, itemData)
    initItemTechTag($item, itemData)
    initItemTitle($item, itemData)
    initItemButtion($item, itemData)
    initItemStatus($item, itemData)
    initItemTimeStamp($item, itemData)
  

  });
}
function initItemTitle($item, itemData) {
    $item("#title").text = itemData.jobPostResponse.title;
  }
  
  function initItemWorkingDate($item, itemData) {
    $item("#text158").text = itemData.workDate;
  }
  
  function initItemTechTag($item, itemData) {
    //console.log(itemData.meal, itemData.pickup)
    if (itemData.jobPostResponse.tech == "NORMAL")
      $item("#text157").text = "보통인부"
    else if (itemData.jobPostResponse.tech == "TILE")
      $item("#text157").text = "타일"
  }

  function initItemButtion($item, itemData) {
    $item("#button9").onClick(async () => {
      // itemData.timePassed => n일 전, 2<=n
      const deleteUrl = "https://asdfdsas.p-e.kr/api/apply/worker/"+`${itemData.applyId}`
      const deleteResponse = await fetch(deleteUrl, {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${loginKey}`
        }
        })
        var responseData = await deleteResponse.json()
        // 이거 예외처리 출력을 어떻게 하지,,,
        render();
    })
  }


function initItemStatus($item, itemData) {
  // 색 적용
  if(itemData.status == "PENDING") $item("#text159").text = "대기중"
  else if(itemData.status == "REJECTED") $item("#text159").text = "거절됨"
  else if(itemData.status == "ACCEPTED") $item("#text159").text = "수락됨"
  else if(itemData.status == "CANCELED") $item("#text159").text = "취소됨"
  else if(itemData.status == "OFFERED") $item("#text159").text = "제안됨"
}

function initItemTimeStamp($item, itemData) {
  $item("#text126").text = itemData.timePassed;
}