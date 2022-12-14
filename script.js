const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');



function checkRequired(inputArr) {
    inputArr.forEach(function (input) {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required.`);
        }
        else {
            showSuccess(input);
        }
    });
}

function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} should be at least ${min} characters long.`);
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} should not be more than ${max} characters.`)
    } else {
        showSuccess(input);
    }
}


function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    }
    else {
        showError(input, `not a valid email.`)
    }
}

function checkFieldsMatch(input1, input2) {
    if (input1.value === input2.value) {
        showSuccess(input2);
    }
    else {
        showError(input2, `${getFieldName(input2)} does not match!`)
    }
}

form.addEventListener('submit', function (e) {
    e.preventDefault();


    // verbose way of doing it is to use multiple if-else statements:
    // if (username.value === '') {
    //     showError(username, 'username is required.');
    // } else {
    //     showSuccess(username);
    // }

    //better way is to create a function:
    checkRequired([username, email, password, password2]);
    checkLength(username, 8, 25);
    checkEmail(email);
    checkFieldsMatch(password, password2);

});