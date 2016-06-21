
tabid="";

chrome.extension.onMessage.addListener(function(postlink,tabinfo) {
  tabid=tabinfo.tab.id;
  try{
  x=$('body')[0];
  while(x.childElementCount!=0)
  {
    x.removeChild(x.children[0]);
  }
  $.ajax({
    type:'GET',
    url:postlink,
    success:function(result){
      result=$(result);
      paragraphs=result.find('p');
      content="Could not Destroy this bait :(";
      for(i=0;i<paragraphs.length;i++)
      {
        if(i==0)
        {
          content=$(paragraphs[0]).text();
        }
        else {
            content+=$(paragraphs[i]).text();
        }
      }
      if($('#baitContentHiddenInput').length>0)
      {
        $('body')[0].removeChild($('#baitContentHiddenInput')[0]);
      }
      hiddenInput=document.createElement('input');
      hiddenInput.id='baitContentHiddenInput';
      hiddenInput.value=content;
      console.log(content);
      $('body').append(hiddenInput);
      hiddenInput=$('#baitContentHiddenInput');
      hiddenInput.select();
      document.execCommand('copy');
      chrome.tabs.executeScript(tabid,{code:'baitContent="1"'});
    }
  });
} catch(e){console.log(e)};
});
