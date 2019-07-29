# OneC-Enterprise

Enterprise platform for monitoing devices and reporting. 

API Routes

List Devices	
GET 	/api/v1/devices
	
Device Check In	
POST	/api/v1/devices/checkin
Arguments	
pcname	String, Required
ipaddress	String, Required
macaddress	String, Required
status	String, Required
timestamp	String, Required
	
Retrieve a Device	
GET	/api/v1/devices/<id>
Arguments	
id (Unique identifier for the object)	String, Required
	
Update a Device	
PUT	/api/v1/devices/<id>
Arguments	
pcname	String, Required
ipaddress	String, Required
macaddress	String, Required
status	String, Required
timestamp	String, Required
	
Delete a Post	
DELETE	/api/v1/devices/<id>
Argument	
id (Unique identifier for the object)	String, Required


Request Auth Token	
POST	/api/v1/auth/login
	
Argument#	
email	String, Required
password	String, Required
	
	
Header Argument on every Request.	
Authorization	bearer <Token Key>