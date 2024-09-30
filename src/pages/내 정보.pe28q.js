// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/hello-world
import wixLocation from 'wix-location-frontend';
import wixWindow from 'wix-window-frontend';
import { session } from 'wix-storage-frontend';

var loginKey = session.getItem("loginKey");

$w.onReady(async function () {
    let myInfoUrl = "https://asdfdsas.p-e.kr/api/member-info/worker"

    const myInfoResponse = await fetch(myInfoUrl, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${loginKey}`
            }
        })

    var responseData = await myInfoResponse.json()

    console.log(responseData)
    // Write your JavaScript here

    // To select an element by ID use: $w('#elementID')

    // Click 'Preview' to run your code
});
