// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/hello-world

import wixLocation from 'wix-location-frontend';
import { getDataWithGetMethod } from "backend/dataFetcher";
import { session } from 'wix-storage-frontend';
import wixWindowFrontend from "wix-window-frontend";


var workDateActive = {};
const query = wixLocation.query;
$w.onReady(async function () {
    let formFactor = wixWindowFrontend.formFactor; 
    var loginKey = session.getItem("loginKey");
    if(loginKey) {
        if(formFactor == "Desktop") {
            $w("#button4").label = "로그아웃"
            $w("#button4").onClick(() => {
              session.removeItem("loginKey");
              $w("#button4").label = "로그인"
              wixLocation.to(`/`);
          })
          }
          else {
            $w("#mobileButton3").label = "로그아웃"
            $w("#mobileButton3").onClick(() => {
              session.removeItem("loginKey");
              $w("#mobileButton3").label = "로그인"
              wixLocation.to(`/`);
            })  
          }
        const url = "https://asdfdsas.p-e.kr/api/job-post/worker/"+`${query.jobPostId}`
        var { data, message } = await getDataWithGetMethod({
            url: url,
          });
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
        initComponents()
        render(data)
    
        $w("#button21").onClick(async () => {
            var applyUrl = "https://asdfdsas.p-e.kr/api/apply/worker"
            var workDateList = [];
            for (const key in workDateActive) {
                if(workDateActive[key] == "Active") {
                    workDateList.push(key);
                }
            }
            var data = {
                jobPostId: Number(query.jobPostId),
                workDateList: workDateList
            }
            try {
                const applyResponse = await fetch(applyUrl, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${loginKey}`
                    },
                    body: JSON.stringify(data)
                  })
                  const responseData = await applyResponse.json()
                  console.log(responseData)
                  if(responseData.message == "커스텀 예외 반환") {
                    if (responseData.data.errorMessage == "만료된 access token 입니다.") {
                        $w("#button21").label = "로그인 만료되었습니다. 재로그인 부탁드립니다."
                      }
                      else if(responseData.data.errorMessage) {
                        $w("#button21").label = responseData.data.errorMessage
                      }
                  }
                  else {
                    wixLocation.to(`/news-1`);
                  }
            }
            catch (error) {
                console.log('Error:',error)
            }
        })
    }
    else {
        wixLocation.to(`/로그인`);
    }

});

function initComponents() {
    initRepeater()
}

async function render(data){
    for(let i=0;i < data.workDateResponseList.length;i++) {
        data.workDateResponseList[i]._id = `${i+1}`
        workDateActive[data.workDateResponseList[i].workDateId] = "Active";
      }

    data.workDateResponseList.sort(function (a,b){
        var date1 = new Date(a.date);
        var date2 = new Date(b.date);
        if (date1 > date2) return 1;
        if (date1 < date2 ) return -1;
        return 0;
    });
    $w("#listRepeater").data = []
    $w("#listRepeater").data = data.workDateResponseList;
}

function initRepeater() {
    $w("#listRepeater").onItemReady(($item, itemData, index) => {
      initItemDate($item, itemData)
      initItemRecruitNum($item, itemData)
      initItemCheckBox($item, itemData)
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

function initItemCheckBox($item, itemData) {
    if(itemData.registeredNum == itemData.recruitNum) {
        $item("#checkbox1").disable();
    } 
    else {
        $item("#checkbox1").onClick((event) => {
            if (workDateActive[itemData.workDateId] == "Active") {
                workDateActive[itemData.workDateId] = "DeActive";
            }
            else {
                workDateActive[itemData.workDateId] = "Active";
            }
        })
    }
}
