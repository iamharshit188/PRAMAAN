import React from 'react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8 mb-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">About Praman</h2>
        
        <div className="space-y-6">
          <section>
            <h3 className="text-xl font-semibold mb-3 text-blue-600">Our Mission</h3>
            <p className="text-gray-700">
              Praman aims to democratize financial literacy by making complex financial statements 
              accessible to everyone. We believe that understanding financial data shouldn't be limited 
              to experts, and our AI-powered platform bridges this gap by translating technical jargon 
              into clear, actionable insights.
            </p>
          </section>
          
          <section>
            <h3 className="text-xl font-semibold mb-3 text-blue-600">How It Works</h3>
            <p className="text-gray-700">
              Our platform leverages advanced AI technology through the Gemini API to analyze financial 
              documents. Simply upload your financial statement or report, and our system will:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-gray-700 ml-4">
              <li>Extract and process the data from your document (PDF or Excel)</li>
              <li>Generate a simplified narrative explanation in plain language</li>
              <li>Identify key metrics and their significance</li>
              <li>Provide actionable recommendations</li>
              <li>Create interactive visualizations to highlight key trends</li>
              <li>Enable an AI-powered chat to answer your specific questions</li>
            </ul>
          </section>
          
          <section>
            <h3 className="text-xl font-semibold mb-3 text-blue-600">Key Features</h3>
            <div className="grid md:grid-cols-2 gap-4 mt-3">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-700 mb-2">Simplified Financial Stories</h4>
                <p className="text-gray-600">Convert complex financial data into easy-to-understand narratives that explain what's really happening with your finances.</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-700 mb-2">Visual Analytics</h4>
                <p className="text-gray-600">Dynamically generated charts and graphs that visualize your financial data in meaningful and intuitive ways.</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-700 mb-2">Interactive Chat</h4>
                <p className="text-gray-600">Ask specific questions about your financial data and receive instant, contextual responses from our AI assistant.</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-700 mb-2">PDF & Excel Support</h4>
                <p className="text-gray-600">Upload financial reports in various formats including PDF documents and Excel spreadsheets.</p>
              </div>
            </div>
          </section>
          
          <section>
            <h3 className="text-xl font-semibold mb-3 text-blue-600">Technology Stack</h3>
            <p className="text-gray-700">
              Praman is built using modern web technologies:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-gray-700 ml-4">
              <li>React.js for the frontend user interface</li>
              <li>Tailwind CSS for responsive and clean design</li>
              <li>Node.js backend for data processing</li>
              <li>PDF and Excel parsing libraries for document extraction</li>
              <li>Gemini API for AI-powered analysis</li>
              <li>Chart.js for interactive data visualization</li>
            </ul>
          </section>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-blue-600">Frequently Asked Questions</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Is my financial data secure?</h3>
            <p className="mt-2 text-gray-600">
              Yes, we take data security very seriously. Your uploaded documents are processed in memory and are not stored permanently on our servers. All data transfers are encrypted using industry-standard protocols.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900">What types of financial documents can I analyze?</h3>
            <p className="mt-2 text-gray-600">
              Praman can analyze various financial documents including balance sheets, income statements, cash flow statements, annual reports, and more. You can upload PDF files or Excel spreadsheets, or simply paste text data.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900">How accurate is the AI analysis?</h3>
            <p className="mt-2 text-gray-600">
              While our AI provides valuable insights, it's designed to be a tool that assists understanding, not replace professional financial advice. The analysis quality depends on the clarity and completeness of the input data.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900">Can I share the analysis results?</h3>
            <p className="mt-2 text-gray-600">
              Yes, you can export the analysis results as a PDF document, making it easy to share insights with colleagues, clients, or advisors.
            </p>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-8 text-gray-600">
        <p>© {new Date().getFullYear()} Praman - AI-Powered Financial Insights</p>
        <p className="mt-2">
          <a href="#" className="text-blue-600 hover:underline mx-2">Privacy Policy</a>
          <a href="#" className="text-blue-600 hover:underline mx-2">Terms of Service</a>
          <a href="mailto:contact@pramanapp.com" className="text-blue-600 hover:underline mx-2">Contact</a>
        </p>
      </div>
    </div>
  );
};

export default About; 