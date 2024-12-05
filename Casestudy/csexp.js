window.onload = function() {
    if (!sessionStorage.getItem("loggedIn")) {
            window.location.href = "login.html"; 
    }
};
const employees = [
    { id: '5001', firstName: 'Jane', lastName: 'Smith', dob: '2002-05-21', doj: '2024-09-14', grade: 'M1' },
    { id: '5002', firstName: 'John', lastName: 'Doe', dob: '1998-05-06', doj: '2023-08-30', grade: 'M2' },
    { id: '5003', firstName: 'Jasmine', lastName: 'Shaik', dob: '2003-01-21', doj: '2024-08-08', grade: 'M3' },

];

const headings = ["ID", "Firstname", "Lastname", "DOB", "DOJ", "Grade", "View", "Modify"];


function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
function showLogout() {
    document.getElementById('popup').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('logoutDiv').style.display = 'block';
    console.log("showLogout called");
}

function logout() {
    document.getElementById('popup').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
    sessionStorage.removeItem("loggedIn");
    window.location.href = "login.html";
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('logoutDiv').style.display = 'none'; // Hide logoutDiv as well
}
// Function to update the user profile name
function updateUserProfile() {
    const userName = sessionStorage.getItem("userName");
    if (userName) {
        document.querySelector('.user-name').textContent = userName; // Update the profile name
    }
}

// Call the function to update the profile when the page loads

document.addEventListener("DOMContentLoaded", () => {
    updateUserProfile();
    const searchButton = document.getElementById("search"); // Search button
    const searchResultsContainer = document.querySelector(".search-results"); // Results container
    const backButton = document.getElementById("back-from-serachresults"); // Back button
    const empIdInput = document.getElementById("eid"); // Employee ID input field
    const table = document.getElementById("employee-table"); // Employee table

    // Show container and populate table on Search button click
    searchButton.addEventListener("click", () => {
        searchResultsContainer.classList.add("visible");
        
        // Get values from all input fields
        const employeeId = document.getElementById("eid").value.trim();
        const firstName = document.getElementById("efname").value.trim();
        const lastName = document.getElementById("elname").value.trim();
        const dob = document.getElementById("dob").value.trim();
        const doj = document.querySelector("input[name='jd']").value.trim(); // Date of Joining
        const grade = document.querySelector("select[name='grade']").value; // Grade
    
        // Filter employees based on input criteria
        const filteredEmployees = employees.filter((employee) => {
            return (
                (employeeId === "" || employee.id === employeeId) &&
                (firstName === "" || employee.firstName.toLowerCase().includes(firstName.toLowerCase())) &&
                (lastName === "" || employee.lastName.toLowerCase().includes(lastName.toLowerCase())) &&
                (dob === "" || employee.dob === dob) &&
                (doj === "" || employee.doj === doj) &&
                (grade === "" || employee.grade === grade)
            );
        });
    
        // Populate the table with the filtered results
        populateEmployeeTable(filteredEmployees);
    });

    // Hide container on Back button click
    backButton.addEventListener("click", () => {
        searchResultsContainer.classList.remove("visible");
    });

    // Function to populate the employee table
    function populateEmployeeTable(employeeList) {
        table.textContent = ""; // Clear existing table contents

        // Create thead and tbody
        const thead = document.createElement("thead");
        const tbody = document.createElement("tbody");
        const headerRow = document.createElement("tr");

        // Add table headings
        headings.forEach((heading) => {
            const th = document.createElement("th");
            th.textContent = heading;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Add employee rows
        employeeList.forEach((employee) => {
            const row = document.createElement("tr");
            Object.values(employee).forEach((value) => {
                const cell = document.createElement("td");
                cell.textContent = value;
                row.appendChild(cell);
            });

            // Add View button
            const viewCell = document.createElement("td");
            const viewLink = document.createElement("button");
            viewLink.textContent = "View";
            viewCell.appendChild(viewLink);
            row.appendChild(viewCell);
            viewLink.addEventListener("click", () => {
                viewTable(employee); // This opens the view modal with read-only details
            });

            // Add Modify button
            const modifyCell = document.createElement("td");
            const modifyLink = document.createElement("button");
            modifyLink.textContent = "Modify";
            modifyCell.appendChild(modifyLink);
            row.appendChild(modifyCell);
            modifyLink.addEventListener("click", () => {
                openModifyEmployeeModal(employee); // Open modal and fill data
            });

            tbody.appendChild(row);
        });

        table.appendChild(tbody);
    }

    // Function to open modify employee modal
    function openModifyEmployeeModal(employee) {
        const modal = document.getElementById("employeeModifyModal");
        const firstNameInput = document.getElementById("firstName");
        const lastNameInput = document.getElementById("lastName");
        const dobInput = document.getElementById("modifydob");
        const dojInput = document.getElementById("doj");
        const gradeInput = document.getElementById("grade");
        const employeeIdInput = document.getElementById("employeeId");

        // Populate the form fields with the selected employee's data
        employeeIdInput.value = employee.id;
        firstNameInput.value = employee.firstName;
        lastNameInput.value = employee.lastName;
        dobInput.value = employee.dob;
        dojInput.value = employee.doj;
        gradeInput.value = employee.grade;

        // Show the modal
        modal.style.display = 'block';
    }

    // Close the modify employee modal
    function closeModifyEmployeeModal() {
        const modal = document.getElementById("employeeModifyModal");
        modal.style.display = 'none';
    }

    // Function to view the employee's record
    function viewTable(employee) {
        const modal = document.getElementById("employeeViewModal");
        const firstNameInput = document.getElementById("viewFirstName");
        const lastNameInput = document.getElementById("viewLastName");
        const dobInput = document.getElementById("viewDob");
        const dojInput = document.getElementById("viewDoj");
        const gradeInput = document.getElementById("viewGrade");
        const employeeIdInput = document.getElementById("viewEmployeeId");

        // Populate the form fields with the selected employee's data
        employeeIdInput.value = employee.id;
        firstNameInput.value = employee.firstName;
        lastNameInput.value = employee.lastName;
        dobInput.value = employee.dob;
        dojInput.value = employee.doj;
        gradeInput.value = employee.grade;

        // Show the modal
        modal.style.display = 'block';
        document.getElementById("viewBackButton").style.display = 'block';
    }

    // Close the view modal
    function closeViewEmployeeModal() {
        const modal = document.getElementById("employeeViewModal");
        modal.style.display = 'none';
    }

    const vbackButton = document.getElementById("viewBackButton");
    vbackButton.addEventListener("click", () => {
        closeViewEmployeeModal(); // Close the view modal
        const searchResultsContainer = document.querySelector(".search-results");
        searchResultsContainer.classList.remove("visible"); // Hide search results
    });

    // Add event listener for the form submission to save the modified data
    const modifyEmployeeForm = document.getElementById("modifyEmployeeForm");
    modifyEmployeeForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent form submission from reloading the page

        const employeeId = document.getElementById("employeeId").value;
        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const dob = document.getElementById("modifydob").value;
        const doj = document.getElementById("doj").value;
        const grade = document.getElementById("grade").value;

        // Find the employee and update their data
        const employee = employees.find((emp) => emp.id === employeeId);
        if (employee) {
            employee.firstName = firstName;
            employee.lastName = lastName;
            employee.dob = dob;
            employee.doj = doj;
            employee.grade = grade;
        }

        // Close the modal
        closeModifyEmployeeModal();

        // Optionally, refresh the table to reflect the changes
        populateEmployeeTable(employees);
    });

   
});
