

function saveAll(state) {
    localStorage.setItem('reviews', JSON.stringify(state.reviews));
    localStorage.setItem('comments', JSON.stringify(state.comments));
    localStorage.setItem('returns', JSON.stringify(state.returns));
    localStorage.setItem('orders', JSON.stringify(state.orders));
}

function loadState() {
    return {
        reviews: JSON.parse(localStorage.getItem('reviews') || '[]'),
        comments: JSON.parse(localStorage.getItem('comments') || '[]'),
        returns: JSON.parse(localStorage.getItem('returns') || '[]'),
        orders: JSON.parse(localStorage.getItem('orders') || '[]'),
    };
}

function renderStars(rating) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
        html += `<i class="fa fa-star${i <= rating ? ' selected' : ''}"></i>`;
    }
    return html;
}

function setupPage() {
    const state = loadState();
    const reviewForm = document.getElementById('review-form');
    const commentForm = document.getElementById('comment-form');
    const returnForm = document.getElementById('return-form');
    const trackForm = document.getElementById('track-form');
    const reviewsList = document.getElementById('reviews-list');
    const commentsList = document.getElementById('comments-list');
    const avgRatingEl = document.getElementById('average-rating');
    const returnResponse = document.getElementById('return-response');
    const trackStatus = document.getElementById('track-status');
    const ordersListEl = document.getElementById('orders-list');

    let currentRating = 0;
    const stars = reviewForm.querySelectorAll('.review-star');

    function updateStarDisplay(r) {
        stars.forEach(s => {
            s.classList.toggle('selected', parseInt(s.dataset.value, 10) <= r);
        });
    }

    stars.forEach(star => {
        star.addEventListener('click', () => {
            currentRating = parseInt(star.dataset.value, 10);
            updateStarDisplay(currentRating);
        });
        star.addEventListener('mouseover', () => {
            updateStarDisplay(parseInt(star.dataset.value, 10));
        });
        star.addEventListener('mouseout', () => {
            updateStarDisplay(currentRating);
        });
    });

    function renderReviews() {
        reviewsList.innerHTML = state.reviews
            .map((r, idx) => {
                return `
                <div class="review-item">
                    <div class="stars-display">${renderStars(r.rating)}</div>
                    <p>${r.text}</p>
                    <small>${new Date(r.date).toLocaleString()}</small>
                    <button class="delete-review" data-index="${idx}">Delete</button>
                </div>
            `;
            })
            .join('');
        const avg =
            state.reviews.reduce((a, v) => a + v.rating, 0) /
            (state.reviews.length || 1);
        avgRatingEl.textContent =
            'Average Rating: ' + avg.toFixed(1) + ' / 5';
    }

    function renderComments() {
        commentsList.innerHTML = state.comments
            .map((c, idx) => {
                return `
                <div class="comment-item">
                    <p>${c.text}</p>
                    <small>${new Date(c.date).toLocaleString()}</small>
                    <button class="delete-comment" data-index="${idx}">Delete</button>
                </div>
            `;
            })
            .join('');
    }

    reviewForm.addEventListener('submit', e => {
        e.preventDefault();
        const text = reviewForm.reviewText.value.trim();
        if (currentRating === 0 || text === '') {
            return;
        }
        state.reviews.push({ rating: currentRating, text, date: Date.now() });
        saveAll(state);
        renderReviews();
        reviewForm.reset();
        currentRating = 0;
        updateStarDisplay(0);
    });

    commentsList.addEventListener('click', e => {
        if (e.target.matches('.delete-comment')) {
            const idx = parseInt(e.target.dataset.index, 10);
            state.comments.splice(idx, 1);
            saveAll(state);
            renderComments();
        }
    });

    reviewsList.addEventListener('click', e => {
        if (e.target.matches('.delete-review')) {
            const idx = parseInt(e.target.dataset.index, 10);
            state.reviews.splice(idx, 1);
            saveAll(state);
            renderReviews();
        }
    });

    commentForm.addEventListener('submit', e => {
        e.preventDefault();
        const text = commentForm.commentText.value.trim();
        if (text === '') {
            return;
        }
        state.comments.push({ text, date: Date.now() });
        saveAll(state);
        renderComments();
        commentForm.reset();
    });

    returnForm.addEventListener('submit', e => {
        e.preventDefault();
        const orderId = returnForm.orderId.value.trim();
        const reason = returnForm.reason.value;
        state.returns.push({ orderId, reason, date: Date.now() });
        saveAll(state);
        returnResponse.textContent = 'Your return request has been submitted.';
        returnForm.reset();
    });

    trackForm.addEventListener('submit', e => {
        e.preventDefault();
        const orderId = trackForm.orderId.value.trim();
        const order = state.orders.find(o => o.id === orderId);
        trackStatus.innerHTML = '';
        if (order) {
            trackStatus.textContent = order.status;
        } else {
            trackStatus.textContent = 'Order not found';
            // offer a simple way to create a placeholder order for testing
            const addBtn = document.createElement('button');
            addBtn.textContent = 'Add dummy order';
            addBtn.addEventListener('click', () => {
                state.orders.push({ id: orderId, status: 'Processing' });
                saveAll(state);
                trackStatus.textContent = 'Order added – status Processing';
                addBtn.remove();
            });
            trackStatus.appendChild(addBtn);
        }
    });

    function renderOrders() {
        ordersListEl.innerHTML = state.orders
            .map(o => `
                <div class="order-item">
                    <span>ID: ${o.id}</span> -
                    <span class="status">${o.status}</span>
                </div>
            `)
            .join('') || '<p>No orders placed yet.</p>';
    }

    // initial render
    renderReviews();
    renderComments();
    renderOrders();
}

// initialise when DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupPage);
} else {
    setupPage();
}
