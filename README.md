# The Venue
Argue with your friends and complete strangers about the music you love

## 💡 Table of Contents

- [Description](#description-id)
- [Installation](#installation-id)
- [Usage](#usage-id)
- [Contributing](#contributing-id)
- [Links](#links-id)
- [Questions](#questions-id)

## <a id="description-id"></a>Description
'The Venue' is a music blog website created to discover, save, share, and socialize about music. Using the *Spotify Web API* (see [Links](#links-id) below for documentation) and embedded HTML *iframes*, we are able to grab music artists top tracks, a single song, or a Spotify playlist which users can search for in our 'Back Stage' section (see [Site Page Descriptions](#site-descriptions-id) directly below). After signing up and logging in through our 'Security Check' page, users have the option to hit the 'Back Stage' page and discover new music, share it to the 'Main Stage' page or their 'Groupie' account, and comment on posts with other users.</br>

<a id="site-descriptions-id"></a><u>Site Page Descriptions:</u></br></br>
*Security Check*</br>
To get into the site, you must get by the bouncer by signing up and logging in</br></br>
*The Main Stage*</br>
Where all your music is shared via search in The Back Stage. Users can comment on these posts and posts are saved onto your Main Stage until you delete them</br></br>
*The Back Stage*</br>
Where you can search for music in 3 different ways; by artist name (returns top 10 tracks), song name, or by Spotify playlist name</br></br>
*Groupie Account*</br>
User account where you can see, update, and delete your posts</br></br>
   
## <a id="installation-id"></a>Installation
To use this application, you must download node.js onto your local machine. You will also need VSCode, Express.js, mySQL, Sequelize, and a copy of our code (see [Links](#links-id) below). Please visit our [Installation Links](#installation-links-id) section below as well for help downloading any of these technologies.</br>

For help on seeding the database, please follow these instructions:
- Confirm you are connected to MySQL by running the command `mysql -u root -p` 
- In the terminal run the command `source db/schema.sql`
- In the terminal run the command `USE thevenue_db;`
- In the terminal run the command `Select database();` to confirm you are connected to the venue database
- Navigate back to node in the terminal and run the command  `npm run seed`
- Once complete run the command `npm run start` to connect to the database
    
## <a id="usage-id"></a>Usage
Upon arriving to the site (see [Website Link](#website-links-id) below), you will see a login/signup page. Once logged in, you can visit the Main Stage, where all your posts are saved and displayed, the Back Stage, where you can search for new music, or your Groupie account, where you can see and edit your posts.

 When visiting the Back Stage, use the drop down menu to select how you'd like to search for music. There are three different ways to search: by an artist for their top tracks, a single song, or a Spotify playlist. Search in its respective input field and click the 'Get' button. The results should appear in the form of a Spotify 'mini player' in which you can preview any song by simply clicking the provided play button. You then have the option to create a post with a 'Title' and 'Content' and share it to the Main Stage by clicking the 'Share' button. At the Main Stage, you can click on your post and comment on it with other users.
    
## <a id="contributing-id"></a>Contributing
This application was created by three bright & fine young developers:
- <a href="https://github.com/lynnadelesadler">@lynnadelesadler</a></br>
- <a href="https://github.com/MikeWebPrint">@MikeWebPrint</a></br>
- <a href="https://github.com/scottsc0de">@scottsc0de</a>
    
## <a id="links-id"></a>Links
<a id="website-links-id"></a>**Website Link**: https://the-venue.herokuapp.com/</br>
GitHub Repo: https://github.com/ScottsC0de/the-venue</br></br>
**Spotify Web API**: https://developer.spotify.com/documentation/web-api/</br>
HTML iframe Information: https://www.w3schools.com/html/html_iframe.asp</br></br>

<u><a id="installation-links-id"></a>**Installation Links**:</br></u>
Node.js: https://nodejs.org/en/</br>
VSCode: https://code.visualstudio.com/download</br>
Express.js: https://expressjs.com</br>
mySQL: https://www.mysql.com/downloads</br>
Sequelize: https://www.npmjs.com/package/sequelize</br>

## <a id="questions-id"></a>Questions
Hit any of us with an email for questions!</br>
**lynnadelesadler@yahoo.com**</br>
**mikewebprint@gmail.com**</br>
**Scott5902@gmail.com**

