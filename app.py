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
CORS(app, supports_credentials=True)




@app.route('/')
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
    print('pinpoints',pinpoints)
    connection.close()

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
    # return jsonify(pinpoint_list)
    return render_template('map.html',pinpoints=pinpoint_list)   





def tourist_place():
    pass

def handicapped_amenities():
    pass

def railway_helpline():
    pass



if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)