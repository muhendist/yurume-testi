	function beklenenMesafe(cinsiyet, vki, yas){
		if (cinsiyet == "erkek") {
			var beklenenmesafe = 1140 - (5.61 * vki) - (6.94 * yas);
		}
		else if (cinsiyet == "kadin") {
			var beklenenmesafe = 1017 - (6.24 * vki) - (5.83 * yas);
		}
		else {
			var beklenenmesafe = 0;
		}
		//beklenenmesafe = beklenenmesafe.toFixed(2);
		beklenenmesafe = beklenenmesafe.formatMoney(0, ',', '.')
		$("#beklenenmesafe").val(beklenenmesafe);
		$('#beklenenmesafegosterimi, #sonucBeklenenMesafe').text(beklenenmesafe);
	}

	function hastabilgileriDolumu() {
		var result = true;
		$( ".hastainputlar input" ).each(function(index) {
		  	if($( this ).val().length == 0 || $( this ).val() == "0" || $( this ).val() == null) {
		  		alert("Lütfen tüm bilgileri eksiksiz giriniz!")
		  		result = false;
		  		return false;
		  	}
		});
		return result;
	}

	function kaydiSileyimmi() {
		alert("05.03.2017 tarihli YAVUZ KİREZ kaydını silmek istediğinize emin misiniz?");
	}

	// PRACTICE-FLASHCARD FONKSIYONLARI 
	function cardSesiCikar() {
		if(bnlSes){
    		var cardsoundrnd = Math.floor(Math.random() * 5 + 1);
			playAudio('sound/kart-' + cardsoundrnd + '.mp3');
		}
	}

	function cardZamanlaFunc(that) {
    	cardZamanla = setTimeout(function(){
    		cardSesiCikar();
			that.removeClass('flipped');
		}, 2500);
	}
	
	function cardZamanlayiDurdurFunc() {
		clearTimeout(cardZamanla);
	}


	function getRandomInt(min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}


	function randomno(sayi, min, max){

		min = typeof min !== 'undefined' ? min : 1;
	   	max = typeof max !== 'undefined' ? max : contentArray.length;

		var sayimiz = Math.floor(Math.random()*(max-min+1)+min);

		if(sayimiz == sayi){
			return randomno(sayi, min, max);

		}else{
			return sayimiz;

		}
	}

	function shuffle(array) {
	  var currentIndex = array.length, temporaryValue, randomIndex;

	  while (0 !== currentIndex) {

	    randomIndex 		= Math.floor(Math.random() * currentIndex);
	    currentIndex 		-= 1;

	    temporaryValue 		= array[currentIndex];
	    array[currentIndex] = array[randomIndex];
	    array[randomIndex] 	= temporaryValue;
	  }

	  return array;
	}

	function onBackKey() {
	    if(window.anasayfa){
	    	window.intKapat++;
	    	
	    	if(window.intKapat >= 2){
	        	navigator.app.exitApp();
	        }

	    }else if(window.QuizScreen){
	    	window.intKapat = 0;
			ekranDegistir('levelsecim', true);

	    }else{
	    	ekranDegistir('ana', true);
	    	window.anasayfa = true;

	    }

	    window.StatusBar.backgroundColorByHexString("#c1392b");
	}


	function shortenLargeNumber(num) {
	     if (num >= 1000000000) {
	        return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + ' '+ dictionary[lang].nufusmilyar;
	     }
	     if (num >= 1000000) {
	        return (num / 1000000).toFixed(1).replace(/\.0$/, '') + ' '+ dictionary[lang].nufusmilyon;
	     }
	     if (num >= 1000) {
	        return (num / 1000).toFixed(1).replace(/\.0$/, '') + ' '+ dictionary[lang].nufusbin;
	     }
	     return num;
	}


	function getPractice(practiceSecilen) {
		getPracticeSelect(practiceSecilen);
		$(".practicebadge .badge").attr("src","img/badge/" + practiceSecilen + ".png");

		$('#flashcards').html("");
		var levelPractice 		= practiceSecilen;

		if(practiceSecilen == 11){
			var practiceContentArr 	= window.contentArray;

		}else{
			var practiceContentArr 	= $.grep(window.contentArray, function(e){ return e.level == levelPractice; });

		}
		//practiceContentArr.sort(function(a, b) {
		//    var textA = a.[lang].toUpperCase();
		//    var textB = b.[lang].toUpperCase();
		//    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
		//});
		var practiceTpl 		= $('#practiceTemplate').html();

		$('#flashcards').addClass("active");
		$('.practicebadge').addClass("active");
		$(".practiceLevelSecim span").addClass("active");

		var cards = [];
		var practiceobj;
		var templatePractice;

		for (var i = 0; i < practiceContentArr.length; i++) {
			practiceobj 		= practiceContentArr[i];
			templatePractice 	= practiceTpl.format(practiceobj[lang],practiceobj.code,practiceobj.uzanti);
			$('#flashcards').append(templatePractice);
		}
	}


	// PRACTICE LEVEL SELECTION
	function getPracticeSelect(getPracticeSecimi) {
		$("select#practiceLevels").html("");
		
		for (var i = 1; i <= maxLevel; i++) {
			levellang = "levelname" + i;

			if (getPracticeSecimi == i) {
				selectedPracticeLevel = 'selected="selected"';
				$(".practiceLevelSecim span").text("(" + i + ") " + dictionary[lang][levellang]);
			} else {
				selectedPracticeLevel = '';
			}

			siradaki = "<option value='" + i + "' " + selectedPracticeLevel + ">("+ i +") " + dictionary[lang][levellang] + "</option>";
			$("select#practiceLevels").append(siradaki);
		}

	}




	function dilDeletect(){
	    if(navigator.language){
	        var arrDil = navigator.language.split("-");
	        return arrDil[0];
	    }
	}

	function getMediaURL(s) {
	    if(typeof device !== 'undefined'){
	        if(device.platform){
	            if(device.platform.toLowerCase() === "android") return "/android_asset/www/" + s;
	        }
	    }
	    return s;
	}


	function playAudio(src) {
	    var src = getMediaURL(src);

	    if(typeof device !== 'undefined'){

	    	if(window.media){
	    		window.media.release();
	    	}

	    	window.media = new Media(src);
		    window.media.play({ playAudioWhenScreenIsLocked : false });
	    }
	}





	function quizEkranHizala(){
	    $('.metinsoru, .gorselsiklar, .gorselsoru').removeAttr('style');

	    var toplamYukseklik         = $(window).height();
	    var metneKalanYukseklik     = $(window).height() - $(".gorselsiklar").actual('innerHeight') - $("header").innerHeight() - $(".levelprogress").actual('innerHeight') - 20;
	    //console.log(metneKalanYukseklik + " - "+ $(".gorselsiklar").innerHeight());
	    var gorseleKalanYukseklik   = $(window).height() - $(".metinsiklar").actual('innerHeight') - $("header").innerHeight() - $(".levelprogress").innerHeight() - 23;

	    if (metneKalanYukseklik > 100) {
	        $(".metinsoru").height(metneKalanYukseklik);

	    } else{
	        $(".metinsoru").removeAttr('style');

	    }

	    $('.gorselsoru').height(gorseleKalanYukseklik);

	    var gorselinBoslugu = $(".gorselsoru").actual('innerHeight') - $(".gorselsoru img").actual('innerHeight');
	    $(".gorselsoru img").css("margin-top", gorselinBoslugu/2 );

	    if(window.levelType == 1){
	        var gorselSiklarYukseklik = $(".gorselsiklar").actual('innerHeight');
	        $('.gorselsiklar').height(gorselSiklarYukseklik);
	    }

	}

	function kelimeUzunlugu(){
	    var kelimeUzunlugu      = $(".metinsoru .inner").text().length;

	    if (kelimeUzunlugu < 9 ) {
	        $(".metinsoru .inner").attr('class', 'inner').addClass("cokkisa");

	    } else if (kelimeUzunlugu > 8  && kelimeUzunlugu < 13 ) {
	        $(".metinsoru .inner").attr('class', 'inner').addClass("kisa");

	    } else if (kelimeUzunlugu > 12 && kelimeUzunlugu < 17) {
	        $(".metinsoru .inner").attr('class', 'inner').addClass("orta");

	    } else if (kelimeUzunlugu > 16 && kelimeUzunlugu < 21) {
	        $(".metinsoru .inner").attr('class', 'inner').addClass("uzun");

	    } else {
	        $(".metinsoru .inner").attr('class', 'inner').addClass("cokuzun");
	    }
	}

	function metinSikUzunlugu(){
	    var siklar = $(".metinsiklar .secenek");
	    siklar.each(function(){
	        if ($(this).find(".optName span").text().length > 15) {
	            $(this).addClass("kucult");
	        } else {
	            $(this).removeClass("kucult");
	        }
	    });
	}

	function ekranDegistir(acilacakekran, geri, effect){
		$('[id^="ekran-"]').scrollTop(0);
		geri 	= geri || false;
		effect 	= effect || 'slide';


		if(window.media){
			window.media.stop();
		}

		if(acilacakekran == "testebasla"){
			show();
			reset();
			window.totalMetre = 0;
			$('#yurumeTesti1SureSayaci span').text('00:00');
			$('#yurumeTesti1MesafeSayaci, #sonucYurunenMesafe, #sonucSonKalpHizi, #sonucSonNefesDarligi, #sonucSonYorgunluk, #sonkalphizi, #yapilanmesafe').text('');
			$('#sonnefesdarligi,#sonyorgunluk').val('').change();
			$('#gotosonsorular').removeClass("sonlandir").html("TESTE<br>BAŞLA").attr("id", "yurumeTesti1Basla");
			$('#yurumeTesti1MesafeSayaci').text(0);


			/*navigator.geolocation.getCurrentPosition(function(position){
		        $('#kordinatlar').text(position.coords.latitude + " - "+ position.coords.longitude);

	      	}, function(){
	      		
	      	});
	      	*/
		}



		if(acilacakekran == "sonsorular"){
			clearTimeout(window.surekliGidiyorum);
			stop();

			/*navigator.geolocation.getCurrentPosition(function(position){
		        window.latTre = position.coords.latitude;
		        window.lonTre = position.coords.longitude;

		       	ToMetre = getDistanceFromLatLonInKm(window.latOneT, window.lonOneT, window.latTre, window.lonTre);
		       	window.totalMetre 	+= ToMetre.toFixed(0);
		       	$('#yurumeTesti1MesafeSayaci, #sonucYurunenMesafe, #yapilanmesafe').text(totalMetre);

	      	});
	      	*/

	      	//pedometer.stopPedometerUpdates(successCallback, onError);
	      	var toplamMetre = $('#yurumeTesti1MesafeSayaci').text();

	      	$('#sonucYurunenMesafe').text(toplamMetre);
	      	$('#yapilanmesafe').val(toplamMetre);
		}

		if(acilacakekran == "sonuclar"){
			toplamMetre = $('#yapilanmesafe').val();
			$('#sonucYurunenMesafe').text(toplamMetre);
		}


		if(acilacakekran == "hastakayitlari"){
			$('#hastaListesi li').remove();
			$('#hastaYok').show();

			db.transaction(function(tx) {
		        tx.executeSql('SELECT * FROM hasta',[],
	            function(tx, results) {

	                if (results != null && results.rows != null && results.rows.length > 0) {

	                	var len = results.rows.length, i;
	                	$('#hastaYok').hide();
	                	$userTemplate = $('#tempKayit').html();

						for (i = 0; i < len; i++) {
							$user 			= results.rows.item(i);
							dateTime 		= timeConverter($user.tarih);
							tipi 			= "SWT";

							if($user.tipi == "1")
								tipi 			= "6DYT";


							template 		= $userTemplate.format(dateTime, ($user.adi + ' '+ $user.soyadi), tipi, $user.userID);
							$('#hastaListesi').append(template);
						}

	                }
	            }, nullHandler, errorHandler);
		    });
		}

		if(typeof device !== 'undefined'){
	        if(device.platform == "browser"){
	        	$(':mobile-pagecontainer').pagecontainer('change', '#ekran-'+ acilacakekran, {
			        transition: effect,
			        changeHash: false,
			        reverse: geri,
			        showLoadMsg: false
			    });

	        } else {
	        	
	        	if(device.platform == "iOS"){
	        		effect 		= "curl";
	        		direction 	= "up";
	        	}else{
	        		direction = "left";
	        	}

	        	if(geri){
	        		if(device.platform == "iOS"){
	        			direction = "down";
	        		} else {
	        			direction = "right";
	        		}
	        	}


				var options = {
					"direction"        : direction, // 'left|right|up|down', default 'left' (which is like 'next')
					"duration"         : 400, // in milliseconds (ms), default 400
					"slowdownfactor"   : 4, // overlap views (higher number is more) or no overlap (1). -1 doesn't slide at all. Default 4
					//"slidePixels"      :   20, // optional, works nice with slowdownfactor -1 to create a 'material design'-like effect. Default not set so it slides the entire page.
					"iosdelay"         : 0, // ms to wait for the iOS webview to update before animation kicks in, default 60
					"androiddelay"     : 0, // same as above but for Android, default 70
					"winphonedelay"    : 0, // same as above but for Windows Phone, default 200,
					"fixedPixelsTop"   : 0, // the number of pixels of your fixed header, default 0 (iOS and Android)
					"fixedPixelsBottom": 0,  // the number of pixels of your fixed footer (f.i. a tab bar), default 0 (iOS and Android)
					"href" 			 : "#ekran-"+ acilacakekran
				};

				window.plugins.nativepagetransitions[effect](
				  	options
				);
			}
		}

	    if(acilacakekran == "ana"){
	        window.anasayfa = true;

	    } else if(acilacakekran == "quiz"){
	    	window.QuizScreen = true;

	    }else {
	    	window.QuizScreen = false;
	        window.anasayfa = false;
	        window.intKapat = 0;
	        document.addEventListener("backbutton", onBackKey, false);

	    }

	    //clearTimeout(kalanSure);

	    if(window.ga){
	        window.ga.trackView(acilacakekran);
	    }
	}


	var notificationOpenedCallback = function(jsonData) {
        
        if(notification.payload.additionalData.ekran){
            ekranDegistir(notification.payload.additionalData.ekran);
        }
    };




    function FormKontrol(area){
		var FormOK = true;

		$(area +" input.zorunlu, "+ area +" textarea.zorunlu, "+ area +" select.zorunlu").each(function(){
			$this 		= $(this);
			$thisvalue 	= $.trim($this.val());
			$thismin 	= parseInt($this.data('minc'));

			if(!$thismin){
				$thismin = 1;			
			}

			if($thisvalue.length < $thismin){
				FormOK = false;
				$this.addClass('errorverdi');
				$this.closest('.form-group').find('.has-success').removeClass('has-success');
				$this.closest('.form-group').removeClass('has-success');
				$this.closest('.form-group').addClass('has-error');
				$this.closest('.form-group').addClass('has-error');
				$this.closest('.form-group').find('i.fa').addClass('fa-exclamation');
				//$this.parent().removeClass('has-success');
				//$this.parent().addClass('has-error');
				$this.focus();

			}
		});

		return FormOK;
	}

	function distance(lat1, lon1, lat2, lon2) {
		$('#kordinatlar').text(lat1 + " - "+ lon1 + " | "+ lat2 + " - "+ lon2);

		var deg2rad = 0.017453292519943295; // === Math.PI / 180
		var cos = Math.cos;
		lat1 *= deg2rad;
		lon1 *= deg2rad;
		lat2 *= deg2rad;
		lon2 *= deg2rad;
		var diam = 12742; // Diameter of the earth in km (2 * 6371)
		var dLat = lat2 - lat1;
		var dLon = lon2 - lon1;
		var a = (
			(1 - cos(dLat)) +
			(1 - cos(dLon)) * cos(lat1) * cos(lat2)
		) / 2;

		var toplams = (diam * Math.asin(Math.sqrt(a))) * 1000;
		console.log(toplams);
		return toplams;
	}


	function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
		$('#kordinatlar').text(lat1 + " - "+ lon1 + " | "+ lat2 + " - "+ lon2);
		//var R = 6371; // Radius of the earth in km
		var R = 6371000;
		var dLat = deg2rad(lat2-lat1);  // deg2rad below
		var dLon = deg2rad(lon2-lon1); 
		var a = 
			Math.sin(dLat/2) * Math.sin(dLat/2) +
			Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
			Math.sin(dLon/2) * Math.sin(dLon/2)
			; 
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
		var d = R * c; // Distance in km
		console.log(d);
		return d;
	}

	function deg2rad(deg) {
		return deg * (Math.PI/180)
	}


	function onSuccess(position) {
        window.latOne = position.coords.latitude;
        window.lonOne = position.coords.longitude;

        ekranDegistir('testebasla');
    }

    function onError(error) {
        alert('Konumunuz Bulunamadı.');
    }


    function gidiyorum(){
    	navigator.geolocation.getCurrentPosition(function(position){
	    	latTwo = position.coords.latitude;
	        lonTwo = position.coords.longitude;

	       	var hesap 			= getDistanceFromLatLonInKm(window.latOneT, window.lonOneT, latTwo, lonTwo);
	       	window.totalMetre 	+= hesap.toFixed(0);;
	       	$('#yurumeTesti1MesafeSayaci').text(totalMetre);

	       	window.latOneT = latTwo;
	        window.lonOneT = lonTwo;
      	});

      	window.surekliGidiyorum = setTimeout(function(){
      		gidiyorum();
      	}, 1000);
    }


    Number.prototype.formatMoney = function(c, d, t){
	var n = this, 
	    c = isNaN(c = Math.abs(c)) ? 2 : c, 
	    d = d == undefined ? "." : d, 
	    t = t == undefined ? "," : t, 
	    s = n < 0 ? "-" : "", 
	    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
	    j = (j = i.length) > 3 ? j % 3 : 0;
	   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
	 };

	var	clsStopwatch = function() {
			// Private vars
			var	startAt	= 0;	// Time of last start / resume. (0 if not running)
			var	lapTime	= 0;	// Time on the clock when last stopped in milliseconds

			var	now	= function() {
					return (new Date()).getTime(); 
				}; 
	 
			// Public methods
			// Start or resume
			this.start = function() {
					startAt	= startAt ? startAt : now();
				};

			// Stop or pause
			this.stop = function() {
					// If running, update elapsed time otherwise keep it
					lapTime	= startAt ? lapTime + now() - startAt : lapTime;
					startAt	= 0; // Paused
				};

			// Reset
			this.reset = function() {
					lapTime = startAt = 0;
				};

			// Duration
			this.time = function() {
					return lapTime + (startAt ? now() - startAt : 0); 
				};
		};

	var x = new clsStopwatch();
	var $time;
	var clocktimer;

	function pad(num, size) {
		var s = "0000" + num;
		return s.substr(s.length - size);
	}

	function formatTime(time) {
		var h, m, s, ms = 0;
		var newTime = '';

		h = Math.floor( time / (60 * 60 * 1000) );
		time = time % (60 * 60 * 1000);
		m = Math.floor( time / (60 * 1000) );
		time = time % (60 * 1000);
		s = Math.floor( time / 1000 );
		ms = time % 1000;

		if(window.altidakika && m == 6){
			$('#gotosonsorular').trigger('click');
		}

		newTime = pad(m, 2) + ':' + pad(s, 2)
		//newTime = pad(m, 2) + ':' + pad(s, 2) + ':' + pad(ms, 2);
		return newTime;
	}

	function show() {
		$time = document.getElementById('yurumeTesti1SureSayaci');
		update();
	}

	function update() {
		$time.innerHTML = formatTime(x.time());
	}

	function start() {
		clocktimer = setInterval("update()", 1);
		x.start();
	}

	function stop() {
		x.stop();
		clearInterval(clocktimer);
	}

	function reset() {
		stop();
		x.reset();
		update();
	}


	function timeConverter(UNIX_timestamp){
		UNIX_timestamp 	= parseInt(String(UNIX_timestamp).substring(0, 13));
		var a 			= new Date(UNIX_timestamp);
		var months 		= ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		var year 		= a.getFullYear();
		var month 		= months[a.getMonth()];
		var date 		= a.getDate();
		var hour 		= a.getHours();
		var min 		= a.getMinutes();
		var sec 		= a.getSeconds();
		var time 		= date + ' ' + month + ' ' + year + ' ' + hour + ':' + min;
		return time;
	}



