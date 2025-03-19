document.getElementById("home").onsubmit = () => {

    clearErrors();

    let isValid = true;

    let fname = document.getElementById('fname').value.trim();
    let lname = document.getElementById('lname').value.trim();
    let task = document.getElementById('task').value.trim();
    let day = document.getElementById('day').value;
    let length = document.getElementById('length').value;
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

    if (day === "none") {
        document.getElementById("err-day").style.display = "block";
        isValid = false;
    } else {
        const validDays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
        if (!validDays.includes(day)) {
            document.getElementById("err-day").style.display = "block";
            isValid = false;
        }
    }

    if (isNaN(length) || Number(length) <= 0) {
        document.getElementById("err-length").style.display = "block";
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

