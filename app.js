const inquirer = require("inquirer");
const connection = require("./connection.js");

function start() {
	inquirer
		.prompt({
			name: "action",
			type: "list",
			message: "What would you like to do?",
			choices: [
				"View all departments",
				"View all roles",
				"View all employees",
				"Add a department",
				"Add a role",
				"Add an employee",
				"Update an employee role",
				"Exit",
			],
		})
		.then((answer) => {
			// Based on the user's answer, call the appropriate function
			switch (answer.action) {
				case "View all departments":
					viewAllDepartments();
					break;
				case "View all roles":
					viewAllRoles();
					break;
				case "View all employees":
					viewAllEmployees();
					break;
				case "Add a department":
					addDepartment();
					break;
				case "Add a role":
					addRole();
					break;
				case "Add an employee":
					addEmployee();
					break;
				case "Update an employee role":
					updateRole();
					break;
				case "Exit":
					connection.end();
					break;
				default:
					console.log(`Invalid action: ${answer.action}`);
					break;
			}
		});
}

function viewAllDepartments() {
	const query = "SELECT * FROM department";
	connection.query(query, (err, res) => {
		if (err) throw err;
		console.table(res);
		start();
	});
}
function viewAllRoles() {
	const query = "SELECT * FROM role";
	connection.query(query, (err, res) => {
		if (err) throw err;
		console.table(res);
		start();
	});
}
function viewAllEmployees() {
	const query = "SELECT * FROM employee";
	connection.query(query, (err, res) => {
		if (err) throw err;
		console.table(res);
		start();
	});
}

function addDepartment() {
	inquirer
		.prompt([
			{
				name: "deptName",
				type: "input",
				message: "What is the name of the new department?",
			},
		])
		.then((answer) => {
			connection.query(
				"INSERT INTO department SET ?",
				{
					name: answer.deptName,
				},
				(err, res) => {
					if (err) throw err;
					console.log(`${answer.deptName} Department added successfully!`);
					start();
				}
			);
		});
}

function addRole() {
	inquirer
		.prompt([
			{
				name: "roleTitle",
				type: "input",
				message: "What is the title of the new role?",
			},
			{
				name: "roleSalary",
				type: "input",
				message: "What is the Salary for this role?",
			},
			{
				name: "roleDept",
				type: "input",
				message: "What department is this role in?",
			},
		])
		.then((answer) => {
			connection.query(
				"INSERT INTO role SET ?",
				{
					title: answer.roleTitle,
					salary: answer.roleSalary,
					department_id: answer.roleDept,
				},
				(err, res) => {
					if (err) throw err;
					console.log(`${answer.roleTitle} Role added successfully!`);
					start();
				}
			);
		});
}

function addEmployee() {
	connection.query("SELECT * FROM role", function (err, roles) {
		if (err) throw err;

		inquirer
			.prompt([
				{
					name: "firstName",
					type: "input",
					message: "What is the employee's first name?",
				},
				{
					name: "lastName",
					type: "input",
					message: "What is the employee's last name?",
				},
				{
					name: "roleId",
					type: "list",
					message: "What role does this employee have?",
					choices: roles.map((role) => ({
						name: role.title,
						value: role.id,
					})),
				},
			])
			.then((answer) => {
				connection.query(
					"INSERT INTO employee SET ?",
					{
						first_name: answer.firstName,
						last_name: answer.lastName,
						role_id: answer.roleId,
					},
					(err, res) => {
						if (err) throw err;
						console.log(
							`${answer.firstName} ${answer.lastName} Employee added successfully!`
						);
						start();
					}
				);
			});
	});
}

function updateRole() {
	connection.query("SELECT * FROM employee", function (err, employees) {
		if (err) throw err;
		connection.query("SELECT * FROM role", function (err, roles) {
			if (err) throw err;
			inquirer
				.prompt([
					{
						name: "employeeId",
						type: "list",
						message: "Which employee's role do you want to update?",
						choices: employees.map((employee) => ({
							name: `${employee.first_name} ${employee.last_name}`,
							value: employee.id,
						})),
					},
					{
						name: "roleId",
						type: "list",
						message: "Which role do you want to assign the selected employee?",
						choices: roles.map((role) => ({
							name: role.title,
							value: role.id,
						})),
					},
				])
				.then((answers) => {
					connection.query(
						"UPDATE employee SET role_id = ? WHERE id = ?",
						[answers.roleId, answers.employeeId],
						function (err) {
							if (err) throw err;
							console.log("Updated employee's role");
							start();
						}
					);
				});
		});
	});
}

start();
