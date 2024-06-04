// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/hello-world
import { fetch, getJSON } from 'wix-fetch';

$w.onReady(function () {
    // Write your JavaScript here

    // To select an element by ID use: $w('#elementID')

    $w('#button18').onClick(async () => {
        const loginUrl = "https://asdfdsas.p-e.kr/api/login"
        const data = {
            loginId: "abcdefg1",
            password: "abcdefg1",
            deviceToken: "string"
        }
        try {
            const loginResponse = await fetch(loginUrl, {
                method: "POST",
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify(data)
              })
              if(!loginResponse.ok) {
                throw new Error('Network response was not ok ' + loginResponse.statusText);
              }
              const responseData = await loginResponse.json()
              console.log(responseData)
        }
        catch (error) {
            console.log('Error:',error)
        }
        
       

    })
    // Click 'Preview' to run your code
});
