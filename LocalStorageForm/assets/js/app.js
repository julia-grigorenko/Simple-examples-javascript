// Variables--------------------------------------------------------------------
const tweetList = document.getElementById('tweet-list');

// Event Listeners--------------------------------------------------------------

function eventListeners() {
  // Form submission
  document.querySelector('#form').addEventListener('submit', newTweet);

  // Remove tweet from the list
  tweetList.addEventListener('click', removeTweet);

  // Load tweets from localStorage when page is loaded or reloaded
  document.addEventListener('DOMContentLoaded', localStorageOnLoad);
}

// Functions--------------------------------------------------------------------
function newTweet(e) {
  let tweet;

  e.preventDefault();

  // Read the textarea value
  tweet=  document.querySelector('#tweet').value;

  // Add tweets to tweetlist
  addTweetToTweetList(tweet);

  // Add tweets to localStorage
  addTweetLocalStorage(tweet);

  document.querySelector('#tweet').value = '';
}


function addTweetToTweetList (tweet){
  // Create remove button
  const removeBtn = document.createElement('a');
  removeBtn.classList = 'remove-tweet';
  removeBtn.textContent = 'X';

  // Create  <li>
  const li = document.createElement('li');
  li.textContent = tweet;

  // Add the remove button to each tweet
  li.appendChild(removeBtn);

  // Add to the list
  tweetList.appendChild(li);
}

// Remove tweet from DOM and from localStoage
function removeTweet(e){
  let tweet, tweetsLS, id;

  if(e.target.classList.contains('remove-tweet')) {
    e.target.parentElement.remove();

    tweet = e.target.parentElement.textContent;
    tweet = tweet.substring(0, tweet.length-1);
    tweetsLS = getTweetsFromStorage();


    tweetsLS.forEach(function(cur, index) {
      if (tweet === cur){
        tweetsLS.splice(index,1);
      }
    });

    addTweetLocalStorage (tweetsLS);
  }
}

// Add tweets to localStorage
function addTweetLocalStorage (tweet) {
  let tweets;

  if(!(Array.isArray(tweet))) {
     tweets = getTweetsFromStorage();

    // Add tweet into the array
    tweets.push(tweet);
  } else {
    tweets = tweet;
  }

  // Convert twwet array into the string and pass it to localStorage
  localStorage.setItem('tweets', JSON.stringify(tweets));
}

function getTweetsFromStorage() {
  let tweets;
  const tweetsLS = localStorage.getItem('tweets');

  // Get values fom storage, if null is returned, we create an empty array
  if( tweetsLS === null){
    tweets = [];
  } else {
    tweets = JSON.parse(tweetsLS);
  }

  return tweets;
}

//Prints localStorage tweets on load
function localStorageOnLoad() {
  let tweets = getTweetsFromStorage();
  //Loop throught storage and then print the values
  tweets.forEach(function(el){
    addTweetToTweetList(el)
  });
}

// Init app---------------------------------------------------------------------
eventListeners();
