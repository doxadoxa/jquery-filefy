jquery-filefy
=============

jQuery plugin for styling and drag&amp;drop file input

##1. Plugin use
```html
<input type="file" id="fileSend">
<script>
	$("#fileSend").filefy();
</script>
```

##2. Options
Options pass as object in method filefy. Ex:

```html
$("#fileSend").filefy({'fClass' : "file-zone", 'ajax' : false});
```

###Exist options:

####fClass
Class for file zone div

####fullLoadMessage
Message view when full (drag&drop and click) mode adding file enable

####partLoadMessage
Mesage view when part mode (only click) enable

####loadScript
Link to script which load via AJAX.
		
####ajax
Use AJAX to load
