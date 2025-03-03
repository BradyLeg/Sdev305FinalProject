export function validateFields(data)
{
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

    //Add validation that checks to see if the start date is before end date


    if (!data.startdate) {
        errors.push("Start date is required");
    }

    if (!data.enddate) {
        errors.push("End date is required");
    }

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