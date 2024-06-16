// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/hello-world

import wixWindow from 'wix-window-frontend';

$w.onReady(function () {

    const received = wixWindow.lightbox.getContext()
    console.log(received.date)

    $w("#text125").text = received.title
    $w("#text152").text = received.date
    
    // 지원하기 버튼 만들기
});
