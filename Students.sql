-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: Students
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `interested_students`
--

DROP TABLE IF EXISTS `interested_students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `interested_students` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `regno` int DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `contact` bigint DEFAULT NULL,
  `course` varchar(100) DEFAULT NULL,
  `sem` int DEFAULT NULL,
  `overall_cgpa` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interested_students`
--

LOCK TABLES `interested_students` WRITE;
/*!40000 ALTER TABLE `interested_students` DISABLE KEYS */;
INSERT INTO `interested_students` VALUES (1,'Gowri',102,'gc@christ.in',1234567890,'CSE_DS',5,9.25),(2,'Manaswini ',103,'mv@christ.in',9123456789,'CSE_DS',5,9.23),(3,'Neha M',2362346,'neham@gmail.com',8593097267,'CSE_DS',5,8.4);
/*!40000 ALTER TABLE `interested_students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `not_interested`
--

DROP TABLE IF EXISTS `not_interested`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `not_interested` (
  `id` int NOT NULL AUTO_INCREMENT,
  `regno` int DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `not_interested`
--

LOCK TABLES `not_interested` WRITE;
/*!40000 ALTER TABLE `not_interested` DISABLE KEYS */;
INSERT INTO `not_interested` VALUES (1,100,'Getting married'),(2,101,'moving abroad'),(3,110,'Higher studies');
/*!40000 ALTER TABLE `not_interested` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `students` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_id` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `student_name` varchar(100) DEFAULT NULL,
  `course` varchar(100) DEFAULT NULL,
  `batch` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `student_id` (`student_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES (3,'100','100','Student 100','Shanet Mary Boby','B.Tech CSE DS','2023–2027'),(4,'101','101','Student 101','Neha M','B.Tech CSE DS','2023–2027'),(5,'102','102','Student 102','Gowri Chandana','B.Tech CSE DS','2023–2027'),(6,'103','103','Student 103','Manaswini Veerendrakumar','B.Tech CSE DS','2023–2027'),(7,'104','104','Student 104','Student 104','B.Tech CSE DS','2023–2027'),(8,'105','105','Student 105','Student 105','B.Tech CSE DS','2023–2027'),(9,'106','106','Student 106','Student 106','B.Tech CSE DS','2023–2027'),(10,'107','107','Student 107','Student 107','B.Tech CSE DS','2023–2027'),(11,'108','108','Student 108','Student 108','B.Tech CSE DS','2023–2027'),(12,'109','109','Student 109','Student 109','B.Tech CSE DS','2023–2027'),(13,'110','110','Student 110','Student 110','B.Tech CSE DS','2023–2027');
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-15 21:14:30
CREATE TABLE IF NOT EXISTS notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS announcements (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS drives (
  id INT AUTO_INCREMENT PRIMARY KEY,
  company VARCHAR(255) NOT NULL,
  job_title VARCHAR(255) NOT NULL,
  drive_date DATE NOT NULL,
  last_register_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS calendar_events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  time TIME DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);