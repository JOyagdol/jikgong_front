// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/hello-world
import { fetch, getJSON } from 'wix-fetch';
import { setToken, getToken } from "backend/login";
import wixWindowFrontend from "wix-window-frontend";

$w.onReady(function () {
    // Write your JavaScript here

    // To select an element by ID use: $w('#elementID')

    $w('#button18').onClick(async () => {
        const id = $w('#input3').value;
        const password = $w('#input4').value;

        console.log(id)
        console.log(password)
        const loginUrl = "https://asdfdsas.p-e.kr/api/login"
        const data = {
            loginId: id,
            password: password,
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
              console.log(responseData.data.accessToken)
              await setToken(responseData.data.accessToken)
              const token = await getToken(responseData.data.accessToken);
              console.log('Retrieved token:', token);
              wixWindowFrontend.lightbox.close();
        }
        catch (error) {
            console.log('Error:',error)
        }
    })
    // Click 'Preview' to run your code
});



