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

## Running Tests

To run tests, use the following command:
```sh
npm test
```

## Deployment

To deploy the project, follow these steps:
1. Build the project:
    ```sh
    npm run build
    ```
2. Deploy the contents of the `dist` directory to your web server.

## Contributing

If you would like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or feedback, please contact Kevin Liu at [kliu0020@example.com](mailto:kliu0020@example.com).