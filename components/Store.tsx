import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PRINTS } from './constants';
import { Print, CartItem } from './types';
import PageTransition from './components/PageTransition';
import AnimatedTitle from './components/AnimatedTitle';

declare var gsap: any;

// Print size options
const PRINT_SIZES = [
  { id: '8x10', name: '8" x 10"', priceModifier: 0 },
  { id: '11x14', name: '11" x 14"', priceModifier: 25 },
  { id: '16x20', name: '16" x 20"', priceModifier: 50 },
  { id: '20x24', name: '20" x 24"', priceModifier: 75 },
  { id: '24x36', name: '24" x 36"', priceModifier: 120 },
];

// Paper types
const PAPER_TYPES = [
  { id: 'matte', name: 'Archival Matte', priceModifier: 0 },
  { id: 'glossy', name: 'Fine Art Glossy', priceModifier: 15 },
  { id: 'canvas', name: 'Gallery Canvas', priceModifier: 40 },
];

// Frame options
const FRAME_OPTIONS = [
  { id: 'none', name: 'No Frame', priceModifier: 0 },
  { id: 'black', name: 'Black Frame', priceModifier: 35 },
  { id: 'white', name: 'White Frame', priceModifier: 35 },
  { id: 'natural', name: 'Natural Wood', priceModifier: 45 },
];

interface ProductModalProps {
  print: Print;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ print, onClose, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState(PRINT_SIZES[0]);
  const [selectedPaper, setSelectedPaper] = useState(PAPER_TYPES[0]);
  const [selectedFrame, setSelectedFrame] = useState(FRAME_OPTIONS[0]);
  const [quantity, setQuantity] = useState(1);

  const totalPrice = print.price + selectedSize.priceModifier + selectedPaper.priceModifier + selectedFrame.priceModifier;

  const handleAddToCart = () => {
    onAddToCart({
      id: `${print.id}-${selectedSize.id}-${selectedPaper.id}-${selectedFrame.id}`,
      print,
      size: selectedSize,
      paper: selectedPaper,
      frame: selectedFrame,
      quantity,
      totalPrice: totalPrice * quantity
    });
    onClose();
  };

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-[#0a0a0a] border border-neutral-800 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <div className="grid md:grid-cols-2 gap-8 p-8">
          {/* Image */}
          <div>
            <img src={print.src} alt={print.title} className="w-full h-auto" />
          </div>

          {/* Options */}
          <div className="flex flex-col">
            <button
              onClick={onClose}
              className="self-end text-neutral-400 hover:text-white mb-4"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="font-heading text-4xl tracking-wider mb-2">{print.title}</h2>
            <p className="text-neutral-400 mb-6">{print.description}</p>

            {/* Size Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-3 tracking-wider">SIZE</label>
              <div className="grid grid-cols-2 gap-2">
                {PRINT_SIZES.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => setSelectedSize(size)}
                    className={`p-3 border text-sm transition-all ${
                      selectedSize.id === size.id
                        ? 'border-white bg-white text-black'
                        : 'border-neutral-700 hover:border-neutral-500'
                    }`}
                  >
                    <div className="font-medium">{size.name}</div>
                    {size.priceModifier > 0 && (
                      <div className="text-xs mt-1">+€{size.priceModifier.toFixed(2)}</div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Paper Type */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-3 tracking-wider">PAPER TYPE</label>
              <div className="space-y-2">
                {PAPER_TYPES.map((paper) => (
                  <button
                    key={paper.id}
                    onClick={() => setSelectedPaper(paper)}
                    className={`w-full p-3 border text-left text-sm transition-all ${
                      selectedPaper.id === paper.id
                        ? 'border-white bg-white text-black'
                        : 'border-neutral-700 hover:border-neutral-500'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{paper.name}</span>
                      {paper.priceModifier > 0 && (
                        <span className="text-xs">+€{paper.priceModifier.toFixed(2)}</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Frame Options */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-3 tracking-wider">FRAME</label>
              <div className="grid grid-cols-2 gap-2">
                {FRAME_OPTIONS.map((frame) => (
                  <button
                    key={frame.id}
                    onClick={() => setSelectedFrame(frame)}
                    className={`p-3 border text-sm transition-all ${
                      selectedFrame.id === frame.id
                        ? 'border-white bg-white text-black'
                        : 'border-neutral-700 hover:border-neutral-500'
                    }`}
                  >
                    <div className="font-medium">{frame.name}</div>
                    {frame.priceModifier > 0 && (
                      <div className="text-xs mt-1">+€{frame.priceModifier.toFixed(2)}</div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-3 tracking-wider">QUANTITY</label>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-neutral-700 hover:border-white transition-colors"
                >
                  -
                </button>
                <span className="text-xl font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-neutral-700 hover:border-white transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Price and Add to Cart */}
            <div className="mt-auto pt-6 border-t border-neutral-800">
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-heading tracking-wider">TOTAL</span>
                <span className="text-3xl font-bold">€{(totalPrice * quantity).toFixed(2)}</span>
              </div>
              <button
                onClick={handleAddToCart}
                className="w-full py-4 bg-white text-black font-medium tracking-wider hover:bg-neutral-200 transition-colors"
                data-cursor-hover
              >
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

interface ShoppingCartProps {
  items: CartItem[];
  onClose: () => void;
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ items, onClose, onRemoveItem, onUpdateQuantity }) => {
  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const shipping = subtotal > 100 ? 0 : 12.50;
  const total = subtotal + shipping;

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-end md:items-center md:justify-end bg-black/80"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-[#0a0a0a] border-t md:border-l border-neutral-800 w-full md:w-[500px] h-[80vh] md:h-screen overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-heading text-3xl tracking-wider">CART ({items.length})</h2>
            <button onClick={onClose} className="text-neutral-400 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Cart Items */}
          {items.length === 0 ? (
            <div className="text-center py-12 text-neutral-500">
              <p>Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="space-y-6 mb-8">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 border-b border-neutral-800 pb-6">
                    <img src={item.print.src} alt={item.print.title} className="w-24 h-24 object-cover" />
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">{item.print.title}</h3>
                      <p className="text-sm text-neutral-400 mb-2">
                        {item.size.name} • {item.paper.name} • {item.frame.name}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="w-6 h-6 border border-neutral-700 hover:border-white text-xs"
                          >
                            -
                          </button>
                          <span className="text-sm">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 border border-neutral-700 hover:border-white text-xs"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-sm text-neutral-400 hover:text-red-400"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">€{item.totalPrice.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 mb-6 pb-6 border-b border-neutral-800">
                <div className="flex justify-between text-neutral-400">
                  <span>Subtotal</span>
                  <span>€{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `€${shipping.toFixed(2)}`}</span>
                </div>
                {subtotal < 100 && (
                  <p className="text-xs text-neutral-500">Free shipping on orders over €100</p>
                )}
                <div className="flex justify-between text-xl font-bold pt-3">
                  <span>Total</span>
                  <span>€{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                className="w-full py-4 bg-white text-black font-medium tracking-wider hover:bg-neutral-200 transition-colors"
                data-cursor-hover
              >
                PROCEED TO CHECKOUT
              </button>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const PrintCard: React.FC<{ print: Print; index: number; onClick: () => void }> = ({ print, index, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof gsap === 'undefined' || !cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: index * 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, [index]);

  return (
    <div ref={cardRef} className="group cursor-pointer" onClick={onClick}>
      <div className="overflow-hidden mb-4">
        <img
          src={print.src}
          alt={print.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
          decoding="async"
        />
      </div>
      <h3 className="text-xl font-medium tracking-wide">{print.title}</h3>
      <p className="text-neutral-400 mt-1 mb-2 text-sm line-clamp-2">{print.description}</p>
      <div className="flex justify-between items-center">
        <p className="text-lg font-semibold">From €{print.price.toFixed(2)}</p>
        <button
          className="px-6 py-2 border border-neutral-600 text-neutral-300 hover:bg-white hover:text-black transition-all duration-300 text-sm"
          data-cursor-hover
        >
          View Options
        </button>
      </div>
    </div>
  );
};

const Store: React.FC = () => {
  const [selectedPrint, setSelectedPrint] = useState<Print | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof gsap === 'undefined') return;

    // Register ScrollTrigger
    if (gsap.registerPlugin) {
      const ScrollTrigger = (window as any).ScrollTrigger;
      if (ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
    }
  }, []);

  const handleAddToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existingItem = prev.find((i) => i.id === item.id);
      if (existingItem) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity, totalPrice: i.totalPrice + item.totalPrice } : i
        );
      }
      return [...prev, item];
    });
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const unitPrice = item.totalPrice / item.quantity;
          return { ...item, quantity, totalPrice: unitPrice * quantity };
        }
        return item;
      })
    );
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <PageTransition>
      <div className="container mx-auto px-4 sm:px-6 py-24 sm:py-32">
        {/* Fixed Cart Button */}
        <button
          onClick={() => setShowCart(true)}
          className="fixed top-24 right-6 z-40 w-14 h-14 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
          data-cursor-hover
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
        </button>

        <div ref={titleRef} className="text-center mb-16 sm:mb-24">
          <AnimatedTitle text="Print Store" className="text-6xl sm:text-8xl md:text-9xl" />
          <motion.p
            className="max-w-2xl mx-auto mt-4 text-neutral-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            A curated selection of fine art prints. Each photograph is printed on museum-quality, archival paper to ensure longevity
            and vibrant colors. Available in multiple sizes with optional framing.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {PRINTS.map((print, index) => (
            <PrintCard key={print.id} print={print} index={index} onClick={() => setSelectedPrint(print)} />
          ))}
        </div>

        {/* Shipping Info */}
        <motion.div
          className="mt-24 max-w-4xl mx-auto grid md:grid-cols-3 gap-8 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="p-6 border border-neutral-800">
            <div className="text-3xl mb-3">🎨</div>
            <h3 className="font-heading text-xl tracking-wider mb-2">MUSEUM QUALITY</h3>
            <p className="text-sm text-neutral-400">Archival paper with 100+ year lifespan</p>
          </div>
          <div className="p-6 border border-neutral-800">
            <div className="text-3xl mb-3">📦</div>
            <h3 className="font-heading text-xl tracking-wider mb-2">FREE SHIPPING</h3>
            <p className="text-sm text-neutral-400">On all orders over €100</p>
          </div>
          <div className="p-6 border border-neutral-800">
            <div className="text-3xl mb-3">🖼️</div>
            <h3 className="font-heading text-xl tracking-wider mb-2">FRAMING OPTIONS</h3>
            <p className="text-sm text-neutral-400">Professional framing available</p>
          </div>
        </motion.div>
      </div>

      {/* Product Modal */}
      <AnimatePresence>
        {selectedPrint && (
          <ProductModal print={selectedPrint} onClose={() => setSelectedPrint(null)} onAddToCart={handleAddToCart} />
        )}
      </AnimatePresence>

      {/* Shopping Cart */}
      <AnimatePresence>
        {showCart && (
          <ShoppingCart
            items={cartItems}
            onClose={() => setShowCart(false)}
            onRemoveItem={handleRemoveItem}
            onUpdateQuantity={handleUpdateQuantity}
          />
        )}
      </AnimatePresence>
    </PageTransition>
  );
};

export default Store;