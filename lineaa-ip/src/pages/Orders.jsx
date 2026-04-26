import React from 'react';
import { Link } from 'react-router-dom';

function Orders({ ordersData, allProducts }) {
  return (
    <div className="orders-page">
      <section className="page-header">
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>Orders</span>
        </div>
        <h1 className="page-title">Order History</h1>
        <p className="page-subtitle">A chronicle of your journey into the World of Lineaa.</p>
      </section>

      <div className="shop-container" style={{ padding: '0 48px 100px', maxWidth: '1200px', margin: '0 auto' }}>
        {ordersData.length === 0 ? (
          <div className="empty-state" style={{ textAlign: 'center', padding: '100px 0' }}>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '30px' }}>You haven't placed any orders yet.</p>
            <Link to="/shop" className="login-btn" style={{ textDecoration: 'none', display: 'inline-block', width: 'auto', padding: '12px 40px' }}>
              Begin Your Collection
            </Link>
          </div>
        ) : (
          <div className="orders-list">
            {ordersData.map((order, index) => (
              <div key={index} className="order-item" style={{ 
                background: 'var(--color-surface)', 
                border: '1px solid var(--color-border)', 
                borderRadius: '12px', 
                marginBottom: '30px',
                overflow: 'hidden'
              }}>
                <div className="order-header" style={{ 
                  padding: '20px', 
                  borderBottom: '1px solid var(--color-border)',
                  background: 'rgba(33, 128, 141, 0.03)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Order Placed</span>
                    <div style={{ fontWeight: '600' }}>{order.date}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Total</span>
                    <div style={{ fontWeight: '600' }}>€{order.total.toLocaleString()}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Order ID</span>
                    <div style={{ fontWeight: '600' }}>#{Math.random().toString(36).substr(2, 9).toUpperCase()}</div>
                  </div>
                </div>
                
                <div className="order-content" style={{ padding: '20px' }}>
                  {order.items.map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: '20px', alignItems: 'center', padding: '10px 0' }}>
                      <img 
                        src={allProducts?.find(p => p.id === item.id)?.img || item.img} 
                        alt={item.name} 
                        style={{ width: '80px', height: '80px', borderRadius: '8px', objectFit: 'cover' }} 
                        onError={(e) => {
                          const fallback = allProducts?.find(p => p.id === item.id)?.img;
                          if (fallback) e.target.src = fallback;
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: '500', fontSize: '16px' }}>{item.name}</div>
                        <div style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>Qty: {item.qty}</div>
                        <div style={{ color: 'var(--color-primary)', fontWeight: '600', marginTop: '5px' }}>€{item.price.toLocaleString()}</div>
                      </div>
                      <Link to={`/product/${item.id}`} className="search-tag" style={{ textDecoration: 'none' }}>Buy Again</Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
