In order to execute this script : 
Steps to be followed : 
- First extract the zipped folder.
- move to the username-scraper folder
- with the help of command line hit `npm i` (make sure npm is installed in your system)
- Check `feeding-data.json` file inside `cypress/fixtures` folder.
- Check username and password. Change it incase want to login with other credential
- In order to search for specific category, change the valid `searchCategory` property value
- now, move to root folder of project and you will find `package.json`
- for visual execution hit `npm run open` in command line and select `scrape-username.spec.js` file from open window.
- for executing in headless mode hit `npm run execute` in command line.

Output : 
- inside `cypress/downloads` folder you will find `date-month-hour-minute.xlsx` file which contains
extracted username of instagram.
