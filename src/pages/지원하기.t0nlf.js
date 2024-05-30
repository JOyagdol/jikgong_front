// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/hello-world

import wixWindow from 'wix-window-frontend';

$w.onReady(function () {

    const received = wixWindow.lightbox.getContext()
    console.log(received.title)

    $w("#text125").text = received.title
    
    // 지원하기 버튼 만들기
});
