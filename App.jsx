import { useCallback, useEffect, useState } from 'react'

function App(){
  let [length, setlength] = useState(1);
  let [numberAllowed, setNumberAllowed] = useState(false);
  let [charAllowed, setCharAllowed] = useState(false);
  let [password, setPassword] = useState("");
  let [strength, setStrength] = useState("weak");

   // -------- PASSWORD GENERATOR --------
  const passwordGenerator = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAllowed) str += "0123456789";
    if(charAllowed) str += "@!%$#";

    for(let i = 0; i < length; i++){
      let index = Math.floor(Math.random() * str.length);
      pass += str.charAt(index);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  useEffect(()=>{
    passwordGenerator()
  }, [length, numberAllowed, charAllowed])

  function copyPassword(){
    window.navigator.clipboard.writeText(password);
    console.log("Password Coppied!");
  }

  // -------- CHECK PASSWORD STRENGTH -------- //
  function checkStrength(password) {
    let score = 0;

    if (password.length > 6) score++;
    if (password.length > 10) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[@!%$#]/.test(password)) score++;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;

    if (score <= 1) return "weak";
    if (score <= 3) return "medium";
    return "strong";
  }

  //------- Update stength whenever password changes ------- //
  useEffect(()=>{setStrength(checkStrength(password))}, [password]);

  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
    <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-md space-y-6">

      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-800 text-center">
        Password Generator
      </h1>

      {/* Password Display */}
      <div className="flex items-center gap-2">
        <input 
          type="text" 
          readOnly 
          value={password}
          className="flex-1 border rounded-lg px-3 py-2 text-gray-700 bg-gray-50 font-mono"
        />
        <button 
          onClick={copyPassword}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Copy
        </button>
      </div>

      {/* Generate Button */}
      <button 
        onClick={passwordGenerator}
        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-semibold"
      >
        Generate Password
      </button>

      <div className="h-2 w-full bg-gray-300 rounded">
        <div className={`h-full rounded ${ strength === "weak" ? "bg-red-500 w-1/3" : strength === "medium" ? "bg-yellow-500 w-2/3" : "bg-green-500 w-full" }`}></div>
      </div>
      <p className="text-sm font-medium">
        Strength: {strength}
      </p>

      {/* Options */}
      <div className="space-y-4">

        {/* Length Slider */}
        <div>
          <label className="block font-medium text-gray-700">
            Length: <span className="font-bold">{length}</span>
          </label>
          <input
            type="range"
            min={1}
            max={20}
            value={length}
            onChange={(e)=> setlength(Number(e.target.value))}
            className="w-full accent-green-600"
          />
        </div>

        {/* Number Checkbox */}
        <div className="flex items-center gap-3">
          <input 
            type="checkbox" 
            onChange={() => setNumberAllowed(prev => !prev)}
            className="w-4 h-4 accent-blue-600"
          />
          <label className="text-gray-700 font-medium">Include Numbers</label>
        </div>

        {/* Characters Checkbox */}
        <div className="flex items-center gap-3">
          <input 
            type="checkbox" 
            onChange={() => setCharAllowed(prev => !prev)}
            className="w-4 h-4 accent-blue-600"
          />
          <label className="text-gray-700 font-medium">Include Symbols</label>
        </div>

      </div>

    </div>
  </div>
);

}

export default App;
