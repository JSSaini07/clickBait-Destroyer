
tabid="";

function getFilteredLink(postlink) // responsible for generating links corresspoding to different pages
{
  if(postlink.indexOf('scoopwhoop')>0) {
    postlink=postlink.split('.com/')[1];
    postlink=postlink.split('/?ref')[0];
    postlink='https://www.scoopwhoop.com/api/v1/'+postlink;
  }
  else
  if(postlink.indexOf('vagabomb')>0) {
    postlink=postlink.split('.com/')[1];
    postlink=postlink.split('/')[0];
    postlink='http://www.vagabomb.com/api/v1/'+postlink;
  }
  return postlink;
}

function getFilteredContent(postlink,result) // responsible for selecting various functions for data extraction
{
  if(postlink.indexOf('scoopwhoop')>0) {
    getScoopwhoopContent(result);
  }
  else
  if(postlink.indexOf('vagabomb')>0) {
    getScoopwhoopContent(result); // vagabomb abd scoopwhoop have same procedure
  }
  else {
      getDefaultContent(result);
  }
}

function getScoopwhoopContent(result) // responsible for selecting various functions for data extraction
{
  result=result.data.article_content;
  result=$(result);
  content=result.text();
  addToBody(content);
}

function getDefaultContent(result) // default extraction method
{
    result=$(result);
    paragraphs=result.find('p,li,ul,h1,h2,h3,h4,h5,h6');
    content="Could not Destroy this bait :(";
    for(i=0;i<paragraphs.length;i++)
    {
      //console.log($(paragraphs[i]).text());
      paragraph=$(paragraphs[i]).text();
      validParagraph=paragraph;  // check some conditions for a valid paragraph
      validParagraph=validParagraph.split('	').join('').split(' ').join('').split(unescape('%0A')).join(''); // split it on spaces to count the number of spaces
      condition1=(paragraph[0]!=' ')&&(paragraph[0]!='	')&&(paragraph[0]!=unescape('%0A'));
      condition2=(validParagraph.length>=60);
      condition3=(paragraph.length<=(validParagraph.length*2));
      condition4=(paragraph.length*0.9>=(validParagraph.length));
      if(content=="Could not Destroy this bait :("&&condition1&&condition2&&condition3&&condition4)
      {
        content='*'+$(paragraphs[i]).text();
      }
      else
      if(condition1&&condition2&&condition3&&condition4) {
          content+='                                                                                                                                        *'+$(paragraphs[i]).text();
      }
    }
    addToBody(content);
}

function stateError() {
  content='Request Timeout';
  addToBody(content);
}

function addToBody(content)
{
  if($('#baitContentHiddenInput').length>0)
  {
    $('body')[0].removeChild($('#baitContentHiddenInput')[0]);
  }
  hiddenInput=document.createElement('input');
  hiddenInput.id='baitContentHiddenInput';
  hiddenInput.value=content;
  //console.log(content);
  $('body').append(hiddenInput);
  hiddenInput=$('#baitContentHiddenInput');
  hiddenInput.select();
  document.execCommand('copy');
  chrome.tabs.executeScript(tabid,{code:'baitContent="1"'});
}

chrome.extension.onMessage.addListener(function(postlink,tabinfo) {
  tabid=tabinfo.tab.id; // get id of the tab which requests data
  try{
  // clear the previous stored data
  x=$('body')[0];
  while(x.childElementCount!=0)
  {
    x.removeChild(x.children[0]);
  }
  // ajax call to fetch content
  $.ajax({
    type:'GET',
    url:getFilteredLink(postlink),
    success:function(result){getFilteredContent(postlink,result);},
    error:function(err){stateError();}
  });
} catch(e){console.log(e)};
});
