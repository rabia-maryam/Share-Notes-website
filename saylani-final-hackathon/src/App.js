import { BrowserRouter , Routes , Route } from "react-router-dom";
import Home from "./component/Home";
import Register from "./component/Register";
import Login from "./component/Login";
import CreateNotes from "./component/CreateNotes";
import EditNote from "./component/EditNote";
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/createnotes" element={<CreateNotes/>}/>
      <Route path="/editnote/:noteId" element={<EditNote/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
