export const products = [{
  id: 1,
  name: "Fender Stratocaster Electric Guitar",
  description: "The Fender Stratocaster is one of the most iconic electric guitars ever created. Known for its contoured body and three single-coil pickups, it delivers the bright, cutting tone that has defined countless musical genres.",
  price: 1299.99,
  image: "https://images.unsplash.com/photo-1550985616-10810253b84d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  category: "guitar",
  rating: 4.9,
  stock: 15,
  featured: true
}, {
  id: 2,
  name: "Yamaha P-125 Digital Piano",
  description: "The Yamaha P-125 is a compact digital piano with 88 fully weighted keys that recreate the feel of an acoustic piano. With high-quality piano samples and built-in speakers, it's perfect for both practice and performance.",
  price: 649.99,
  image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  category: "keyboard",
  rating: 4.7,
  stock: 10,
  featured: true
}, {
  id: 3,
  name: "Pearl Export Series Drum Kit",
  description: "The Pearl Export Series is a professional-grade drum kit that delivers exceptional sound and durability. This 5-piece kit includes a bass drum, snare, and three toms, all with high-quality shells and hardware.",
  price: 799.99,
  image: "https://images.unsplash.com/photo-1543443258-92b04ad5ec6b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  category: "drums",
  rating: 4.6,
  stock: 5
}, {
  id: 4,
  name: "Shure SM58 Microphone",
  description: "The industry-standard vocal microphone, known for its durability and reliable performance. The Shure SM58 features a built-in spherical filter to minimize wind and breath noise.",
  price: 99.99,
  image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  category: "recording",
  rating: 4.9,
  stock: 25
}, {
  id: 5,
  name: "Gibson Les Paul Standard Electric Guitar",
  description: "The Gibson Les Paul Standard is renowned for its rich, warm tone and incredible sustain. With its mahogany body, maple top, and dual humbucker pickups, it's the guitar of choice for countless legendary musicians.",
  price: 2499.99,
  discountPrice: 2199.99,
  image: "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  category: "guitar",
  rating: 4.9,
  stock: 8,
  sale: true
}, {
  id: 6,
  name: "Fender Precision Bass",
  description: "The Fender Precision Bass is the world's first electric bass guitar and continues to be the standard by which all other basses are judged. Known for its punchy, defined tone and exceptional playability.",
  price: 1099.99,
  image: "https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  category: "bass",
  rating: 4.8,
  stock: 12
}, {
  id: 7,
  name: "Roland TD-17KVX Electronic Drum Kit",
  description: "The Roland TD-17KVX offers premium V-Drums performance in a mid-level kit. With mesh heads for a natural feel and the powerful TD-17 module with Bluetooth, it's perfect for practice and recording.",
  price: 1699.99,
  image: "https://images.unsplash.com/photo-1617166785548-9bb19bb3321b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  category: "drums",
  rating: 4.7,
  stock: 7,
  new: true
}, {
  id: 8,
  name: "Audio-Technica ATH-M50x Headphones",
  description: "Professional studio monitor headphones with exceptional clarity throughout an extended frequency range, with deep, accurate bass response. The circumaural design contours around the ears for excellent sound isolation.",
  price: 149.99,
  image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  category: "accessories",
  rating: 4.8,
  stock: 20
}];

export const featuredProducts = products.filter(product => product.featured);

export const categories = [{
  id: 'guitar',
  name: 'Guitars',
  image: 'https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
}, {
  id: 'keyboard',
  name: 'Keyboards',
  image: 'https://images.unsplash.com/photo-1552056776-3d23a9273e89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
}, {
  id: 'drums',
  name: 'Drums',
  image: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
}, {
  id: 'bass',
  name: 'Bass Guitars',
  image: 'https://images.unsplash.com/photo-1550985616-10810253b84d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
}, {
  id: 'recording',
  name: 'Recording',
  image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
}, {
  id: 'accessories',
  name: 'Accessories',
  image: 'https://images.unsplash.com/photo-1558098329-a11cff621064?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
}];
