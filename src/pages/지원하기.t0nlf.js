// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/hello-world

import wixWindow from 'wix-window-frontend';

$w.onReady(function () {

    const received = wixWindow.lightbox.getContext()
    var workDateList = received.workDateList
    console.log(workDateList)
    $w("#text125").text = received.title
    $w("#text152").text = received.date
    $w("#button8").onClick(async () => {
        const applyUrl = "https://asdfdsas.p-e.kr/api/apply/worker"
        const data = {
            jobPostId: Number(received.jobPostId),
            workDateList: workDateList
        }
        console.log(data)
        try {
            const applyResponse = await fetch(applyUrl, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpbklkIjoiYWJjZGVmZzEiLCJleHAiOjE3MjcxNjg5MTN9.VMNWXYBJtFrnszwPgH7yzAW5TQX1fJwN-ZGDq8rlS-M'
                },
                body: JSON.stringify(data)
              })
              if(!applyResponse.ok) {
                throw new Error('Network response was not ok ' + applyResponse.statusText);
              }
              const responseData = await applyResponse.json()
              console.log(responseData)
        }
        catch (error) {
            console.log('Error:',error)
        }
    })
});
