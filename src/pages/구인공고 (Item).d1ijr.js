// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/hello-world

import wixLocation from 'wix-location-frontend';
import { getDataWithGetMethod } from "backend/dataFetcher";

$w.onReady(async function () {
    // Write your JavaScript here
    const query = wixLocation.query;
    var { data, message } = await getDataWithGetMethod({
        url: "http://43.203.86.121/api/job-post/worker/list",
      });
    const itemData = data.content[Number(query.id)-1] 
    
    console.log(itemData.title)
    // To select an element by ID use: $w('#elementID')

    // Click 'Preview' to run your code
});
