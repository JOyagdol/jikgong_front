// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/hello-world

import {sendEmail} from 'backend/email'
import { session } from 'wix-storage-frontend';
import wixLocation from 'wix-location-frontend';

$w.onReady(function () {
    // Write your JavaScript here
    var loginKey = session.getItem("loginKey");
    if(loginKey) {
        $w("#button4").label = "로그아웃"
        $w("#button4").onClick(() => {
            session.removeItem("loginKey");
            $w("#button4").label = "로그인"
            wixLocation.to(`/`);
        })

        $w("#button21").onClick(() => {
            const name = $w("#input1").value
            const email = $w("#input2").value
            const message = $w("#textBox1").value
            sendEmail(name, email, message)
                .then(response => console.log(response))
        })
    }
    else {
        $w("#text31").text = "로그인 후 이용 가능합니다."
    }

    // To select an element by ID use: $w('#elementID')

    // Click 'Preview' to run your code
});
