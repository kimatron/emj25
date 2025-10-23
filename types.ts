export interface Photo {
  id: number;
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  type?: 'image' | 'video';
  videoSrc?: string;
}

export interface PortfolioCategory {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  photos: Photo[];
}

export interface Print {
  id: number;
  src: string;
  title: string;
  description: string;
  price: number;
}

export interface PrintSize {
  id: string;
  name: string;
  priceModifier: number;
}

export interface PaperType {
  id: string;
  name: string;
  priceModifier: number;
}

export interface FrameOption {
  id: string;
  name: string;
  priceModifier: number;
}

export interface CartItem {
  id: string;
  print: Print;
  size: PrintSize;
  paper: PaperType;
  frame: FrameOption;
  quantity: number;
  totalPrice: number;
}