# # SORT DATA USING TAG KEYS (VERSION 2.1)
# import os
# import ssl
# import certifi
# import time
# import threading
# import pandas as pd
# from flask import Flask, jsonify, request
# from flask_cors import CORS
# from urllib.parse import unquote
# from influxdb_client_3 import InfluxDBClient3

# # Flask app setup
# app = Flask(__name__)
# CORS(app)

# # InfluxDB Configuration
# INFLUXDB_HOST = "https://eu-central-1-1.aws.cloud2.influxdata.com"
# INFLUXDB_TOKEN = os.getenv("INFLUXDB_TOKEN")
# INFLUXDB_DATABASE = "FrequencyMeas"

# if not INFLUXDB_TOKEN:
#     raise ValueError("❌ INFLUXDB_TOKEN is not set! Set it in your environment.")

# # SSL Setup
# os.environ["GRPC_DEFAULT_SSL_ROOTS_FILE_PATH"] = certifi.where()
# ssl_context = ssl.create_default_context(cafile=certifi.where())

# # Location Mapping (Ensure correct case)
# LOCATION_MAPPING = {
#     "manchester": "M13 9PL",
#     "scotland": "S23 9RW",
# }

# # Store latest frequency data
# latest_data = {
#     "M13 9PL": [],
#     "S23 9RW": [],
# }

# def fetch_latest_frequency(location_tag):
#     """Fetch the latest 10 frequency values from InfluxDB for a specific location tag."""
#     try:
#         client = InfluxDBClient3(
#             host=INFLUXDB_HOST,
#             token=INFLUXDB_TOKEN,
#             database=INFLUXDB_DATABASE,
#             ssl_context=ssl_context
#         )

#         query = f"""
#         SELECT time, frequency FROM "FrequencyTest"
#         WHERE "location" = '{location_tag}'
#         ORDER BY time DESC
#         LIMIT 10
#         """
#         result = client.query(query)
#         client.close()

#         df = result.to_pandas()
#         if df.empty:
#             print(f"⚠️ No data found for location: {location_tag}")
#             return []

#         df["time"] = pd.to_datetime(df["time"]).astype(str)
#         latest_data[location_tag] = df.to_dict(orient="records")
#         return latest_data[location_tag]

#     except Exception as e:
#         print(f"❌ Failed to fetch data for {location_tag}: {str(e)}")
#         return []

# def update_frequencies():
#     """Continuously fetch the latest frequency data for all locations."""
#     while True:
#         for tag in LOCATION_MAPPING.values():
#             fetch_latest_frequency(tag)
#         time.sleep(1)

# # Start background updates
# threading.Thread(target=update_frequencies, daemon=True).start()

# @app.route("/frequency/<location>", methods=["GET"])
# @app.route("/frequency/<location>", methods=["GET"])
# def get_frequency(location):
#     """API endpoint to fetch live frequency data."""
#     decoded_location = unquote(location).strip()  # ✅ Decode and remove spaces

#     print(f"📡 Received API request for location: {decoded_location}")  # ✅ Debugging log

#     # Normalize the received location for comparison
#     influx_location = None
#     for key, value in LOCATION_MAPPING.items():
#         if decoded_location.lower() == key.lower() or decoded_location.lower() == value.lower():
#             influx_location = value
#             break

#     if influx_location is None:
#         print(f"❌ Invalid location requested: {decoded_location} (Parsed as: {influx_location})")
#         return jsonify({"error": "Invalid location"}), 400

#     data = latest_data.get(influx_location, [])

#     if not data:
#         print(f"⚠️ No data available for {influx_location}")
#         return jsonify([])  # ✅ Return an empty array instead of an error

#     return jsonify(data)


# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port=5000, debug=True)


# # SORT DATA USING TAG KEYS + HISTORICAL DATA (VERSION 2.1)
# import os
# import ssl
# import certifi
# import time
# import threading
# import pandas as pd
# from flask import Flask, jsonify, request, send_file
# from flask_cors import CORS
# from urllib.parse import unquote
# from influxdb_client_3 import InfluxDBClient3

# # Flask app setup
# app = Flask(__name__)
# CORS(app)

# # InfluxDB Configuration (for InfluxDB 3.0 - SQL Support)
# INFLUXDB_HOST = "https://eu-central-1-1.aws.cloud2.influxdata.com"
# INFLUXDB_TOKEN = os.getenv("INFLUXDB_TOKEN")
# INFLUXDB_DATABASE = "FrequencyMeas"

# if not INFLUXDB_TOKEN:
#     raise ValueError("❌ INFLUXDB_TOKEN is not set! Set it in your environment.")

# # SSL Setup
# os.environ["GRPC_DEFAULT_SSL_ROOTS_FILE_PATH"] = certifi.where()
# ssl_context = ssl.create_default_context(cafile=certifi.where())

# # Location Mapping (Tag Keys)
# LOCATION_MAPPING = {
#     "manchester": "M13 9PL",
#     "scotland": "S23 9RW",
# }

# # Store latest frequency data
# latest_data = {
#     "M13 9PL": [],
#     "S23 9RW": [],
# }

# def fetch_latest_frequency(location_tag):
#     """Fetch the latest 10 frequency values from InfluxDB for a specific location tag using SQL."""
#     try:
#         client = InfluxDBClient3(
#             host=INFLUXDB_HOST,
#             token=INFLUXDB_TOKEN,
#             database=INFLUXDB_DATABASE,
#             ssl_context=ssl_context
#         )

#         # ✅ Corrected InfluxDB 3.0 SQL Query
#         query = f"""
#         SELECT time, frequency 
#         FROM "FrequencyTest"
#         WHERE "location" = '{location_tag}'
#         ORDER BY time DESC
#         LIMIT 10
#         """
#         print(f"📡 Running SQL query for location {location_tag}...")
#         result = client.query(query)
#         client.close()

#         df = result.to_pandas()
#         if df.empty:
#             print(f"⚠️ No live data found for location: {location_tag}")
#             return []

#         df["time"] = pd.to_datetime(df["time"]).astype(str)
#         latest_data[location_tag] = df.to_dict(orient="records")
#         return latest_data[location_tag]

#     except Exception as e:
#         print(f"❌ Failed to fetch live data for {location_tag}: {str(e)}")
#         return []

# # Background thread to update frequency data
# def update_frequencies():
#     """Continuously fetch the latest frequency data for all locations."""
#     while True:
#         for tag in LOCATION_MAPPING.values():
#             fetch_latest_frequency(tag)
#         time.sleep(1)  # Update every second

# # Start background updates
# threading.Thread(target=update_frequencies, daemon=True).start()

# @app.route("/frequency/<location>", methods=["GET"])
# def get_frequency(location):
#     """API endpoint to fetch live frequency data."""
#     decoded_location = unquote(location).strip()

#     # Normalize the received location
#     influx_location = None
#     for key, value in LOCATION_MAPPING.items():
#         if decoded_location.lower() == key.lower() or decoded_location.lower() == value.lower():
#             influx_location = value
#             break

#     if influx_location is None:
#         print(f"❌ Invalid location requested: {decoded_location}")
#         return jsonify({"error": "Invalid location"}), 400

#     data = latest_data.get(influx_location, [])

#     if not data:
#         print(f"⚠️ No live data available for {influx_location}")
#         return jsonify([]), 404

#     return jsonify(data)

# @app.route("/fetch-data", methods=["GET"])
# def fetch_data():
#     """API endpoint to fetch historical data for a given date range and location (tag key)."""
#     start = request.args.get("start")
#     end = request.args.get("end")
#     location = request.args.get("location")

#     if not start or not end or not location:
#         print("❌ Missing parameters in request")
#         return jsonify({"error": "Start date, end date, and location are required"}), 400

#     try:
#         if location.lower() not in LOCATION_MAPPING:
#             print(f"❌ Invalid location requested: {location}")
#             return jsonify({"error": "Invalid location"}), 400

#         influx_location = LOCATION_MAPPING[location.lower()]

#         print(f"📡 Fetching historical data for {location} ({influx_location}) from {start} to {end}...")

#         # ✅ Corrected InfluxDB 3.0 SQL Query
#         query = f"""
#         SELECT time, frequency 
#         FROM "FrequencyTest"
#         WHERE "location" = '{influx_location}'
#         AND time BETWEEN '{start}' AND '{end}'
#         ORDER BY time DESC
#         """
        
#         client = InfluxDBClient3(
#             host=INFLUXDB_HOST,
#             token=INFLUXDB_TOKEN,
#             database=INFLUXDB_DATABASE,
#             ssl_context=ssl_context
#         )
#         result = client.query(query)
#         client.close()

#         df = result.to_pandas()

#         if df.empty:
#             print(f"⚠️ No historical data found for {location}.")
#             return jsonify({"error": "No data found for the selected range and location"}), 404

#         # Save to CSV
#         file_path = f"output_{location}.csv"
#         df.to_csv(file_path, index=False)

#         print(f"✅ Data successfully retrieved and saved for location {location}.")
#         return send_file(file_path, as_attachment=True, download_name=f"influx-data-{location}.csv")

#     except Exception as e:
#         print(f"❌ Error fetching data: {e}")
#         return jsonify({"error": str(e)}), 500

# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port=5000, debug=True)


# # TIME-BASED DATA QUERY (VERSION 2.2)
# from flask import Flask, jsonify, request
# from flask_cors import CORS
# from urllib.parse import unquote
# import os
# import ssl
# import certifi
# import pandas as pd
# from influxdb_client_3 import InfluxDBClient3

# app = Flask(__name__)
# CORS(app)

# INFLUXDB_HOST = "https://eu-central-1-1.aws.cloud2.influxdata.com"
# INFLUXDB_TOKEN = os.getenv("INFLUXDB_TOKEN")
# INFLUXDB_DATABASE = "FrequencyMeas"

# if not INFLUXDB_TOKEN:
#     raise ValueError("❌ INFLUXDB_TOKEN is not set! Set it in your environment.")

# os.environ["GRPC_DEFAULT_SSL_ROOTS_FILE_PATH"] = certifi.where()
# ssl_context = ssl.create_default_context(cafile=certifi.where())

# LOCATION_MAPPING = {
#     "manchester": "M13 9PL",
#     "scotland": "S23 9RW",
# }

# @app.route("/frequency/<location>", methods=["GET"])
# def get_frequency(location):
#     """Fetch real-time frequency data from the last 60 seconds."""
#     decoded_location = unquote(location).strip()
#     print(f"🔎 Received API request for location: {decoded_location}")  # ✅ Debug log

#     # ✅ Fix: Check if the decoded location exists in values, not just keys
#     if decoded_location not in LOCATION_MAPPING.values():
#         print(f"❌ Invalid location received: {decoded_location}")  # ✅ Debug log
#         return jsonify({"error": "Invalid location"}), 400

#     try:
#         client = InfluxDBClient3(
#             host=INFLUXDB_HOST,
#             token=INFLUXDB_TOKEN,
#             database=INFLUXDB_DATABASE,
#             ssl_context=ssl_context
#         )

#         query = f"""
#         SELECT time, frequency 
#         FROM "FrequencyTest"
#         WHERE "location" = '{decoded_location}'  -- ✅ Now correctly matches location values
#         AND time >= now() - interval '60 seconds'
#         ORDER BY time ASC
#         """
#         print(f"✅ Running InfluxDB Query: {query}")  # ✅ Debug log

#         result = client.query(query)
#         client.close()

#         df = result.to_pandas()
#         if df.empty:
#             print("⚠️ No data found for the last 60 seconds.")  # ✅ Log empty result
#             return jsonify([]), 404

#         df["time"] = pd.to_datetime(df["time"]).astype(str)
#         return jsonify(df.to_dict(orient="records"))

#     except Exception as e:
#         print(f"❌ Error processing request: {e}")  # ✅ Log error details
#         return jsonify({"error": str(e)}), 500


# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port=5000, debug=True)



# TIME-BASED DATA QUERY + HISTORICAL DATA (VERSION 2.2)
from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
from urllib.parse import unquote
import os
import ssl
import certifi
import pandas as pd
from influxdb_client_3 import InfluxDBClient3

app = Flask(__name__)
CORS(app)

INFLUXDB_HOST = "https://eu-central-1-1.aws.cloud2.influxdata.com"
INFLUXDB_TOKEN = os.getenv("INFLUXDB_TOKEN")
INFLUXDB_DATABASE = "FrequencyMeas"

if not INFLUXDB_TOKEN:
    raise ValueError("❌ INFLUXDB_TOKEN is not set! Set it in your environment.")

os.environ["GRPC_DEFAULT_SSL_ROOTS_FILE_PATH"] = certifi.where()
ssl_context = ssl.create_default_context(cafile=certifi.where())

LOCATION_MAPPING = {
    "manchester": "M13 9PL",
    "scotland": "S23 9RW",
}

@app.route("/frequency/<location>", methods=["GET"])
def get_frequency(location):
    """Fetch real-time frequency data from the last 60 seconds."""
    decoded_location = unquote(location).strip()
    print(f"🔎 Received API request for location: {decoded_location}")  # ✅ Debug log

    if decoded_location not in LOCATION_MAPPING.values():
        print(f"❌ Invalid location received: {decoded_location}")  # ✅ Debug log
        return jsonify({"error": "Invalid location"}), 400

    try:
        client = InfluxDBClient3(
            host=INFLUXDB_HOST,
            token=INFLUXDB_TOKEN,
            database=INFLUXDB_DATABASE,
            ssl_context=ssl_context
        )

        query = f"""
        SELECT time, frequency 
        FROM "FrequencyTest"
        WHERE "location" = '{decoded_location}'
        AND time >= now() - interval '60 seconds'
        ORDER BY time ASC
        """
        print(f"✅ Running InfluxDB Query: {query}")  # ✅ Debug log

        result = client.query(query)
        client.close()

        df = result.to_pandas()
        if df.empty:
            print("⚠️ No data found for the last 60 seconds.")  # ✅ Log empty result
            return jsonify([]), 404

        df["time"] = pd.to_datetime(df["time"]).astype(str)
        return jsonify(df.to_dict(orient="records"))

    except Exception as e:
        print(f"❌ Error processing request: {e}")  # ✅ Log error details
        return jsonify({"error": str(e)}), 500

# ✅ RESTORE HISTORICAL DATA DOWNLOAD FUNCTIONALITY
@app.route("/fetch-data", methods=["GET"])
def fetch_data():
    """Fetch historical frequency data for a given date range and location."""
    start = request.args.get("start")
    end = request.args.get("end")
    location = request.args.get("location")

    if not start or not end or not location:
        print("❌ Missing parameters in request")
        return jsonify({"error": "Start date, end date, and location are required"}), 400

    try:
        if location.lower() not in LOCATION_MAPPING:
            print(f"❌ Invalid location requested: {location}")
            return jsonify({"error": "Invalid location"}), 400

        influx_location = LOCATION_MAPPING[location.lower()]

        print(f"📡 Fetching historical data for {location} ({influx_location}) from {start} to {end}...")

        client = InfluxDBClient3(
            host=INFLUXDB_HOST,
            token=INFLUXDB_TOKEN,
            database=INFLUXDB_DATABASE,
            ssl_context=ssl_context
        )

        query = f"""
        SELECT time, frequency 
        FROM "FrequencyTest"
        WHERE "location" = '{influx_location}'
        AND time BETWEEN '{start}' AND '{end}'
        ORDER BY time DESC
        """
        print(f"✅ Running Historical Data Query: {query}")  # ✅ Debug log

        result = client.query(query)
        client.close()

        df = result.to_pandas()

        if df.empty:
            print(f"⚠️ No historical data found for {location}.")
            return jsonify({"error": "No data found for the selected range and location"}), 404

        # ✅ Save historical data to CSV
        file_path = f"output_{location}.csv"
        df.to_csv(file_path, index=False)

        print(f"✅ Data successfully retrieved and saved for location {location}.")
        return send_file(file_path, as_attachment=True, download_name=f"influx-data-{location}.csv")

    except Exception as e:
        print(f"❌ Error fetching data: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)


# TIME-BASED DATA QUERY + HISTORICAL DATA + TIME FORMAT FIXED (VERSION 2.2)
