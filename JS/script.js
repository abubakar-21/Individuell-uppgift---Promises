// import axios from '../node_modules/axios';
// const axios = require('axios');

function getBackgroundImage() {
    return axios.get('https://api.unsplash.com/photos/random', {
        headers: {
            'Authorization': 'Client-ID SlNq2mfhlVnNOMVOhErMy11b97SKlZ5lz7ClAAmaZf4'
        }
    })
    .then(response => {
        var photographer = response.data.user.name;
        var imageUrl = response.data.urls.regular;
        // console.log(photographer);
        return {photographer, imageUrl};
    })
    .catch(error => {
        console.log(error);
    });
}

getBackgroundImage()
    .then(data => {
        document.body.style.backgroundImage = `url(${data.imageUrl})`;
        document.getElementById("credit").innerHTML = `Photo by: ${data.photographer}`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundRepeat = 'no-repeat';
        
    })
    .catch(error => {
        console.log(error);
    });


function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(position => {
            resolve(position);
        }, error => {
            reject(error);
        });
    });
}

// console.log(getCurrentPosition());

function getWeatherByPosition() {
    return new Promise((resolve, reject) => {
        getCurrentPosition()
        .then(position => {
            axios.get('https://api.openweathermap.org/data/2.5/weather', {
                params: {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                    appid: '8455cb9d4367302b7740ec570f08cb1e'
                }
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
                console.log(error);
            });
        })
        .catch(error => {
            reject(error);
        });
    });
}


getWeatherByPosition()
.then(data => {
    var temperature = data.main.temp;
    var location = data.name;
    var weather = data.weather[0].main;
    var weatherIcon = data.weather[0].icon;
    var weatherUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
    document.getElementById("temperature").innerHTML = Math.floor(temperature - 273.15);
    document.getElementById("location").innerHTML = location;
    document.getElementById("weather").innerHTML = weather;
    document.getElementById("weather-icon").src = weatherUrl;
})
.catch(error => {
    console.log(error);
    document.getElementById("weather").innerHTML = "Tyvärr, väderinformation är för närvarande inte tillgänglig";
});


function getCurrentTime() {
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();
    var day = currentTime.getDate();
    var month = currentTime.getMonth() + 1;
    var year = currentTime.getFullYear();
    var time = `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
    return time;
}

var timeDiv = document.getElementById("time");
var dateDiv = document.getElementById("date");
setInterval(function() {
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();
    var day = currentTime.getDate();
    var month = currentTime.getMonth() + 1;
    var year = currentTime.getFullYear();
    var time = `${hours}:${minutes}:${seconds}`;
    var date = `${day}/${month}/${year}`;
    timeDiv.innerHTML = time;
    dateDiv.innerHTML = date;
}, 1000);



function getBitcoinPrice() {
    return axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
        .then(response => {
            var bitcoinPrice = response.data.bpi.USD.rate;
            return bitcoinPrice;
        })
        .catch(error => {
            console.log(error);
        });
}


getBitcoinPrice()
    .then(price => {
        document.getElementById("bitcoin-price").innerHTML = `Bitcoin Price: ${price} USD`;
    })
    .catch(error => {
        console.log(error);
        document.getElementById("bitcoin-price").innerHTML = "Tyvärr, bitcoin information är för närvarande inte tillgänglig";
    });




    function getNews() {
        return axios.get('https://newsapi.org/v2/top-headlines?sources=cnn&apiKey=db2de95fcec6402199d3bfa8953c38f1')
            .then(response => {
                var news = response.data.articles;
                var headlines = "";
                for (var i = 0; i < news.length; i++) {
                    headlines += `<li><a href="${news[i].url}" target="_blank">${news[i].title}</a></li>`;
                }
                return headlines;
            })
            .catch(error => {
                console.log(error);
                document.getElementById("news").innerHTML = "Tyvärr, nyheterna är för närvarande inte tillgänglig";
            });
    }

    
    getNews()
    .then(headlines => {
        document.getElementById("news").innerHTML = headlines;
    })
    .catch(error => {
        console.log(error);
        // document.getElementById("news").innerHTML = "Tyvärr, nyheterna är för närvarande inte tillgänglig";
    });
