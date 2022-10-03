import './styles/main.css';
interface ButtonProps {
  title: string;
}

function Button(props: ButtonProps) {
  return (
    <button>
      {props.title}
    </button>
  )
}

function App() {
  return (
    <div className="w-8 h-8 bg-black light:bg-violet-500">

    </div>
  )
}

export default App
