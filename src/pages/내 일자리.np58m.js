// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/hello-world

$w.onReady(function () {
    // Write your JavaScript here

    // To select an element by ID use: $w('#elementID')

    // Click 'Preview' to run your code
    $w('#button8').onMouseIn( (event) => {
        const clickedElement = event.target;
        clickedElement.style.color = "#FD5521";
        clickedElement.style.borderColor = "#FD5521";
        console.log(clickedElement.id);
    })

    $w('#button8').onMouseOut( (event) => {
        const clickedElement = event.target;
        clickedElement.style.color = "#C7C7C7";
        clickedElement.style.borderColor = "#C7C7C7";
        console.log(clickedElement.id);
    })

});
