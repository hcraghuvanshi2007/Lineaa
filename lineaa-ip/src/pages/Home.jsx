import Hero from '../components/Hero';
import Collections from '../components/Collections';
import ProductGrid from '../components/ProductGrid';
import CollectionThumbnails from '../components/CollectionThumbnails';
import MusicPlayer from '../components/MusicPlayer';

function Home() {
  return (
    <>
      <MusicPlayer />
      <Hero />
      <section className="collections">
        <Collections />
        <ProductGrid />
        <CollectionThumbnails />
      </section>
    </>
  );
}

export default Home;
