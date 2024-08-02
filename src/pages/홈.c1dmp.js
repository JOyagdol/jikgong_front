// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/hello-world
import { getDataWithGetMethod } from "backend/dataFetcher";
import { session } from "wix-storage-frontend";
import wixLocation from 'wix-location-frontend';

$w.onReady(async function () {
    var loginKey = session.getItem("loginKey");
    if(loginKey) {
      $w("#button10").label = "로그아웃"
      $w("#button4").label = "로그아웃"
      $w("#button10").onClick(() => {
        session.removeItem("loginKey");
        $w("#button10").label = "로그인"
        $w("#button4").label = "로그인"
        wixLocation.to(`/로그인`);
      })
      $w("#button4").onClick(() => {
        session.removeItem("loginKey");
        $w("#button10").label = "로그인"
        $w("#button4").label = "로그인"
        wixLocation.to(`/로그인`);
      })
    }
    else {
      $w("#button10").onClick(() => {
        wixLocation.to(`/로그인`);
      })
      $w("#button4").onClick(() => {
        wixLocation.to(`/로그인`);
      })
    }
});
