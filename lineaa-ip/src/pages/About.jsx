import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './About.css';
import foundersImg from '../assets/images/founders-ioSVwXFB.png';
import storyHeroImg from '../assets/images/about_story_overview.png';
import sustainHeroImg from '../assets/images/necklace-catalog.png';
import sizeHeroImg from '../assets/images/solitaire-ring.png';
import careHeroImg from '../assets/images/bracelet-catalog.png';

function Story() {
  return (
    <div className="story-page">
      <section className="story-hero">
        <span className="brand-subtitle">Our Heritage</span>
        <h1>Our Story</h1>
        <p>A journey of passion, craftsmanship, and timeless elegance</p>
        <hr className="story-divider" />
      </section>

      <section className="story-section">
        <div className="story-grid">
          <div className="story-image">
            <img src={foundersImg} alt="Linea Founders" />
          </div>
          <div className="story-text">
            <h2>Founded on Passion</h2>
            <p>
              LINEA Jewelry was born from a shared vision of creating timeless pieces
              that transcend fleeting trends. Our founders, united by their passion
              for exceptional craftsmanship and sustainable practices, established
              the brand with a commitment to creating jewelry that tells a story —
              your story.
            </p>
          </div>
        </div>
      </section>

      <section className="heritage">
        <h2>Our Heritage</h2>
        <div className="heritage-grid">
          <div className="heritage-block">
            <h3>Traditional Craftsmanship</h3>
            <p>
              Every piece in our collection is meticulously handcrafted by skilled
              artisans who have honed their craft over generations. We honor
              traditional techniques while embracing modern innovation, ensuring
              each piece meets our exacting standards for quality and beauty.
            </p>
          </div>
          <div className="heritage-block">
            <h3>Sustainable Future</h3>
            <p>
              We believe luxury and sustainability can coexist beautifully. Our
              commitment to ethical sourcing, recycled materials, and responsible
              manufacturing practices ensures that every piece you wear contributes
              to a more sustainable future.
            </p>
          </div>
        </div>
      </section>

      <section className="values">
        <h2>Our Values</h2>
        <div className="values-grid">
          <div className="value-item">
            <h3>Excellence</h3>
            <p>We pursue perfection in every detail, from the initial design concept to the final polish.</p>
          </div>
          <div className="value-item">
            <h3>Authenticity</h3>
            <p>Each piece reflects genuine craftsmanship and tells an authentic story of artistry and care.</p>
          </div>
          <div className="value-item">
            <h3>Innovation</h3>
            <p>We continuously evolve our designs and techniques while honoring timeless aesthetic principles.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

function Sustainability() {
  return (
    <div className="sustainability-page">
      <section className="page-hero">
        <span className="brand-subtitle">Conscious Luxury</span>
        <h1>Sustainability</h1>
        <p>Creating beautiful jewelry while protecting our planet for future generations</p>
        <hr className="divider" />
      </section>

      <section className="section">
        <h2>Our Environmental Commitment</h2>
        <div className="two-col">
          <div className="block">
            <h3>Ethical Sourcing</h3>
            <p>
              We partner only with suppliers who share our commitment to ethical
              practices. Every gemstone and precious metal in our collection is
              sourced responsibly, with full transparency in our supply chain.
            </p>
          </div>
          <div className="block">
            <h3>Recycled Materials</h3>
            <p>
              Over 80% of our precious metals come from recycled sources, reducing
              the environmental impact of mining while maintaining the highest
              quality standards for our jewelry.
            </p>
          </div>
        </div>
      </section>

      <section className="section impact">
        <h2>Our Impact Goals</h2>
        <div className="impact-grid">
          <div className="impact-item">
            <h3>100%</h3>
            <p>Carbon neutral operations by 2025</p>
          </div>
          <div className="impact-item">
            <h3>90%</h3>
            <p>Recycled packaging materials</p>
          </div>
          <div className="impact-item">
            <h3>Zero</h3>
            <p>Waste to landfill policy</p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Circular Economy</h2>
        <p style={{ maxWidth: '600px', color: 'var(--color-text-secondary)', marginBottom: '48px' }}>
          We believe in the power of circular design – creating jewelry that can be
          treasured, repaired, and eventually recycled into new pieces.
        </p>
        <div className="two-col">
          <div className="block">
            <h3>Lifetime Care</h3>
            <p>
              Every piece comes with our lifetime care promise, including professional
              cleaning, repairs, and resizing services.
            </p>
          </div>
          <div className="block">
            <h3>Take-Back Program</h3>
            <p>
              When you're ready for something new, we'll take back your LINEA jewelry
              to be recycled into future pieces.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Certifications & Partnerships</h2>
        <p style={{ maxWidth: '700px', color: 'var(--color-text-secondary)' }}>
          Our commitment to sustainability is verified through partnerships with
          leading organizations and certifications that hold us accountable to the
          highest standards.
        </p>
        <div className="cert-grid">
          <div className="cert">RJC Certified</div>
          <div className="cert">B Corp</div>
          <div className="cert">SCS Certified</div>
          <div className="cert">Fair Trade</div>
        </div>
      </section>
    </div>
  );
}

function SizeGuide() {
  return (
    <div className="size-guide-page">
      <section className="page-hero">
        <span className="brand-subtitle">The Perfect Fit</span>
        <h1>Size Guide</h1>
        <p>Find your perfect fit with our comprehensive sizing guide</p>
        <hr className="divider" />
      </section>

      <section className="section">
        <h2>Ring Sizing</h2>
        <div className="methods">
          <h3>How to Measure Your Ring Size</h3>
          <div className="methods-grid">
            <div className="method">
              <h4>Method 1: Using a Ring You Own</h4>
              <ol>
                <li>Take a ring that fits comfortably on your desired finger</li>
                <li>Place it on a ruler and measure the inner diameter in millimeters</li>
                <li>Use our size chart below to find your size</li>
              </ol>
            </div>
            <div className="method">
              <h4>Method 2: Using String or Paper</h4>
              <ol>
                <li>Wrap string or paper around your finger where the ring will sit</li>
                <li>Mark where the material overlaps</li>
                <li>Measure the length in millimeters</li>
                <li>Divide by 3.14 to get the diameter</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>US Size</th>
                <th>UK Size</th>
                <th>EU Size</th>
                <th>Diameter (mm)</th>
                <th>Circumference (mm)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>5</td><td>J</td><td>49</td><td>15.6</td><td>49.0</td></tr>
              <tr><td>5.5</td><td>K</td><td>50</td><td>16.0</td><td>50.2</td></tr>
              <tr><td>6</td><td>L</td><td>51</td><td>16.4</td><td>51.5</td></tr>
              <tr><td>6.5</td><td>M</td><td>52</td><td>16.8</td><td>52.8</td></tr>
              <tr><td>7</td><td>N</td><td>54</td><td>17.2</td><td>54.0</td></tr>
              <tr><td>7.5</td><td>O</td><td>55</td><td>17.6</td><td>55.3</td></tr>
              <tr><td>8</td><td>P</td><td>56</td><td>18.0</td><td>56.5</td></tr>
              <tr><td>8.5</td><td>Q</td><td>57</td><td>18.4</td><td>57.8</td></tr>
              <tr><td>9</td><td>R</td><td>59</td><td>18.8</td><td>59.1</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section">
        <h2>Bracelet & Necklace Sizing</h2>
        <div className="two-col">
          <div>
            <h3>Bracelet Sizes</h3>
            <div className="list-row"><span>Small</span><span>6.5" – 7"</span></div>
            <div className="list-row"><span>Medium</span><span>7" – 7.5"</span></div>
            <div className="list-row"><span>Large</span><span>7.5" – 8"</span></div>
          </div>
          <div>
            <h3>Necklace Lengths</h3>
            <div className="list-row"><span>Choker</span><span>14" – 16"</span></div>
            <div className="list-row"><span>Princess</span><span>17" – 19"</span></div>
            <div className="list-row"><span>Matinee</span><span>20" – 24"</span></div>
            <div className="list-row"><span>Opera</span><span>28" – 36"</span></div>
          </div>
        </div>
      </section>

      <section className="section help">
        <h2>Need Help?</h2>
        <p>
          Still unsure about sizing? Our jewelry consultants are here to help you
          find the perfect fit. Download our printable size guide or schedule a
          virtual consultation.
        </p>
        <div className="help-buttons">
          <button className="btn-outline">Download PDF Guide</button>
          <button className="btn-solid">Schedule Consultation</button>
        </div>
      </section>
    </div>
  );
}

function CustomerCare() {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    if (activeFaq === index) {
      setActiveFaq(null);
    } else {
      setActiveFaq(index);
    }
  };

  const faqs = [
    { q: "What are your shipping options and timeframes?", a: "We offer standard and express shipping options. Delivery times vary by location." },
    { q: "What is your return and exchange policy?", a: "Returns are accepted within 30 days of purchase in original condition." },
    { q: "What warranty do you offer on your jewelry?", a: "All LINEA jewelry comes with a one-year craftsmanship warranty." },
    { q: "Can I resize my jewelry after purchase?", a: "Yes, resizing services are available depending on the design." },
    { q: "How should I care for my LINEA jewelry?", a: "We recommend gentle cleaning and storing pieces separately." },
    { q: "How can I verify the authenticity of my jewelry?", a: "Each piece comes with a certificate of authenticity." }
  ];

  return (
    <div className="customer-care-page">
      <section className="page-hero">
        <span className="brand-subtitle">At Your Service</span>
        <h1>Customer Care</h1>
        <p>We're here to help you with all your jewelry needs</p>
        <hr className="divider" />
      </section>

      <section className="section">
        <h2>Contact Information</h2>
        <div className="contact-grid">
          <div className="contact-block">
            <h3>Phone</h3>
            <p>+1 (555) 123-4567</p>
            <p>Mon–Fri: 9AM–6PM EST<br/>Sat: 10AM–4PM EST</p>
          </div>
          <div className="contact-block">
            <h3>Email</h3>
            <p>care@lineajewelry.com</p>
            <p>Response within 24 hours</p>
          </div>
          <div className="contact-block">
            <h3>Live Chat</h3>
            <button className="chat-btn">Start Chat</button>
            <p>Available during business hours</p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq">
          {faqs.map((faq, index) => (
            <div className={`faq-item ${activeFaq === index ? 'active' : ''}`} key={index}>
              <div className="faq-question" onClick={() => toggleFaq(index)}>
                {faq.q}
                <span style={{ fontSize: '18px' }}>{activeFaq === index ? '−' : '+'}</span>
              </div>
              <div className="faq-answer">{faq.a}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Contact Form</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-grid">
            <div className="form-group">
              <label>First Name</label>
              <input type="text" placeholder="Enter your first name" />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input type="text" placeholder="Enter your last name" />
            </div>
            <div className="form-group full">
              <label>Email</label>
              <input type="email" placeholder="Enter your email" />
            </div>
            <div className="form-group full">
              <label>Order Number (Optional)</label>
              <input type="text" placeholder="Enter your order number if applicable" />
            </div>
            <div className="form-group full">
              <label>How can we help you?</label>
              <textarea rows="5" placeholder="Please describe your inquiry in detail"></textarea>
            </div>
          </div>
          <button type="submit" className="submit-btn" onClick={() => alert("Form submitted!")}>Send Message</button>
        </form>
      </section>
    </div>
  );
}

function MainAbout() {
  return (
    <div className="about-overview">
      <section className="about-hero">
        <span className="brand-subtitle">World of Lineaa</span>
        <h1>Crafting Timeless Elegance</h1>
        <p>A fusion of modern minimalism and heritage craftsmanship, designed for the conscious individual.</p>
        <div className="hero-divider"></div>
      </section>
      
      <div className="about-grid">
        <Link to="/about/story" className="about-card" style={{ backgroundImage: `url(${storyHeroImg})` }}>
          <div className="card-overlay"></div>
          <div className="card-content">
            <h2>Our Story</h2>
            <p>The heritage and passion behind our vision.</p>
            <span className="card-link">Explore the Archive</span>
          </div>
        </Link>
        <Link to="/about/sustainability" className="about-card" style={{ backgroundImage: `url(${sustainHeroImg})` }}>
          <div className="card-overlay"></div>
          <div className="card-content">
            <h2>Sustainability</h2>
            <p>Our commitment to a beautiful, ethical future.</p>
            <span className="card-link">Learn Our Ethics</span>
          </div>
        </Link>
        <Link to="/about/size-guide" className="about-card" style={{ backgroundImage: `url(${sizeHeroImg})` }}>
          <div className="card-overlay"></div>
          <div className="card-content">
            <h2>Size Guide</h2>
            <p>Expert advice on finding your perfect fit.</p>
            <span className="card-link">View Sizing Charts</span>
          </div>
        </Link>
        <Link to="/about/customer-care" className="about-card" style={{ backgroundImage: `url(${careHeroImg})` }}>
          <div className="card-overlay"></div>
          <div className="card-content">
            <h2>Customer Care</h2>
            <p>Dedicated support for your jewelry journey.</p>
            <span className="card-link">Get In Touch</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

function About() {
  const { page } = useParams();

  switch (page) {
    case 'story':
      return <Story />;
    case 'sustainability':
      return <Sustainability />;
    case 'size-guide':
      return <SizeGuide />;
    case 'customer-care':
      return <CustomerCare />;
    default:
      return <MainAbout />;
  }
}

export default About;
