// Sample data - In production, this would come from a backend
let orders = JSON.parse(localStorage.getItem('coffeeOrders')) || [
    {
        id: 'ORD-001',
        date: '2026-03-05',
        status: 'delivered',
        items: [
            {
                name: 'Espresso Blend Premium',
                quantity: 2,
                price: 24.99,
                image: 'img/espresso.jpg'
            },
            {
                name: 'Cappuccino Classic',
                quantity: 1,
                price: 18.99,
                image: 'img/cappuccino.jpg'
            }
        ],
        total: 68.97
    },
    {
        id: 'ORD-002',
        date: '2026-03-08',
        status: 'processing',
        items: [
            {
                name: 'Cold Brew Coffee',
                quantity: 3,
                price: 15.99,
                image: 'img/coldbrew.jpg'
            }
        ],
        total: 47.97
    },
    {
        id: 'ORD-003',
        date: '2026-03-09',
        status: 'pending',
        items: [
            {
                name: 'Mocha Delight',
                quantity: 1,
                price: 22.99,
                image: 'img/mocha.jpg'
            },
            {
                name: 'Latte Macchiato',
                quantity: 2,
                price: 19.99,
                image: 'img/latte.jpg'
            }
        ],
        total: 62.97
    }
];

let returns = JSON.parse(localStorage.getItem('coffeeReturns')) || [];
let refunds = JSON.parse(localStorage.getItem('coffeeRefunds')) || [];

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    renderOrders();
    renderReturns();
    renderRefunds();
    populateReturnOrderSelect();
});

// Tab switching
function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabName + '-tab').classList.add('active');
    
    // Add active class to clicked button
    event.target.closest('.tab-btn').classList.add('active');
}

// Render Orders
function renderOrders(filter = 'all') {
    const container = document.getElementById('ordersContainer');
    
    let filteredOrders = orders;
    if (filter !== 'all') {
        filteredOrders = orders.filter(order => order.status === filter);
    }
    
    if (filteredOrders.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-box-open"></i>
                <p>No orders found</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = filteredOrders.map(order => `
        <div class="order-card">
            <div class="order-header">
                <div>
                    <div class="order-id">Order #${order.id}</div>
                    <div class="order-date">
                        <i class="fas fa-calendar"></i> ${formatDate(order.date)}
                    </div>
                </div>
                <span class="order-status status-${order.status}">
                    ${order.status}
                </span>
            </div>
            
            <div class="order-items">
                ${order.items.map(item => `
                    <div class="order-item">
                        <img src="${item.image}" alt="${item.name}" class="item-image" onerror="this.src='img/placeholder-coffee.jpg'">
                        <div class="item-details">
                            <div class="item-name">${item.name}</div>
                            <div class="item-quantity">Quantity: ${item.quantity}</div>
                        </div>
                        <div class="item-price">$${item.price.toFixed(2)}</div>
                    </div>
                `).join('')}
            </div>
            
            <div class="order-footer">
                <div class="order-total">
                    Total: $${order.total.toFixed(2)}
                </div>
                <div class="order-actions">
                    <button class="btn-primary" onclick="viewOrderDetails('${order.id}')">
                        <i class="fas fa-eye"></i> View Details
                    </button>
                    ${order.status === 'delivered' ? `
                        <button class="btn-secondary" onclick="openReturnModal('${order.id}')">
                            <i class="fas fa-undo"></i> Return
                        </button>
                    ` : ''}
                    ${order.status === 'pending' ? `
                        <button class="btn-danger" onclick="cancelOrder('${order.id}')">
                            <i class="fas fa-times"></i> Cancel
                        </button>
                    ` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

// Filter orders
function filterOrders() {
    const filter = document.getElementById('orderFilter').value;
    renderOrders(filter);
}

// Render Returns
function renderReturns() {
    const container = document.getElementById('returnsContainer');
    
    if (returns.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-undo"></i>
                <p>No return requests</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = returns.map(ret => `
        <div class="return-card">
            <div class="return-header">
                <div class="return-info">
                    <div class="order-id">Return Request #${ret.id}</div>
                    <div class="order-date">
                        <i class="fas fa-calendar"></i> ${formatDate(ret.date)}
                    </div>
                    <div class="return-reason">
                        <i class="fas fa-info-circle"></i> ${formatReason(ret.reason)}
                    </div>
                </div>
                <span class="order-status status-${ret.status}">
                    ${ret.status}
                </span>
            </div>
            
            <div class="return-description">
                <strong>Description:</strong> ${ret.description}
            </div>
            
            <div>
                <strong>Order ID:</strong> ${ret.orderId} | 
                <span class="refund-method">
                    <i class="fas fa-money-bill-wave"></i> ${formatRefundMethod(ret.refundMethod)}
                </span>
            </div>
        </div>
    `).join('');
}

// Render Refunds
function renderRefunds() {
    const container = document.getElementById('refundsContainer');
    
    if (refunds.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-money-bill-wave"></i>
                <p>No refunds processed</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = refunds.map(refund => `
        <div class="refund-card">
            <div class="order-header">
                <div>
                    <div class="order-id">Refund #${refund.id}</div>
                    <div class="order-date">
                        <i class="fas fa-calendar"></i> ${formatDate(refund.date)}
                    </div>
                    <div class="refund-amount">$${refund.amount.toFixed(2)}</div>
                </div>
                <span class="refund-status status-${refund.status}">
                    ${refund.status}
                </span>
            </div>
            <div style="margin-top: 15px; color: #666;">
                <strong>Order ID:</strong> ${refund.orderId}<br>
                <strong>Method:</strong> ${formatRefundMethod(refund.method)}<br>
                ${refund.status === 'completed' ? `<strong>Processed on:</strong> ${formatDate(refund.processedDate)}` : ''}
            </div>
        </div>
    `).join('');
}

// Modal functions
function openReturnModal(orderId = null) {
    const modal = document.getElementById('returnModal');
    modal.style.display = 'block';
    
    if (orderId) {
        document.getElementById('returnOrderId').value = orderId;
    }
}

function closeReturnModal() {
    document.getElementById('returnModal').style.display = 'none';
    document.getElementById('returnForm').reset();
}

function openOrderDetailsModal() {
    document.getElementById('orderDetailsModal').style.display = 'block';
}

function closeOrderDetailsModal() {
    document.getElementById('orderDetailsModal').style.display = 'none';
}

// View order details
function viewOrderDetails(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    
    const content = `
        <h2><i class="fas fa-box"></i> Order Details - #${order.id}</h2>
        <div class="order-info" style="margin: 20px 0;">
            <p><strong>Order Date:</strong> ${formatDate(order.date)}</p>
            <p><strong>Status:</strong> <span class="order-status status-${order.status}">${order.status}</span></p>
        </div>
        
        <h3 style="margin: 20px 0;">Items</h3>
        <div class="order-items">
            ${order.items.map(item => `
                <div class="order-item">
                    <img src="${item.image}" alt="${item.name}" class="item-image" onerror="this.src='img/placeholder-coffee.jpg'">
                    <div class="item-details">
                        <div class="item-name">${item.name}</div>
                        <div class="item-quantity">Quantity: ${item.quantity}</div>
                    </div>
                    <div class="item-price">$${item.price.toFixed(2)}</div>
                </div>
            `).join('')}
        </div>
        
        <div style="margin-top: 20px; padding-top: 20px; border-top: 2px solid #e0e0e0;">
            <div class="order-total">Total: $${order.total.toFixed(2)}</div>
        </div>
    `;
    
    document.getElementById('orderDetailsContent').innerHTML = content;
    openOrderDetailsModal();
}

// Submit return request
function submitReturn(event) {
    event.preventDefault();
    
    const orderId = document.getElementById('returnOrderId').value;
    const reason = document.getElementById('returnReason').value;
    const description = document.getElementById('returnDescription').value;
    const refundMethod = document.getElementById('refundMethod').value;
    
    const newReturn = {
        id: 'RET-' + String(returns.length + 1).padStart(3, '0'),
        orderId: orderId,
        date: new Date().toISOString().split('T')[0],
        reason: reason,
        description: description,
        refundMethod: refundMethod,
        status: 'pending'
    };
    
    returns.push(newReturn);
    localStorage.setItem('coffeeReturns', JSON.stringify(returns));
    
    renderReturns();
    closeReturnModal();
    
    alert('Return request submitted successfully! We will process it within 24-48 hours.');
}

// Cancel order
function cancelOrder(orderId) {
    if (confirm('Are you sure you want to cancel this order?')) {
        const orderIndex = orders.findIndex(o => o.id === orderId);
        if (orderIndex !== -1) {
            orders[orderIndex].status = 'cancelled';
            localStorage.setItem('coffeeOrders', JSON.stringify(orders));
            renderOrders();
            alert('Order cancelled successfully!');
        }
    }
}

// Populate return order select
function populateReturnOrderSelect() {
    const select = document.getElementById('returnOrderId');
    const deliveredOrders = orders.filter(o => o.status === 'delivered');
    
    select.innerHTML = '<option value="">Select an order</option>' +
        deliveredOrders.map(order => 
            `<option value="${order.id}">Order #${order.id} - ${formatDate(order.date)}</option>`
        ).join('');
}

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function formatReason(reason) {
    const reasons = {
        'defective': 'Defective Product',
        'wrong-item': 'Wrong Item',
        'not-as-described': 'Not as Described',
        'quality': 'Quality Issues',
        'expired': 'Expired Product',
        'other': 'Other'
    };
    return reasons[reason] || reason;
}

function formatRefundMethod(method) {
    const methods = {
        'original': 'Original Payment Method',
        'store-credit': 'Store Credit',
        'exchange': 'Exchange'
    };
    return methods[method] || method;
}

// Close modal when clicking outside
window.onclick = function(event) {
    const returnModal = document.getElementById('returnModal');
    const detailsModal = document.getElementById('orderDetailsModal');
    
    if (event.target === returnModal) {
        closeReturnModal();
    }
    if (event.target === detailsModal) {
        closeOrderDetailsModal();
    }
}