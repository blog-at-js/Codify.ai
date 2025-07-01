import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";
import axios from "axios";

function App() {
  const [code, setCode] = useState(`def sum():  \n  return a + b \n`);
  const [review, setReview] = useState("");

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode(){
      const response = await axios.post("http://localhost:8000/ai/get-review/", {code});
      setReview(response.data);
  }

  function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCode(e.target.result);
      };
      reader.readAsText(file);
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-gray-950 via-orange-900 to-black text-white p-6 gap-6">
      {/* Header */}
      <header className="w-full text-center py-4 text-3xl font-bold 
bg-gradient-to-r from-black via-[#ff6a00] to-black 
text-white drop-shadow-[0_0_5px_#ff6a00] 
shadow-[0_0_45px_#ff6a00] rounded-lg border border-orange-800
">
        Codify.ai
      </header>
      <div className="flex flex-row gap-6 w-full max-w-6xl">
        <div className="w-1/2 h-full bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 overflow-auto">
          {/*File Upload Button*/}
          <input
            type="file"
            accept=".js, .py, .css, .cpp, .cs, .ts, .html, .json, .java"
            onChange={handleFileUpload}
            className="mb-4 text-sm text-gray-400 cursor-pointer bg-gray-700 p-2 rounded-lg"
          />
          {/*Code Editor*/}

          <div className="border border-orange-800 rounded-xl p-5 bg-[#121212] shadow-[inset_6px_6px_12px_#0a0a0a,inset_-6px_-6px_12px_#1a1a1a]">
            <Editor value={code} onValueChange={(code) => setCode(code)}
              highlight={(code)=>prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              style={{fontFamily: "Fire Code, monospace", fontsize: 16}}></Editor>
          </div>

          <button onClick={reviewCode} className="w-full mt-4 py-3 text-lg font-semibold text-white bg-gradient-to-r from-orange-800 via-orange-600 to-yellow-500 hover:from-yellow-600 hover:to-orange-700 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-[0_0_25px_#ff6a00]">
            Ask Codify
          </button>
        </div>
        <div className="w-1/2 h-full bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 overflow-auto">
          <div className="text-gray-300">
          <Markdown rehypePlugins={[rehypeHighlight]}>
             {review}
             </Markdown>
          </div>

          
        </div>
      </div>
    </div>
  );
}

export default App;