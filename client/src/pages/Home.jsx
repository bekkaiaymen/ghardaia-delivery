import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import CustomBoxBuilder from '../components/CustomBoxBuilder';
import Products from '../components/Products';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
      <Navbar />
      <main className="bg-brand-dark min-h-screen">
        <Hero />
        <CustomBoxBuilder />
        <Products />
      </main>
      <Footer />
    </>
  );
};

export default Home;
