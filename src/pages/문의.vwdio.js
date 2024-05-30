// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/hello-world

import wixLocation from 'wix-location-frontend';

$w.onReady(function () {
    // Write your JavaScript here
    $w("#button8").onClick(() => {
        var lastName = $w("#input4").value
        var firstName = $w("#input3").value
        var email = $w("#input2").value
        var title = $w("#input1").value
        var message = $w("#textBox1").value
        console.log(lastName, firstName, email, title, message)
    })
    

    // To select an element by ID use: $w('#elementID')

    // Click 'Preview' to run your code
});
