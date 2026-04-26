import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function Checkout({ cartData, addOrder, profileData }) {
  const { currentUser } = useAuth();
  const [isOrdered, setIsOrdered] = React.useState(false);
  const subtotal = cartData.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal > 1000 ? 0 : 50;
  const total = subtotal + shipping;

  const handlePlaceOrder = () => {
    const newOrder = {
      items: [...cartData],
      total: total,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      timestamp: new Date().getTime()
    };
    addOrder(newOrder);
    setIsOrdered(true);
  };

  if (isOrdered) {
    return (
      <div className="checkout-page" style={{ textAlign: 'center', padding: '150px 20px' }}>
        <div style={{ fontSize: '64px', marginBottom: '20px' }}>✨</div>
        <h1 className="page-title">Thank You, {profileData.fullName || currentUser.email.split('@')[0]}</h1>
        <p className="page-subtitle" style={{ margin: '0 auto 40px' }}>Your order has been received and is being prepared with artisan care.</p>
        <Link to="/orders" className="login-btn" style={{ textDecoration: 'none', display: 'inline-block', width: 'auto', padding: '12px 40px' }}>
          View Order History
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <section className="page-header">
        <h1 className="page-title">Secure Checkout</h1>
        <p className="page-subtitle">Complete your purchase from the World of Lineaa.</p>
      </section>

      <div className="shop-container" style={{ padding: '0 48px 100px', display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '60px', maxWidth: '1400px', margin: '0 auto' }}>
        <div className="checkout-form">
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: 'Playfair Display', fontSize: '24px', marginBottom: '20px' }}>1. Delivery Address</h2>
            <div className="profile-info" style={{ textAlign: 'left', padding: '20px', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '8px' }}>
              <p><strong>{profileData.fullName || currentUser?.email}</strong></p>
              {profileData.address ? (
                <div style={{ marginTop: '10px', fontSize: '14px', lineHeight: '1.6' }}>
                  <p>{profileData.address}</p>
                  <p>{profileData.city}, {profileData.country}</p>
                  <p>{profileData.phone}</p>
                </div>
              ) : (
                <p style={{ marginTop: '10px', fontSize: '13px' }}>Default Address saved from account.</p>
              )}
            </div>
          </section>

          <section>
            <h2 style={{ fontFamily: 'Playfair Display', fontSize: '24px', marginBottom: '20px' }}>2. Payment Method</h2>
            <div style={{ padding: '20px', border: '1px solid var(--color-border)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ width: '40px', height: '24px', background: '#eee', borderRadius: '4px' }}></div>
              <span>Ending in 4242</span>
            </div>
          </section>
          
          <button className="login-btn" onClick={handlePlaceOrder} style={{ marginTop: '40px', padding: '18px' }}>
            Place Your Order — €{total.toLocaleString()}
          </button>
        </div>

        <div className="order-summary" style={{ background: 'var(--color-surface)', padding: '30px', borderRadius: '12px', border: '1px solid var(--color-border)', height: 'fit-content' }}>
          <h2 style={{ fontFamily: 'Playfair Display', fontSize: '24px', marginBottom: '20px' }}>Order Summary</h2>
          <div className="cart-items" style={{ marginBottom: '30px' }}>
            {cartData.map(item => (
              <div key={item.id} style={{ display: 'flex', gap: '15px', marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
                <img src={item.img} alt={item.name} style={{ width: '60px', height: '60px', borderRadius: '4px', objectFit: 'cover' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: '500' }}>{item.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Qty: {item.qty}</div>
                </div>
                <div style={{ fontWeight: '600' }}>€{(item.price * item.qty).toLocaleString()}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifySelf: 'space-between', marginBottom: '10px', fontSize: '14px' }}>
            <span style={{flex: 1}}>Subtotal</span>
            <span>€{subtotal.toLocaleString()}</span>
          </div>
          <div style={{ display: 'flex', justifySelf: 'space-between', marginBottom: '10px', fontSize: '14px' }}>
            <span style={{flex: 1}}>Shipping</span>
            <span>{shipping === 0 ? 'FREE' : `€${shipping}`}</span>
          </div>
          <div style={{ display: 'flex', justifySelf: 'space-between', marginTop: '20px', fontSize: '20px', fontWeight: '600', borderTop: '2px solid var(--color-border)', paddingTop: '20px' }}>
            <span style={{flex: 1}}>Total</span>
            <span>€{total.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
