import requests
import json

# API URLs
IW_sports = "https://whalebettor.com/api/v2/CK%20Sports/Tips/API"
IW_racing = "https://whalebettor.com/api/v2/CK%20Racing/CK%20Tips/API"
IW_JumpOuts = "https://whalebettor.com/api/v2/The%20Jump%20Outs/Tips/"

def fetch_data(api_url):
    try:
        # Fetch data from API
        response = requests.get(api_url)
        response.raise_for_status()  # Raise an exception in case of HTTP errors
        data = response.json()

        # Prettify JSON output
        formatted_data = json.dumps(data, indent=4)
        print(formatted_data)

    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")
    except json.JSONDecodeError as e:
        print(f"Failed to parse JSON. The API response may not be JSON.")

# Fetch and display Sports API data
print("Sports API Data: ")
fetch_data(IW_sports)

# Uncomment below to fetch and display data for other APIs
# print("\nRacing API Data: ")
# fetch_data(IW_racing)

# print("\nJumpOuts API Data: ")
# fetch_data(IW_JumpOuts)
