//create url variable 
const rootURL = `https://api.github.com/users/`;

//function to fetch repos from API 
function getRepos(user) {
    //create string combining rooturl and userinput 
    const url = rootURL + user + "/repos";
    //test url
    console.log(url);
    //fetch url from API
    fetch(url)
    .then (response => {
        //verify response has no error
        if (response.ok) {
            return response.json();
        } throw new Error (response.statusText);
    })
    .then (responseJson => displayResults(responseJson))
    .catch (err => {
        $('#results').empty();
        $('#jsErrorMessage').text(`User Handle ${err.message}`)
    });
}


//function to display results
function displayResults(responseJson) {
    console.log(responseJson);
    $('#jsErrorMessage').empty();
    $('#results').empty();
    for (let i=0; i < responseJson.length; i++) {
        $('#results').append(`<li><h2><a href="${responseJson[i].html_url}">${responseJson[i].name}</a></h2></li>`)
    }
    $("#results").removeClass("hidden");
}


//listen for Form submit 
function watchForm() {
    $('form').submit(event => {
        //prevent event default 
        event.preventDefault();
        //store user search input in a variable
        let userHandle = $('#userInput').val();
        //test userHandle value
        console.log(userHandle);
        //run get repos function 
        getRepos(userHandle);
    });
};


//listen for watchForm function
$(watchForm);