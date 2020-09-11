const auth = firebase.auth();
const db = firebase.firestore();
let searchUserData = [];
let searchFlag = false;
const OnLogin = () => {

    $('#loginModal').modal('hide');
}

const openSignup = () => {
    $('#loginModal').modal('hide');
    $('#modalRegisterForm').modal('show');
}

function signupUser() {
    const nameEl = document.getElementById('name');
    const emailEl = document.getElementById('email');
    const passwordEl = document.getElementById('password')
    const bloodEl = document.getElementById('blood');
    const NumberEl = document.getElementById('Number');
    const CityEl = document.getElementById('City');

    auth.createUserWithEmailAndPassword(emailEl.value, passwordEl.value)
        .then(async (success) => {
            await db.collection("user").add({
                name: nameEl.value,
                email: emailEl.value,
                blood: bloodEl.value,
                Number: NumberEl.value,
                City: CityEl.value,
                uid: success.user.uid
            });
            alert('Account registered!');
        })
        .catch((error) => {
            console.log('error', error);
            alert(error.message)
        });
}

//signin//

function signin() {
    var email = document.getElementById('email2');
    var password = document.getElementById('password2');
    // console.log(email.value, password.value)
    auth.signInWithEmailAndPassword(email.value, password.value)
        .then(function (user) {
            console.log('user', user.user.uid);
            getUseruid()

        })
        alert('Login Success!.')
        .catch(function (error) {
            console.log('error', error);
        })
}



function getUseruid() {
    let userData = [];
    db.collection("user").get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                userData.push(doc.data());
            });
            localStorage.setItem('BloodUserData', JSON.stringify(userData));
            // searchData('O+','lahor');
        });
}

function searchData() {
    let flag = false;
    let City = document.getElementById("searchCity").value;
    let bloodGroup = document.getElementById("searchBloodGroup").value;
    let bloodshowEl = document.getElementById("bloodshow");
    let userDataArr = localStorage.getItem("BloodUserData");

    if (userDataArr) {
        userDataArr = JSON.parse(userDataArr);
        console.log('UserData', userDataArr);

        let table = document.createElement('table');
        table.setAttribute("class", "table")
        let h1 = document.createElement("h1");
        let h1text = document.createTextNode("Donors List")
        let tr = `<tr class="tr"><th class="th">Name</th><th class="th">Blood Group</th>
        <th class="th">Contacts</th><th class="th">City</th></tr>`;
        table.innerHTML = tr;


        for (var i = 0; i < userDataArr.length; i++) {
            if (userDataArr[i].blood === bloodGroup && userDataArr[i].City === City) {
                flag = true;
                document.getElementById("hide").style.display = "none";
                document.getElementById("bloodshow").style.display = "block";

                table.innerHTML += `<tr><td class="td">${userDataArr[i].name}</td>
                <td class="td">${userDataArr[i].blood}</td>
                    <td class="td">${userDataArr[i].Number}</td>
                    <td class="td">${userDataArr[i].City}</td></tr>`

                console.log('Data', userDataArr[i]);
                h1.appendChild(h1text);
                bloodshowEl.appendChild(h1);
                bloodshowEl.appendChild(table);
                bloodshowEl.style.width = "70%";
                document.getElementById("bloodshow").style.display = "block";
            }

        }

        if (!flag) {
            alert('Sorry No Donor Found!! ')
        }

    }
}

//pera//


function donorPera() {
    var perah1 = document.getElementById("h1");
    var pera = document.getElementById("p1");
    perah1.appendChild(pera.firstChild);
}


function bloodPera1() {
    var perah2 = document.getElementById('h2');
    var pera = document.getElementById("p2");
    perah2.appendChild(pera.firstChild);
}


function TipsPera1() {
    var perah3 = document.getElementById('h3');
    var pera = document.getElementById("p3");
    perah3.appendChild(pera.firstChild);
}