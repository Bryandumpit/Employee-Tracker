INSERT INTO departments(department_name)
VALUES
    ('Finance'),
    ('Research and Development'),
    ('Production');

INSERT INTO roles(title, salary, department_id)
VALUES
    ('Financial Manager', 80000.00, 1),
    ('Analyst', 60000.00, 1),
    ('Clerk', 40000.00, 1),
    ('Lab Manager', 80000.00, 2),
    ('Scientist', 60000.00, 2),
    ('Lab Technician', 40000.00, 2,)
    ('Floor Manager', 80000.00, 3)
    ('Technical Group Leader', 60000.00, 3)
    ('Technician', 40000.00, 3);

INSERT INTO employees(first_name, last_name, role_id, manager_id)
    ('Ali', 'Gater', 1, NULL),
    ('Bennie', 'Factor', 2, 1),
    ('Chester', 'Minit', 3, 1),
    ('Dinah', 'Mite', 4, NULL),
    ('Don', 'Keyes', 5, 4),
    ('Justin', 'Thyme', 6, 4),
    ('Joe', 'King', 7, NULL),
    ('James', 'Nasium', 8, 7),
    ('Horace', 'Cope', 9, 7);