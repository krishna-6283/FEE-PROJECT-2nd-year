const apiKey = "92fa563a885cfe2c24ec14f2ac6254dd";
const baseUrl = "https://api.themoviedb.org/3";
const languageCode = "en";
const languageCode1 = "hi";
const baseImageUrl = "https://image.tmdb.org/t/p/w500";

const url = `${baseUrl}/discover/movie?api_key=${apiKey}&with_original_language=${languageCode}`;
const url1 = `${baseUrl}/discover/movie?api_key=${apiKey}&with_original_language=${languageCode1}`;
const url2 = `${baseUrl}/movie/now_playing?api_key=${apiKey}&language=${languageCode}`;
const url3 = `${baseUrl}/movie/top_rated?api_key=${apiKey}&language=${languageCode1}`;

const gen = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western"
   
};

const urlParams = new URLSearchParams(window.location.search);
const userEmail = urlParams.get('email');

// Extract characters before the "@" symbol
const userName = userEmail.substring(0, userEmail.indexOf('@'));

// Display the extracted characters on the page
document.getElementById('hlo').textContent = 'Welcome, ' + userName ;



async function search() {
    const res = await fetch(url);
    const data = await res.json();
    
    for (let i = 0; i < 4; i++) {
        document.getElementById(`img${i + 1}`).src = baseImageUrl + data.results[i].backdrop_path;
        document.getElementById(`t${i + 1}`).innerText = data.results[i].title;
        document.getElementById(`x${i+1}`).innerText = parseFloat(data.results[i].vote_average).toFixed(1);
        for (let j = 0; j < 2; j++) {
            const genid = data.results[i].genre_ids[j];
            const genname = gen[genid] || "Drama"; // Ensure "Drama" is enclosed in quotes
            document.getElementById(`but${i}${j}`).innerText = genname; // Concatenate i and j properly
        }
    }
}



async function recommended() {
    const res = await fetch(url1);
    const data = await res.json();
    for (let i = 0; i < 8; i++) {
        document.getElementById(`img${i + 1 + 10}`).src = baseImageUrl + data.results[i].poster_path;
        document.getElementById(`r${i+1}`).innerText=parseFloat(data.results[i].vote_average).toFixed(1);
        document.getElementById(`n${i+1}`).innerText=`${i+1}.`+data.results[i].title;

    }
}

async function newrelease() {
    const res = await fetch(url2);
    const data = await res.json();

    details(data.results[1]);
    for (let i = 0; i < 8; i++) {
        const moviedata = data.results[i];
        // Incrementing the image IDs by 22 to avoid conflicting with existing IDs
        document.getElementById(`img${i + 1 + 22}`).src = baseImageUrl + moviedata.poster_path;
        document.getElementById(`img${i + 1 + 22}`).addEventListener('click', () => {
            console.log(moviedata)
            details(moviedata);
        });
        document.getElementById(`r${i+1+10}`).innerText=parseFloat(data.results[i].vote_average).toFixed(1);
        document.getElementById(`n${i+1+10}`).innerText=`${i+1}.`+data.results[i].title;
        
    }
}





function details(moviedata) {
    // Setting the source of the 'im' image to the backdrop path of the movie
    document.getElementById("im").src = baseImageUrl + moviedata.backdrop_path;
    document.getElementById('b1').innerText=moviedata.title;
    document.getElementById('b2').innerText=moviedata.overview;

    
    for (let i = 0; i < 2; i++) {
        const genreId = moviedata.genre_ids[i];
        const genreName = gen[genreId]||"Drama"; // Look up genre name from the gen object using the genre ID
        document.getElementById(`btn${i}`).innerHTML = genreName;
    }
    document.getElementById('b4').innerText = parseFloat(moviedata.vote_average).toFixed(1);
    document.getElementById('b5').innerText=`Release Date: ${moviedata.release_date}`;


    }

    






async function topRated() {
    const res = await fetch(url3);
    const data = await res.json();
    for (let i = 0; i < 8; i++) {
        document.getElementById(`img${i + 1 + 34}`).src = baseImageUrl + data.results[i].backdrop_path;
        document.getElementById(`r${i+1+20}`).innerText=parseFloat(data.results[i].vote_average).toFixed(1);
        document.getElementById(`n${i+1+20}`).innerText=`${i+1}.`+data.results[i].title;
        
    }
}






search();
recommended();
newrelease();
topRated();

