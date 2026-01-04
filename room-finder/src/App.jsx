import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import AddRoom from './pages/AddRoom';
import MyRooms from './pages/MyRooms';
import Navbar from './components/Navbar';
import EditRoom from './pages/EditRoom';
import RoomDetail from './pages/RoomDetails';


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-room" element={<AddRoom />} />
        <Route path="/my-rooms" element={<MyRooms />} />
        <Route path="/edit-room/:id" element={<EditRoom />} />
        <Route path='/room/:id' element={<RoomDetail/>} />
      </Routes>
    </>
  );
}

export default App;
