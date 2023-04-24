
var cmd;
//確認目前主機狀態
chrome.runtime.sendMessage({"ui":"cmd?"},function(response){
    //如果是開
    if(response.background=="open"){
        document.getElementById("web-address").innerHTML="執行";
        cmd=true;
        console.log("open open");
    }
    //如果是關
    if(response.background=="close"){
        document.getElementById("web-address").innerHTML="待機"
        cmd=false;
        console.log("close close");
    }
    
  })
//監聽開機關機按鈕
document.getElementById("power").addEventListener("click",function(){
    if(cmd){
        chrome.runtime.sendMessage({"ui":"close cmd"},function(response){
            if(response.background=="open"){
                cmd=true;
                document.getElementById("web-address").innerHTML="執行";
            }
            else if(response.background=="close"){
                cmd=false;
                document.getElementById("web-address").innerHTML="待機"
            }
            console.log("cmd=="+cmd);
        })

    }
    else{
        chrome.runtime.sendMessage({"ui":"open cmd"},function(response){
            if(response.background=="open"){
                cmd=true;
                document.getElementById("web-address").innerHTML="執行";
            }
            else if(response.background=="close"){
                cmd=false;
                document.getElementById("web-address").innerHTML="待機"
            }
            console.log("cmd=="+cmd);
        })
    }
});

//監聽新增和刪除按鈕(豁免名單)
document.getElementById("create").addEventListener("click",function(){
    var NewStringValue=document.getElementById("Address").value;
    chrome.runtime.sendMessage({"ui":"新增","src":NewStringValue},function(response){ 

  })

})

document.getElementById("delete").addEventListener("click",function(){
    var NewStringValue=document.getElementById("Address").value;
    chrome.runtime.sendMessage({"ui":"刪除","src":NewStringValue},function(response){ 
        
      })
    
    })
    //
    document.getElementById("txt").addEventListener("click",function(){
        chrome.tabs.create({
            url:'txt.html'
        });
    })