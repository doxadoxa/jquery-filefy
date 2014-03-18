/*
Filefy use to fucking rock load files =)
@author: Taras Dovgal (twitter @TarasDovgal)
@link: http://github.com/doxadoxa
*/
(function($){
	var defaults = { 
		'fClass' : "file-dropper", 
		'fullLoadMessage' : "Перетащите файл сюда<br> или нажмите, чтобы прикрепить",
		'partLoadMessage' : "Нажмите, чтобы прикрепить файл",
		'loadScript' : "/ajax/upload.php",
		'ajax' : true
	};
	var options;	

	//TODO load files via AJAX
	var fileLoad = function( file ) {
		//vanilla js start
		var xhr = new XMLHttpRequest();
		/*xhr.upload.onprogress = function(e) {
		    var percent = (e.position/ e.totalSize);
		    // Render a pretty progress bar
		};*/
		xhr.onreadystatechange = function(e) {
		    if(this.readyState === 4) {
		        console.log(xhr.responseText);
		    }
		};
		xhr.open('POST', options['loadScript'], true);
		//xhr.setRequestHeader('X-FILE-NAME', file.name); // Pass the filename along
		console.log(file);
		xhr.send(file);
		
	}	

	$.fn.filefy = function( params ) {
		options = $.extend({}, defaults, options, params);

		var $input = $(this);

		var test = $input
					.hide()
					.before("<div class='" + options['fClass'] + "'></div>");

		var $fZone = $( $(this).prev("div." + options['fClass'] ) );

		if (typeof(window.FileReader) == 'undefined' || !options['ajax']) {
		    $fZone.html( options['partLoadMessage'] );
		} else {
			$fZone.html( options['fullLoadMessage'] );

			$fZone[0].ondragover = function() {
				$fZone.addClass('hover');
				return false;
			}

			$fZone[0].ondragleave = function() {
				$fZone.removeClass('hover');
				return false;
			}

			$fZone[0].ondrop = function() {
			    event.preventDefault();

			    var file = event.dataTransfer.files[0];

			    $fZone
			    	.removeClass('hover')
			    	.addClass('drop')
			    	.html(file.name);

			    if( options['ajax'] ) 
			    	fileLoad(file);
			}
		}

		$fZone.on('click', function() {
			$input.click().bind( 'change', function( evt ) {
                var str = $(this).val();

                if( str.length < 2 ) {
                	$fZone.html( options['ajax'] ? options['fullLoadMessage'] : options['partLoadMessage'] );
                	return;
                }

                str = str.split("\\");
                str = str.pop();

                $fZone.html( str );

                if( options['ajax'] ) {
                	var file = evt.target.files[0]; 
            		fileLoad(file);
            	}
             
            });
		});

	};
})(jQuery);