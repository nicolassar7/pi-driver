import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Note the import changes

import Landing from './view/Landing/landing';
import Home from './view/Home/home'
import Detail from './view/Detail/detail'
import CreateDriver from './view/CreateDriver/createDriver'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path= '/home' element={<Home />} />
        <Route path='detail/:id' element={<Detail/>}/>
        <Route path='/createDriver' element={<CreateDriver />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
