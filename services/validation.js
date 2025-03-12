export function validateFields(data) {
    const errors = [];

    if (!data.fname || data.fname.trim() === "") {
        errors.push("First name is required");
    }

    if (!data.lname || data.lname.trim() === "") {
        errors.push("Last name is required");
    }

    if (!data.task || data.task.trim() === "") {
        errors.push("Task name is required");
    }

    if (data.startday === "none") {
        errors.push("Please select a day");
    } else {
        const validDays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
        if (!validDays.includes(data.startday)) {
            errors.push("Please select an option for the day");
        }
    }

    if (isNaN(data.tasklength) || Number(data.tasklength) <= 0) {
        errors.push("Please a valid number");
    }

    //Remove
    if (!data.startdate) {
        errors.push("Start date is required");
    }

    if (!data.enddate) {
        errors.push("End date is required");
    }

    if (!data.tasktime) {
        errors.push("Task time required")
    }
    //End of remove

    if (!data.urgency) {
        errors.push("Urgency type needs to be selected");
    } else {
        const vaildOptions = ["Yes", "No"];
        if (!vaildOptions.includes(data.urgency)) {
            errors.push("Urgency Spoofed");
        }
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    }
}