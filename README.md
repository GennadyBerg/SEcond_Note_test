
Instruction for change for the start for developers:
start with indexedDB :

set REACT_APP_USE_DB_CMD=indexeddb
npm start

start with QuintaDB  :

set REACT_APP_USE_DB_CMD=quintadb
npm start
Instruction for change for the deploy  build for USERS:
to set defaut DB :
change parameter REACT_APP_USE_DB to one of the variants : indexeddb or quintadb -  in the /.env file
new production build :
npm run build
serve -s build

Best Regards