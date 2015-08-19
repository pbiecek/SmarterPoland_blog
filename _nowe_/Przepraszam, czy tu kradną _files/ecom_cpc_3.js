var nobanner = nobanner || false;
var xxban = window.xxban || null, cpcPoz = window.cpcPoz || [];
var box = box || null;

function makeRequest( index ) {
	
		if(xxban != null && cpcPoz.length > 0){
			
			var xxPos = 0;
			if( index != null && index != 'undefined' ) {
				xxPos = index;
			}
			 
			if( cpcPoz[xxPos] ) {
				xxban[xxPos] = xxban[xxPos].replace(/,$/, '');
				var url = 'http://ad.gazeta.pl/cpc/CpcBanCount?xxBan='+ xxban[xxPos] +'&xxDiv='+ xxdiv + '&xxPos=' + xxPos;
				document.write('<scr'+'ipt type="text/javascript" src="'+ url + '"><\/script>');				
			}
			
		}
	}
	
	function putCpcBan(index){
		if (box != null && nobanner != true){
			if(box[index] != null && cpcPoz[index] != null && cpcPoz[index].length > 0){
				document.write(box[index]);
				window.setTimeout(function() {putCpcTry(index)}, 100);
			}
		}
	}

        function putCpcTry(index) {
          try {
          	var _body; 
            if ( index > 0)
        	  _body = document.getElementById("cpcBody" + index);
        	else              			
        	  _body = document.getElementById("cpcBody");
            for(var i = 0; i < cpcPoz[index].length; i++){
              _body.innerHTML = _body.innerHTML + cpcPoz[index][i];						
            }
          } catch(e) {
            window.setTimeout(function() {putCpcTry(index)}, 100);
          }
        }
