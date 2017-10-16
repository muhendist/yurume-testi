	var totalMetre 	= 0;
	var uzunluk 	= 0;
	var lastHastaID;
	var latOne;
	var lonOne;
	var latOneT;
	var lonOneT;
	var latTre;
	var lonTre;
	var SureOne;
	var surekliGidiyorum;
	var sayici;
	var media;
	var adimCarpan = 76;
	var altidakika = false;


	$(document).on('click', '.gotoyurumetesti1', function(){
		ekranDegistir('yurumetesti1kosullari');
		$('#testtipi').val('1');
		$('#vmax').hide();
		$('#beklenenMesafeArea, #beklenenSonuc').show();
		$('#testAdi').text("6 DK YÜRÜME");
		window.altidakika = true;
		
	});

	$(document).on('click', '.gotosyurumetesti2', function(){
		ekranDegistir('yurumetesti1kosullari2');
		$('#testtipi').val('2');
		$('#vmax').show();
		$('#beklenenMesafeArea, #beklenenSonuc').hide();
		$('#beklenenmesafegosterimi, #beklenenmesafegosterimi2').hide();
		$('#testAdi').text("SHUTTLE WALK");
		window.altidakika = false;

	});

	$(document).on('click', '#ekran-yurumetesti1kosullari header .geri', function(){
		ekranDegistir('ana', true);
	});

	$(document).on('click', '.gotohastabilgigirisi', function(){
		$('#kayitformu, #sonsorular')[0].reset();
		ekranDegistir('hastabilgigirisi');
		$('.turartir').addClass('gorunmez');

	});


	$(document).on('click', '#ekran-hastabilgigirisi header .geri', function(){
		ekranDegistir('yurumetesti1kosullari', true);
	});

	
	$(document).on('click', '#ekran-testebasla header .geri', function(){
		ekranDegistir('hastabilgigirisi', true);
	});

	$(document).on('submit', '#kayitformu', function(e){
		e.preventDefault();

		var devam 				= FormKontrol('#kayitformu');

		if(devam){
			var adi 			= $('#hastaadi').val();
			var soyadi 			= $('#hastasoyadi').val();
			var cisn 			= $('#cinsiyet').val();
			var dgunu 			= $('#dogumgunu').val();
			var dayi 			= $('#dogumayi').val();
			var dyili 			= $('#dogumyili').val();
			var boy 			= $('#boy').val();
			var agirlik 		= $('#agirlik').val();
			var hnefes 			= $('#ilknefesdarligi').val();
			var hyorgunluk 		= $('#ilkyorgunluk').val();
			var hastalik 		= $('#hastalik').val();
			var ilkkalphizi 	= $('#ilkkalphizi').val();
			var solunumfrekansi = $('#solunumfrekansi').val();

			var kanbasinciOne	= $('#sistolik').val();
			var kanbasinciTwo	= $('#diastolik').val();
			var beklenen 		= $('#beklenenmesafe').val();

			var spo2 			= $('#spo2').val();
			var oksijendestegi 	= $('#oksijendestegi').val();
			var turuzunlugu 	= $('#turuzunlugu').val();
			window.uzunluk 		= parseInt(turuzunlugu);

			var dgunufull 		= dgunu + '/'+ dayi + '/'+ dyili;
			var tipi 			= $('#testtipi').val();
			var kayitTarihi 	= + new Date();
			var kayitTarihi 	= String(kayitTarihi).substring(0, 13);

			if(cisn == "kadin")
				window.adimCarpan = 67;

			db.transaction(function(tx) {
				tx.executeSql('INSERT INTO hasta(adi, soyadi, cins, dtarihi, boy, kilo, nefes, beklenen, yorgunluk, hastalik, firstKalp, frekans, kanbasinci, kanbasincitwo, spo, oksijen, tipi, tarih) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
								[adi, soyadi, cisn, dgunufull, boy, agirlik, hnefes, beklenen, hyorgunluk, hastalik, ilkkalphizi, solunumfrekansi, kanbasinciOne, kanbasinciTwo, spo2, oksijendestegi, tipi, kayitTarihi], nullHandler, errorHandler
							);

				tx.executeSql('SELECT userID FROM hasta ORDER BY userID DESC LIMIT 1', [], function (tx, results) {
	            	var len = results.rows.length;
	            	for (var i = 0; i < len; ++i) {

	                	var row = results.rows.item(i);
	                	window.lastHastaID = row.userID;
	                	//console.log(lastHastaID);
	            	}
	          	});

	          	$('#sonucIlkKalpHizi').text(ilkkalphizi);
				$('#sonucIlkNefesDarligi').text(hnefes);
				$('#sonucIlkYorgunluk').text(hyorgunluk);
				
				ekranDegistir('testebasla');
				//kalphiziolcumu();
			});
		}

		// yavuz: başka bir test yaparken bu ekran dolu geldiği için aşağıdakini yazdım 26.3.2017
		$('#sonkalphizi').val('');
		//$("#sonnefesdarligi option[value='0']").attr('selected', true); //çalışmadı
		//$("#sonyorgunluk option[value='0']").attr('selected', true); //çalışmadı
	});


	$(document).on('submit', '#sonsorular', function(e){
		e.preventDefault();

		var devam 				= FormKontrol('#sonsorular');

		if(devam){
			var lastKalp 		= $('#sonkalphizi').val();
			var sonNefes 		= $('#sonnefesdarligi').val();
			var sonYorgunluk 	= $('#sonyorgunluk').val();
			var kacsure 		= $('#sonyorgunluk').text();
			var totalMetres 	= $('#yapilanmesafe').val();
			var sonucVo2max 	= (totalMetres * 0.025) + 4.19;

			$('#sonucSonKalpHizi').text(lastKalp);
			$('#sonucSonNefesDarligi').text(sonNefes);
			$('#sonucSonYorgunluk').text(sonYorgunluk);
			$('#sonucVo2max').text(sonucVo2max.toFixed(3));
			
			db.transaction(function(tx) {
				tx.executeSql('UPDATE hasta SET lastKalp = ?, sonNefes = ?, sonYorgunluk = ?, gecensure = ?, metre = ? WHERE userID = ?', [lastKalp, sonNefes, sonYorgunluk, kacsure, totalMetres, window.lastHastaID], nullHandler, errorHandler);
				ekranDegistir('sonuclar');
			});

		}
	});
	


	$(document).on('click', '#gotosonsorular', function(){
		ekranDegistir('sonsorular');

	});	
	$(document).on('click', '#ekran-sonsorular header .geri', function(){
		ekranDegistir('testebasla', true);
	});

	$(document).on('click', '.gotosonuclar', function(){
		ekranDegistir('sonuclar');

	});	
	$(document).on('click', '#ekran-sonuclar header .geri', function(){
		ekranDegistir('sonsorular');
	});
	$(document).on('click', '#ekran-sonuclar header .anasayfa', function(){
		ekranDegistir('ana', true);
	});

	$(document).on('touchstart', '#nabizol', function(){
		window.heartbeat.take(props, successCallback, errorCallback);
	});

	$(document).on('click', '.gotohastakayitlari', function(){
		ekranDegistir('hastakayitlari');
	});

	$(document).on('click', '#ekran-hastakayitlari .geri', function(){
		ekranDegistir('ana', true);
	});

	$(document).on('click', '#ekran-hastakayitlari ul li .kaydisil', function(){
		var silinsin 	= confirm('Kaydı silmek istediğinizden emin misiniz?');
		var sid 		= $(this).data('id');

		if(silinsin){
			db.transaction(function(tx) {
		  		tx.executeSql('DELETE FROM hasta WHERE userID = '+ sid);

		  		$('#kayit'+ sid).slideUp(600, function(){
		  			$('#kayit'+ sid).remove();
		  		});
		  	});
		}
	});

	$(document).on('click', '#ekran-hastakayitlari ul li .kaydagit', function(){
		var ids = $(this).data('id');

		db.transaction(function(tx) {
	        tx.executeSql('SELECT * FROM hasta WHERE userID = ?',[ids],
            function(tx, results) {

                if (results != null && results.rows != null && results.rows.length > 0) {

                	var len = results.rows.length, i;
                	$('#hastaYok').hide();
                	$userTemplate = $('#tempKayit').html();
					user 			= results.rows.item(0);

					if(user.tipi == "2"){
						$('#kayitBeklenen').hide();
						$('#tekilkayitVo2max').show();
						
					}else{
						$('#kayitBeklenen').show();
						$('#tekilkayitVo2max').hide();
					}

					$('#tekilkayitAdi').text(user.adi);
					$('#tekilkayitSoyadi').text(user.soyadi);
					$('#tekilkayitTarihi').text(timeConverter(user.tarih));
					$('#tekilkayitCinsiyet').text(user.cins);
					$('#tekilkayitDogumtarihi').text(user.dtarihi);
					$('#tekilkayitBoyu').text(user.boy);
					$('#tekilkayitAgirlik').text(user.kilo);
					$('#tekilkayitBeklenenMesafe').text(user.beklenen);
					$('#tekilkayitYurunenMesafe').text(user.metre);
					$('#tekilkayitIlkKalpHizi').text(user.firstKalp);
					$('#tekilkayitSonKalpHizi').text(user.lastKalp);
					$('#tekilkayitIlkNefesDarligi').text(user.nefes);
					$('#tekilkayitSonNefesDarligi').text(user.sonNefes);
					$('#tekilkayitIlkYorgunluk').text(user.yorgunluk);
					$('#tekilkayitSonYorgunluk').text(user.sonYorgunluk);
					$('#tekilkayitVo2max').text(((parseInt(user.metre) * 0.025) + 4.19).toFixed(3));

					vucutkitleendeksi = user.kilo / ((user.boy/100) * (user.boy/100));
					vucutkitleendeksi = vucutkitleendeksi.toFixed(2);

					$('#tekilkayitVKI').text(vucutkitleendeksi);
					$('#tekilkayitHastalik').text(user.hastalik);
					$('#tekilkayitSolunumFrekansi').text(user.frekans);
					$('#tekilkayitSistolik').text(user.kanbasinci);
					$('#tekilkayitDiastolik').text(user.kanbasincitwo);
					$('#tekilkayitSpo2').text(user.spo);
					$('#tekilkayitOksijenDestegi').text(user.oksijen);

					ekranDegistir('tekilhastakaydi');
                }
            }, nullHandler, errorHandler);

	    });
	});

	$(document).on('click', '#ekran-tekilhastakaydi .geri', function(){
		ekranDegistir('hastakayitlari', true);
	});

	// HASTA BİLGİLERİ EKRANINDA VÜCUT KİTLEN ENDEKSİNİ HESAPLAMA.
	$(document).on('change', '#boy, #agirlik', function(){
		var agirlik = parseInt($("#agirlik").val());
		var boy = parseInt($("#boy").val());
		if(agirlik > 0 && boy > 0) {
			vucutkitleendeksi = agirlik / ((boy/100) * (boy/100));
			vucutkitleendeksi = vucutkitleendeksi.toFixed(2);
			console.log(vucutkitleendeksi);
			$("#vucutkitleendeksi").val(vucutkitleendeksi);
			if($("#hastayasi").val()) {
				beklenenMesafe($("#cinsiyet").val(), $("#vucutkitleendeksi").val(), $("#hastayasi").val());
			}
		}
	});

	// HASTA BİLGİLERİ EKRANINDA HASTADAN BEKLENEN MESAFEYİ HESAPLAMA
	//Erkekler için =1.140(m) –(5,61×VKI)-(6,94×Yaş)                                           
	//Kadınlar için=1.017(m)-(6,24×VKI)-(5.83×Yaş)
	//ÖNCE YAŞ HESAPLANIR
	$(document).on('change', '#dogumgunu, #dogumayi, #dogumyili', function(){
		var dogumgunu = $("#dogumgunu").val();
		var dogumayi = $("#dogumayi").val();
		var dogumyili = $("#dogumyili").val();
		var hastayasi = dogumyili + "-" + dogumayi + "-" + dogumgunu;
		hastayasi = new Date(hastayasi);
		var bugun = new Date();
		var hastayasi =  Math.floor((bugun-hastayasi) / (365.25 * 24 * 60 * 60 * 1000));
		$("#hastayasi").val(hastayasi);
		console.log(hastayasi);
		if($("#vucutkitleendeksi").val()) {
			beklenenMesafe($("#cinsiyet").val(), $("#vucutkitleendeksi").val(), $("#hastayasi").val());
		}
	});

	$(document).on('change', '#cinsiyet', function(){
		if($("#vucutkitleendeksi").val() && $("#hastayasi").val()) {
			beklenenMesafe($("#cinsiyet").val(), $("#vucutkitleendeksi").val(), $("#hastayasi").val());
		}
	});

	$(document).on('blur', '.hastainputlar input, .hastainputlar select', function(){
		var ilgiliid = $(this).attr("id");
	    if( $(this).val().length === 0 || $(this).val() == "" || $(this).val() == null) {
	    	$("label[for='"+ ilgiliid +"']").addClass("warning");
	    } else {
	    	$("label[for='"+ ilgiliid +"']").removeClass("warning");
	    }
	});

	var successHandler = function (pedometerData) {
	    // pedometerData.startDate; -> ms since 1970
	    // pedometerData.endDate; -> ms since 1970
	    // pedometerData.numberOfSteps;
	    // pedometerData.distance;
	    // pedometerData.floorsAscended;
	    // pedometerData.floorsDescended;
	    console.log(pedometerData.numberOfSteps);
	    var metreS = (pedometerData.numberOfSteps * window.adimCarpan) / 100;
	    $('#yurumeTesti1MesafeSayaci').text(metreS);
	};

	var onError = function(){
		console.log('hata');
	}


	$(document).on('click', '.turartir', function(){
		window.totalMetre += window.uzunluk;
		$('#yurumeTesti1MesafeSayaci').text(totalMetre);
	});



	$(document).on('click', '#yurumeTesti1Basla', function(){
		$(this).addClass("sonlandir").html("Konum<br>Bulunuyor").attr("id", "gotosonsorular");
		window.totalMetre = 0;
		$('#gotosonsorular').html("TESTİ<br>BİTİR");
	    start();
	    $('.turartir').removeClass('gorunmez');

	    if(!window.altidakika){
	    	playAudio('sound/ritim.mp3');
	    }

		//pedometer.startPedometerUpdates(successHandler, onError);
		/*
		navigator.geolocation.getCurrentPosition(function(position){
	        window.latOne 	= position.coords.latitude;
	        window.lonOne 	= position.coords.longitude;
	        window.latOneT 	= latOne;
	        window.lonOneT 	= lonOne;
	        $('#gotosonsorular').html("TESTİ<br>BİTİR");
	        start();

      	}, function(){
      		alert('Konumunuz Bulunamadı.');
      		
      	});
      	

      	window.surekliGidiyorum = setTimeout(function(){
      		gidiyorum();
      	}, 1000);*/
	});
	

	function successCallback(bpm){
	    alert("Your heart beat per minute is:" + bpm);
	}

	function errorCallback(){
	    alert("Has not posible measure your heart beat");
	}

	var props = {
	    seconds: 10,
	    fps: 30
	};
