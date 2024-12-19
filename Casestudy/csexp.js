// Class representing an employee
class Employee {
    constructor(id, firstName, lastName, dob, doj, grade) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dob = dob;
        this.doj = doj;
        this.grade = grade;
    }
}

// Class for managing the Employee Table
class EmployeeManager {
    constructor() {
        this.employees = [
            new Employee('5001', 'Jane', 'Smith', '2002-05-21', '2024-09-14', 'M1'),
            new Employee('5002', 'John', 'Doe', '1998-05-06', '2023-08-30', 'M2'),
            new Employee('5003', 'Jasmine', 'Shaik', '2003-01-21', '2024-08-08', 'M3'),
        ];
        this.headings = ["ID", "Firstname", "Lastname", "DOB", "DOJ", "Grade", "View", "Modify"];
    }

    populateEmployeeTable(employeeList, tableElement) {
        tableElement.textContent = "";

        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");
        this.headings.forEach(heading => {
            const th = document.createElement("th");
            th.textContent = heading;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        tableElement.appendChild(thead);

        const tbody = document.createElement("tbody");
        employeeList.forEach(employee => {
            const row = document.createElement("tr");
            Object.values(employee).forEach(value => {
                const cell = document.createElement("td");
                cell.textContent = value;
                row.appendChild(cell);
            });

            // Add View button
            const viewCell = document.createElement("td");
            const viewButton = document.createElement("button");
            viewButton.textContent = "View";
            viewButton.addEventListener("click", () => this.viewEmployee(employee));
            viewCell.appendChild(viewButton);
            row.appendChild(viewCell);

            // Add Modify button
            const modifyCell = document.createElement("td");
            const modifyButton = document.createElement("button");
            modifyButton.textContent = "Modify";
            modifyButton.addEventListener("click", () => this.openModifyEmployeeModal(employee));
            modifyCell.appendChild(modifyButton);
            row.appendChild(modifyCell);

            tbody.appendChild(row);
        });

        tableElement.appendChild(tbody);
    }

    filterEmployees(criteria) {
        return this.employees.filter(employee => {
            return (
                (!criteria.id || employee.id === criteria.id) &&
                (!criteria.firstName || employee.firstName.toLowerCase().includes(criteria.firstName.toLowerCase())) &&
                (!criteria.lastName || employee.lastName.toLowerCase().includes(criteria.lastName.toLowerCase())) &&
                (!criteria.dob || employee.dob === criteria.dob) &&
                (!criteria.doj || employee.doj === criteria.doj) &&
                (!criteria.grade || employee.grade === criteria.grade)
            );
        });
    }

    openModifyEmployeeModal(employee) {
        const modal = document.getElementById("employeeModifyModal");
        modal.querySelector("#employeeId").value = employee.id;
        modal.querySelector("#firstName").value = employee.firstName;
        modal.querySelector("#lastName").value = employee.lastName;
        modal.querySelector("#modifydob").value = employee.dob;
        modal.querySelector("#doj").value = employee.doj;
        modal.querySelector("#grade").value = employee.grade;
        modal.style.display = "block";
    }

    viewEmployee(employee) {
        const modal = document.getElementById("employeeViewModal");
        modal.querySelector("#viewEmployeeId").value = employee.id;
        modal.querySelector("#viewFirstName").value = employee.firstName;
        modal.querySelector("#viewLastName").value = employee.lastName;
        modal.querySelector("#viewDob").value = employee.dob;
        modal.querySelector("#viewDoj").value = employee.doj;
        modal.querySelector("#viewGrade").value = employee.grade;
        modal.style.display = "block";
    }

    updateEmployee(employeeData) {
        const employee = this.employees.find(emp => emp.id === employeeData.id);
        if (employee) {
            employee.firstName = employeeData.firstName;
            employee.lastName = employeeData.lastName;
            employee.dob = employeeData.dob;
            employee.doj = employeeData.doj;
            employee.grade = employeeData.grade;
        }
    }
}

// Main application logic
window.onload = function() {
    if (!sessionStorage.getItem("loggedIn")) {
        window.location.href = "login.html";
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const employeeManager = new EmployeeManager();
    const table = document.getElementById("employee-table");
    const searchButton = document.getElementById("search");
    const searchResultsContainer = document.querySelector(".search-results");
    const backButton = document.getElementById("back-from-searchresults");

    employeeManager.populateEmployeeTable(employeeManager.employees, table);

    searchButton.addEventListener("click", () => {
        searchResultsContainer.classList.add("visible");
        const criteria = {
            id: document.getElementById("eid").value.trim(),
            firstName: document.getElementById("efname").value.trim(),
            lastName: document.getElementById("elname").value.trim(),
            dob: document.getElementById("dob").value.trim(),
            doj: document.getElementById("dateoj").value.trim(),
            grade: document.getElementById("grd").value,
        };
        const filteredEmployees = employeeManager.filterEmployees(criteria);
        employeeManager.populateEmployeeTable(filteredEmployees, table);
    });

    backButton.addEventListener("click", () => {
        searchResultsContainer.classList.remove("visible");
    });

    const modifyEmployeeForm = document.getElementById("modifyEmployeeForm");
    modifyEmployeeForm.addEventListener("submit", event => {
        event.preventDefault();
        const employeeData = {
            id: document.getElementById("employeeId").value,
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            dob: document.getElementById("modifydob").value,
            doj: document.getElementById("doj").value,
            grade: document.getElementById("grade").value,
        };
        employeeManager.updateEmployee(employeeData);
        employeeManager.populateEmployeeTable(employeeManager.employees, table);
        document.getElementById("employeeModifyModal").style.display = "none";
    });
});
