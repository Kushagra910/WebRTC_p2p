# WebRTC One-Way Real-Time Media Transmission

This application is a WebRTC (Web Real-Time Communication) implementation for one-way real-time media transmission over a WebSocket server. It allows for the transmission of video from a sender to a receiver through a WebSocket connection.

## Features

- Real-time transmission of video from a sender to a receiver.
- Uses WebRTC technology for peer-to-peer communication.
- WebSocket server facilitates communication between sender and receiver.
- Simple and lightweight implementation.

## Installation

1. Clone this repository to your local machine:

    ```bash
    git clone https://github.com/Kushagra910/WebRTC_p2p.git
    ```

2. Navigate to the frontend directory:

    ```bash
    cd frontend
    ```

3. Install dependencies using npm or yarn:

    ```bash
    npm install
    # or
    yarn install
    ```

## Usage

1. Run the WebSocket server:

    ```bash
    cd backend
    npx tsc -b
    node dist/index.js
    ```

2. Start the frontend :
     ```bash
      npm run dev
     ```

4. Open the sender application route in your browser. It will prompt you for access to your camera. Grant permission to start transmitting video.

5. Open the receiver application route in another browser window or device. You should see the transmitted video in real-time.

6. Experiment with different settings, adjust the code as needed, and integrate it into your own projects.
