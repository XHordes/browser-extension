chrome.runtime.onInstalled.addListener(function(){
    //tell the browser that we need to be able to access the page to mutilate it
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
          conditions: [new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {hostEquals: 'hordes.io/play'},
          })
          ],
              actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
      });
})
