// Create an employee record
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
      firstName,
      familyName,
      title,
      payPerHour,
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  // Create multiple employee records at once
  function createEmployeeRecords(employeeData) {
    return employeeData.map(createEmployeeRecord);
  }
  
  // Create a time-in event for an employee
  function createTimeInEvent(employee, dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    employee.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date
    });
    return employee;
  }
  
  // Create a time-out event for an employee
  function createTimeOutEvent(employee, dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    employee.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date
    });
    return employee;
  }
  
  // Calculate hours worked on a specific date
  function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(event => event.date === date);
    const timeOut = employee.timeOutEvents.find(event => event.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
  }
  
  // Calculate wages earned on a specific date
  function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
  }
  
  // Calculate total wages for an employee for all dates
  function allWagesFor(employee) {
    return employee.timeInEvents.reduce((total, event) => {
      return total + wagesEarnedOnDate(employee, event.date);
    }, 0);
  }
  
  // Calculate payroll for all employees
  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, employee) => {
      return total + allWagesFor(employee);
    }, 0);
  }
  
  // Testing the functions
  if (require.main === module) {
    // Custom tests
    const employees = [
      ["John", "Doe", "Developer", 50],
      ["Jane", "Smith", "Manager", 60]
    ];
  
    const employeeRecords = createEmployeeRecords(employees);
  
    createTimeInEvent(employeeRecords[0], "2024-07-20 0800");
    createTimeOutEvent(employeeRecords[0], "2024-07-20 1600");
  
    createTimeInEvent(employeeRecords[1], "2024-07-20 0900");
    createTimeOutEvent(employeeRecords[1], "2024-07-20 1700");
  
    console.log("Expecting: 400");
    console.log("=>", wagesEarnedOnDate(employeeRecords[0], "2024-07-20"));
  
    console.log("");
  
    console.log("Expecting: 480");
    console.log("=>", wagesEarnedOnDate(employeeRecords[1], "2024-07-20"));
  
    console.log("");
  
    console.log("Expecting: 880");
    console.log("=>", calculatePayroll(employeeRecords));
  }
  
  module.exports = {
    createEmployeeRecord,
    createEmployeeRecords,
    createTimeInEvent,
    createTimeOutEvent,
    hoursWorkedOnDate,
    wagesEarnedOnDate,
    allWagesFor,
    calculatePayroll
  };
  