from flask import Flask, jsonify
import requests
import json

app = Flask(__name__)

# API URLs
IW_sports = "https://whalebettor.com/api/v2/CK%20Sports/Tips/API"
IW_racing = "https://whalebettor.com/api/v2/CK%20Racing/CK%20Tips/API"
IW_JumpOuts = "https://whalebettor.com/api/v2/The%20Jump%20Outs/Tips/"

def fetch_data(api_url):
    try:
        response = requests.get(api_url)
        response.raise_for_status()
        data = response.json()
        return data
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}
    except json.JSONDecodeError as e:
        return {"error": "Failed to parse JSON. The API response may not be JSON."}

@app.route('/fetch_sports')
def fetch_sports():
    data = fetch_data(IW_sports)
    return jsonify(data)

@app.route('/fetch_racing')
def fetch_racing():
    data = fetch_data(IW_racing)
    return jsonify(data)

@app.route('/fetch_jumpouts')
def fetch_jumpouts():
    data = fetch_data(IW_JumpOuts)
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True, port=5000)

