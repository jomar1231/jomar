// Search utility functions for products
export function searchProducts(products, searchTerm) {
    const term = searchTerm.toLowerCase().trim();
    
    if (term === '') {
        return products;
    }
    
    return products.filter(product => 
        product.name.toLowerCase().includes(term)
    );
}

// Advanced search with multiple fields
export function advancedSearchProducts(products, filters) {
    return products.filter(product => {
        // Search by name
        if (filters.name) {
            if (!product.name.toLowerCase().includes(filters.name.toLowerCase())) {
                return false;
            }
        }
        
        // Search by price range
        if (filters.minPrice !== undefined && product.priceCents / 100 < filters.minPrice) {
            return false;
        }
        
        if (filters.maxPrice !== undefined && product.priceCents / 100 > filters.maxPrice) {
            return false;
        }
        
        // Search by rating
        if (filters.minRating !== undefined && product.rating.count < filters.minRating) {
            return false;
        }
        
        return true;
    });
}

// Get unique product names for autocomplete
export function getProductNames(products) {
    return [...new Set(products.map(p => p.name))].sort();
}

// Suggest products based on partial input
export function getSuggestions(products, searchTerm, limit = 5) {
    const term = searchTerm.toLowerCase().trim();
    
    if (term === '') {
        return [];
    }
    
    return products
        .filter(product => product.name.toLowerCase().includes(term))
        .slice(0, limit)
        .map(product => product.name);
}
