let query = $("#query")
let cBody = $(".card-body")
let weather = $("#weather")
let preset = $(".preset")
let current = $("#current")
let search = $("#search")

let createFavorite = function(param){
    localStorage.setItem(param, param)
}

// let loadFavorites = function(param){
//     for(let i = 0; i < localStorage.length; i++){
//         let favorite = document.createElement("a")
//         favorite.classList.add("btn")
//         favorite.classList.add("btn-secondary")
//         favorite.classList.add("col-12")
//         favorite.classList.add("m-3")
//         favorite.classList.add("preset")
//         let localKey = JSON.stringify(localStorage.getItem(param))
//         favorite.innerHTML = param
//         $(favorite).attr(param)
//         search.append($(favorite));
//         favorite.click(presetSearch)
//     }
// }

$("#submit").click(function(){
    weatherSearch(query.val());
    // createFavorite(query.val())
})

preset.click(function(){
    let text = $(this).attr("id")
    weatherSearch(text)
})

function weatherSearch(param){
    weather.empty()
    current.empty()
    
    if(param != ""){fetch("http://api.openweathermap.org/data/2.5/forecast?q=" + param + "&units=imperial&appid=7cfd96e09578686d48a4d422e2ebfb44")
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        let dataList = $(data)
        let first = dataList[0].list.slice(0,1)
        let nextFive = []
        for(let i = 7; i < 40; i+=8){
            nextFive.push(dataList[0].list[i])
        }
        nextFive.forEach(function(item){
            let unixTimestamp = item.dt
            let milliseconds = unixTimestamp * 1000
            let dateObject = new Date(milliseconds)
            let div0 = document.createElement("div")
            let div1 = document.createElement("div")
            let h5 = document.createElement("h5")
            let p1 = document.createElement("p")
            let p2 = document.createElement("p")
            let p3 = document.createElement("p")
            let i = document.createElement("i")
            div0.classList.add("card")
            div0.classList.add("col")
            div1.classList.add("card-body")
            h5.classList.add("card-title")
            p1.classList.add("card-text")
            p2.classList.add("card-text")
            p3.classList.add("card-text")
            
            weather.append(div0)
            div0.append(div1)
            div1.append(i)
            div1.append(h5)
            div1.append(p1)
            div1.append(p2)
            div1.append(p3)
            
            h5.innerHTML = dateObject.toLocaleDateString()
            p1.innerHTML = "Temp: " + item.main.temp + "F"
            p2.innerHTML = "Wind: " + item.wind.speed + "MPH"
            p3.innerHTML = "Humidity: " + item.main.humidity + "%"
            i.innerHTML = "<img src=https://openweathermap.org/img/wn/" + item.weather[0].icon + "@2x.png>" 
        });
        first.forEach(function(item){
            let unixTimestamp = item.dt
            let milliseconds = unixTimestamp * 1000
            let dateObject = new Date(milliseconds)
            let icon = document.createElement("i")
            let date = document.createElement("h2")
            let temp = document.createElement("p")
            let wind = document.createElement("p")
            let humidity = document.createElement("p")
            let jumbo = document.createElement("div")
            let container = document.createElement("div")
            jumbo.classList.add("p-5")
            jumbo.classList.add("mb-4")
            jumbo.classList.add("rounded-3")
            container.classList.add("container-fluid")
            container.classList.add("py-5")
            date.classList.add("display-5")
            date.classList.add("fw-bold")
            temp.classList.add("col-md-8")
            temp.classList.add("fs-4")
            wind.classList.add("col-md-8")
            wind.classList.add("fs-4")
            humidity.classList.add("col-md-8")
            humidity.classList.add("fs-4")
            date.innerHTML = param + ": " + dateObject.toLocaleDateString()
            temp.innerHTML = "Temp: " + item.main.temp + "F"
            wind.innerHTML = "Wind: " + item.wind.speed + "MPH"
            humidity.innerHTML = "Humidity: " + item.main.humidity + "%"
            icon.innerHTML = "<img src=https://openweathermap.org/img/wn/" + item.weather[0].icon + "@4x.png>"
            current.append(jumbo)
            jumbo.append(container)
            container.append(icon)
            container.append(date)
            container.append(temp)
            container.append(wind)
            container.append(humidity)
            
        })
    })}
}


