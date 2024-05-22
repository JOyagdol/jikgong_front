// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/hello-world
import { getGreetings } from 'backend/dataFetcher';

$w.onReady(async function () {
    console.log('df')
    // Write your JavaScript here

    // To select an element by ID use: $w('#elementID')

    // Click 'Preview' to run your code

    const fetchedData = await getGreetings();
    console.log(fetchedData);
});
