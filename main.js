// html interaction variables
const searchForm = document.getElementById("form");
const validate = document.getElementById("validator");

// store restaurant data
var businessName = [];
var imgUrl = [];
var url = [];
var address = [];
var rating = [];
var price = [];
var distance = [];

// receive user input
searchForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const cuisine = document.getElementById("cuisine").value;
    const location = document.getElementById("location").value;
    const distance = document.getElementById("distance").value;
    console.log("Cuisine: ", cuisine);
    console.log("Location: ", location);
    console.log("Distance (mi): ", distance);

    if (cuisine == null || location == null || distance == null) {
        document.getElementById("validator").innerHTML = 
            "Missing Input!";
    }
    else {
        document.getElementById("validator").innerHTML = "";
        buildRequest(cuisine, location, distance);
    }
});

// build Yelp API request
function buildRequest(cuisine, location, distance) {
    console.log("Test", cuisine);
    console.log("Test", location);
    const cuisineValue = String(cuisine).split(" ").join("+");
    const locationValue = String(location).split(" ").join("+");

    var url = "https://api.yelp.com/v3/businesses/search?";
    url += "&location=" + locationValue;
    url += "&term=" + cuisineValue;
    url += "&radius=" + distance;
    url += "&categories=" + "restaurants";
    url += "$limit=50&offset=50";
    
    console.log(url);

    // fetch(url, {
    //     headers: {
    //         "Content-Type": "application/json",
    //         "Authorization": "Bearer JaBY_6GsL-UILJE5pMp__He_JwlWELzL6TmSUsi2Ht_LZNMeB2liTBIKvKSvSWbn9c0Mzp_nt5cRnXJW8VdpNPsYhBF56cIGY7Ry7WryHShJyyAbgd5hpxgK5f3eZHYx",
    //         "Access-Control-Allow-Origin":"*",
    //     },
    // })
    //     .then((result) => result.json())
    //     .then((data) =>  {
    //         data.businesses.forEach((business) => {
    //             console.log(business);

    //             businessName.push(business.name);
    //             url.push(business.url);

    //             if (business.image_url == undefined) imgUrl.push("N/A");
    //             else imgUrl.push(business.image_url);
                
    //             if (business.distance == undefined) distance.push("N/A");
    //             else distance.push(business.distance);

    //             if (business.price == undefined) price.push("N/A");
    //             else price.push(business.price);

    //             if (business.rating == undefined) rating.push("N/A");
    //             else rating.push(business.rating);


    //         })
    //     })
    
}


const result_text = document.getElementById("hidden_results_text");
const filter_btn = document.getElementById("filter_btn");

const results = document.getElementById("table_results");