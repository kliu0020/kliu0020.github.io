# Project Setup

## Prerequisites
- Node.js and npm
- Python 3.x

## Setup Instructions

1. **Clone the repository**:
    ```sh
    git clone https://github.com/kliu0020/kliu0020.github.io.git
    cd kliu0020.github.io
    ```

2. **Install Node.js dependencies**:
    ```sh
    npm install
    ```

3. **Set up Python virtual environment**:
    ```sh
    python -m venv venv
    venv\Scripts\activate
    ```

4. **Add development script**:
    Under `scripts` in your `package.json` file, add this line:
    ```json
    "dev": "vite"
    ```

5. **Install Python dependencies**:
    ```sh
    pip install -r requirements.txt
    ```

6. **Start the server**:
    ```sh
    python server.py
    ```

7. **Start the development server**:
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