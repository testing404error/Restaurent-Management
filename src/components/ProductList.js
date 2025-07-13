// src/components/ProductList.js

import React from 'react';
import { CContainer, CInputGroup, CFormInput, CFormSelect, CRow, CCol, CButton, CSpinner } from '@coreui/react';
import { useSelector } from 'react-redux';

// Add new prop: onMenuItemClick
const ProductList = ({
  searchProduct,
  handleSearchProduct,
  tableNumber,
  menuItemsLoading,
  filteredMenuItems,
  onMenuItemClick, // This replaces the direct addToCart call from here
  categories,
  selectedCategoryId,
  setSelectedCategoryId,
}) => {
  const theme = useSelector((state) => state.theme.theme);
  const isDarkMode = theme === 'dark';

  return (
    <CContainer className={`${isDarkMode ? 'bg-dark text-light' : 'bg-white text-dark'}`}>
      {/* Search and Table Selection */}
      <CInputGroup className="mb-3">
        <CFormInput
          placeholder="Search products..."
          className={`me-2 fs-6 fs-md-5 ${isDarkMode ? 'bg-secondary text-light' : ''}`}
          value={searchProduct}
          onChange={handleSearchProduct}
        />
        <CFormSelect className={`fs-6 fs-md-5 ${isDarkMode ? 'bg-secondary text-light' : ''}`}>
          <option>Table Number {tableNumber}</option>
        </CFormSelect>
      </CInputGroup>

      {/* Categories Slider/Horizontal Scroll */}
      <h4 className="fw-bold mb-3 fs-5 fs-md-4">Categories</h4>
      <div style={{ overflowX: 'auto', whiteSpace: 'nowrap', marginBottom: '20px' }} className="custom-scrollbar">
        <CButton
          color={!selectedCategoryId ? 'primary' : 'light'}
          className={`me-2 mb-2 ${isDarkMode && !selectedCategoryId ? 'text-white' : ''}`}
          onClick={() => setSelectedCategoryId(null)}
          style={{ minWidth: '100px' }}
        >
          All
        </CButton>
        {categories?.map((category) => (
          <CButton
            key={category.id}
            color={selectedCategoryId === category.id ? 'primary' : 'light'}
            className={`me-2 mb-2 ${isDarkMode && selectedCategoryId !== category.id ? 'text-black' : ''} ${isDarkMode && selectedCategoryId === category.id ? 'text-white' : ''}`}
            onClick={() => setSelectedCategoryId(category.id)}
            style={{ minWidth: '100px' }}
          >
            {category.categoryName}
          </CButton>
        ))}
      </div>

      {/* Products Heading */}
      <h4 className="fw-bold mb-3 fs-5 fs-md-4">Products</h4>

      {/* Loading Spinner */}
      {menuItemsLoading ? (
        <div className="text-center my-5">
          <CSpinner color="primary" />
          <p className="mt-2 fs-6">Loading products...</p>
        </div>
      ) : (
        /* Product List with 1x1 Box Layout */
        <div style={{ maxHeight: '50vh', overflowY: 'auto', paddingRight: '10px' }} className="custom-scrollbar">
          {filteredMenuItems?.length === 0 ? (
            <div className="text-center text-muted py-4">No menu items found for this category or search.</div>
          ) : (
            <CRow className="g-3">
              {filteredMenuItems?.map((product) => (
                <CCol key={product.id} xs={6} sm={4} md={3} lg={3} xl={2}>
                  <div
                    className={`d-flex flex-column align-items-center justify-content-between p-2 border rounded shadow-sm h-100 ${
                      isDarkMode ? 'bg-secondary text-light' : 'bg-white text-dark'
                    }`}
                    onClick={() => onMenuItemClick(product)} // Call the new handler
                    style={{ cursor: 'pointer', aspectRatio: '1/1' }}
                  >
                    {product.itemImage && (
                      <img
                        src={product.itemImage}
                        alt={product.itemName}
                        style={{ maxWidth: '80%', maxHeight: '60%', objectFit: 'contain', marginBottom: '8px' }}
                      />
                    )}
                    <h6 className={`mb-1 fw-bold text-center ${isDarkMode ? 'text-light' : ''}`} style={{ fontSize: '0.9rem' }}>
                      {product.itemName}
                    </h6>
                    <p className={`mb-0 ${isDarkMode ? 'text-light' : 'text-muted'}`} style={{ fontSize: '0.8rem' }}>
                      ₹{product.price}
                    </p>
                  </div>
                </CCol>
              ))}
            </CRow>
          )}
        </div>
      )}
    </CContainer>
  );
};

export default ProductList;