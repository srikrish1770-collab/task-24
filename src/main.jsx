import React from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import {MotionConfig} from 'framer-motion';
import {CollectionProvider} from './context/CollectionContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import {Collection,Browse,Wishlist} from './pages/Collection';
import Details,{Comparison} from './pages/Details';
import DemoForm from './pages/DemoForm';
import {About,FAQ,NotFound} from './pages/Supporting';
import './styles.css';
createRoot(document.getElementById('root')).render(<React.StrictMode><BrowserRouter><MotionConfig reducedMotion="user"><CollectionProvider><Routes><Route element={<Layout/>}><Route index element={<Home/>}/><Route path="collection" element={<Collection/>}/><Route path="cars/:id" element={<Details/>}/><Route path="brands" element={<Browse type="Brands"/>}/><Route path="categories" element={<Browse type="Categories"/>}/><Route path="wishlist" element={<Wishlist/>}/><Route path="compare" element={<Comparison/>}/><Route path="test-drive" element={<DemoForm key="booking"/>}/><Route path="enquiry" element={<DemoForm key="enquiry" mode="enquiry"/>}/><Route path="contact" element={<DemoForm key="contact" mode="contact"/>}/><Route path="about" element={<About/>}/><Route path="faq" element={<FAQ/>}/><Route path="*" element={<NotFound/>}/></Route></Routes></CollectionProvider></MotionConfig></BrowserRouter></React.StrictMode>);

