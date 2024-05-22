// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/hello-world
import { getDataWithGetMethod } from "backend/dataFetcher";

$w.onReady(async function () {
    const { data, message } = await getDataWithGetMethod({
      url: "http://43.203.86.121/api/job-post/worker/list",
    });
    console.log(message);
    console.log(data.content);
});
