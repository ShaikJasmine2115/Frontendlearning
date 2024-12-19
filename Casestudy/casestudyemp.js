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
}

function logout() {
    sessionStorage.removeItem("loggedIn");
    window.location.href = "login.html";
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('logoutDiv').style.display = 'none';
}

function updateUserProfile() {
    const userName = sessionStorage.getItem("userName");
    if (userName) {
        document.querySelector('.user-name').textContent = userName; 
    }
}
function closeModifyEmployeeModal() {
    const modal = document.getElementById("employeeModifyModal");
    modal.style.display = 'none';
}
function closeViewEmployeeModal() {
    const modal = document.getElementById("employeeViewModal");
    modal.style.display = 'none';
}
document.addEventListener("DOMContentLoaded", () => {
    updateUserProfile();
    const searchButton = document.getElementById("search"); 
    const searchResultsContainer = document.querySelector(".search-results"); 
    const backButton = document.getElementById("back-from-searchresults"); 
    const table = document.getElementById("employee-table"); 

    searchButton.addEventListener("click", () => {
        searchResultsContainer.classList.add("visible");
        const employeeId = document.getElementById("eid").value.trim();
        const firstName = document.getElementById("efname").value.trim();
        const lastName = document.getElementById("elname").value.trim();
        const dob = document.getElementById("dob").value.trim();
        const doj = document.getElementById("dateoj").value.trim(); 
        const grade = document.getElementById("grd").value; 
    
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

        populateEmployeeTable(filteredEmployees);
    });
    backButton.addEventListener("click", () => {
        searchResultsContainer.classList.remove("visible");
    });

    function populateEmployeeTable(employeeList) {
        table.textContent = ""; 
        const thead = document.createElement("thead");
        const tbody = document.createElement("tbody");
        const headerRow = document.createElement("tr");
        headings.forEach((heading) => {
            const th = document.createElement("th");
            th.textContent = heading;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        employeeList.forEach((employee) => {
            const row = document.createElement("tr");

            Object.values(employee).forEach((value) => {
                const cell = document.createElement("td");
                cell.textContent = value;
                row.appendChild(cell);
            });
            const viewCell = document.createElement("td");
            const viewLink = document.createElement("button");
            viewLink.textContent = "View";
            viewCell.appendChild(viewLink);
            row.appendChild(viewCell);
            viewLink.addEventListener("click", () => {
                viewTable(employee); 
            });
            const modifyCell = document.createElement("td");
            const modifyLink = document.createElement("button");
            modifyLink.textContent = "Modify";
            modifyCell.appendChild(modifyLink);
            row.appendChild(modifyCell);
            modifyLink.addEventListener("click", () => {
                openModifyEmployeeModal(employee); 
            });

            tbody.appendChild(row);
        });

        table.appendChild(tbody);
    }

    function openModifyEmployeeModal(employee) {
        const modal = document.getElementById("employeeModifyModal");
        const firstNameInput = document.getElementById("firstName");
        const lastNameInput = document.getElementById("lastName");
        const dobInput = document.getElementById("modifydob");
        const dojInput = document.getElementById("doj");
        const gradeInput = document.getElementById("grade");
        const employeeIdInput = document.getElementById("employeeId");

        employeeIdInput.value = employee.id;
        firstNameInput.value = employee.firstName;
        lastNameInput.value = employee.lastName;
        dobInput.value = employee.dob;
        dojInput.value = employee.doj;
        gradeInput.value = employee.grade;

        modal.style.display = 'block';
    }

    function viewTable(employee) {
        const modal = document.getElementById("employeeViewModal");
        const firstNameInput = document.getElementById("viewFirstName");
        const lastNameInput = document.getElementById("viewLastName");
        const dobInput = document.getElementById("viewDob");
        const dojInput = document.getElementById("viewDoj");
        const gradeInput = document.getElementById("viewGrade");
        const employeeIdInput = document.getElementById("viewEmployeeId");

        employeeIdInput.value = employee.id;
        firstNameInput.value = employee.firstName;
        lastNameInput.value = employee.lastName;
        dobInput.value = employee.dob;
        dojInput.value = employee.doj;
        gradeInput.value = employee.grade;

        modal.style.display = 'block';
    }

    
    const modifyEmployeeForm = document.getElementById("modifyEmployeeForm");
    modifyEmployeeForm.addEventListener("submit", (event) => {
       event.preventDefault(); 
        const employeeId = document.getElementById("employeeId").value;
        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const dob = document.getElementById("modifydob").value;
        const doj = document.getElementById("doj").value;
        const grade = document.getElementById("grade").value;

        const employee = employees.find((emp) => emp.id === employeeId);
        if (employee) {
            employee.firstName = firstName;
            employee.lastName = lastName;
            employee.dob = dob;
            employee.doj = doj;
            employee.grade = grade;
        }
        closeModifyEmployeeModal();
        populateEmployeeTable(employees);
    }); 
});
