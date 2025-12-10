# Event Scheduler App

A simple, dynamic event scheduling application built with **Node.js** (Express) and **Vanilla JavaScript**.

This project automatically schedules a list of conference talks starting at 10:00 AM, inserts a fixed lunch break at 1:00 PM, and includes 10-minute transition periods between sessions.

## Features

- **Dynamic Scheduling:** Server-side logic automatically calculates start and end times based on talk duration.
- **Category Filtering:** Users can filter the schedule by category (e.g., Backend, Frontend, AI).
- **Responsive Design:** A clean, card-based UI that works on desktop and mobile.
- **REST API:** Provides a JSON endpoint (`/api/schedule`) for the schedule data.

## Project Structure

```
event-scheduler/
├── public/              # Frontend files
│   ├── index.html       # Main HTML structure
│   ├── style.css        # CSS styling
│   └── app.js           # Client-side logic (fetching & filtering)
├── server.js            # Node.js server & scheduling logic
├── package.json         # Project dependencies
└── README.md            # Project documentation
```

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/jbraunllona/juanbraun-event-talks-app.git
    cd juanbraun-event-talks-app
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the server:**
    ```bash
    node server.js
    ```

4.  **Access the application:**
    Open your browser and navigate to:
    [http://localhost:3000](http://localhost:3000)

## Usage

- **View Schedule:** The homepage displays the full schedule for the day.
- **Filter:** Use the search bar at the top to filter talks by category (e.g., type "frontend" to see only frontend-related talks).

## API

### `GET /api/schedule`

Returns the calculated schedule for the day.

**Response Example:**
```json
[
  {
    "title": "The Future of Node.js",
    "speaker": "Ryan Dahl",
    "category": "Backend",
    "startTime": "10:00 AM",
    "endTime": "10:45 AM",
    "isBreak": false,
    ...
  },
  {
    "title": "Lunch Break",
    "isBreak": true,
    "startTime": "01:00 PM",
    "endTime": "02:00 PM",
    ...
  }
]
```

## License

This project is licensed under the ISC License.
