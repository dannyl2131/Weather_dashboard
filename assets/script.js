let query = $("#query")
let cBody = $(".card-body")

let i=0



$("#submit").click(function(){
    fetch("http://api.openweathermap.org/data/2.5/forecast?q=" + query.val() + "&units=imperial&appid=7cfd96e09578686d48a4d422e2ebfb44")
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        let dataList = $(data)
        dataList.each(function(){
            console.log(dataList)
        })
    })
})


    