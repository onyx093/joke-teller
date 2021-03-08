const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

const jokesAPI_URL = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';

//Disable or Enable Button
function toggleButton(){
    button.disabled = !button.disabled;
}

//Passing jokes to VoiceRSS API
function tellMe(joke){
    VoiceRSS.speech({
        key: 'baccc4f0415c4a2e9df496818435e6b5',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get jokes from Joke API
async function getJokes(){
    let joke = '';
    try {
        const response = await fetch(jokesAPI_URL);
        const data  = await response.json();
        if(data.setup){
            joke = `${data.setup} ... ${data.delivery}`;
        }else{
            joke = data.joke;
        }
        // Text to speech
        tellMe(joke);
        //Disable button
        toggleButton();
    } catch (error) {
        // Errors go here
    }
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);