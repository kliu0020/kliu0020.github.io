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

## Running Tests

To run tests, use the following command:
```sh
npm test
```

## Deployment

To deploy the project, follow these steps:
1. **Build the project**:
    ```sh
    npm run build
    ```
2. **Deploy the contents of the `dist` directory to your web server**.

## Contributing

If you would like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or feedback, please contact Kevin Liu at [kliu0020@example.com](mailto:kliu0020@example.com).