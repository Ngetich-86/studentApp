create DATABASE Students;
Use students;

-- Tables
create table students (
    ID int PRIMARY KEY identity(1,1),
    name varchar(50) NOT NULL,
    email varchar(50) NOT NULL,
);

INSERT INTO students (name, email)
VALUES
('John Doe', 'john.doe@example.com'),
('Jane Smith', 'jane.smith@example.com'),
('Michael Johnson', 'michael.johnson@example.com');

select * from students;