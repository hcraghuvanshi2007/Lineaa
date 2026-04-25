import earringsImg from '../assets/images/earrings-collection-6O5tp3RC.png';
import linkBraceletImg from '../assets/images/link-bracelet-CMFM2KKw.png';

function Collections() {
  return (
    <div className="collections-grid">
      <div className="collection-item">
        <div className="collection-image">
          <img src={earringsImg} alt="Earrings" />
        </div>
        <div className="collection-caption">
          <a href="#" className="collection-title">Organic Forms</a>
          <p className="collection-sub">Nature-inspired pieces with fluid, sculptural details</p>
        </div>
      </div>

      <div className="collection-item">
        <div className="collection-image">
          <img src={linkBraceletImg} alt="Necklaces" />
        </div>
        <div className="collection-caption">
          <a href="#" className="collection-title">Chain Collection</a>
          <p className="collection-sub">Refined links and connections in precious metals</p>
        </div>
      </div>
    </div>
  );
}

export default Collections;
