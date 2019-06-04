# API 
Ver 4.3.0

## Rutas
A continuación se mostrarán las rutas y como usarlas.

### /auth
Estas son las rutas de implementación de la ruta auth para autenticar usuarios.

TIPO | RUTA | Descripción
---- | ---- | -----------
POST | /auth | Obtiene token de autenticación, esta requiere BODY {uid: <UID>}

### /gen_cult
Estas son las rutas de implementación de la ruta gen_cult para los autenticadores de cultura.

TIPO | RUTA | Descripción
---- | ---- | -----------
GET | /gen_cult | Obtiene los datos de todos los generadores de cultura, requiere HEADER "Authentication" : "bearer <TOKEN>"
GET | /gen_cult/loc | Obtiene los datos de todos los generadores de cultura, requiere HEADER "Authentication" : "bearer <TOKEN>"
GET | /gen_cult/my | Obtiene los datos del generador de cultura en el token, requiere HEADER "Authentication" : "bearer <TOKEN>"
GET | /gen_cult/my/premio | Obtiene los premios del generador de cultura en el token, requiere HEADER "Authentication" : "bearer <TOKEN>"
GET | /gen_cult/my/datos | Obtiene los datos del generador de cultura en el token, requiere HEADER "Authentication" : "bearer <TOKEN>"
POST | /gen_cult | crea un nuevo generador de cultura, requiere HEADER "Authentication" : "bearer <TOKEN>", BODY {"datos": "<JSON>","local":<JSON>}
PUT | /gen_cult/my/premio | crea un nuevo  premio del generador de cultura, requiere HEADER "Authentication" : "bearer <TOKEN>", BODY {premio: {"descripcion": "<Descrip>","puntos":<JSON>}}
DELETE | /gen_cult/premio | crea un nuevo  premio del generador de cultura, requiere HEADER "Authentication" : "bearer <TOKEN>", BODY {"premio_id" : <PREMIO_ID>}

### /puntos

Estas son las rutas de implementación de la ruta puntos para los generadores de cultura.

TIPO | RUTA | Descripción
---- | ---- | -----------
GET | /puntos | Obtiene los datos de los puntos del generador de cultura pasado por TOKEN, requiere HEADER "Authentication" : "bearer <TOKEN>"

### /user

Estas son las rutas de implementación de la ruta user para los usuarios.

TIPO | RUTA | Descripción
---- | ---- | -----------
GET | /user | Obtiene los datos de todos los usuarios, requiere HEADER "Authentication" : "bearer <TOKEN>"
GET | /user/my | Obtiene los datos del usuario en el token, requiere HEADER "Authentication" : "bearer <TOKEN>"
POST | /user | crea un nuevo usuario, requiere HEADER "Authentication" : "bearer <TOKEN>", BODY {"data": "<JSON>"}