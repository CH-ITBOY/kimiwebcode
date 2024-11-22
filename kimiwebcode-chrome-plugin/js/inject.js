// Get elements
const itshijDraggableDiv = document.getElementById('itshijDraggableDiv');
const itshijHeader = document.getElementById('itshijHeader');
const itshijResizeHandle = document.getElementById('itshijResizeHandle');
const itshijRefreshButton = document.getElementById('itshijRefreshButton');
const itshijTestPanel = document.getElementById('itshijTestPanel');

// 显示/隐藏菜单的逻辑
let itshijIsMenuVisible = false;

// 当鼠标悬停在汉堡菜单上时，显示下拉菜单
itshijHamburger.addEventListener('mouseenter', function(e) {
  let left = window.innerWidth - e.clientX > 160 ? e.clientX : e.clientX - 150;
  itshijDropdown.style.left = left + 'px';
  itshijDropdown.style.top = (e.clientY + 10 ) + 'px';
  itshijDropdown.style.display = 'block';
  itshijIsMenuVisible = true;
});

// 当鼠标离开菜单时，隐藏下拉菜单
itshijDropdown.addEventListener('mouseleave', function() {
  itshijDropdown.style.display = 'none';
  itshijIsMenuVisible = false;
});

// 如果鼠标点击了菜单按钮，保持菜单显示
itshijDropdown.addEventListener('mouseenter', function() {
  itshijIsMenuVisible = true;
});

// 选项点击事件
function itshijMenuScreen(x,y) {
  itshijDraggableDiv.style.width = x + 'px';
  itshijDraggableDiv.style.height = (y + 44) + 'px';
}

//最小化
itshijMenuMinimizeBtn.addEventListener('click', function() {
  itshijDraggableDiv.style.left = '84px';
  itshijDraggableDiv.style.top = '10px';
  itshijDraggableDiv.style.width = '220px';
  itshijDraggableDiv.style.height = '46px';
});

//最大化
itshijMenuMaximizeBtn.addEventListener('click', function() {
  itshijDraggableDiv.style.left = '0px';
  itshijDraggableDiv.style.top = '0px';
  itshijDraggableDiv.style.width = window.innerWidth  + 'px';
  itshijDraggableDiv.style.height = window.innerHeight + 'px';
});


itshijDownloadButton.addEventListener('click', function() {
  var j = localStorage.getItem('itshijJs') ? localStorage.getItem('itshijJs') : '';
  var h = localStorage.getItem('itshijHtml') ? localStorage.getItem('itshijHtml') : '';
  var c = localStorage.getItem('itshijCss') ? localStorage.getItem('itshijCss') : '';
  var htmlContent = h+'\n<style>\n'+c+'\n</style>\n<script>\n'+j+'\n</script>\n';

  const blob = new Blob([htmlContent], { type: 'text/html' });

  // 创建一个 URL 对象，指向刚才创建的 Blob
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  // 设置下载文件名
  link.href = url;
  link.download = 'test-' + (Date.now()) + '.html';

  // 模拟点击链接，开始下载
  link.click();

  // 释放 Blob 对象
  URL.revokeObjectURL(url);
});
// Variables to manage dragging
let itshijIsDragging = false;
let offsetX, offsetY;

// Add event listeners for dragging
itshijHeader.addEventListener('mousedown', function(e) {
  itshijIsDragging = true;
  offsetX = e.clientX - itshijDraggableDiv.getBoundingClientRect().left;
  offsetY = e.clientY - itshijDraggableDiv.getBoundingClientRect().top;
  document.addEventListener('mousemove', itshijDrag);
  document.addEventListener('mouseup', itshijStopDragging);
});

function itshijDrag(e) {
  if (itshijIsDragging) {
    itshijDraggableDiv.style.left = (e.clientX - offsetX) + 'px';
    itshijDraggableDiv.style.top = (e.clientY - offsetY) + 'px';
  }
}

function itshijStopDragging() {
  itshijIsDragging = false;
  document.removeEventListener('mousemove', itshijDrag);
  document.removeEventListener('mouseup', itshijStopDragging);
}

// Resize functionality
let itshijIsResizing = false;
let initialWidth, initialHeight, initialMouseX, initialMouseY;

itshijResizeHandle.addEventListener('mousedown', function(e) {
  isResizing = true;
  initialWidth = itshijDraggableDiv.offsetWidth;
  initialHeight = itshijDraggableDiv.offsetHeight;
  initialMouseX = e.clientX;
  initialMouseY = e.clientY;
  document.addEventListener('mousemove', itshijResize);
  document.addEventListener('mouseup', itshijStopResizing);
});

function itshijResize(e) {
  if (itshijIsResizing) {
    const deltaX = e.clientX - initialMouseX;
    const deltaY = e.clientY - initialMouseY;
    itshijDraggableDiv.style.width = initialWidth + deltaX + 'px';
    itshijDraggableDiv.style.height = initialHeight + deltaY + 'px';
  }
}

function itshijStopResizing() {
  itshijIsResizing = false;
  document.removeEventListener('mousemove', itshijResize);
  document.removeEventListener('mouseup', itshijStopResizing);
}

// Maximize and Minimize functionality
let isMaximized = false;
let originalWidth = itshijDraggableDiv.offsetWidth;
let originalHeight = itshijDraggableDiv.offsetHeight;
let originalTop = itshijDraggableDiv.offsetTop;
let originalLeft = itshijDraggableDiv.offsetLeft;

function toggleMaximize() {
  if (isMaximized) {
    itshijDraggableDiv.style.width = originalWidth + 'px';
    itshijDraggableDiv.style.height = originalHeight + 'px';
    itshijDraggableDiv.style.top = originalTop + 'px';
    itshijDraggableDiv.style.left = originalLeft + 'px';
  } else {
    originalWidth = itshijDraggableDiv.offsetWidth;
    originalHeight = itshijDraggableDiv.offsetHeight;
    originalTop = itshijDraggableDiv.offsetTop;
    originalLeft = itshijDraggableDiv.offsetLeft;
    itshijDraggableDiv.style.width = '100%';
    itshijDraggableDiv.style.height = '100%';
    itshijDraggableDiv.style.top = '0';
    itshijDraggableDiv.style.left = '0';
  }
  isMaximized = !isMaximized;
}

//清理缓存
itshijClearButton.addEventListener('click', function() {
  confirm("是否删除缓存，建议新会话删除缓存！",function (params) {
    if(params) {
    	localStorage.setItem('itshijJs', '');
	    localStorage.setItem('itshijHtml', '');
	    localStorage.setItem('itshijCss', '');
    }
  })
});
// Refresh button event listener
itshijRefreshButton.addEventListener('click', function() {
  itshijGetCodeToRander();
});

// Example function for refresh button
function itshijGetCodeToRander() {
	const chats = document.querySelectorAll('div[id^="chat-markdown-"]');
	lastChat = chats[chats.length - 1];
	lastChat.firstChild.firstChild.childNodes.forEach((v,k) => {
	    if(v.tagName === 'PRE') {
	        var langtype = v.firstChild.firstChild.firstChild.textContent;
	        var content = v.firstChild.lastChild.textContent;
	        if (langtype === 'javascript') {
	        	localStorage.setItem('itshijJs', content);
	        } else if (langtype === 'html') {
	        	localStorage.setItem('itshijHtml', content);
            const containsJS = /<script\b[^>]*>([\s\S]*?)<\/script>/i.test(content);
            if(containsJS) {
              localStorage.setItem('itshijJs', '');
            }
            const containsCSS = /<style\b[^>]*>([\s\S]*?)<\/style>/i.test(content);
            if(containsCSS) {
              localStorage.setItem('css', '');
            }
	        } else if (langtype === 'css') {
	        	localStorage.setItem('itshijCss', content);
	        }
	    }
	})
	var j = localStorage.getItem('itshijJs') ? localStorage.getItem('itshijJs') : '';
	var h = localStorage.getItem('itshijHtml') ? localStorage.getItem('itshijHtml') : '';
	var c = localStorage.getItem('itshijCss') ? localStorage.getItem('itshijCss') : '';
	itshijTestPanel.srcdoc = h+'<style>'+c+'</style><script>'+j+'</script>';
}

// Make the container resizable (optional)
window.addEventListener('resize', function() {
  itshijTestPanel.style.width = '100%';
  itshijTestPanel.style.height = '100%';
});
