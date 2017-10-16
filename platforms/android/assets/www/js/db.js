	var db = null;


	function errorHandler(transaction, error) {
	    console.log(error);

	}

	function successCallBack() {
	    //alert("DEBUGGING: success");

	}

	function nullHandler(a) {
		console.log(a);
	}

	function errorHandlerFirst(error) {
	    console.log(error);
	}

	document.addEventListener('deviceready', function() {
		//window.ga.startTrackerWithId('UA-69522220-4', 30);

		if(window.ga){
	        window.ga.trackView('AnaEkran');
	    }

		if(device.platform == "browser"){
	  		db = openDatabase('saglik.db', '1.0', 'Flags', -1);

	  	}else{
	  		db = window.sqlitePlugin.openDatabase({name: 'saglik.db', location: 'default'});
	  		
	  	}
	  	createSQL = "CREATE TABLE IF NOT EXISTS `hasta` ("+
					"										`userID`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"+
					"										`adi`	TEXT,"+
					"										`soyadi`	TEXT,"+
					"										`cins`	TEXT,"+
					"										`dtarihi`	TEXT,"+
					"										`boy`	INTEGER,"+
					"										`kilo`	INTEGER,"+
					"										`nefes`	INTEGER,"+
					"										`beklenen`	INTEGER,"+
					"										`yorgunluk`	INTEGER,"+
					"										`hastalik`	INTEGER,"+
					"										`firstKalp`	INTEGER,"+
					"										`lastKalp`	INTEGER,"+
					"										`frekans` INTEGER,"+
					"										`kanbasinci` INTEGER,"+
					" 										`kanbasincitwo` INTEGER,"+
					"										`spo` INTEGER,"+
					"										`oksijen` INTEGER,"+
					"										`sonNefes` INTEGER,"+
					"										`sonYorgunluk` INTEGER,"+
					"										`gecensure` TEXT,"+
					"										`metre` INTEGER,"+
					"										`tipi` INTEGER,"+
					"										`tarih` TEXT"+
					"									);";



	  	db.transaction(function(tx) {
	  		tx.executeSql(createSQL);
	  	});


	  	ekranDegistir('ana', false, 'fade');

	});



	function createHasta(){
		

	}


	function closeDB() {
	    db.close(function () {
	        console.log("DB closed!");
	    }, function (error) {
	        console.log("Error closing DB:" + error.message);
	    });
	}
