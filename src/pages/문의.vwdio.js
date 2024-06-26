// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/hello-world

import {sendEmail} from 'backend/email'

$w.onReady(function () {
    // Write your JavaScript here
    $w("#button8").onClick(() => {
        const subject = $w("#input1").value;
        const body = `Name : ${$w("#input4").value}
            \rEmail : ${$w("#input2").value}
            \rMessage : ${$w("#textBox1").value}`;
        sendEmail(subject, body)
            .then(response => console.log(response))
    })
    

    // To select an element by ID use: $w('#elementID')

    // Click 'Preview' to run your code
});
