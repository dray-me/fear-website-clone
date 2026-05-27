import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Commands from './pages/Commands'
import Avatars from './pages/Avatars'
import Quests from './pages/Quests'
import Status from './pages/Status'
import Terms from './pages/Terms'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="commands" element={<Commands />} />
          <Route path="avatars" element={<Avatars />} />
          <Route path="quests" element={<Quests />} />
          <Route path="status" element={<Status />} />
          <Route path="terms" element={<Terms />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
