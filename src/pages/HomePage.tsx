import React from 'react';
import { HeroSection, RoomsSection, GallerySection, GroupsSection } from '../components/sections';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <main id="main-content" tabIndex={-1}>
        <HeroSection />
        <RoomsSection />
        <GroupsSection />
        <GallerySection />
      </main>
    </div>
  );
};

export default HomePage;