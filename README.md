#
Gist Manager

##
After cloning project, you must run in Terminal:
  npm install
  browser install
  create an .env file with your private settings

To run in Terminal: env $(cat .env | xargs) nodemon server.js \n
  "| xargs" pipes all lines in .env into 1 line to pass to nodemon; \n
  .env cannot contain any comments, else it will not run!
