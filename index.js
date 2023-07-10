// Your code here
const sample = ['Gray', 'Worm', 'Security', 1];
const samIn = "2023-07-10 0900";
const samOut = "2023-07-10 1200";

function createEmployeeRecord(array){
    let empRec = {firstName: array[0], familyName: array[1],
         title: array[2], payPerHour: array[3], timeInEvents: [],
        timeOutEvents: []}

    return empRec
}

function createEmployeeRecords(arrayOfArrays){
    return arrayOfArrays.map(createEmployeeRecord);
}

function createTimeInEvent(recObj, dateStamp){
    let newEvent = {type: "TimeIn", 
                    hour: parseInt(dateStamp.substring(11, 15)), 
                    date: dateStamp.substring(0,10)};

    recObj.timeInEvents.push(newEvent);
    return recObj;
}

function createTimeOutEvent(recObj, dateStamp){
    let newEvent = {type: "TimeOut", 
                    hour: parseInt(dateStamp.substring(11, 15)), 
                    date: dateStamp.substring(0,10)};

    recObj.timeOutEvents.push(newEvent);
    return recObj;
}

function hoursWorkedOnDate(recObj, date){
    let timeIn = 0;
    let timeOut = 0;
    recObj.timeInEvents.forEach((timeInEvent) =>{
        if(timeInEvent.date === date){
            timeIn = timeInEvent.hour;
        }
    })

    recObj.timeOutEvents.forEach((timeOutEvent) =>{
        if(timeOutEvent.date === date){
            timeOut = timeOutEvent.hour;
        }
    })

    const hoursWorked = (timeOut - timeIn)/100;
    return hoursWorked;
}

function wagesEarnedOnDate(recObj, date){
    const hoursWorked = hoursWorkedOnDate(recObj, date);

    return hoursWorked*recObj.payPerHour;
}

function allWagesFor(recObj){
    let allDates = [];
    let allWages = 0;

    recObj.timeInEvents.forEach((timeInEvent) =>{
        allDates.push(timeInEvent.date)
    })

    allDates.forEach((date) =>{
        allWages = allWages + wagesEarnedOnDate(recObj, date);
    })
    
    return allWages;
}

function calculatePayroll(arrayRecs){
    let allEmpPay = 0;
    arrayRecs.forEach((employee)=>{
        allEmpPay = allEmpPay + allWagesFor(employee);
    })

    return allEmpPay;
}