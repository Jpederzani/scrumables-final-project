exports.calculateRisk = (req, res) => {
    const link = ''
    //console.log(req.body)
    let ageId = req.body.ageId
    let weightId = parseInt(req.body.weightId)
    let feet = parseInt(req.body.heightFt)*12
    let inch = parseInt(req.body.heightIn)
    let heightId = feet+inch
    let sbpId = req.body.sbpId
    let dbpId = req.body.dbpId
    let diabetesId = req.body.diabetesId
    let cancerId = req.body.cancerId
    let alzheimersId = req.body.alzheimersId

calculate()
//Calculate Final Totak for Risk Calculation
function calculate() {
    let bpValue = calcBP()
    let BMIValue = calcBMI()
    let FamilyDiseaseValue = calcFamilyHist()

    //Create Total Raw Score
    let totalValue = bpValue + ageId + BMIValue + FamilyDiseaseValue

    //console.log(totalValue)
    res.write('<p>Risk Score Summary:</p>')
    res.write('<p>Blood Pressure: ' + bpValue + '</p>')
    res.write('<p>Age: ' + ageId + '</p>')
    res.write('<p>BMI: ' + BMIValue + '</p>')
    res.write('<p>Family History: ' + FamilyDiseaseValue + '</p><br>')

    if (totalValue <= 20) {
        res.write('<p>The patient is considered low risk.</p>')
    } else if (totalValue <= 50) {
        res.write('<p>The patient is considered moderate risk.</p>')
    } else if (totalValue <=75) {
        res.write('<p>The patient is considered high risk.</p>')
    } else if (totalValue > 75) {
        res.write('<p>The patient is considered uninsurable.</p>')
    }
    res.write('<br><a href="/riskcalculator">New Patient</a>')
    res.send();

    return
}

//Calculating Blood Pressure
function calcBP(){
let bpValue = 0
    if (sbpId == 1 && dbpId == 1) {
        bpValue = 0
    } else if (sbpId == 2 && dbpId == 1) {
        bpValue = 15
    } else if (sbpId == 5) {
        bpValue = 100
    } else if (dbpId == 4) {
        bpValue = 100
    } else if (sbpId == 3 || dbpId == 2) {
        bpValue = 30
    } else if (sbpId == 4 || dbpId == 3) {
        bpValue = 75
    }
    //console.log(bpValue)
    return bpValue
}

//Calculate BMI -> weight (kg) / [height (m)]2
function calcBMI() {
    let BMIValue = 0

    var m_ht = heightId * 0.0254 	// 1ft = .3048m
    var m_wt = weightId * 0.4535924	// 1kg = 2.204623lbs
    let rawBMI = m_wt/(m_ht**2)		// height/weight^2 = BMI

    //Assign points to BMI by Raw BMI Value
    if(rawBMI <= 24.9){
        BMIValue = 0
    } else if(rawBMI > 24.9 && rawBMI <= 29.9){
        BMIValue = 30
    } else {
        BMIValue = 75
    }
    return BMIValue
}

//Calculate Family History
function calcFamilyHist() {
    let FamilyDiseaseValue = 0
    if(diabetesId == 10){
        FamilyDiseaseValue = FamilyDiseaseValue + 10
    }
    if(cancerId == 10){
        FamilyDiseaseValue = FamilyDiseaseValue + 10
    }
    if(alzheimersId == 10){
        FamilyDiseaseValue = FamilyDiseaseValue + 10
    }

    return FamilyDiseaseValue
}}