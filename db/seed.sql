-- First, seed the `department` table
INSERT INTO department (name)
VALUES ("Sales"),
       ("Engineering");

-- Then, seed the `role` table
INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1), -- Assumes department "Sales" has id 1
       ("Sales Person", 80000, 1), 
       ("Lead Engineer", 150000, 2), -- Assumes department "Engineering" has id 2
       ("Software Engineer", 120000, 2);

-- Finally, seed the `employee` table
-- We'll assume that the "Sales Lead" role has id 1 and the "Lead Engineer" role has id 3
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, NULL), -- John Doe is a Sales Lead with no manager
       ("Jane", "Smith", 2, 1), -- Jane Smith is a Sales Person reporting to John Doe (id 1)
       ("Emily", "Johnson", 3, NULL), -- Emily Johnson is a Lead Engineer with no manager
       ("Robert", "Brown", 4, 3); -- Robert Brown is a Software Engineer reporting to Emily Johnson (id 3)
