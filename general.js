$(document).ready(function () {
	//sub menu show hide
	$('ul#topmenu li.headlink').hover 
	(		
		function () {
			$('ul.submenu', this).show();
		},
		function () {
			$('ul.submenu', this).hide();
		}
	);	
	
	//subsubmenu
	$('ul.submenu li.headlink').hover 
	(		
		function () {
			$('ul.subsubmenu', this).show();
		},
		function () {
			$('ul.subsubmenu', this).hide();
		}
	);
	$('ul.subsubmenu li').click ( function () 
	{
		if ($(this).attr('lang')!='')
			window.location = $(this).attr('lang');
	});
	/*********** handle show hide submenu in detail page ***/
	/* $('div.detailpage-submenu-item').toggle 
	(
		function () {
			$('ul.detailpage-submenu-list').hide();
			$('ul.detailpage-submenu-list', this).show();
			resizeContentArticle();
		},
		function () {
			$('ul.detailpage-submenu-list', this).hide();
			resizeContentArticle();
		}
	); */
	
	$('div.detailpage-submenu-item .title, div.detailpage-submenu-item-active .title').click(function(e) {
		var all_menu_list = $('ul.detailpage-submenu-list');
		var target = $(this).next();
		var display = target.css('display');
		
		all_menu_list.css('display','none');
		target.css('display','block');
		
		if(display != 'block') {
			target.css('display','block');
			//target.slideUp('fast', function() {
				target.slideDown('fast');
			//});
		}  
	});

	$('ul.detailpage-submenu-list li').click ( function ()
	{
		var url_link = $(this).find('a').attr('href');
		if (url_link)
			window.location = url_link;
	});
	/********** HANDLE BUTTONS GO IN TOOLS ****************/
	$("input#tools_search_text").bind("keypress", function(event) 
	{
		if (event.which == '13'){
			$('div#btn_go_search').click();
			event.preventDefault();
		}			
	});		
	$('div#btn_go_search').click ( function () 
	{
		var value = trim($(this).parent().parent().find('input').val());
		if (value=='')
			alert('Masukkan kata pencarian');
		else
			window.location = 'search_result/'+value;
	});
	$('div#btn_go_rates').click ( function () 
	{
		
		var value = $(this).parent().parent().find('select').val();
		if (value!==undefined || value!='-1')
		{
			if (value!='skbd')
				window.location = value;
			else{
				var wnd = window.open(value,"MyWindow");
				wnd.focus();
			}
		}else
			alert('Under construction');
	});
	$('div#btn_go_tools').click ( function () 
	{
		var value = $(this).parent().parent().find('select').val();
		alert(value);
	});
	$('div#btn_go_links').click ( function () 
	{
		var value = $(this).parent().parent().find('select').val();
		var wnd = window.open(value,'NewWnd');
		wnd.focus();
	});
	$('div#btn_go_others').click ( function () 
	{
		var value = $(this).parent().parent().find('select').val();
		window.location = value;
	});
	//resize content right if neccessary
	resizeContentArticle();
});
//function to re-adjust height of element
function resizeContentArticle()
{
	//adjustment in general detail page
	if ($('#content-detail-container').length!=0&&$('#detailpage-submenu-list-container').length!=0){
		if 	($('#detailpage-submenu-list-container').height()>$('#content-detail-container').height()){
			$('#content-detail-container').css('min-height', $('#detailpage-submenu-list-container').height()+'px');			
		}else {
			$('#content-detail-container').css('min-height', $('#detailpage-submenu-list-container').height()+'px');
		}
		if ($('#corp-content-right').length!=0){
			if ($('#corp-content-right').height()>$('#content-detail-container').height()){
				$('#content-detail-container').css('min-height', $('#corp-content-right').height()+'px');
			}else if ($('#content-detail-container').height()>$('#corp-content-right').height()){
				$('#corp-content-right').css('min-height',$('#content-detail-container').height()+'px');
			}
		}		
	}
	
	//adjustment in serach result page
	if ($('#search-result').length!=0){
		if ($('#corp-content-right').height()<$('#content-left').height()){
			$('#corp-content-right').css('min-height',$('#content-left').height()+'px');
		}
	}
}
//Utility
function trim (str) 
{
	var	str = str.replace(/^\s\s*/, ''),
		ws = /\s/,
		i = str.length;
	while (ws.test(str.charAt(--i)));
	return str.slice(0, i + 1);
}
function myLog(msg)
{
    // attempt to send a message to the console
    try
    {
        console.log(msg);
    }
    // fail gracefully if it does not exist
    catch(e){}
}
//email check
function echeck(email)
{ 
    var RegExp = /^((([a-z]|[0-9]|!|#|$|%|&|'|\*|\+|\-|\/|=|\?|\^|_|`|\{|\||\}|~)+(\.([a-z]|[0-9]|!|#|$|%|&|'|\*|\+|\-|\/|=|\?|\^|_|`|\{|\||\}|~)+)*)@((((([a-z]|[0-9])([a-z]|[0-9]|\-){0,61}([a-z]|[0-9])\.))*([a-z]|[0-9])([a-z]|[0-9]|\-){0,61}([a-z]|[0-9])\.)[\w]{2,4}|(((([0-9]){1,3}\.){3}([0-9]){1,3}))|(\[((([0-9]){1,3}\.){3}([0-9]){1,3})\])))$/ 
    if(RegExp.test(email)){ 
        return true; 
    }else{ 
        return false; 
    } 
} 

function slidingForm()
{
	var currentTab			=	1;
	var countWidth			=	0;
	var widths				=	new Array();
	
	$("#panel-content-nav ul li a").css("cursor", "default").click(function(){
		return false;
	});
	
	$('.tab_layout_inner .tab').each(function(i)
    {
        var $step           = $(this);
		widths[i]           = countWidth;
        countWidth          += $step.width();
		if (currentTab == i + 1)
		{
			$(this).show();
		}
    });
	
	$('.tab_layout_inner').width(countWidth);
	
	$('input.prev, input.next').bind('click',function(e)
	{
		var $this               =   $(this);
		var diffTab				=	0;
		var index				=	0;
		if($(this).hasClass("next"))
		{
			diffTab++;
		}
		if($(this).hasClass("prev"))
		{
			diffTab--;
		}
		index					=	currentTab + diffTab;
		
		if (index != currentTab)
		{
			$("#panel-content-nav ul").find("li").removeClass("selected");
            $("#panel-content-nav ul li:eq("+(index * 2 - 2)+")").addClass("selected");
			currentTab                 =   index;
			$('.tab_layout_inner').stop().animate(
            {
                marginLeft: '-' + widths[currentTab-1] + 'px'
            },500,function(){
				$(".tab_layout_inner .tab:eq("+(currentTab - 1)+")").fadeIn();
				$(".tab_layout_inner").height($(".tab_layout_inner .tab:eq("+(currentTab - 1)+")").height());
			});
		}
		e.preventDefault();
	});
}


/*
*	@Function		: 	isNumberKey
*	@Description	:	Fungsi yang mengizinkan inputan hanya berupa angka
*	@by				: 	Ryan
*/

function isNumberKey(evt)
{
	var charCode = evt.which;
	if (charCode > 31 && (charCode < 48 || charCode > 57))
		return false;

	return true;
}

function isNumberCommaKey(evt,currency)
{
	var charCode = evt.which;
	if (charCode > 31 && (charCode < 48 || charCode > 57)){
		if(charCode != 44){
			return false;
		}else{
			if(currency != "IDR" && currency != "JPY"){
				return true;
			}else{
				return false;
			}
		}
	}else{
		return true
	}
}

/*
*	@Function		: 	currencyFormater
*	@Description	:	Fungsi untuk mengubah format nominal angka
*	@by				: 	Ryan
*/

function currencyFormater(value)
{
	var returnValue	=	'';
	if((parseFloat(value) == parseInt(value)) && !isNaN(value)){
		var intValue	=	parseInt(value);
		var strValue	=	intValue.toString();
		for (var i=0; i< strValue.length; i++)
		{
			if((i> 0) && (i % 3 == 0))
			{
				returnValue		=	strValue.charAt(strValue.length - i - 1) + "." +returnValue; 
			}
			else 
			{
				returnValue		=	strValue.charAt(strValue.length - i - 1) + returnValue; 
			}
		}
		return returnValue;
	}
	else {
		return "";
	}
}

/*
*	@Function		: 	currencyUnformater
*	@Description	:	Fungsi untuk mengembalikan format nominal angka
*	@by				: 	Ryan
*/

function currencyUnformater(value)
{
	value		=	value.replace(/\./g,"");
	return value;
}

/*
*	@Function		:	checkDigit
*	@Description	:	Fungsi untuk check digit rekening
*	@by				:	Ryan
*/
function checkDigit(value)
{
	var nSubTotal = 0;
 	var nTotal = 0;
 	var weight = "32765432765432";
 
 	for(var b=0;b<14;b=b+1)
 	{
 		nSubTotal = parseInt(value.substring(b, b+1)) * parseInt(weight.substring(b, b+1));
     	nTotal = nTotal + nSubTotal;
 	}
 
 	var nRem = nTotal % 10;
 	var nRemMin = 10 - nRem;
 	var cek = 0;
 
 	if(nRemMin < 10)
 	{
     	cek = nRemMin;
 	}
 	
 	if(cek != parseInt(value.substring(14)))
 	{
     	return false;
 	}
 	return true;
} 
	
// Restrict user input in a text field
 var digitsOnly = /[1234567890]/g;
 var alphaOnly = /[A-Za-z]/g;
 var alphaNumOnly = /[0-9A-Za-z]/g;
 var alphaSpaceOnly = /[-A-Za-z ]/g;
 var alphaDashSpaceOnly = /[-A-Za-z. ]/g;
 var alphaNumDashSpaceOnly = /[-A-Za-z0-9. ]/g;
 var setoranOnly = /[0-9.]/g;
 var nospecialChar = /[-A-Za-z0-9.\/ ]/g;
 var emailAddrChar = /^[A-Za-z0-9+_-]+(\.[A-Za-z0-9+_-]+)+@([A-Za-z0-9-]+\.)+([A-Za-z]{2,6})$/;

 function restrictInput(myfield, e, restrictionType, checkdot)
 {
     if (!e) var e = window.event
     if (e.keyCode) code = e.keyCode;
     else if (e.which) code = e.which;
     var character = String.fromCharCode(code);

     // if user pressed esc... remove focus from field...
     if (code==27) { this.blur(); return false; }
	if (code==118) { return false; }
	//if (code==86) { return false; }
	
	// ignore if the user presses other keys
     // strange because code: 39 is the down key AND ' key...
     // and DEL also equals .
     if (!e.ctrlKey && code!=9 && code!=8 && code!=36 && code!=37 && code!=38 && (code!=39 || (code==39 && character=="'")) && code!=40) {
         if (character.match(restrictionType)) {
             if(checkdot == "checkdot"){
                 return !isNaN(myfield.value.toString() + character);
             } else {
                 return true;
             }
         } else {
             return false;
         }
     }
 }
    
function handleEnter(inField, e)
{
    var charCode;
    
    if(e && e.which){
        charCode = e.which;
    }else if(window.event){
        e = window.event;
        charCode = e.keyCode;
    }

    if(charCode == 13) {
        return false;
    }
    else {
    	return true;	
    }
}


/*
*	@Function		: 	checkNominalMultiCurrency
*	@Description	:	Fungsi untuk inputan nominal 
*	@by				: 	Ryan
*/

function checkNominalMultiCurrency(evt, field, currency, allowCent)
{
	var charCode = evt.which;
	allowCent = (typeof allowCent === "undefined") ? false : allowCent;
	
	var fieldValue = field.value;
	
	if(fieldValue.length == 0 && charCode == 48 && !allowCent)
		return false;
	
	if(currency == "IDR" || currency == "JPY" || !allowCent)
	{
		if (charCode > 31 && (charCode < 48 || charCode > 57))
			return false;
	}
	else 
	{
		if (charCode > 31 && (charCode < 44 || charCode > 57))
		{
			return false;
		}
		else if (charCode > 44 && charCode < 48)
		{
			return false;
		}
		else 
		{	
			if (fieldValue.length == 11 && charCode == 44)
				return false;
			
			var splitFieldValue		=	fieldValue.split(",");
			
			if (splitFieldValue.length > 1 && charCode == 44)
				return false;
		}	
	}
	
	return true;
}

/*
*	@Function		: 	checkNominalMultiCurrencyBlur
*	@Description	:	Fungsi untuk inputan nominal 
*	@by				: 	Ryan
*/

function checkNominalMultiCurrencyBlur(field, currency)
{
	var fieldValue 			= 	field.value;
	var splitFieldValue		=	fieldValue.split(",");
	if (splitFieldValue.length > 1)
	{
		splitFieldValueAfterComma	=	splitFieldValue[1];
		splitAgain					=	splitFieldValueAfterComma.split("");
		if (splitFieldValueAfterComma.length > 2 )
		{
			if(splitAgain[2] > 5)
			{
				splitAgain_2		=	splitAgain[1];
				splitAgain_2++;
				field.value 			=	splitFieldValue[0] + "," + splitAgain[0] + splitAgain_2;
			}
			else 
			{
				field.value 			=	splitFieldValue[0] + "," + splitAgain[0] + splitAgain[1];
			}
		}
	}
}

/*
*	@Function		: 	toNominalNew
*	@Description	:	Fungsi format nominal
*	@by				: 	Ryan
*/

function toNominalNew(value, lengthAfterComma) {
	var splitValue			=	value.split(",");
	lengthAfterComma = lengthAfterComma > 0 ? lengthAfterComma : 2;
	
	if(splitValue.length > 1)
	{
		value				=	splitValue[0];
	}
	value = value.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1.');
	value = value.split('').reverse().join('').replace(/^[\.]/,'');
	
	//if(value.length > 14) {
		//value = value.substring(0,14);
	//}
	if(splitValue.length > 1)
	{
		splitAfterComma		=	splitValue[1];
		return value + "," + splitAfterComma.substr(0,lengthAfterComma);
	}
	return value;
}

/*
*	@Function		: 	currencyUnformaterNew
*	@Description	:	membalikkan toNominalNew ke format float standar
*	@by				: 	Rifa
*/

function currencyUnformaterNew(value) {
	var value_temp = value.replace(/\./g,"");
	return value_temp.replace(/\,/g,".");
}

function currencyUnformaterNew2(value) {
	var value_temp = value.replace(/\./g,"");
	return value_temp;
}

function bulanInIndonesia(bulan) {
	var array_bulan = new Array("Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember");
	if(bulan >= 0) {
		if(typeof array_bulan[bulan] != undefined){
			return array_bulan[bulan];
		}
	}
	return array_bulan;
}





