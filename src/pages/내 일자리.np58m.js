// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/hello-world
import { fetch, getJSON } from 'wix-fetch';
import { getDataWithGetMethod } from "backend/dataFetcher";
import wixLocation from 'wix-location-frontend';
import wixWindow from 'wix-window-frontend';
  

$w.onReady(async function () {
    // Write your JavaScript here

    // To select an element by ID use: $w('#elementID')

    // Click 'Preview' to run your code
    //button 8 확정

    $w('#section1').collapse();

    $w('#repeater1').data = []
    initComponents()
    render()

    
});

function initComponents() {
    initRepeater()
  }

async function render(){
    const jobUrl = "https://asdfdsas.p-e.kr/api/apply/worker/pending"

    const jobResponse = await fetch(jobUrl, {
    method: "GET",
    headers: {
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpbklkIjoiYWJjZGVmZzEiLCJleHAiOjE3MjcxNjg5MTN9.VMNWXYBJtFrnszwPgH7yzAW5TQX1fJwN-ZGDq8rlS-M'
    }
    })
    
    var responseData = await jobResponse.json()
    if (responseData.message == "만료된 access token 입니다.") {
        $w('#section1regulartitle1').text = "로그인이 만료되었습니다!"
        $w('#text155').text = "다시 로그인 시도 부탁드려요"
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

        for(let i=0;i<responseData.data.length;i++) {
          responseData.data[i]._id = `${i+1}`
        }
        $w('#repeater1').data = []
        $w('#repeater1').data = responseData.data
      }
      
    }
    
    

}  

function initRepeater() {
    $w('#repeater1').onItemReady(($item, itemData, index) => {

        initItemWorkingDate($item, itemData)
        initItemTechTag($item, itemData)
        initItemTitle($item, itemData)
        initItemButtion($item, itemData)
        //initItemPicture($item, itemData)

    });
}
function initItemTitle($item, itemData) {
    $item("#text153").text = itemData.jobPostResponse.title;
  }
  
  function initItemPicture($item, itemData) {
    $item("#image1").picture.src = itemData.thumbnailS3Url;
  }
  
  function initItemWorkingDate($item, itemData) {
    $item("#text154").text = itemData.workDate;
  }
  
  function initItemTechTag($item, itemData) {
    //console.log(itemData.meal, itemData.pickup)
    if (itemData.jobPostResponse.tech == "NORMAL")
      $item("#selectionTags5").options = [
        {'label':'보통인부','value':`${itemData.tech}`}, 
      ]
    else if (itemData.jobPostResponse.tech == "TILE")
      $item("#selectionTags5").options = [
        {'label':'타일','value':`${itemData.tech}`}, 
      ]
  }

  function initItemButtion($item, itemData) {
    $item("#button19").onClick(async () => {
      const deleteUrl = "https://asdfdsas.p-e.kr/api/apply/worker/"+`${itemData.applyId}`
      const deleteResponse = await fetch(deleteUrl, {
        method: "DELETE",
        headers: {
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpbklkIjoiYWJjZGVmZzEiLCJleHAiOjE3MjA5NzA3OTJ9.mhV9FqhLONb5uohaA8FrTEY45DFFEc5qYsDjpQD5PH8'
        }
        })
        
        var responseData = await deleteResponse.json()
        wixLocation.to('/courses-2-1')
    })
  }


  