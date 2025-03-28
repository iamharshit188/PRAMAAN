# Praman - AI-Powered Financial Statement Simplifier

Praman is an advanced web application that uses AI to simplify complex financial statements for users without financial expertise. The application leverages Google's Gemini API to analyze financial data from uploaded PDFs, Excel files, or text input, and generates easy-to-understand narratives, recommendations, and visualizations.

## 🌟 Features

- **Simplified Financial Stories**: Converts complex financial data into easily comprehensible narratives
- **Key Metrics Analysis**: Identifies and explains important financial metrics and their significance
- **Visual Analytics**: Generates dynamic Chart.js visualizations to represent financial data trends
- **Interactive Chat**: Ask questions about your financial data and get instant AI-powered responses
- **File Support**: Upload PDF or Excel files containing financial statements
- **Text Input**: Directly paste financial data for quick analysis
- **Export**: Download analysis results as a PDF document

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS, Chart.js
- **Backend**: Node.js, Express
- **AI**: Google Gemini API
- **Document Processing**: pdf-parse, exceljs

## 🚀 Getting Started

### Prerequisites

- Node.js 14+
- Google Gemini API key - [Get one here](https://ai.google.dev/)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/praman.git
cd praman
```

2. **Backend Setup**

```bash
cd backend-node
npm install
cp .env.example .env
# Edit .env and add your Gemini API key
```

3. **Frontend Setup**

```bash
cd frontend
npm install
cp .env.example .env
```

4. **Start the application**

In one terminal (backend):
```bash
cd backend-node
npm start
```

In another terminal (frontend):
```bash
cd frontend
npm start
```

The application will be available at http://localhost:3001

## 📚 How to Use

1. **Navigate** to the home page
2. **Upload** a financial document (PDF/Excel) or paste financial text data
3. **Review** the simplified explanation, key metrics, and recommendations
4. **Explore** the visual analytics by clicking the "In-depth Visual Analytics" button
5. **Ask questions** using the chat interface for specific information about your financial data
6. **Export** your analysis results as a PDF if needed

## 🔑 Environment Variables

### Backend (.env)
- `PORT`: Server port (default: 3000)
- `GEMINI_API_KEY`: Your Google Gemini API key
- `CORS_ORIGIN`: Frontend URL for CORS (default: http://localhost:3001)
- `NODE_ENV`: Environment (development/production)

### Frontend (.env)
- `REACT_APP_API_URL`: Backend API URL (default: http://localhost:3000/api)

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Google Gemini API](https://ai.google.dev/)
- [Chart.js](https://www.chartjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React.js](https://reactjs.org/)

---

Built with ❤️ for making financial literacy accessible to everyone. 