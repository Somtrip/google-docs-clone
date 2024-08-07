import TextEditot from "./TextEditot";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import {v4 as uuidV4} from 'uuid'

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={ <Link to={`/documents/${uuidV4()}`}  />}>
        
        </Route>
        <Route path="/documents/:id" element={ <TextEditot /> }>
        
        </Route>
      </Routes>
      
    </Router>
  );
}

export default App;
