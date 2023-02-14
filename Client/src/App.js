import BookStore from "./BookStore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="App">
      <BookStore />
      <ToastContainer />
    </div>
  );
}

export default App;
