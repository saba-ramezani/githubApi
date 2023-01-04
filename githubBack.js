/*This function reads the username value and checks if it already exists in the localstorage, if it does exist, then it skips the sending request phase
and updates the output boxes with the user info loaded from the storage;
if it does not exist, it calls the sendRequest function. */
function checkLocalStorage() {
    var userName = document.getElementById("userName").value;
    var userInfo = localStorage.getItem(userName);
    if (userInfo != null) {
        userInfo = JSON.parse(userInfo)
        updateInfo(userInfo);
        console.log(userInfo);
    } else {
        sendRequest(userName);
    }
}


/*This function creates a url with the username, sends the requeat and waits for the response,
after getting the response, it first converts it to json format and then checks if the login attribute is null in the reponse or not,
if it is not, then it saves the user info in local storage and then calls the updateInfo function, 
if it is null, then it checks if the message attribute of response is filled with "Not Found", if so, it calls showError function with, sending "User Not Found" msg as the input,
and finally if the all the conditions have passed, then it means sth is wrong so it calles showError function with, sending "An error occured" msg as the input.*/
async function sendRequest(userName) {
    var url = "https://api.github.com/users/" + userName;
    const response = await fetch(url);
    var jsonRes = await response.json();
    if ('login' in jsonRes) {
        localStorage.setItem(jsonRes['login'], JSON.stringify(jsonRes));
        updateInfo(jsonRes);
    } else if (jsonRes['message'].toString().includes("Not Found")) {
        console.log(jsonRes);
        showError("User Not Found :((");
    } else {
        console.log(jsonRes);
        showError("An Error Occured! :((");
    }
}



/*This function updates the texts in the output boxes with the received information about the user. */
function updateInfo(info) {
    if (info['login']) {
        if (info['name'] != null) {
            document.getElementById('userFullName').innerHTML = 'User Full Name: ' + info['name'];
        } else {
            document.getElementById('userFullName').innerHTML = 'User Full Name: No Name';
        }
        if (info['avatar_url'] != null) {
            document.getElementById("userImage").src = info['avatar_url'];
        } else {
            document.getElementById("userImage").src = 'images/nopic.png';
        }
        if (info['blog'] != null && info['blog'] != "") {
            document.getElementById('userBlog').innerHTML = 'User Blog: ' + info['blog'];
        } else {
            document.getElementById('userBlog').innerHTML = 'User Blog: No Blog';
        }
        if (info['location'] != null) {
            document.getElementById('userLocation').innerHTML = 'User Location: ' + info['location'];
        } else {
            document.getElementById('userLocation').innerHTML = 'User Location: No Location';
        }
        if (info['bio'] != null) {
            document.getElementById('userBio').innerHTML = 'User Bio: ' + info['bio'];
        } else {
            document.getElementById('userBio').innerHTML = 'User Bio: No Bio';
        }
    } 
}


/*This function clears the output boxes and sets them to default values and then makes the error box visible for 5 seconds with the appropriate msg. */
function showError(error) {
    document.getElementById('userFullName').innerHTML = 'User Full Name: ';
    document.getElementById("userImage").src = 'images/nopic.png';
    document.getElementById('userBlog').innerHTML = 'User Blog: ';
    document.getElementById('userLocation').innerHTML = 'User Location: ';
    document.getElementById('userBio').innerHTML = 'User Bio: ';
    document.getElementById("error").style.display = "block";
    document.getElementById("errText").innerHTML = error;
    setTimeout(() => {
        document.getElementById("error").style.display = "none";
    }, 5000);
}





