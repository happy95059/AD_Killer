//      創建右鍵選單
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      "id": "真的假的",
      "title": "真的假的",
      "contexts": ["all"]
    })
    chrome.contextMenus.create({
      "id": "暫停作用在此頁面",
      "title": "暫停作用在此頁面",
      "contexts": ["page"],
      "parentId":"真的假的"
    })
    chrome.contextMenus.create({
      "id": "刪掉此廣告",
      "title": "刪掉此廣告",
      "contexts": ["all"],
      "parentId":"真的假的"
    })
  })
//儲存豁免名單的陣列
var txt=['abcdefghijjjhh'];
var txt_len=0;
var check;
//txt.push('https://codertw.com/%E7%A8%8B%E5%BC%8F%E8%AA%9E%E8%A8%80/547242/');
//      右鍵選單"功能"
chrome.contextMenus.onClicked.addListener(function (info,tab){
  if(info.menuItemId==="刪掉此廣告"){
    //指向element
    //給可變拉軸看刪幾階層
    alert("info.frameId="+info.frameId);
    alert("info.frameUrl="+info.frameUrl);
    alert("info.pageUrl="+info.pageUrl);
    alert("info.srcUrl="+info.srcUrl);
  }
  if(info.menuItemId==="暫停作用在此頁面"){
    check=true;
    txt.forEach(function(data,index,arr){
      console.log("check="+check);
      if(data==info.pageUrl)check=false;
    });
    if(check){
      console.log("info.pageUrl="+info.pageUrl);
      txt.push(info.pageUrl);
    }
  }
})
//測試
//chrome.runtime.sendMessage({"background":"good?","src":"abc"},function(response){
  

  
//})
//document.getElementById("gg").innerHTML="<div>good</div>";





//宣告
//var bad;
//var badsrc;
var del_data;
var tabs_url;
//主邏輯  接收訊息
var ADkiller_cmd=true;
//每次打開瀏覽器cmd=true     
var content_place;
//分析接收的訊息
chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
  
  //content message
  if(request.content=="web_del?"){
    console.log("content ask");
    if(ADkiller_cmd){
      //content where r u
      chrome.tabs.query({active:true,currentWindow:true},function(ta){
        tabs_url=ta[0].url;
        console.log("tabs="+tabs_url);
        console.log("title="+ta[0].title);
      });
      //bad=new RegExp(content_place,'i');
      //測試是否暫停此網頁
      check=true;
      txt.forEach(function(badsrc,index,arr){
        if(badsrc==tabs_url){
          check=false;
          console.log("badbad");
          //console.log("txt"+txt);
          console.log("no work");
          sendResponse({"background":"NO"});
        }
      });
      //badsrc=bad.test(qu);
      if(check){
        //console.log("txt"+txt);
        console.log("work");
        sendResponse({"background":"DEL"});
      }
    }
    else{ 
      sendResponse({"background":"NO"});
    }
  }


   //UI message
  //UI 新增豁免名單
  if(request.ui=="新增"){
    check=true;
    txt.forEach(function(data,index,arr){
      if(data==request.src)check=false;
    });
    if(check){
      txt_len=txt.push(request.src);
    }
    sendResponse({"background":"新增豁免"});
  }
  //UI刪除豁免名單
  if(request.ui=="刪除"){
    txt.forEach(function(data,index,arr){
      if(data==request.src){
        del_data=arr.splice(index,1);
      }
    });
    sendResponse({"background":"刪除豁免"});
  }

  //如果UI問我現在是開還關     sendMessage 現在狀態
  if(request.ui=="cmd?"){
    if(ADkiller_cmd){
      sendResponse({"background":"open"});
    }
    else {
      sendResponse({"background":"close"});
    }
  }
  //如果UI叫我關掉 cmd=false     
  if(request.ui=="close cmd"){
    ADkiller_cmd=false;
    console.log("cmd="+ADkiller_cmd);
    sendResponse({"background":"close"});
  }
  //如果UI叫我打開 cmd=true  
  if(request.ui=="open cmd"){
    write();
    ADkiller_cmd=true;
    console.log("cmd="+ADkiller_cmd);
    sendResponse({"background":"open"});
  }

})
//寫檔案
function write(){
  var fso=new ActiveXObject(Scripting.FileSystemObject);
  var f=fso.createtextfile("C:\Users\happy\Desktop\ADkiller\text.txt",2,true);
  txt.forEach(function(data,index,arr){
    f.writeLine(data);
  });
  f.close();
}