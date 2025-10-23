import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PRINTS } from '../constants';
import { Print } from '../types';
import PageTransition from '../components/PageTransition';
import AnimatedTitle from '../components/AnimatedTitle';

// Import checkout function (adjust path if needed)
// For now, we'll use a simple checkout simulation

const PRINT_SIZES = [
  { id: '8x10', name: '8" × 10"', priceModifier: 0 },
  { id: '11x14', name: '11" × 14"', priceModifier: 25 },
  { id: '16x20', name: '16" × 20"', priceModifier: 50 },
  { id: '20x24', name: '20" × 24"', priceModifier: 75 },
  { id: '24x36', name: '24" × 36"', priceModifier: 120 },
];

const PAPER_TYPES = [
  { id: 'matte', name: 'Archival Matte', priceModifier: 0 },
  { id: 'glossy', name: 'Fine Art Glossy', priceModifier: 15 },
  { id: 'canvas', name: 'Gallery Canvas', priceModifier: 40 },
];

const FRAME_OPTIONS = [
  { id: 'none', name: 'Unframed', priceModifier: 0 },
  { id: 'black', name: 'Black Ash', priceModifier: 35 },
  { id: 'white', name: 'White Oak', priceModifier: 35 },
  { id: 'natural', name: 'Natural Wood', priceModifier: 45 },
];

interface CartItem {
  id: string;
  print: Print;
  size: typeof PRINT_SIZES[0];
  paper: typeof PAPER_TYPES[0];
  frame: typeof FRAME_OPTIONS[0];
  quantity: number;
  totalPrice: number;
}

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
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 p-4"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-[#0a0a0a] border border-neutral-800 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="grid md:grid-cols-2 gap-8 p-8">
          <div>
            <img src={print.src} alt={print.title} className="w-full h-auto" />
          </div>

          <div className="flex flex-col">
            <button
              onClick={onClose}
              className="self-end text-neutral-400 hover:text-white mb-4 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="font-heading text-3xl tracking-wider mb-2">{print.title}</h2>
            <p className="text-neutral-400 mb-8 text-sm">{print.description}</p>

            <div className="mb-6">
              <label className="block text-xs font-medium mb-3 tracking-widest text-neutral-500">SIZE</label>
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
                      <div className="text-xs mt-1 opacity-70">+€{size.priceModifier}</div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-xs font-medium mb-3 tracking-widest text-neutral-500">PAPER</label>
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
                        <span className="text-xs opacity-70">+€{paper.priceModifier}</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-xs font-medium mb-3 tracking-widest text-neutral-500">FRAMING</label>
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
                      <div className="text-xs mt-1 opacity-70">+€{frame.priceModifier}</div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-xs font-medium mb-3 tracking-widest text-neutral-500">QUANTITY</label>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-neutral-700 hover:border-white transition-colors"
                >
                  −
                </button>
                <span className="text-lg font-medium w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-neutral-700 hover:border-white transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            <div className="mt-auto pt-6 border-t border-neutral-800">
              <div className="flex justify-between items-baseline mb-4">
                <span className="text-sm tracking-widest text-neutral-500">TOTAL</span>
                <span className="text-2xl font-light">€{(totalPrice * quantity).toFixed(2)}</span>
              </div>
              <button
                onClick={handleAddToCart}
                className="w-full py-4 bg-white text-black font-medium tracking-wider text-sm hover:bg-neutral-100 transition-colors"
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
  onCheckout: () => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ items, onClose, onRemoveItem, onUpdateQuantity, onCheckout }) => {
  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const shipping = subtotal > 100 ? 0 : 12.50;
  const total = subtotal + shipping;

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-end md:items-center md:justify-end bg-black/90"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="bg-[#0a0a0a] border-t md:border-l border-neutral-800 w-full md:w-[500px] h-[80vh] md:h-screen overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'tween', duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-neutral-800">
            <h2 className="font-heading text-2xl tracking-wider">CART ({items.length})</h2>
            <button onClick={onClose} className="text-neutral-400 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-16 text-neutral-500">
              <p className="text-sm">Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="space-y-6 mb-8">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 pb-6 border-b border-neutral-800">
                    <img src={item.print.src} alt={item.print.title} className="w-20 h-20 object-cover" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm mb-1 truncate">{item.print.title}</h3>
                      <p className="text-xs text-neutral-500 mb-3">
                        {item.size.name} · {item.paper.name}
                        {item.frame.id !== 'none' && ` · ${item.frame.name}`}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="w-6 h-6 border border-neutral-700 hover:border-white text-xs transition-colors"
                          >
                            −
                          </button>
                          <span className="text-xs w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 border border-neutral-700 hover:border-white text-xs transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-xs text-neutral-500 hover:text-white transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-light">€{item.totalPrice.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 mb-6 pb-6 border-b border-neutral-800 text-sm">
                <div className="flex justify-between text-neutral-400">
                  <span>Subtotal</span>
                  <span>€{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `€${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-base font-medium pt-3">
                  <span>Total</span>
                  <span>€{total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={onCheckout}
                className="w-full py-4 bg-white text-black font-medium tracking-wider text-sm hover:bg-neutral-100 transition-colors"
              >
                CHECKOUT
              </button>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const PrintCard: React.FC<{ print: Print; index: number; onClick: () => void }> = ({ print, index, onClick }) => {
  return (
    <div className="group cursor-pointer" onClick={onClick}>
      <div className="overflow-hidden mb-3 bg-neutral-900">
        <img
          src={print.src}
          alt={print.title}
          className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <h3 className="text-base font-medium tracking-wide mb-1">{print.title}</h3>
      <p className="text-neutral-500 text-sm mb-2 line-clamp-1">{print.description}</p>
      <p className="text-sm font-light">From €{print.price.toFixed(2)}</p>
    </div>
  );
};

const Store: React.FC = () => {
  const [selectedPrint, setSelectedPrint] = useState<Print | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

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
    setShowCart(true);
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

  const handleCheckout = () => {
    // Calculate totals
    const subtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
    const shipping = subtotal > 100 ? 0 : 12.50;
    const total = subtotal + shipping;

    // Show demo checkout
    const items = cartItems.map(item => 
      `${item.print.title} (${item.size.name}, ${item.paper.name}${item.frame.id !== 'none' ? `, ${item.frame.name}` : ''}) x${item.quantity} - €${item.totalPrice.toFixed(2)}`
    ).join('\n');

    alert(
      `🛒 CHECKOUT\n\n` +
      `${items}\n\n` +
      `Subtotal: €${subtotal.toFixed(2)}\n` +
      `Shipping: €${shipping.toFixed(2)}\n` +
      `Total: €${total.toFixed(2)}\n\n` +
      `Stripe integration will process this payment when deployed!\n\n` +
      `For now, this is a demo. The real checkout will:\n` +
      `✓ Open Stripe payment form\n` +
      `✓ Collect card details securely\n` +
      `✓ Collect shipping address\n` +
      `✓ Process payment\n` +
      `✓ Send order to admin\n` +
      `✓ Email receipts to customer`
    );
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <PageTransition>
      <div className="container mx-auto px-4 sm:px-6 py-24 sm:py-32">
        <button
          onClick={() => setShowCart(true)}
          className="fixed top-24 right-6 z-40 text-sm tracking-wider text-neutral-400 hover:text-white transition-colors"
        >
          CART {cartItemCount > 0 && `(${cartItemCount})`}
        </button>

        <div className="text-center mb-20">
          <AnimatedTitle text="Prints" className="text-6xl sm:text-8xl" />
          <motion.p
            className="max-w-xl mx-auto mt-6 text-neutral-400 text-sm leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Limited edition archival prints. Each photograph is printed on museum-grade paper
            and available in various sizes. Framing options available.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12">
          {PRINTS.map((print, index) => (
            <PrintCard key={print.id} print={print} index={index} onClick={() => setSelectedPrint(print)} />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {selectedPrint && (
          <ProductModal print={selectedPrint} onClose={() => setSelectedPrint(null)} onAddToCart={handleAddToCart} />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {showCart && (
          <ShoppingCart
            items={cartItems}
            onClose={() => setShowCart(false)}
            onRemoveItem={handleRemoveItem}
            onUpdateQuantity={handleUpdateQuantity}
            onCheckout={handleCheckout}
          />
        )}
      </AnimatePresence>
    </PageTransition>
  );
};

export default Store;