// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/hello-world
import { getGreetings } from 'backend/dataFetcher';

$w.onReady(function () {
    // Write your JavaScript here

    // To select an element by ID use: $w('#elementID')

    // Click 'Preview' to run your code
    //button 8 확정

    // const fetchedData = getGreetings();
    // const repeaterData = fetchedData.map(item => {
    //     item._id = item.id.toString();
    //     return item;
    // });
    // console.log(repeaterData);

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


});
