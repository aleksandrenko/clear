import { useState } from 'react'
import './App.css'
import {PrimaryButton} from "@fluentui/react";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <PrimaryButton>Hello world</PrimaryButton>
    </div>
  )
}

export default App
