// html interaction variables
const food_type = document.getElementById("food");
const location = document.getElementById("location");

const validate = document.getElementById("validator");

const result_text = docuemnt.getElementById("hidden_results_text");
const filter_btn = document.getElementById("filter_btn");

const results = document.querySelector(".table_results");

// receive user input


// Yelp Fusion API data and format
const apiData = {
    url: 
    lan:
    apiK: "JaBY_6GsL-UILJE5pMp__He_JwlWELzL6TmSUsi2Ht_LZNMeB2liTBIKvKSvSWbn9c0Mzp_nt5cRnXJW8VdpNPsYhBF56cIGY7Ry7WryHShJyyAbgd5hpxgK5f3eZHYx"
}

// build Yelp API request
var request = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?";
    // request += location;
    // request += "&term=" + searchInput;
    // request += "&limit=" + 5;
    // request += "&open_now=" + open;
    // request += "&radius=" + distance;
    // request += "&price=" + price;
    // request += "&categories=" + "restaurants";

// useful website
// https://medium.com/@zarinabliss/using-the-yelp-fusion-api-part-1-73d0259c705d