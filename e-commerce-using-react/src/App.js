import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductListing from './components/ProductListing'
import ProductDetails from './components/ProductDetails'

export default function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar/>
        <ProductListing/>
        <Routes>
          <Route  path='/' exact component={ProductListing}/>
          <Route path='/product/:productId'  component={ProductDetails}/>
          <Route>404 Not found !!</Route>
        </Routes>
      </Router>
    </div>
  )
}