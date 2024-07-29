// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/hello-world

import {sendEmail} from 'backend/email'

$w.onReady(function () {
    // Write your JavaScript here
    $w("#button21").onClick(() => {
        const name = $w("#input1").value
        const email = $w("#input2").value
        const message = $w("#textBox1").value
        sendEmail(name, email, message)
            .then(response => console.log(response))
    })
    

    // To select an element by ID use: $w('#elementID')

    // Click 'Preview' to run your code
});
