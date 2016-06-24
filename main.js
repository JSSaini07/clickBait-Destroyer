
waitForCommentBoxToAppear='';

var clickEvent = new MouseEvent("click", {
    "view": window,
    "bubbles": true,
    "cancelable": false
});

post="";
baitContent="";

$(document).ready(function(){
  addClickBaitButton();
});

function addClickBaitButton()
{
  try {
    post=$('._5jmm').not('.handelled')[0];
    $(post).addClass('handelled');
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
  } catch(e){}
  setTimeout(function(){addClickBaitButton()},1000);
}

function destroyBait(clickbaitbutton) {
  clearInterval(waitForCommentBoxToAppear);
  commentSibling=clickbaitbutton.parentElement.children[1].children[0];
  commentSibling.dispatchEvent(clickEvent);
  clickbaitbutton.scrollIntoView();
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
      waitForCommentBoxToAppear=setInterval(function(){
        commentField=$(':focus');
        if(commentField.length!=0) {
          document.execCommand('paste');
          clearInterval(waitForCommentBoxToAppear);
        }
        else {
          console.log('waiting');
        }
      },100);
    }
    else {
      console.log('Window Still Open');
    }
}
