const path = require('path');
const express = require('express'); // node style import
const app = express(); //create new instance
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000; //heroku sets this PORT value
console.log('PORT: ', process.env.PORT);
console.log('ACTUAL PORT: ', port);

// where files live
// what port to listen on

app.use(express.static(publicPath)); //serve up all assets from public directory

// hey! if what the person requested is not in the public folder, just give them back index.html
// func to run when a get request is made. match all unmatched routes
// request object contains info about the request
// response object allows us to manipulate the
// this is all express stuff
app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
    console.log('heroku server is up');
});