# ✈️ TravelAI – AI-Powered Smart Travel Planner

An intelligent AI-powered travel planning application that helps users explore destinations and create personalized travel itineraries based on their preferences.

TravelAI uses Google's Gemini AI with a React frontend and FastAPI backend to simplify trip planning and deliver an organized travel experience.

## 🌍 Project Overview

Planning a trip involves researching destinations, discovering attractions, organizing daily activities, exploring local cuisines, and managing travel schedules.

TravelAI aims to simplify this process through an AI-powered travel assistant that transforms user travel preferences into structured and personalized travel plans.

Users can explore destination recommendations, view organized itineraries, discover popular attractions, and explore local food suggestions through an interactive interface.

## ✨ Key Features

- **AI-Powered Trip Planning:** Generate personalized travel plans using Google Gemini.
- **Personalized Itineraries:** Organize travel activities into a structured itinerary.
- **Destination Exploration:** Discover interesting destinations and attractions.
- **Interactive Travel Dashboard:** Access trip information through an organized interface.
- **Destination Gallery:** Explore destinations through a visual gallery featuring six destination cards.
- **Travel Summary:** View important trip information through summary cards.
- **Map-Based Timeline:** Present travel activities in an organized map and timeline experience.
- **Food Guide:** Explore local food recommendations and culinary experiences.
- **Responsive Interface:** Designed to provide an accessible experience across different screen sizes.

## 🛠️ Technology Stack

| Component | Technology |
|---|---|
| Frontend | React.js |
| Backend | Python, FastAPI |
| Generative AI | Google Gemini API |
| API Communication | REST API |
| Frontend Styling | CSS |
| Development Tools | VS Code, Git, GitHub |

## 🏗️ System Architecture

The application follows a frontend-backend architecture.

1. **User Interaction:** Users enter their travel requirements through the React interface.
2. **API Communication:** The frontend sends trip information to the FastAPI backend.
3. **AI Processing:** The backend processes the request using Google Gemini.
4. **Trip Generation:** Gemini generates travel recommendations and itinerary content.
5. **Response Handling:** The backend returns the generated information through the API.
6. **Frontend Rendering:** React displays the generated travel information in an organized interface.

## 🔄 Application Workflow

User Input  
↓  
React Frontend  
↓  
FastAPI Backend  
↓  
Google Gemini API  
↓  
AI-Generated Travel Information  
↓  
REST API Response  
↓  
TravelAI Dashboard  
↓  
Personalized Travel Experience

## 📁 Project Structure

```text
Travel-Agent-Planner/
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── ...
│
├── README.md
└── .gitignore
```

*The directory structure above is illustrative. Update it to match the actual repository.*

## ⚙️ Installation and Setup

### Prerequisites

- Node.js and npm
- Python 3.10+
- Google Gemini API key
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/srinikhithareddy/Travel-Agent-Planner.git
```

```bash
cd Travel-Agent-Planner
```

### 2. Backend Setup

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate it on Windows:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Configure your Gemini API key using the environment variable expected by the backend.

Start the FastAPI application using the actual application entry point configured in your project.

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in your terminal.

## 🔌 Backend API

| Method | Endpoint | Description |
|---|---|---|
| POST | `/generate-trip` | Generates an AI-powered travel plan |

The API accepts travel information from the frontend and returns AI-generated trip planning information.

Refer to the backend implementation for the exact request and response schemas.

## 🔐 Environment Configuration

The backend requires a Google Gemini API key.

Example:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Keep API keys private. Never commit `.env` files or credentials to GitHub.

## 🎯 Project Objectives

1. Develop an AI-powered travel planning application.
2. Generate personalized itineraries using generative AI.
3. Simplify destination and attraction discovery.
4. Organize travel information into an interactive dashboard.
5. Integrate React with a Python-based backend.
6. Demonstrate practical applications of Large Language Models.

## 🚀 Future Enhancements

- Real-time weather information.
- Interactive navigation and route optimization.
- Live flight and hotel API integrations.
- User authentication and profile management.
- Save, edit, and share travel itineraries.
- Multi-destination trip planning.
- Budget tracking and expense estimation.
- Mobile application support.

## ⚠️ Important Note

TravelAI provides AI-generated travel recommendations. Generated prices, schedules, availability, and destination information should be independently verified before making travel arrangements.

The application should not be considered a live booking platform unless real booking-provider integrations are implemented.

## 👩‍💻 Author

**Srinikhitha Reddy**

GitHub: https://github.com/srinikhithareddy

Project Repository: https://github.com/srinikhithareddy/Travel-Agent-Planner

---

⭐ If you find this project interesting, consider giving the repository a star!

**Built with ❤️ using React, FastAPI, and Google Gemini.**
