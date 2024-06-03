// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/hello-world
import { fetch, getJSON } from 'wix-fetch';

$w.onReady(async function () {
    // Write your JavaScript here

    // To select an element by ID use: $w('#elementID')

    // Click 'Preview' to run your code
    //button 8 확정

    $w('#section3').collapse();
    $w('#section4').collapse();

    $w('#button8').onClick( (event) => {
        const clickedElement = event.target;
        clickedElement.style.color = "#FD5521";
        clickedElement.style.borderColor = "#FD5521";

        $w('#button9').style.color = "#C7C7C7";
        $w('#button9').style.borderColor = "#C7C7C7";

        $w('#button10').style.color = "#C7C7C7";
        $w('#button10').style.borderColor = "#C7C7C7";

        $w('#section1').expand();
        $w('#section3').collapse();
        $w('#section4').collapse();

        console.log(clickedElement.id,"onclick");
    })

    //button 9 예약

    $w('#button9').onClick( (event) => {
        const clickedElement = event.target;
        clickedElement.style.color = "#FD5521";
        clickedElement.style.borderColor = "#FD5521";

        $w('#button8').style.color = "#C7C7C7";
        $w('#button8').style.borderColor = "#C7C7C7";

        $w('#button10').style.color = "#C7C7C7";
        $w('#button10').style.borderColor = "#C7C7C7";

        $w('#section1').collapse();
        $w('#section3').expand();
        $w('#section4').collapse();

        console.log(clickedElement.id,"onclick");
    })

    //button 10 마감

    $w('#button10').onClick( (event) => {
        const clickedElement = event.target;
        clickedElement.style.color = "#FD5521";
        clickedElement.style.borderColor = "#FD5521";

        $w('#button8').style.color = "#C7C7C7";
        $w('#button8').style.borderColor = "#C7C7C7";

        $w('#button9').style.color = "#C7C7C7";
        $w('#button9').style.borderColor = "#C7C7C7";

        $w('#section1').collapse();
        $w('#section3').collapse();
        $w('#section4').expand();

        console.log(clickedElement.id,"onclick");
    })

    const jobUrl = "https://asdfdsas.p-e.kr/api/apply/worker/pending"
   
    const jobResponse = await fetch(jobUrl, {
        method: "GET",
        headers: {
            'Auth': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpbklkIjoiYWJjZGVmZzEiLCJleHAiOjE3MjA5NzA3OTJ9.mhV9FqhLONb5uohaA8FrTEY45DFFEc5qYsDjpQD5PH8'
        }
    })
        
    const responseData = await jobResponse.json()
    console.log(responseData)
    
   

});
