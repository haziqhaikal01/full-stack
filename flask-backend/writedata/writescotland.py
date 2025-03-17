# # WRITE A DATA EVERY SECOND INTO INFLUXDB & SEND ID ONCE
# import os
# import time
# import numpy as np
# from influxdb_client_3 import InfluxDBClient3, Point

# # InfluxDB 3.0 Cloud Configuration
# INFLUXDB_HOST = "https://eu-central-1-1.aws.cloud2.influxdata.com"
# INFLUXDB_TOKEN = os.getenv("INFLUXDB_TOKEN")
# INFLUXDB_DATABASE = "Scotland"  # InfluxDB bucket

# # Ensure the token is available
# if not INFLUXDB_TOKEN:
#     raise ValueError("❌ INFLUXDB_TOKEN is not set! Set it in your environment.")

# # Initialize InfluxDB Client
# client = InfluxDBClient3(
#     host=INFLUXDB_HOST,
#     token=INFLUXDB_TOKEN,
#     database=INFLUXDB_DATABASE
# )

# # Function to write the "scotland" ID only once
# def write_location_once():
#     try:
#         # Create InfluxDB point with location field
#         point = (
#             Point("location_data")  # Measurement name
#             .field("location", "scotland")  # Field: location ID
#             .time(int(time.time() * 1e9))  # Set timestamp explicitly
#         )

#         # Write to InfluxDB
#         client.write(record=point)
#         print("✅ Successfully inserted location ID: 'scotland' into InfluxDB")
    
#     except Exception as e:
#         print(f"❌ Error writing location to InfluxDB: {e}")

# # Function to generate and write random frequency values continuously
# def write_continuous_frequencies():
#     i = 1  # Counter for records
#     try:
#         while True:  # Infinite loop for continuous writing
#             frequency = round(np.random.uniform(48, 52), 3)  # Generate random frequency
#             timestamp = int(time.time() * 1e9)  # Convert current time to nanoseconds

#             # Create InfluxDB point
#             point = (
#                 Point("frequency_measurements")  # Measurement name
#                 .field("frequency", frequency)   # Field: frequency value
#                 .time(timestamp)                 # Set timestamp explicitly
#             )

#             try:
#                 client.write(record=point)  # Write to InfluxDB
#                 print(f"✅ {i} Inserted: Time = {timestamp}, Frequency = {frequency} Hz")
#             except Exception as e:
#                 print(f"❌ Error writing to InfluxDB: {e}")

#             i += 1  # Increment counter
#             time.sleep(1)  # Wait 1 second before writing next data point

#     except KeyboardInterrupt:
#         print("\n❌ Interrupted by user. Stopping data writing...")
#     finally:
#         client.close()
#         print("🔌 Connection to InfluxDB closed.")

# # Run the function to write location ID only once
# write_location_once()

# # Start continuous frequency writing
# write_continuous_frequencies()


# # WRITE CONSTANT DATA
# import os
# import time
# from influxdb_client_3 import InfluxDBClient3, Point

# # InfluxDB 3.0 Cloud Configuration
# INFLUXDB_HOST = "https://eu-central-1-1.aws.cloud2.influxdata.com"
# INFLUXDB_TOKEN = os.getenv("INFLUXDB_TOKEN")
# INFLUXDB_DATABASE = "Scotland"  # InfluxDB bucket

# # Ensure the token is available
# if not INFLUXDB_TOKEN:
#     raise ValueError("❌ INFLUXDB_TOKEN is not set! Set it in your environment.")

# # Initialize InfluxDB Client
# client = InfluxDBClient3(
#     host=INFLUXDB_HOST,
#     token=INFLUXDB_TOKEN,
#     database=INFLUXDB_DATABASE
# )

# # Function to write the "scotland" ID only once
# def write_location_once():
#     try:
#         point = (
#             Point("location_data")
#             .field("location", "scotland")
#             .time(int(time.time() * 1e9))
#         )
#         client.write(record=point)
#         print("✅ Successfully inserted location ID: 'scotland' into InfluxDB")
#     except Exception as e:
#         print(f"❌ Error writing location to InfluxDB: {e}")

# # Function to write a constant 49 Hz frequency continuously
# def write_constant_frequency():
#     i = 1
#     try:
#         while True:
#             frequency = 49.0  # Constant 49 Hz
#             timestamp = int(time.time() * 1e9)

#             point = (
#                 Point("frequency_measurements")
#                 .field("frequency", frequency)
#                 .time(timestamp)
#             )

#             try:
#                 client.write(record=point)
#                 print(f"✅ {i} Inserted: Time = {timestamp}, Frequency = {frequency} Hz")
#             except Exception as e:
#                 print(f"❌ Error writing to InfluxDB: {e}")

#             i += 1
#             time.sleep(1)  # Send data every second

#     except KeyboardInterrupt:
#         print("\n❌ Interrupted by user. Stopping data writing...")
#     finally:
#         client.close()
#         print("🔌 Connection to InfluxDB closed.")

# # Run the functions
# write_location_once()
# write_constant_frequency()


# WRITE A DATA EVERY SECOND INTO INFLUXDB & SEND ONLY POSTCODE
import os
import time
import numpy as np
from influxdb_client_3 import InfluxDBClient3, Point

# InfluxDB 3.0 Cloud Configuration
INFLUXDB_HOST = "https://eu-central-1-1.aws.cloud2.influxdata.com"
INFLUXDB_TOKEN = os.getenv("INFLUXDB_TOKEN")
INFLUXDB_DATABASE = "Scotland"  # InfluxDB bucket

# Ensure the token is available
if not INFLUXDB_TOKEN:
    raise ValueError("❌ INFLUXDB_TOKEN is not set! Set it in your environment.")

# Initialize InfluxDB Client
client = InfluxDBClient3(
    host=INFLUXDB_HOST,
    token=INFLUXDB_TOKEN,
    database=INFLUXDB_DATABASE
)

# Function to continuously write frequency data with only the postcode
def write_continuous_frequencies():
    i = 1  # Counter for records
    location = "S23 8BB"  # ✅ Only send postcode

    try:
        while True:  # Infinite loop for continuous writing
            frequency = round(np.random.uniform(48, 52), 3)  # Generate random frequency
            timestamp = int(time.time() * 1e9)  # Convert current time to nanoseconds

            # Create InfluxDB point with frequency and postcode
            point = (
                Point("frequency_measurements")  # Measurement name
                .field("frequency", frequency)   # Field: frequency value
                .field("location", location)     # ✅ Send only postcode
                .time(timestamp)                 # Set timestamp explicitly
            )

            try:
                client.write(record=point)  # Write to InfluxDB
                print(f"✅ {i} Inserted: Time = {timestamp}, Frequency = {frequency} Hz, Location = {location}")
            except Exception as e:
                print(f"❌ Error writing to InfluxDB: {e}")

            i += 1  # Increment counter
            time.sleep(1)  # Wait 1 second before writing next data point

    except KeyboardInterrupt:
        print("\n❌ Interrupted by user. Stopping data writing...")
    finally:
        client.close()
        print("🔌 Connection to InfluxDB closed.")

# Start continuous frequency writing
write_continuous_frequencies()
