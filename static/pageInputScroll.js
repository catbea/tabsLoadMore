function pageInputScroll() {
    
    let initWindowHeight=window.innerHeight
    // setTimeout(() => {
    //   let wrapDiv=document.getElementsByClassName('animated-router-forward-enter-done')[0]
    //   //console.log(wrapDiv.style)
    //   wrapDiv.style.minHeight =initWindowHeight+'px'
         
    //  }, 500);
    console.log(document.querySelectorAll('.text-input'));
    
     //由于我们不能直接知道软键盘什么时候出来，不过软键盘出来的时候窗口高度会缩小，所以我们可以通过监听窗口大小变化事件来判断软键盘是否弹出
    window.onresize=function(){ //如果浏览器窗口高度缩小25%以上，就认为是软键盘出来了
        if(initWindowHeight-window.innerHeight>initWindowHeight/4&&document.querySelectorAll('.text-input').length>0){
           if(offset(document.querySelectorAll('.text-input')[0]).top>initWindowHeight/4){
             document.body.scrollTop=offset(document.querySelectorAll('.text-input')[0]).top-initWindowHeight/4
           }
        }else if(window.innerHeight-initWindowHeight<20){
            document.body.scrollTop=0
        }
        
    };
}
function offset(element) {
    var offest = {
        top: 0,
        left: 0
    };
 
    var _position;
 
    getOffset(element, true);
 
    return offest;
 
    // 递归获取 offset, 可以考虑使用 getBoundingClientRect
    function getOffset(node, init) {
        // 非Element 终止递归
        if (node.nodeType !== 1) {
            return;
        }
        _position = window.getComputedStyle(node)['position'];
 
        // position=static: 继续递归父节点
        if (typeof(init) === 'undefined' && _position === 'static') {
            getOffset(node.parentNode);
            return;
        }
        offest.top = node.offsetTop + offest.top - node.scrollTop;
        offest.left = node.offsetLeft + offest.left - node.scrollLeft;
 
        // position = fixed: 获取值后退出递归
        if (_position === 'fixed') {
            return;
        }
 
        getOffset(node.parentNode);
    }
}

export {pageInputScroll};
