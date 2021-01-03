/*-------------------- mobile - 单位转换 px 转 rem ---------------------------*/

setFontSize();

function setFontSize(){
    var vm = this;
    vm.width = 750; //设置默认最大宽度
    vm.fontSize = 100; //默认字体大小
    vm.widthProportion = function(){
      var p = (document.body && document.getElementsByTagName("html")[0].offsetWidth ||
		  document.getElementsByTagName("html" )[0].offsetWidth)/vm.width;
     return p>1?1:p<0.426?0.426:p;
    };
    vm.changePage = function(){
        document.getElementsByTagName("html" )[0].setAttribute("style",
			"font-size:"+vm.widthProportion()*vm.fontSize+"px !important");
        //  alert(_self.widthProportion());
    };
    //窗口大小改变
    vm.changePage();
    window.addEventListener('resize' ,function(){vm.changePage();}, false);
	//body大小改变
	/*$("body").css("min-height",$(window).height());*/
}