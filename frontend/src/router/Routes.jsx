import React from 'react';
import { Routes as RouterRoutes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Browse from '../pages/Browse';
import SearchResults from '../pages/SearchResults';
import CuisineDetail from '../pages/CuisineDetail';
import DishDetail from '../pages/DishDetail';

/**
 * PUBLIC_INTERFACE
 * Routes component defines app route structure.
 * Paths:
 * - /           Home page
 * - /browse     Browse page with filters and pagination
 * - /search     Search results page reading "q" from query string
 * - /cuisine/:id Cuisine details page
 * - /dish/:id   Dish details page
 */
export default function Routes() {
  return (
    <RouterRoutes>
      <Route path="/" element={<Home />} />
      <Route path="/browse" element={<Browse />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/cuisine/:id" element={<CuisineDetail />} />
      <Route path="/dish/:id" element={<DishDetail />} />
    </RouterRoutes>
  );
}
