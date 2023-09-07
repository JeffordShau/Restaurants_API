// html interaction variables
const searchForm = document.getElementById("form");
const validate = document.getElementById("validator");
const collapse = document.getElementsByClassName("collapsible");
const open_btn = document.getElementsByClassName("open_btn");
const rating_btn = document.getElementsByClassName("rating_btn");
const distance_btn = document.getElementsByClassName("distance_btn");
const price_btn = document.getElementsByClassName("price_btn");
var counter = 0;

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
    else if (distance * 1609 > 40000) {
        document.getElementById("validator").innerHTML = "Max Distance 24 Miles!";
    }
    else {
        document.getElementById("validator").innerHTML = "";
        buildRequest(cuisine, location, distance);
    }
});

// build Yelp API request
function buildRequest(cuisine, location, distance) {
    const displayBlock = document.getElementById("display_results");

    console.log("Test", cuisine);
    console.log("Test", location);
    const cuisineValue = String(cuisine).trim().split(" ").join("+");
    const locationValue = String(location).trim().split(" ").join("+");
    distance = Math.round(distance * 1609);

    var url = "https://glacial-thicket-42400-4c2c3934b324.herokuapp.com/https://api.yelp.com/v3/businesses/search?=";
    url += "&location=" + locationValue;
    url += "&term=" + cuisineValue;
    url += "&radius=" + distance;
    url += "&categories=" + "restaurants";
    
    console.log(url);

    fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer JaBY_6GsL-UILJE5pMp__He_JwlWELzL6TmSUsi2Ht_LZNMeB2liTBIKvKSvSWbn9c0Mzp_nt5cRnXJW8VdpNPsYhBF56cIGY7Ry7WryHShJyyAbgd5hpxgK5f3eZHYx",
            // "Access-Control-Allow-Origin": "*",
            "Origin": "https://api.yelp.com/v3/",
            // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS",
            // "Access-Control-Allow-Headers": "Content-Type, Authorization, Content-Length, X-Requested-With, Accept",
            // "Access-Control-Allow-Credentials": "true",
        },
    })
        .then((result) => result.json())
        .then((data) =>  {
            console.log(data);
            validate.innerHTML = data["businesses"].length + " Results Found!";
            displayBlock.innerText = "";
            data["businesses"].forEach(business => {
                let row = document.createElement("tr");
                
                // create cells for each piece of data
                let c1 = row.insertCell(0);
                let c2 = row.insertCell(1);

                // add image to c1
                let img = document.createElement("img");
                img.style.height = "250px";
                img.style.width = "250px";
                img.src = business.image_url;
                c2.appendChild(img);

                // add data to c2
                let distance_mi = Math.round(10 * (business.distance / 1609.34)) / 10;
                let open_status;
                if (business.is_closed) {
                    open_status = "Yes";
                }
                else {
                    open_status = "No";
                }
                var buildString = "";
                buildString += "Business: " + business.name + "\n";
                buildString += "Location: " + business.location.display_address + "\n";
                buildString += "Distance: " + distance_mi + " miles\n";
                buildString += "Price: " + business.price + "\n";
                buildString += "Phone: " + business.display_phone + "\n";
                buildString += "Rating: " + business.rating + " stars from " + business.review_count + " customers\n";
                buildString += "Open Status: " + open_status + "\n";

                c1.innerText = buildString;
                console.log(buildString);

                // add cells to row
                row.appendChild(c1);
                row.appendChild(c2);

                // add row to table
                displayBlock.appendChild(row);

                counter += 1;
            });
        });
    if (counter > 0) {
        displayBlock.scrollIntoView();
    }
    counter = 0;
}