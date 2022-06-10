function DateAdd(flg,n,nDate,fmt){
//  機能　　　　：指定日の過去または未来の日を求める関数
//  関数名　　　：DateAdd()
//  引数　　　　：flg     "y","m","d"      加算単位（文字属性）
//  　　　　　　：n      ｎ日後またはｎ日前（数値属性）前の時は－値とする
//  　　　　　　：nDate  指定日（文字属性：yyyy/m/d or yyyy/mm/dd）
//	　　　　：fmt    戻り値の形式 "yyyy/m/d" "yyyy/mm/dd" "yyyymmdd"
//  戻り値　　　：日付形式（yyyy/m/d）
//
//  呼出例　　　：DatedAdd("d",100,"","yyyy/m/d")  当日の10日後の日付を求める
//  　　　　　　：DatedAdd("d",-25,"2003/1/20","yyyymmdd") 2003/1/20の25日前の日付を求める
//
//  2005/07/20 12月の月末を求める処理修正
//

	if (nDate == ""){
		var wDate = new Date();
	}else{
		var wymd = nDate.split("/");
		if (wymd[1].length == 1){wymd[1] = "0" + wymd[1]};
		if (wymd[2].length == 1){wymd[2] = "0" + wymd[2]};
		if (ValidDate(wymd[0] + "/" + wymd[1] + "/" + wymd[2])){
			var wDate = new Date(nDate);
		}else{
			return "<FONT COLOR='red'>日付形式エラー(" + nDate + ")</FONT>";
		}
	}
	if (isNaN(n)){
		return "<FONT COLOR='red'>加算数値エラー(" + n + ")</FONT>";
	}
	if (fmt == "yyyy/m/d" || fmt == "yyyy/mm/dd" || fmt == "yyyymmdd"){
		wfmt = fmt;
	}else{
		wfmt = "yyyy/m/d";
	}
	switch (flg.toLowerCase()){
		case "d":
			var wY = wDate.getFullYear();
			var wM = wDate.getMonth() + 1;
			var wD = wDate.getDate();
			return DateDAdd(n,wY + "/" + wM + "/" + wD,wfmt);
			break;
		
		case "m":
			var tYear = wDate.getFullYear();
			var tMonth = wDate.getMonth() + 1 + n;
			var tDate = wDate.getDate();
			if (tMonth == 2){
				if (tDate > 28){
					return DateDAdd(-1,tYear + "/3/1",wfmt)  
				}else{
					if (wfmt == "yyyy/m/d"){
						return tYear + "/" + tMonth + "/" + tDate;
					}else{
						if (tMonth < 10){yMonth = "0" + tMonth};
						if (tDate < 10){tDate = "0" + tDate};
						if(wfmt == "yyyy/mm/dd"){
							return tYear + "/" + tMonth + "/" + tDate;
						}else{
							return tYear + "" + tMonth + "" + tDate;
						}
					}
				}
			}else{
				if (tMonth == 4 || tMonth == 6 || tMonth == 9 || tMonth == 11){
					if (tDate == 31){
						tDate = 30;
					}
				}else{
					if (tMonth >= 13){
						tYear += 1;
						tMonth -= 12;
					}
				}
				if (wfmt == "yyyy/m/d"){
					return (tYear + "/" + tMonth + "/" + tDate);
				}else{
					if (tMonth < 10){tMonth = "0" + tMonth};
					if (tDate < 10){tDate = "0" + tDate};
					if (wfmt == "yyyy/mm/dd"){
						return (tYear + "/" + tMonth + "/" + tDate);
					}else{
						return (tYear + "" + tMonth * "" + tDate);
					}
				}
			}
			break;
		
		case "y":
			var tYear = wDate.getFullYear()+n;
			var tMonth = wDate.getMonth()+1;
			var tDate = wDate.getDate();
			if (tMonth == 2){
				if (tDate > 28){
					return DateDAdd(-1,tYear + "/3/1",wfmt)  
				}else{
					if (wfmt == "yyyy/m/d"){
						return (tYear + "/" + tMonth + "/" + tDate);
					}else{
						if (tMonth < 10){tMonth = "0" + tMonth};
							if (tDate < 10){tDate = "0" + tDate};
							if (wfmt == "yyyy/mm/dd"){
								return (tYear + "/" + tMonth + "/" + tDate);
							}else{
								return (tYear + "" + tMonth + "" + tDate);
							}
						}
				}
			}else{
				if (wfmt == "yyyy/m/d"){
					return (tYear + "/" + tMonth + "/" + tDate);
				}else{
					if (tMonth < 10){tMonth = "0" + tMonth};
					if (tDate < 10){tDate = "0" + tDate};
					if (wfmt == "yyyy/mm/dd"){
						return (tYear + "/" + tMonth + "/" + tDate);
					}else{
					   	return (tYear + "" + tMonth + "" + tDate);
					}
				}
			}
			break;
		
		default:
			return "<FONT COLOR='red'>加算単位エラー（" + flg + ")</FONT>";
			break;
	}
}

function EDate(nDate,fmt){
//  機能　　　　：指定日の月末日を求める
//  関数　　　　：EDate()
//  引数　　　　：指定日(文字形式：yyyy/m/d or yyyy/mm/dd）
//	　　　　：fmt 戻り値の形式 "yyyy/m/d" "yyyy/mm/dd" "yyyymmdd"
//  戻り値　　　：月末日(文字形式：yyyy/m/d）
//
//  2005/07/20 12月の月末を求める処理修正
//
	if (nDate == ""){
		var wDate = new Date();
	}else{
		var wymd = nDate.split("/");
		if (wymd[1].length == 1){wymd[1] = "0" + wymd[1]};
		if (wymd[2].length == 1){wymd[2] = "0" + wymd[2]};
		if (ValidDate(wymd[0] + "/" + wymd[1] + "/" + wymd[2])){
			var wDate = new Date(nDate);
		}else{
			return "<FONT COLOR='red'>日付形式エラー(" + nDate + ")</FONT>";
		}
	}
	if (fmt == "yyyy/m/d" || fmt == "yyyy/mm/dd" || fmt == "yyyymmdd"){
	    wfmt = fmt;
	}else{
		wfmt = "yyyy/m/d";
	}

	var tYear = wDate.getFullYear();
	var tMonth = wDate.getMonth() + 2;
	if (tMonth >= 13){
		tYear += 1;
		tMonth -= 12;
	}	

	return DateDAdd(-1,tYear + "/" + tMonth + "/1",wfmt);

}

function DateDAdd(n,nDate,fmt){
//  機能　　　　：指定日にｎ日を加算する
//  関数　　　　：DateDAdd()
//  引数　　　　：加算日数（過去日はマイナス数値)
//  　　　　　　：指定日(文字形式：yyyy/m/d or yyyy/mm/dd）
//	　　　　：fmt 戻り値の形式 "yyyy/m/d" "yyyy/mm/dd" "yyyymmdd"
//  戻り値　　　：加算日数した年月日(文字形式：yyyy/m/d）
//

	if (nDate == ""){
		var wDate = new Date();
	}else{
		var wymd = nDate.split("/");
		if (wymd[1].length == 1){wymd[1] = "0" + wymd[1]};
		if (wymd[2].length == 1){wymd[2] = "0" + wymd[2]};
		if (ValidDate(wymd[0] + "/" + wymd[1] + "/" + wymd[2])){
			var wDate = new Date(nDate);
		}else{
			return "<FONT COLOR='red'>日付形式エラー(" + nDate + ")</FONT>";
		}
	}
	if (fmt == "yyyy/m/d" || fmt == "yyyy/mm/dd" || fmt == "yyyymmdd"){
		wfmt = fmt;
	}else{
		wfmt = "yyyy/m/d";
	}

	var wdaysMS = n * 1000 * 60 * 60 * 24;
	var DateMS = wDate.getTime();
	DateMS += wdaysMS;
	wDate.setTime(DateMS);
	var tYear = wDate.getFullYear();
	var tMonth = wDate.getMonth() + 1;
	var tDate = wDate.getDate();

	if (wfmt == "yyyy/m/d"){
		return (tYear + "/" + tMonth + "/" + tDate);
	}else{
		if (tMonth < 10){tMonth = "0" + tMonth};
		if (tDate < 10){tDate = "0" + tDate};
		if (wfmt == "yyyy/mm/dd"){
			return (tYear + "/" + tMonth + "/" + tDate);
		}else{
			return (tYear + "" + tMonth + "" + tDate);
		}
	}
}

function DateDiff(flg,nDateFM,nDateTO){
//  機能　　　　：指定日の間の万年数、万月数、日数を求める関数
//  関数名　　　：DateDiff()
//  引数　　　　：flg      単位（文字属性） "y","m","d","ym"
//	                        "y":万年数　"m":万月数　"d":日数:
//	                        "ym":万年月数 ==> 例 1.01 : 1年1ヶ月　1.11 : 1年11ヶ月 
//  　　　　　　：nDateFM  指定日From（文字属性）
//  　　　　　　：nDateTO  指定日To   (文字形式）
//  戻り値　　　：日数
//
//  呼出例　　　：DateDiff("d","","2003/10/1")  当日と2003/10/1の間の日数を求める
//  　　　　　　：DateDiff("d","2003/1/20","") 2003/1/20との間の日数を求める
//  　　　　　　：DateDiff("m","2003/1/20","") 2003/1/20との間の万月数を求める
//
	var PastOrFutureflag = 1;
	if (nDateFM == ""){
		var today = new Date();
		var wY = today.getFullYear();
		var wM = today.getMonth();
		var wD = today.getDate();
		var wDateFM = new Date(wY,wM,wD);
	}else{
		var wymd = nDateFM.split("/");
		if (wymd[1].length == 1){wymd[1] = "0" + wymd[1]};
		if (wymd[2].length == 1){wymd[2] = "0" + wymd[2]};
		if (ValidDate(wymd[0] + "/" + wymd[1] + "/" + wymd[2])){
			var wDateFM = new Date(nDateFM);
		}else{
			return "Invalid Date format(FROM)(" + nDateFM + ")";
		}
	}
	if (nDateTO == ""){
		var today = new Date();
		var wY = today.getFullYear();
		var wM = today.getMonth();
		var wD = today.getDate();
		var wDateTO = new Date(wY,wM,wD);
	}else{
		var wymd = nDateTO.split("/");
		if (wymd[1].length == 1){wymd[1] = "0" + wymd[1]};
		if (wymd[2].length == 1){wymd[2] = "0" + wymd[2]};
		if (ValidDate(wymd[0] + "/" + wymd[1] + "/" + wymd[2])){
			var wDateTO = new Date(nDateTO);
		}else{
			return "Invalid Date format(TO)(" + nDateTO + ")";
		}
	}
	if (wDateFM > wDateTO){
		PastOrFutureflag = -1;
		var tmp = wDateFM;
		wDateFM = wDateTO;
		wDateTO = tmp;
	}

	switch (flg.toLowerCase()){
		case "d":
			var wdaysFM = wDateFM.getTime();
			var wdaysTO = wDateTO.getTime();
			return (wdaysTO - wdaysFM) / (1000 * 60 * 60 * 24) * PastOrFutureflag;
			break;
       
		case "y":
			var wY1 = wDateFM.getFullYear();
			var wM1 = wDateFM.getMonth()+1;
			var wD1 = wDateFM.getDate();
			var wY2 = wDateTO.getFullYear();
			var wM2 = wDateTO.getMonth()+1;
			var wD2 = wDateTO.getDate();
			if (wY1 == wY2){
				tY = 0;
			}else{
				tY = wY2 - wY1;
			}
			if (wM1 > wM2){
				tY--;
				tM = wM2 + 12 - wM1;
			}
			return tY * PastOrFutureflag;
			break;
		
		case "m":
			var wY1 = wDateFM.getFullYear();
			var wM1 = wDateFM.getMonth()+1;
			var wD1 = wDateFM.getDate();
			var wY2 = wDateTO.getFullYear();
			var wM2 = wDateTO.getMonth()+1;
			var wD2 = wDateTO.getDate();
			tM = (wY2 * 12 + wM2) - (wY1 * 12 + wM1);
			if (wD1 > wD2){
				tM--;
			}
			return tM * PastOrFutureflag;
			break;
		
		case "ym":
			var wY1 = wDateFM.getFullYear();
			var wM1 = wDateFM.getMonth()+1;
			var wD1 = wDateFM.getDate();
			var wY2 = wDateTO.getFullYear();
			var wM2 = wDateTO.getMonth()+1;
			var wD2 = wDateTO.getDate();
			if (wY1 == wY2){
				tY = 0;
			}else{
				tY = wY2 - wY1;
			}
			if (wM1 > wM2){
				tY--;
				tM = wM2 + 12 - wM1;
			}else{
				tM = wM2 - wM1;
			}
			if (wD1 > wD2){
				if (tM == 0){
					tM = 11;
				}else{
					tM--;
    			}
			}
			if (tM < 10){tM = "0" + tM};
			return tY * PastOrFutureflag + "." + tM;
			break;
	}

}

function ValidDate(dateStr) {
// Checks for the following valid date formats:
// YYYY/MM/DD

var datePat = /^(\d{4})(\/)(\d{2})\2(\d{2})$/;
var DateArray = dateStr.match(datePat);

	if (DateArray == null) {
		return false;
	}

	wyear = dateStr.substr(0,4);
	wmonth = parseInt(dateStr.substr(5,2),10);
	wday = parseInt(dateStr.substr(8,2),10);

	if (mon_chk(wmonth)){
	}else{
		return false;
	}

	dd = daymonth(wyear,wmonth);
	if (wday > dd){
		return false;
	}
    
	return true;
}

/* 日付の範囲チェック */
function daymonth(year,month){
	day = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
	if(month==2 && leapyear(year)) return 29;
	return day[month-1];
}
/* うるう年のチェック */
function leapyear(year){
	return year%4==0 && (year%100!=0 || year%400==0);
}

/* 月の範囲チェック */
function mon_chk(month){	
	if((month >= 1) && (month <= 12)) return true;
	return false;
}


function WorkdayAdd(n,date,yobi,saijitsu){
//  機能　　　　：指定日の過去または未来の日を稼働日で求める関数
//  関数名　　　：WorkdayAdd()
//  引数　　　　：n      ｎ日後またはｎ日前（数値属性）前の時は－値とする
//  　　　　　　：date   指定日（文字属性：yyyy/m/d or yyyy/mm/dd）省略時は当日
//  　　　　　　：yobi   休日を曜日で指定する
//	　　　　　　　　　　 0:日 1:月 2:火 3:水 4:木 5:金 6:土
//	　　　　　　：saijitsu 祭日を指定する　形式："yyyy/mm/dd" or "yyyy/m/d"
//  戻り値　　　：日付形式（yyyy/mm/dd）
//
//  呼出例　　　：WorkdayAdd(10,"","0,6","2003/07/20,2003/09/15,2003/11/3") 
//              当日の10日後の稼働日を求める。土日は休日、祭日あり
//
	if (n < 0){
		wn = -n;
	}else{
		wn = n;
	}
	wyb = yobi.split(",");
	wsa = saijitsu.split(",");
    
	for ( i=0;i<wsa.length;i++){
		wsa[i] = new Date(wsa[i]);
		wsa[i] = wsa[i].getTime();
	}
	var count=0;
	var flag=false;
	if (date == ""){
		var wkaisi = new Date();
		wky = wkaisi.getFullYear();
		wkm = wkaisi.getMonth();
		wkd = wkaisi.getDate();
		wkaisi = new Date(wky,wkm,wkd);
	}else{
		var wkaisi = new Date(date);
	}
	var EndDate = wkaisi.getTime();
	var kasan = 1000 * 60 * 60 * 24;
	if (n < 0) { kasan = kasan * -1};
	if (n == 0){
		var wyymmdd = new Date(EndDate);
		var wyear = wyymmdd.getFullYear();
		var wmonth = wyymmdd.getMonth()+1;
		if (wmonth < 10) { wmonth = "0" + wmonth};
		var wdate = wyymmdd.getDate();
		if (wdate < 10) { wdate = "0" + wdate};
		return wyear + "/" + wmonth + "/" + wdate;
	}else{
		for (i=1;flag=true;i++){
			EndDate = EndDate + kasan;
			if (saijitsu_check(EndDate)){
			}else{
				if (yasumi_check(EndDate)){
				}else{
					count++
					if (count == wn){
						flag = true;
						var wyymmdd = new Date(EndDate);
						var wyear = wyymmdd.getFullYear();
						var wmonth = wyymmdd.getMonth()+1;
						if (wmonth < 10) { wmonth = "0" + wmonth};
						var wdate = wyymmdd.getDate();
						if (wdate < 10) { wdate = "0" + wdate};
						return wyear + "/" + wmonth + "/" + wdate;
					}
				}
			}
		}
		return false;
	}
}

function saijitsu_check(date){
//
//	祭日チェック
//
//  　指定祭日の場合、true
//

	for (j=0; j<wsa.length; j++){
		if (date == wsa[j]){
			return true;
		}
	}
	return false;
}

function yasumi_check(date){
//
//	曜日指定の休日チェック
//
//  　指定曜日場合、true
//
	wymd = new Date(date);
	var yb = wymd.getDay();
	for (k=0; k<wyb.length; k++){
		if (yb == wyb[k]){
			return true;
		}
	}
	return false;
}

function NthYDate(date,N,W){
//
//   該当月の第ｎ何曜日の日付を求めるための準備
//
//		CallingSeq  NthYDate(date,n,y)
//
//				date:対象日 (文字列形式："yyyy/m/d" or "yyyy/mm/dd") 
//				n   :第ｎ週目
//				y   :曜日(0,1,2,3,4,5,6・・数値は日月火水木金土の意味)
//
//	使い方：(例)
//
//		当月の第２火曜日の日を求める場合
//			var today = new Date();
//			var yyyy = today.getFullYear();
//			var mm = today.getMonth()+1;
//			var dd = today.getDate();
//			var n = 2;
//			var y = 2;
//          var yobi = new Array("日","月","火","水","木","金","土");
//
//			document.write("当月度(" + yyyy + "年" + mm + "月)の第 " + n + " " + yobi[y] + "曜日は、" + NthYDate(yyyy + "/" + mm + "/" + dd,n,y) + "日です"); 
//

	var firstDayOfMonth = new Date(date);
	firstDayOfMonth.setDate(1);

	return 7*N - (firstDayOfMonth.getDay() + 6 - W) % 7;
}
//
