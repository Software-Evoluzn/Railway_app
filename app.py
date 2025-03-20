from flask import Flask, render_template, request, jsonify,redirect,url_for,session,make_response
from database import cursor, connection, Database

from flask_cors import CORS
from flask_session import Session
from functools import wraps
# from dotenv import load_dotenv
from datetime import timedelta, datetime, timezone
import random
import string
import hashlib
import jwt
import os
import logging


app = Flask(__name__)
app.config['GOOGLE_MAPS_API_KEY'] = "AIzaSyDnBmHondgwsA-dzeWtQdRT3X83On_V-wI"
CORS(app, supports_credentials=True)


@app.route('/')
def dashboard():
    return render_template('dashboard.html')

# @app.route('/map')
# def map_page():
#     connection = Database.connect_dbs()
#     cursor = connection.cursor()
#     cursor.execute("""SELECT 
#             s.state_name AS state,
#             c.city_name AS city,  
#             sd.station_name AS station,
#             p.platform_number AS platform,
#             pp.amenity_name AS place_name,
#             pp.longitude,
#             pp.latitude,
#             pp.category
#         FROM pinpoints pp
#         JOIN platform p ON pp.platform_id = p.platform_id
#         JOIN sub_division sd ON p.station_code = sd.station_code
#         JOIN city c ON sd.city_id = c.city_id
#         JOIN state s ON c.state_id = s.state_id;""")
#     pinpoints = cursor.fetchall()
#     print('pinpoints',pinpoints)
#     connection.close()

#     pinpoint_list = [
#         {
#             "state": row[0],
#             "city": row[1],
#             "station": row[2],
#             "platform": row[3],
#             "place_name": row[4],
#             "longitude": row[5],
#             "latitude": row[6],
#             "category": row[7]
#         }
#         for row in pinpoints
#     ]
#     # return jsonify(pinpoint_list)
#     return render_template('map.html',pinpoints=pinpoint_list)   

from flask import request, jsonify

@app.route('/map')
def map_page():
    connection = Database.connect_dbs()
    cursor = connection.cursor()
    cursor.execute("""SELECT 
            s.state_name AS state,
            c.city_name AS city,  
            sd.station_name AS station,
            p.platform_number AS platform,
            pp.amenity_name AS place_name,
            pp.longitude,
            pp.latitude,
            pp.category
        FROM pinpoints pp
        JOIN platform p ON pp.platform_id = p.platform_id
        JOIN sub_division sd ON p.station_code = sd.station_code
        JOIN city c ON sd.city_id = c.city_id
        JOIN state s ON c.state_id = s.state_id;""")
    
    pinpoints = cursor.fetchall()
    connection.close()

    # Get query params from URL
    selected_lat = request.args.get("lat")
    selected_lng = request.args.get("lng")
    selected_amenity = request.args.get("amenity")
    print("Selected Amenity:", selected_amenity,selected_lat,selected_lng) 


    # Convert to list of dicts
    pinpoint_list = [
        {
            "state": row[0],
            "city": row[1],
            "station": row[2],
            "platform": row[3],
            "place_name": row[4],
            "longitude": row[5],
            "latitude": row[6],
            "category": row[7]
        }
        for row in pinpoints
    ]
    print("All Pinpoints:-------------------", pinpoint_list)  # Debugging: Check data in terminal

    # If an amenity is selected, filter only that one
    if selected_lat and selected_lng and selected_amenity:
        pinpoint_list = [
            p for p in pinpoint_list if
            p["place_name"] == selected_amenity.lower() and
            float(p["latitude"]) == float(selected_lat) and
            float(p["longitude"]) == float(selected_lng)
        ]

    print("Filtered Pinpoints:", pinpoint_list)  # Debugging: Check data in terminal

    return render_template("map.html", pinpoints=pinpoint_list, selected_lat=selected_lat, selected_lng=selected_lng)


@app.route('/live_status')
def live_status():
    return render_template('live_train.html')

@app.route('/PNR_status')
def PNR_status():
    return render_template('PNR.html')


@app.route('/Current_location')
def Current_location():
    return render_template('user_location.html', api_key=app.config['GOOGLE_MAPS_API_KEY'])

def tourist_place():
    pass

def handicapped_amenities():
    pass

def railway_helpline():
    pass


# @app.route('/platforms_aminities')
# def platforms_aminities():
#     connection = Database.connect_dbs()
#     cursor = connection.cursor()
#     cursor.execute(""" SELECT DISTINCT p.platform_id, p.platform_number
#         FROM platform p
#         JOIN pinpoints pp ON p.platform_id = pp.platform_id where p.station_code='NK'; """)
#     all_platforms = cursor.fetchall()
#     print('all_platforms',all_platforms)
#     connection.close()
#     return jsonify(all_platforms)


@app.route('/platforms_amenities')
def platforms_amenities():
    connection = Database.connect_dbs()
    cursor = connection.cursor()

    cursor.execute("""
        SELECT 
            p.platform_number, 
            pp.amenity_name, 
            pp.longitude, 
            pp.latitude, 
            pp.category
        FROM platform p
        JOIN pinpoints pp ON p.platform_id = pp.platform_id;
    """)

    rows = cursor.fetchall()
    cursor.close()
    connection.close()

    # Organize data into a dictionary of platforms with amenities
    platforms_dict = {}

    for platform_number, amenity_name, longitude, latitude, category in rows:
        if platform_number not in platforms_dict:
            platforms_dict[platform_number] = {
                "platform_number": platform_number,
                "amenities": []
            }
        
        if amenity_name:  # Ensure no null values for amenities
            platforms_dict[platform_number]["amenities"].append({
                "name": amenity_name,
                "longitude": longitude,
                "latitude": latitude,
                "category": category
            })

    return jsonify(list(platforms_dict.values()))  
 

if __name__ == '__main__':
    app.run(debug=True, port=5000)