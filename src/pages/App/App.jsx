import debug from "debug"

// this enables debug module at the App.jsx only, this replaces console.log, you can see it at the browser devtool, enable the verbose level at web console
const log = debug('mern:pages:App:App');
localStorage.debug = 'mern:*';

function App() {
  log("Test this is insde the App")
  return (
    <>
      <main className='App'>App</main>
    </>
  )
}

export default App
