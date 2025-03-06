document.getElementById("home").onsubmit = () => {

    clearErrors();

    let isValid = true;

    let fname = document.getElementById('fname').value.trim();
    let lname = document.getElementById('lname').value.trim();
    let task = document.getElementById('task').value.trim();
    let start = document.getElementById('start').value.trim();
    let end = document.getElementById('end').value.trim();
    let urgency = document.getElementsByName("urgency");

    if (fname === "") {
        document.getElementById('err-fname').style.display = "block";
        isValid = false
    }

    if (lname === "") {
        document.getElementById('err-lname').style.display = "block";
        isValid = false
    }

    if (task === "") {
        document.getElementById('err-task').style.display = "block";
        isValid = false
    }

    if (start === "") {
        document.getElementById('err-start').style.display = "block";
        isValid = false
    }

    if (end === "") {
        document.getElementById('err-end').style.display = "block";
        isValid = false
    }

    let count = 0;
    for (let i = 0; i < urgency.length; i++) {
        if (urgency[i].checked) {
            count++;
        }
    }
    if (count === 0) {
        document.getElementById("err-urgency").style.display = "block";
        isValid = false;
    }

    return isValid
}


function clearErrors() {
    let errors = document.getElementsByClassName("err");
    for (let i = 0; i < errors.length; i++) {
        errors[i].style.display = "none";
    }
}

