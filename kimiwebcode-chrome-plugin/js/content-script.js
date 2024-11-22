// 注意，必须设置了run_at=document_start 此段代码才会生效
document.addEventListener('DOMContentLoaded', function()
{
	if (location.host == 'kimi.moonshot.cn') {
		initCustomPanel();
		injectCustomJs();
	}
	
});

function initCustomPanel()
{
	var testpaneldiv = document.createElement('div');
	testpaneldiv.id = 'itshijTestpaneldiv';
	testpaneldiv.innerHTML = `
		<div class="itshij-container" id="itshijDraggableDiv">
		    <div class="itshij-header" id="itshijHeader">
		      测试页面
		      <!-- 汉堡菜单按钮 -->
			  <div class="itshij-hamburger" id="itshijHamburger">
			    <div></div>
			    <div></div>
			    <div></div>
			  </div>
			  <button id="itshijRefreshButton" title="重新运行">▶</button>
		      <button id="itshijClearButton" title="清理缓存">↻</button>
		      <button id="itshijDownloadButton" title="下载">➟</button>
		    </div>
		    <div class="itshij-iframe-container">
		      <iframe id="itshijTestPanel"></iframe>
		    </div>
		    <!-- Resizable handle -->
		    <div class="itshij-resize-handle" id="itshijResizeHandle"></div>
		</div>

		  <!-- 下拉菜单 -->
		  <div class="itshij-dropdown" id="itshijDropdown">
		    <button onclick="itshijMenuScreen(512,384)">1024x768(50%)</button>
		    <button onclick="itshijMenuScreen(640,360)">1280x720(50%)</button>
		    <button onclick="itshijMenuScreen(960,540)">1920x1080(50%)</button>
		    <button id="itshijMenuMinimizeBtn">最小化</button>
		    <button id="itshijMenuMaximizeBtn">最大化</button>
		  </div>
	`;
	document.body.appendChild(testpaneldiv);
}

// 向页面注入JS
function injectCustomJs(jsPath)
{
	jsPath = jsPath || 'js/inject.js';
	var temp = document.createElement('script');
	temp.setAttribute('type', 'text/javascript');
	// 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/js/inject.js
	temp.src = chrome.extension.getURL(jsPath);
	temp.onload = function()
	{
		// 放在页面不好看，执行完后移除掉
		this.parentNode.removeChild(this);
	};
	document.body.appendChild(temp);
}