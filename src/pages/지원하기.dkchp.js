// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/hello-world

import wixLocation from 'wix-location-frontend';
import { getDataWithGetMethod } from "backend/dataFetcher";

$w.onReady(async function () {
    const query = wixLocation.query;
    const url = "https://asdfdsas.p-e.kr/api/job-post/worker/"+`${query.jobPostId}`
    var { data, message } = await getDataWithGetMethod({
        url: url,
      });
    
    console.log(data);
    // title
    $w("#text126").text = data.title;

    // tech
    if (data.tech == "NORMAL") {
        $w("#title").text = "보통인부";
    }
        
    else if (data.tech == "TILE") {
        $w("#title").text = "타일";
    }

    var recruitNum = data.workDateResponseList[0].recruitNum;
    // 모집 인원
    $w("#text124").text = `${recruitNum} 명 모집`;

    $w('#listRepeater').data = []
    initComponents()
    render(data)

});

function initComponents() {
    initRepeater()
}

async function render(data){
    for(let i=0;i < data.workDateResponseList.length;i++) {
        data.workDateResponseList[i]._id = `${i+1}`
      }

    data.workDateResponseList.sort(function (a,b){
        var date1 = new Date(a.date);
        var date2 = new Date(b.date);
        if (date1 > date2) return 1;
        if (date1 < date2 ) return -1;
        return 0;
    });
    console.log(data.workDateResponseList)
    $w("#listRepeater").data = []
    $w("#listRepeater").data = data.workDateResponseList;
}

function initRepeater() {
    $w("#listRepeater").onItemReady(($item, itemData, index) => {
      initItemDate($item, itemData)
      initItemRecruitNum($item, itemData)
      initItemContainer($item, itemData)
    });
  }

function initItemDate($item, itemData) {
    const week = {0:"일",1:"월",2:"화",3:"수",4:"목",5:"금",6:"토"}
    var dayOfWeek = new Date(itemData.date).getDay();
    var date = itemData.date.split('-');
    $item("#text186").text = `${date[0].substr(2,2)}년 ${date[1]}월 ${date[2]}일(${week[dayOfWeek]})`;
}

function initItemRecruitNum($item, itemData) {
    $item("#text188").text = `${itemData.registeredNum}/${itemData.recruitNum}명`;
}

function initItemContainer($item, itemData) {
    $item("#container1").text   
}