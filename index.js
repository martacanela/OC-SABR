var jwt = localStorage.getItem("jwt");
if (jwt == null) {
  window.location.href = './index.html'
}

function login() {
    /*const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://www.mecallapi.com/api/index");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({
      "username": username,
      "password": password
    }));
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        const objects = JSON.parse(this.responseText);
        console.log(objects);
        if (objects['status'] == 'ok') {
          localStorage.setItem("jwt", objects['accessToken']);
          Swal.fire({
            text: objects['message'],
            icon: 'success',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = './formTratamiento.html';
            }
          });
        } else {
          Swal.fire({
            text: objects['message'],
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      }
    };
    return false;*/
}

function loadUser() {
  /*const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "https://www.mecallapi.com/api/auth/user");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.setRequestHeader("Authorization", "Bearer "+jwt);
  xhttp.send();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      const objects = JSON.parse(this.responseText);
      if (objects["status"] == "ok") {
        const user = objects["user"]
        document.getElementById("fname").innerHTML = user["fname"];
        document.getElementById("avatar").src = user["avatar"];
        document.getElementById("username").innerHTML = user["username"];
      }
    }
  };*/
}

loadUser();

function logout() {
  /*localStorage.removeItem("jwt");
  window.location.href = './index.html'*/
}