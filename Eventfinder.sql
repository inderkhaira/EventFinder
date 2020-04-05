DROP TABLE USERDATA;
DROP TABLE Location;
DROP TABLE EVENT;
DROP TABLE EventType;
DROP TABLE CreditCard;
DROP TABLE PaidEvent;
DROP TABLE Company;
DROP TABLE staff;
DROP TABLE InterestedIN;
DROP TABLE Participate;
Drop Table  PayWith;
Drop Table Sponsor;
Drop Table WorkOn;
Drop Table EventHasType;
Drop Table Friend;

create table USERDATA (
                        UserID int Primary Key, 
                        FirstName VARCHAR2 (100) NOT NULL,
                        LastName VARCHAR2 (100) NOT NULL,
                        DateOfBirth DATE NOT NULL,
                        Gender CHAR);

create table Location (
                        Name VARCHAR2 (100),
                        Address VARCHAR2 (100) Primary Key);

                   
create table EVENT (
                        EventID int PRIMARY KEY,
                        TITLE VARCHAR2 (200) NOT NULL,
                        StartDate DATE NOT NULL,
                        EndDate DATE NOT NULL,
                        Description VARCHAR2 (500) NOT NULL,
                        LocationAddress VARCHAR2 (100),
                        OrganizerUserID INT,
                        FOREIGN KEY (LocationAddress) REFERENCES Location (Address),
                        FOREIGN KEY ( OrganizerUserID) REFERENCES USERDATA(USERID));

create table EventType (
                        'TypeName VARCHAR2 (100) PRIMARY KEY,
                        AgeLimit Int );

create table CreditCard (
                         CardNumber Int PRIMARY KEY,
                         ExpiryDate DATE NOT NULL,
                         HolderName VARCHAR2 (100) NOT NULL,
                         CVC INT NOT NULL);

create table PaidEvent (
                        EventID INT Primary KEY,
                        Price INT,
                        FOREIGN KEY (EventID) REFERENCES Event (EventID));

create table Company (
                        CompanyID INT PRIMARY KEY,
                        CompanyName VARCHAR2 (100));

create table staff (
                      StaffID INT PRIMARY KEY,
                      Name VARCHAR2 (100),
                      PayRate INT);
                      
create table InterestedIN (
                            UserID INT,
                            EventType VARCHAR2 (100),
                            PRIMARY KEY (UserID, EventType),
                            FOREIGN KEY (UserID) references UserData (UserID)
                            ON DELETE CASCADE,
                            FOREIGN KEY (EventType) references EventType (TypeName)
                            ON DELETE CASCADE);
                            
create table Participate (  
                            UserID INT,
                            EventID INT,
                            Status VARCHAR2 (100),                       
                            FOREIGN KEY (UserID) REFERENCES UserData (UserID)
                            ON DELETE CASCADE,
                            FOREIGN KEY (EventID) REFERENCES Event (EventID)
                            ON DELETE CASCADE);
                            
create table PayWith (
                        UserID INT,
                        CardNumber INT,             
			Primary Key (UserID, CardNumber),
                        Foreign Key (UserID) REFERENCES UserData (UserID)
                        ON DELETE CASCADE,
                        Foreign Key (CardNumber) References CreditCard(CardNumber)
                        ON DELETE CASCADE);


                         
create table WorkOn (
                    StaffID INT,
                    EventID INT,
                    Primary Key (StaffID, EventID),
                    FOREIGN KEY (EventID) REFERENCES Event (EventID)
                        ON DELETE CASCADE,
                    Foreign Key (StaffID) references Staff(StaffID)
                        ON DELETE CASCADE);
                        
create table EventHasType (
                            EventID INT,
                            EventType VARCHAR2 (100),
                            Primary Key (EventID, EventType),
                            FOREIGN KEY (EventID) REFERENCES Event (EventID)
                              ON DELETE CASCADE, 
                            Foreign Key (EventType ) references EventType(TypeName)
                            ON DELETE CASCADE);
create table Sponsor (
                        EventID INT,
                        RepresentativeName VARCHAR2 (200),
                        CompanyID INT,
                        Budget INT,
                        Primary Key (EventID, RepresentativeName, CompanyID),
                        FOREIGN KEY (EventID) REFERENCES Event (EventID)
                           ON DELETE CASCADE,
                        FOREIGN KEY (CompanyID) references Company (CompanyID)
                           ON DELETE CASCADE); 

create table Friend (
                        Friend1UserID INT,
                        Primary Key (Friend1UserID),
                        Foreign Key (Friend1UserID) references UserData (UserID)
                        ON DELETE CASCADE);

INSERT INTO USERDATA VALUES (1, 'JOHN', 'SMITH', '23-MAY-91','M');
INSERT INTO USERDATA VALUES (2, 'PETER', 'PARKER', '02-JUN-92','M');
INSERT INTO USERDATA VALUES (3, 'Tony', 'Stark', '10-Dec-72','M');
INSERT INTO USERDATA VALUES (4, 'Black', 'Widow', '16-Oct-82','F');
INSERT INTO USERDATA VALUES (5, 'Steve', 'Rogers', '25-apr-33','M');


INSERT INTO Location VALUES('Rogers Arena', 'Beatty Street, Vancouver');
INSERT INTO Location VALUES('Elizabeth Theatre', 'Mainland Street');
INSERT INTO Location VALUES('Science World', 'Pacific Blvd');
INSERT INTO Location VALUES('Blarney Stone', 'Gastown');
INSERT INTO Location VALUES('Orpheum', 'Granville Street');

INSERT INTO Event VALUES (101, 'Comedy Club', '15-Apr-20', '17-apr-20','Full of laughs','Beatty Street, Vancouver', NULL)
INSERT INTO Event VALUES (102,'UFC Fight','03-May-20','03-May-20', 'McGreggor Vs Khalid', 'Gastown', 5 );
INSERT INTO Event VALUES (103,'Circus', '23-Apr-20','03-May-20','Cirque de Solil', 'Granville Street',3 );
INSERT INTO Event VALUES (104,'Play', '24-May-20','07-June-20','Theatrical Play','Mainland Street', Null );
INSERT INTO Event VALUES (105,'Drinking Challenge', '07-June-20','09-June-20', 'Beer Drinking Competition','Gastown',NULL );



insert into eventtype values ('Comedy', 18);
insert into eventtype values ('Sports', Null);
insert into eventtype values ('Cinema', 14);
insert into eventtype values('Liquor', 21);
insert into eventyype values ('Music', 21);
                    
insert into  CreditCard values(1234567891233,'09-sep-22', 'Clarke Kent', '123');
insert into  CreditCard values (9876543211234, '01-Sep-22', 'Bruce Wayne','000');
insert into  CreditCard values(4632850327091, '03-May-24', 'Lex Luther', '233');
insert into  CreditCard values(12343528357318,'05-May-22', 'Martha Kent', '123');
insert into  CreditCard values(32582385710-48, '06-Oct-21', 'Louis Layne', '455');                   
                
insert into  PaidEvent values(101, 100);
insert into  PaidEvent values(102,49);
insert into  PaidEvent values(103,27);
insert into  PaidEvent values(104, 39);
insert into  PaidEvent values(105,0);                        

insert into  Company values(542154,'Coke');
insert into  Company values(985462,'Dell');
insert into  Company values(387568, 'RBC');
insert into  Company values(2345235, 'Samsung');
insert into  Company values(2143132, 'Apple'); 

insert into  Staff values(901, 'Shasha', 11);
insert into  Staff values(902, 'Loretta', 12);
insert into  Staff values(903, 'Tony', 20);
insert into  Staff values(904, 'Arvin', 33);
insert into  Staff values(905, 'David', 35);  


insert into participate values (2, 103, 'as Webslinger')

insert into paywith values (1,1234567891233);
insert into paywith values (2,9876543211234);
insert into paywith values (3,4632850327091);
insert into paywith values (4, 12343528357318);
insert into paywith values (5,32582385710-48);
   

insert into workon values (901,105);
insert into workon values (902,104);
insert into workon values (903,102);
insert into workon values (904,101);
insert into workon values (905,102);


insert into sponsor values (101, 'Jimmy',542154, 2500);
insert into sponsor values (102, 'Paul', 985462, 1200);
insert into sponsor values (103, 'Howard',387568, 3500);
insert into sponsor values (104, 'Roger', 2345235, 6500);
insert into sponsor values (105, 'Wallie', 2143132, 10000);
