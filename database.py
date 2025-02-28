import mysql.connector as mysql
import MySQLdb


class Database:
    @staticmethod
    def connect_dbs():
        dbPrefix = 'railway'
        connection = MySQLdb.connect(
            user = 'root',
            passwd = 'root',
            host = 'localhost',
            db= dbPrefix
        )
        return connection

connection = Database.connect_dbs()
cursor = connection.cursor()  


print("Connected to the database.")

# cursor.execute("""CREATE DATABASE `railway`;
# USE `railway`;""")


# ------------------------

# sql_query = """DROP TABLE IF EXISTS `state`;"""
# cursor.execute(sql_query)  


# cursor.execute("""CREATE TABLE state (
#     state_id INT PRIMARY KEY UNIQUE,
#     state_name VARCHAR(100) NOT NULL
# ) """)


# sql_query = """DROP TABLE IF EXISTS `city`;"""
# cursor.execute(sql_query)

# cursor.execute("""
# CREATE TABLE city (
#     city_id INT PRIMARY KEY,
#     state_id INT,
#     city_name VARCHAR(100) NOT NULL,
#     FOREIGN KEY (state_id) REFERENCES state(state_id) ON DELETE CASCADE
# )
# """)

# # Drop   table if it exists
# sql_query = """DROP TABLE IF EXISTS `sub_division`;"""
# cursor.execute(sql_query)

# # Create sub_division table

# cursor.execute("""
# CREATE TABLE sub_division (
#     div_id INT AUTO_INCREMENT PRIMARY KEY,
#     city_id INT,
#     station_name VARCHAR(100) NOT NULL,
#     station_code VARCHAR(10) UNIQUE NOT NULL,
#     FOREIGN KEY (city_id) REFERENCES city(city_id) ON DELETE CASCADE
# )
# """)

# # Drop platform table if it exists
# sql_query = """DROP TABLE IF EXISTS `platform`;"""
# cursor.execute(sql_query)

# # Create platform table
# cursor.execute("""
# CREATE TABLE platform (
#     platform_id INT PRIMARY KEY,
#     platform_number VARCHAR(20) NOT NULL,
#     station_code VARCHAR(10),
#     FOREIGN KEY (station_code) REFERENCES sub_division(station_code) ON DELETE CASCADE
# )
# """)

# sql_query = """DROP TABLE IF EXISTS `amenities`;"""
# cursor.execute(sql_query)

# cursor.execute("""CREATE TABLE amenities (
#     id INT AUTO_INCREMENT PRIMARY KEY,
#     amenity_name VARCHAR(255) NOT NULL,
#     image_path VARCHAR(255) NOT NULL
# );""")

# sql_query = """DROP TABLE IF EXISTS `pinpoints`;"""
# cursor.execute(sql_query)




# cursor.execute("""CREATE TABLE pinpoints (
#     id INT AUTO_INCREMENT PRIMARY KEY,
#     platform_id INT NOT NULL,           
#     amenity_name VARCHAR(255) NOT NULL,
#     longitude DECIMAL(18, 15) NOT NULL,
#     latitude DECIMAL(18, 15) NOT NULL,
#     category VARCHAR(255) NOT NULL,
#     inserttimestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
#     FOREIGN KEY (platform_id) REFERENCES platform(platform_id) ON DELETE CASCADE ON UPDATE CASCADE
# );""")




# print("Tables created successfully.")