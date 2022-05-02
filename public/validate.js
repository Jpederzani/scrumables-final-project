function validate() {
    let age = document.forms["riskform"]["ageId"].value;
    let feet = document.forms["riskform"]["heightFt"].value;
    let inch = document.forms["riskform"]["heightIn"].value;
    let weight = document.forms["riskform"]["weightId"].value;
    let sbp = document.forms["riskform"]["sbpId"].value;
    let dbp = document.forms["riskform"]["dbpId"].value;


    if (isNaN(age)) {
        document.getElementById('ageId').style.border = "1px solid red"
        alert("Please select a vaild age range");
        return false;
    } else if (isNaN(weight)) {
        document.getElementById('weightId').style.border = "1px solid red"
        alert("Please select a valid weight")
        return false;
    } else if (isNaN(sbp)) {
        document.getElementById('sbpId').style.border = "1px solid red"
        alert("Please select a valid Systolic Blood Pressure Range")
        return false;
    } else if (isNaN(dbp)) {
        document.getElementById('dbpId').style.border = "1px solid red"
        alert("Please select a valid Diastolic Blood Pressure Range")
        return false;
    } else if (isNaN(feet)){
        document.getElementById('feetId').style.border = "1px solid red"
        alert("Height Field: Feet must be a number");
        return false;
    } else if (feet < 1 || feet > 14){
        document.getElementById('feetId').style.border = "1px solid red"
        alert("Height Field: Feet must be between 1 and 14")
        return false;
    } else if (isNaN(inch)){
        document.getElementById('inchId').style.border = "1px solid red"
        alert("Height Field: Inches must be a number");
        return false;
    } else if (inch < 0 || inch > 11){
        document.getElementById('inchId').style.border = "1px solid red"
        alert("Height Field: Inches must be between 0 and 11")
        return false;
    }
}