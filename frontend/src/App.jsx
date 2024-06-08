import { BrowserRouter, Route, Routes } from "react-router-dom"
import Homepage from "./pages/Homepage"
import Registerpage from './pages/Registerpage'
import Loginpage from './pages/Loginpage'
import { Provider } from "react-redux"
import { store } from "./redux/store"
import CreateListing from "./pages/CreateListing"
import ListingDetails from "./pages/ListingDetails"
import Bookings from "./pages/Bookings"
import WishList from "./pages/WishList"
import PropertyList from "./pages/PropertyList"
import ReservationList from "./pages/ReservationList"
import CategoryPage from "./pages/CategoryPage"
import SearchPage from "./pages/SearchPage"

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Registerpage />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/listing/:id" element={<ListingDetails />} />
          <Route path="/listing/category/:category" element={<CategoryPage />} />
          <Route path="/listing/search/:search" element={<SearchPage />} />
          <Route path="/:id/bookings" element={<Bookings />} />
          <Route path="/:id/wishList" element={<WishList />} />
          <Route path="/:id/properties" element={<PropertyList />} />
          <Route path="/:id/reservations" element={<ReservationList />} />

        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
