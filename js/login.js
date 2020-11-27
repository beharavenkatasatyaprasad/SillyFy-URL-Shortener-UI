const loginbtn = document.getElementById('loginbtn');

function login() {
    loginbtn.innerHTML = "loading..."
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    if (!email || !password) {
        custom_alert('warning', 'Please Fill all the Fields...')
        loginbtn.innerHTML = 'Try again'
    } else {
        CheckCredentials(email, password)
    }
}


async function CheckCredentials(email, password) {
    let data = {
        email: email,
        password: password
    }
    let response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    let res = await response.json()
    custom_alert(res.type_, res.message);
    console.log(res)
    if (res.type_ == 'success') {
        loginbtn.innerHTML = 'login successful'
        window.localStorage.setItem("user", res.user);
        window.localStorage.setItem("token", res.token);
        setTimeout(() => {
            window.location.href = 'user/home.html';
        }, 1000);
    } else {
        loginbtn.innerHTML = 'login'
    }
}