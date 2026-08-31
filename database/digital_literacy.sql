-- ============================================================
-- Digital Literacy for Rural Communication
-- MySQL schema + sample data (college mini project)
-- Usage:  mysql -u root -p < database/digital_literacy.sql
-- ============================================================

DROP DATABASE IF EXISTS digital_literacy;
CREATE DATABASE digital_literacy CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE digital_literacy;

-- ------------------------------------------------------------
-- 1. users
-- ------------------------------------------------------------
CREATE TABLE users (
  user_id       INT AUTO_INCREMENT PRIMARY KEY,
  full_name     VARCHAR(100) NOT NULL,
  email         VARCHAR(120) NOT NULL UNIQUE,
  mobile        VARCHAR(15)  NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  gender        ENUM('Male','Female','Other') DEFAULT 'Other',
  age           INT,
  village       VARCHAR(100),
  district      VARCHAR(100),
  state         VARCHAR(100),
  language      VARCHAR(40) DEFAULT 'English',
  role          ENUM('learner','trainer','admin') NOT NULL DEFAULT 'learner',
  status        ENUM('active','blocked') NOT NULL DEFAULT 'active',
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- 2. trainers
-- ------------------------------------------------------------
CREATE TABLE trainers (
  trainer_id  INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  expertise   VARCHAR(150),
  email       VARCHAR(120),
  mobile      VARCHAR(15),
  centre      VARCHAR(150),
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- 3. courses
-- ------------------------------------------------------------
CREATE TABLE courses (
  course_id   INT AUTO_INCREMENT PRIMARY KEY,
  title       VARCHAR(150) NOT NULL,
  description TEXT,
  duration    VARCHAR(40),
  level       ENUM('Beginner','Intermediate','Advanced') DEFAULT 'Beginner',
  category    VARCHAR(60),
  trainer_id  INT,
  CONSTRAINT fk_course_trainer FOREIGN KEY (trainer_id)
    REFERENCES trainers(trainer_id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- 4. enrollments
-- ------------------------------------------------------------
CREATE TABLE enrollments (
  enrollment_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id       INT NOT NULL,
  course_id     INT NOT NULL,
  progress      TINYINT NOT NULL DEFAULT 0,
  status        ENUM('enrolled','in_progress','completed') DEFAULT 'enrolled',
  enrolled_on   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_user_course (user_id, course_id),
  CONSTRAINT fk_enr_user   FOREIGN KEY (user_id)   REFERENCES users(user_id)   ON DELETE CASCADE,
  CONSTRAINT fk_enr_course FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- 5. videos
-- ------------------------------------------------------------
CREATE TABLE videos (
  video_id   INT AUTO_INCREMENT PRIMARY KEY,
  title      VARCHAR(150) NOT NULL,
  category   VARCHAR(60),
  duration   VARCHAR(20),
  description TEXT,
  embed_id   VARCHAR(60)
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- 6. gov_services  (centralised official URLs)
-- ------------------------------------------------------------
CREATE TABLE gov_services (
  service_id  INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(120) NOT NULL,
  url         VARCHAR(255) NOT NULL,
  description TEXT,
  icon        VARCHAR(50)
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- 7. feedback
-- ------------------------------------------------------------
CREATE TABLE feedback (
  feedback_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id     INT,
  course_id   INT,
  rating      TINYINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  message     TEXT,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_fb_user   FOREIGN KEY (user_id)   REFERENCES users(user_id)   ON DELETE SET NULL,
  CONSTRAINT fk_fb_course FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- 8. contact_messages
-- ------------------------------------------------------------
CREATE TABLE contact_messages (
  message_id INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(100) NOT NULL,
  email      VARCHAR(120) NOT NULL,
  subject    VARCHAR(150),
  message    TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- 9. certificates
-- ------------------------------------------------------------
CREATE TABLE certificates (
  certificate_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id        INT NOT NULL,
  course_id      INT NOT NULL,
  certificate_no VARCHAR(40) NOT NULL UNIQUE,
  issued_on      DATE NOT NULL,
  CONSTRAINT fk_cert_user   FOREIGN KEY (user_id)   REFERENCES users(user_id)   ON DELETE CASCADE,
  CONSTRAINT fk_cert_course FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- 10. announcements
-- ------------------------------------------------------------
CREATE TABLE announcements (
  announcement_id INT AUTO_INCREMENT PRIMARY KEY,
  title      VARCHAR(150) NOT NULL,
  body       TEXT,
  posted_on  DATE NOT NULL
) ENGINE=InnoDB;

-- ============================================================
-- SAMPLE DATA
-- ============================================================

INSERT INTO trainers (name, expertise, email, mobile, centre) VALUES
('Ravi Kumar','Computer Fundamentals','ravi@dlrc.in','9876500001','Anantapur CSC'),
('Anita Sharma','Internet & Email','anita@dlrc.in','9876500002','Barabanki CSC'),
('Suresh Patil','MS Office','suresh@dlrc.in','9876500003','Nanded CSC'),
('Meena Devi','Digital Payments / UPI','meena@dlrc.in','9876500004','Sitapur CSC'),
('Dr. Imran Ali','Cyber Security','imran@dlrc.in','9876500005','Anantapur CSC'),
('Lakshmi Rao','Online Banking','lakshmi@dlrc.in','9876500006','Guntur CSC'),
('Vijay Menon','E-Governance','vijay@dlrc.in','9876500007','Palakkad CSC'),
('Priya Nair','Mobile & Digital Communication','priya@dlrc.in','9876500008','Palakkad CSC'),
('Rohit Verma','Online Shopping Safety','rohit@dlrc.in','9876500009','Sitapur CSC');

INSERT INTO courses (title, description, duration, level, category, trainer_id) VALUES
('Computer Basics','Parts of a computer, mouse, keyboard, files and folders.','4 weeks','Beginner','Basics',1),
('Internet Basics','Browsers, search, downloads and using Wi-Fi safely.','3 weeks','Beginner','Basics',2),
('MS Office Essentials','Word, Excel and PowerPoint for everyday village office work.','6 weeks','Intermediate','Productivity',3),
('Digital Payments','Wallets, QR codes, refunds and transaction records.','2 weeks','Beginner','Finance',4),
('UPI Mastery','UPI ID, PIN setup, limits, and resolving failed payments.','2 weeks','Beginner','Finance',4),
('Cyber Security Awareness','Passwords, OTP fraud, phishing links and cybercrime reporting.','3 weeks','Intermediate','Safety',5),
('Online Banking','Net banking, NEFT/IMPS, statements and complaint redressal.','3 weeks','Intermediate','Finance',6),
('Government Services Online','Aadhaar, DigiLocker, UMANG, certificates and scheme forms.','4 weeks','Beginner','Citizen',7),
('Smartphone Usage','Settings, storage, apps, local-language keyboards and updates.','2 weeks','Beginner','Basics',8),
('Email Communication','Create an email ID, attachments, spam and formal writing.','2 weeks','Beginner','Communication',2),
('Online Shopping Safety','Genuine sellers, COD vs prepaid, returns and fake offers.','2 weeks','Beginner','Safety',9),
('Digital Communication','WhatsApp, video calls, groups and responsible sharing.','3 weeks','Beginner','Communication',8);

-- password_hash values below are PHP password_hash() samples for "Password@123"
INSERT INTO users (full_name, email, mobile, password_hash, gender, age, village, district, state, language, role) VALUES
('Admin User','admin@dlrc.in','9000000001','$2y$10$e0NRl0k7Qk9m0Zr5s1YyUOa8qYb7q1Yc9Yy0Xq8Zk3Jf6xQmVv6vG','Other',35,'Anantapur','Anantapur','Andhra Pradesh','English','admin'),
('Sunita Yadav','sunita@example.com','9000000002','$2y$10$e0NRl0k7Qk9m0Zr5s1YyUOa8qYb7q1Yc9Yy0Xq8Zk3Jf6xQmVv6vG','Female',32,'Ramnagar','Barabanki','Uttar Pradesh','Hindi','learner'),
('Ramesh Naidu','ramesh@example.com','9000000003','$2y$10$e0NRl0k7Qk9m0Zr5s1YyUOa8qYb7q1Yc9Yy0Xq8Zk3Jf6xQmVv6vG','Male',45,'Kalyandurg','Anantapur','Andhra Pradesh','Telugu','learner'),
('Fatima Sheikh','fatima@example.com','9000000004','$2y$10$e0NRl0k7Qk9m0Zr5s1YyUOa8qYb7q1Yc9Yy0Xq8Zk3Jf6xQmVv6vG','Female',19,'Ardhapur','Nanded','Maharashtra','Marathi','learner'),
('Dinesh Kumar','dinesh@example.com','9000000005','$2y$10$e0NRl0k7Qk9m0Zr5s1YyUOa8qYb7q1Yc9Yy0Xq8Zk3Jf6xQmVv6vG','Male',28,'Biswan','Sitapur','Uttar Pradesh','Hindi','learner');

INSERT INTO enrollments (user_id, course_id, progress, status) VALUES
(2,4,100,'completed'),
(2,5,80,'in_progress'),
(3,8,100,'completed'),
(3,1,45,'in_progress'),
(4,10,100,'completed'),
(4,2,60,'in_progress'),
(5,6,100,'completed'),
(5,11,25,'in_progress');

INSERT INTO videos (title, category, duration, description, embed_id) VALUES
('What is a Computer?','Computer Basics','08:12','Hardware, software and how a computer helps daily village work.','placeholder1'),
('Using Keyboard & Mouse','Computer Basics','06:40','Typing practice, shortcuts and clicking with confidence.','placeholder2'),
('How the Internet Works','Internet Basics','09:25','Data, networks and choosing a reliable connection.','placeholder3'),
('Searching the Web Safely','Internet Basics','07:05','Good keywords, trusted sources and avoiding fake sites.','placeholder4'),
('Make Your First UPI Payment','Digital Payments','05:50','Scan a QR code and pay a shopkeeper step by step.','placeholder5'),
('Wallets and Refunds','Digital Payments','06:18','Add money, track history and raise a refund request.','placeholder6'),
('OTP Fraud Explained','Cyber Security','10:02','Real village fraud cases and how to stay protected.','placeholder7'),
('Strong Passwords in 5 Minutes','Cyber Security','05:11','Create and remember safe passwords.','placeholder8'),
('Net Banking First Login','Online Banking','08:44','Registration, login and checking your balance safely.','placeholder9'),
('Sending Money with IMPS','Online Banking','07:30','Add a beneficiary and transfer money securely.','placeholder10'),
('DigiLocker Setup','Government Services','06:55','Store Aadhaar, marksheets and RC book digitally.','placeholder11'),
('Applying on UMANG','Government Services','09:10','Find and apply for services from a single app.','placeholder12'),
('PM-Kisan Status Check','Farmer Digital Services','05:36','Check instalments, complete eKYC and fix errors.','placeholder13'),
('Daily Mandi Prices Online','Farmer Digital Services','07:48','Compare crop prices before selling your harvest.','placeholder14');

INSERT INTO gov_services (name, url, description, icon) VALUES
('UIDAI (Aadhaar)','https://uidai.gov.in','Enrol for Aadhaar, update address, download e-Aadhaar and check status.','IdCard'),
('PAN — Income Tax','https://www.incometax.gov.in','Apply for PAN, file income tax returns and link PAN with Aadhaar.','Receipt'),
('DigiLocker','https://www.digilocker.gov.in','Store and share verified digital documents securely.','FolderLock'),
('UMANG','https://web.umang.gov.in','Single app for hundreds of central and state government services.','LayoutGrid'),
('PM-Kisan','https://pmkisan.gov.in','Income support scheme for farmer families.','Sprout'),
('e-Shram','https://eshram.gov.in','National database of unorganised workers.','HardHat'),
('National Scholarship Portal','https://scholarships.gov.in','Apply and track scholarships for students.','GraduationCap'),
('CoWIN','https://www.cowin.gov.in','Vaccination registration and certificates.','Syringe'),
('MyGov India','https://www.mygov.in','Citizen engagement platform.','Megaphone'),
('Government e-Marketplace (GeM)','https://gem.gov.in','Sell products and services to government buyers.','Store'),
('eDistrict Services','https://edistrict.delhigovt.nic.in','Caste, income and residence certificates.','FileText'),
('National Career Service','https://www.ncs.gov.in','Free job search and skill training listings.','Briefcase'),
('Passport Seva','https://www.passportindia.gov.in','Apply for a passport and track status.','BookUser'),
('Ayushman Bharat PM-JAY','https://beneficiary.nha.gov.in','Check eligibility and download health cover card.','HeartPulse'),
('PMEGP (KVIC)','https://www.kviconline.gov.in','Loans and subsidy for rural micro enterprises.','Factory');

INSERT INTO feedback (user_id, course_id, rating, message) VALUES
(2,4,5,'Now I run my tailoring shop UPI account myself.'),
(3,8,5,'Mandi prices and scheme forms are easy for me now.'),
(4,10,4,'Applied for my scholarship without paying an agent.'),
(5,6,5,'No OTP fraud in our village this year.');

INSERT INTO contact_messages (name, email, subject, message) VALUES
('Gram Panchayat Biswan','panchayat@example.com','Request for batch','We need a dedicated batch for 30 women in our village.');

INSERT INTO certificates (user_id, course_id, certificate_no, issued_on) VALUES
(2,4,'DLRC-2026-000101','2026-07-20'),
(3,8,'DLRC-2026-000102','2026-07-28'),
(4,10,'DLRC-2026-000103','2026-08-05'),
(5,6,'DLRC-2026-000104','2026-08-12');

INSERT INTO announcements (title, body, posted_on) VALUES
('New Farmer Digital Services batch','Registrations open for the monsoon batch.','2026-08-12'),
('Women''s empowerment drive','Fifty dedicated batches for self-help groups.','2026-08-04'),
('Certificates now verifiable','All certificates carry a unique verifiable ID.','2026-07-28'),
('Cyber safety helpline camp','Weekend camps explaining the 1930 helpline.','2026-07-15');

-- ============================================================
-- Useful views / queries for the dashboard
-- ============================================================
CREATE OR REPLACE VIEW v_course_enrollment_counts AS
SELECT c.course_id, c.title, COUNT(e.enrollment_id) AS total_enrolled,
       ROUND(AVG(e.progress),1) AS avg_progress
FROM courses c LEFT JOIN enrollments e ON e.course_id = c.course_id
GROUP BY c.course_id, c.title;

CREATE OR REPLACE VIEW v_user_progress AS
SELECT u.user_id, u.full_name, COUNT(e.enrollment_id) AS courses_taken,
       SUM(e.status='completed') AS completed,
       ROUND(AVG(e.progress),1) AS avg_progress
FROM users u LEFT JOIN enrollments e ON e.user_id = u.user_id
WHERE u.role='learner'
GROUP BY u.user_id, u.full_name;
