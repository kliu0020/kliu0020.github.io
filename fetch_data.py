import requests
import json

# API URLs
IW_sports = "https://whalebettor.com/api/v2/CK%20Sports/Tips/API"
IW_racing = "https://whalebettor.com/api/v2/CK%20Racing/CK%20Tips/API"
IW_JumpOuts = "https://whalebettor.com/api/v2/The%20Jump%20Outs/Tips/"

def fetch_data(api_url, output_file):
    try:
        # Fetch data from API
        response = requests.get(api_url)
        response.raise_for_status()  # Raise an exception in case of HTTP errors
        data = response.json()

        # Prettify JSON output
        formatted_data = json.dumps(data, indent=4)

        # Write the data to a file
        with open(output_file, "w", encoding="utf-8") as file:
            file.write(formatted_data)

        print(f"Data successfully written to {output_file}")

    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")
    except json.JSONDecodeError as e:
        print(f"Failed to parse JSON. The API response may not be JSON: {e}")

# Fetch and save Sports API data
print("Fetching Sports API data...")
fetch_data(IW_sports, "sports_api_data.json")

# Uncomment below to fetch and save data for other APIs
# print("\nFetching Racing API data...")
# fetch_data(IW_racing, "racing_api_data.json")

# print("\nFetching JumpOuts API data...")
# fetch_data(IW_JumpOuts, "jumpouts_api_data.json")
