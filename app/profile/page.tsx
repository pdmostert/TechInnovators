import { mockSeller, products } from '../lib/data';
import styles from './Profile.module.css';

export default function ProfilePage() {
  const sellerProducts = products.slice(0, 4); // Show a subset of products for the mock seller

  const mockReviews = [
    {
      id: 1,
      name: "Sarah Jenkins",
      rating: 5,
      text: "Absolutely stunning craftsmanship. The package arrived beautifully wrapped and the item itself is perfection."
    },
    {
      id: 2,
      name: "Michael Chen",
      rating: 5,
      text: "Jane's work is incredible. You can really see the attention to detail. Will definitely be buying again!"
    },
    {
      id: 3,
      name: "Emma Wilson",
      rating: 4,
      text: "Beautiful item, highly recommend. Shipping took a little longer than expected but totally worth the wait."
    }
  ];

  return (
    <div className={styles.container}>
      {/* Seller Name & Avatar */}
      <div className={styles.profileHeader}>
        <img 
          src={mockSeller.avatar} 
          alt={`${mockSeller.name}'s avatar`} 
          className={styles.avatar} 
        />
        <div className={styles.headerInfo}>
          <h1>{mockSeller.name}</h1>
          <div className={styles.meta}>
            <span className={styles.rating}>★ {mockSeller.rating} ({mockSeller.reviewCount} Reviews)</span>
            <span>Joined {mockSeller.joinedDate}</span>
          </div>
        </div>
      </div>

      {/* About the Artisan */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>About the Artisan</h2>
        <p className={styles.bio}>{mockSeller.bio}</p>
      </section>

      {/* Products by this Seller */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Products by this Seller</h2>
        <div className={styles.productGrid}>
          {sellerProducts.map(product => (
            <div key={product.id} className={styles.productCard}>
              <img 
                src={product.image} 
                alt={product.name} 
                className={styles.productImage}
              />
              <div className={styles.productInfo}>
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Reviews</h2>
        <div className={styles.reviews}>
          {mockReviews.map(review => (
            <div key={review.id} className={styles.reviewCard}>
              <div className={styles.reviewerName}>{review.name}</div>
              <div className={styles.reviewRating}>{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</div>
              <p className={styles.reviewText}>"{review.text}"</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
