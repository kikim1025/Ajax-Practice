const clear = function() {
    $("#results").empty();
}

const displayArticle = function(e) {
    e.preventDefault();
    const URL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=bccea3c2aaa1417790728926205111bc`;
    let searchTerm = $("#keyword").val();
    const page = "&page=0";
    const numberOutput = $("#numRecord").val(); //Max num is 10
    let startYear = $("#startYear").val(); 
    let endYear = $("#endYear").val();
    if (searchTerm && (0 < numberOutput)) {
        if (startYear !== "" && endYear !== "" && (+startYear > +endYear)) {
            alert("Error: Start year is higher than end year");
        } else {
            searchTerm = "&q=" + searchTerm;
            if (startYear !== "") {
                startYear = "&begin_date=" + startYear+ "0101";
            } 
            if (endYear !== "") {
                endYear = "&end_date=" + endYear + "1231";
            }
            const queryURL = URL + searchTerm + page + startYear + endYear;
            console.log(queryURL)
            $.ajax({
                url: queryURL,
                method: 'GET'
            }).then(function(response) {
                clear();
                const docs = response.response.docs;
                let str = ""
                for (let i = 0; i < numberOutput; i++) {
                    console.log(docs[i].headline.main);
                    str += `<p>${docs[i].headline.main}</p>`;
                }
                $("#results").html(str);
            })
        }
    } else {
        alert("Error: Invalid Input!");
    }
}    

$("#search").on("click", displayArticle);
$("#clear").on("click", clear);