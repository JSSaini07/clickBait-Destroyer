
var clickEvent = new MouseEvent("click", {
    "view": window,
    "bubbles": true,
    "cancelable": false
});

post="";
baitContent="";

$(document).ready(function(){
  interval=setInterval(function(){addClickBaitButton()},1000);
});

function addClickBaitButton()
{
  try {
    post=document.getElementsByClassName('_5jmm')[0];
    clickbaitlinkdiv=post.getElementsByClassName('_6m3');
    if(clickbaitlinkdiv.length>0){
      clickbaitlinkdiv=clickbaitlinkdiv[0];
      postbuttons=post.getElementsByClassName('_42nr')[0];
      clickbait=document.createElement('span');
      clickbait.className='clickbait';
      clickbait.innerHTML='<strong>Destroy Clickbait</strong>';
      clickbait.addEventListener('click',function(){destroyBait(this);})
      postbuttons.appendChild(clickbait);
    }
    post.className='abc';
  } catch(e){}
}

function destroyBait(clickbaitbutton) {
  commentSibling=clickbaitbutton.parentElement.children[1].children[0];
  commentSibling.dispatchEvent(clickEvent);
  commentSibling.scrollIntoView();
  while(clickbaitbutton.getElementsByClassName('_6m3').length==0)
  {
    clickbaitbutton=clickbaitbutton.parentElement;
  }
  post=clickbaitbutton.getElementsByClassName('_6m3')[0];
  postanchor=post.getElementsByTagName('a')[0];
  postlink=postanchor.getAttribute('onmouseover');
  postlink=postlink.split('"');
  postlink=postlink[1];
  postlink=String(''+postlink);
  postlink=postlink.split('\\').join('');
  baitContent="";
  chrome.runtime.sendMessage(postlink);
  windowInterval=setInterval(function(){checkOpenState()},1000);
}

function checkOpenState() {
    if(baitContent!="")
    {
      console.log('Window Closed');
      clearInterval(windowInterval);
      commentField=$(':focus');
      document.execCommand('paste');
    }
    else {
      console.log('Window Still Open');
    }
}
