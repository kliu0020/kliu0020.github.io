# Project Setup

## Prerequisites
- Node.js and npm
- Python 3.x

## Setup Instructions

1. **Clone the repository**:
   ```sh
   git clone https://github.com/kliu0020/kliu0020.github.io.git
   cd kliu0020.github.io

1. run `npm install`
2. run `python -m venv venv`
3. run `venv\Scripts\activate`
4. Under `scripts` in your package.json file add this line `"dev": "vite",`
5. To run the IW Racing information set up your virtual environment
6. **Install Python dependencies**:
    ```sh
    pip install -r requirements.txt
    ```
7. **Start the server**:
    ```sh
    python server.py
    ```
8. **Start the development server**:
    ```sh
    npm run dev
    ```

## Accessing the Application

Open your browser and navigate to [http://127.0.0.1:5000](http://127.0.0.1:5000) to access the Flask server.  
Open your browser and navigate to [http://localhost:5173](http://localhost:5173) to access the Vite development server.

## Fetching Data

Use the buttons on the webpage to fetch data from the APIs:
- **Fetch Sports Data**
- **Fetch Racing Data**
- **Fetch JumpOuts Data**

## Contributing

If you would like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or feedback, please contact Kevin Liu at [kliu0020@example.com](mailto:kliu0020@example.com).