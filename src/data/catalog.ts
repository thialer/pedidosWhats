export type Badge = 'novo' | 'promocao' | 'mais-vendido';

export type OptionType = 'single' | 'multi';

export interface CustomOption {
  id: string;
  name: string;
  price?: number;
}

export interface CustomizationGroup {
  id: string;
  title: string;
  type: OptionType;
  required: boolean;
  min?: number;
  max?: number;
  options: CustomOption[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
  badges?: Badge[];
  rating?: number;
  reviews?: number;
  customizations?: CustomizationGroup[];
  popular?: boolean;
}

export interface Category {
  id: string;
  name: string;
  emoji: string;
}

export const categories: Category[] = [
  { id: 'burgers', name: 'Hambúrgueres', emoji: '🍔' },
  { id: 'pizzas', name: 'Pizzas', emoji: '🍕' },
  { id: 'portions', name: 'Porções', emoji: '🍟' },
  { id: 'drinks', name: 'Bebidas', emoji: '🥤' },
  { id: 'juices', name: 'Sucos', emoji: '🧃' },
  { id: 'desserts', name: 'Sobremesas', emoji: '🍰' },
];

const burgerCustom: CustomizationGroup[] = [
  {
    id: 'bread',
    title: 'Escolha o pão',
    type: 'single',
    required: true,
    options: [
      { id: 'brioche', name: 'Brioche' },
      { id: 'australiano', name: 'Australiano' },
      { id: 'tradicional', name: 'Tradicional' },
    ],
  },
  {
    id: 'meat',
    title: 'Escolha a carne',
    type: 'single',
    required: true,
    options: [
      { id: 'bovina', name: 'Bovina' },
      { id: 'frango', name: 'Frango' },
      { id: 'costela', name: 'Costela' },
      { id: 'vegetariano', name: 'Vegetariano' },
    ],
  },
  {
    id: 'extras',
    title: 'Adicionais',
    type: 'multi',
    required: false,
    options: [
      { id: 'bacon', name: 'Bacon', price: 4 },
      { id: 'cheddar', name: 'Cheddar', price: 4 },
      { id: 'catupiry', name: 'Catupiry', price: 5 },
      { id: 'cebola-cara', name: 'Cebola caramelizada', price: 3 },
      { id: 'ovo', name: 'Ovo', price: 2 },
    ],
  },
  {
    id: 'remove',
    title: 'Remover ingredientes',
    type: 'multi',
    required: false,
    options: [
      { id: 'tomate', name: 'Tomate' },
      { id: 'cebola', name: 'Cebola' },
      { id: 'picles', name: 'Picles' },
      { id: 'alface', name: 'Alface' },
    ],
  },
  {
    id: 'notes',
    title: 'Observações',
    type: 'single',
    required: false,
    options: [{ id: 'note', name: 'Ex.: Sem molho' }],
  },
];

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Smash Duplo',
    description: 'Dois smash de 90g, cheddar, picles e molho da casa no pão brioche.',
    price: 28.9,
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=900',
    categoryId: 'burgers',
    badges: ['mais-vendido'],
    rating: 4.9,
    reviews: 312,
    customizations: burgerCustom,
    popular: true,
  },
  {
    id: 'p2',
    name: 'X-Bacon Supreme',
    description: 'Burger bovino 150g, bacon crocante, cheddar e maionese defumada.',
    price: 32.0,
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=900',
    categoryId: 'burgers',
    badges: ['promocao'],
    rating: 4.8,
    reviews: 198,
    customizations: burgerCustom,
    popular: true,
  },
  {
    id: 'p3',
    name: 'Chicken Crispy',
    description: 'Frango empanado crocante, alface, tomate e molho caesar.',
    price: 26.5,
    image: 'https://images.pexels.com/photos/2762942/pexels-photo-2762942.jpeg?auto=compress&cs=tinysrgb&w=900',
    categoryId: 'burgers',
    badges: ['novo'],
    rating: 4.7,
    reviews: 86,
    customizations: burgerCustom,
  },
  {
    id: 'p4',
    name: 'Veggie Burger',
    description: 'Burger de grão-de-bico, rúcula, tomate seco e maionese de ervas.',
    price: 27.0,
    image: 'https://images.pexels.com/photos/3219547/pexels-photo-3219547.jpeg?auto=compress&cs=tinysrgb&w=900',
    categoryId: 'burgers',
    rating: 4.6,
    reviews: 54,
    customizations: burgerCustom,
  },
  {
    id: 'p5',
    name: 'Pizza Margherita',
    description: 'Molho de tomate, mussarela de búfala, manjericão fresco e azeite.',
    price: 44.9,
    image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=900',
    categoryId: 'pizzas',
    badges: ['mais-vendido'],
    rating: 4.9,
    reviews: 221,
    popular: true,
  },
  {
    id: 'p6',
    name: 'Pizza Pepperoni',
    description: 'Mussarela, pepperoni importado e borda recheada com catupiry.',
    price: 52.0,
    image: 'https://images.pexels.com/photos/803290/pexels-photo-803290.jpeg?auto=compress&cs=tinysrgb&w=900',
    categoryId: 'pizzas',
    rating: 4.8,
    reviews: 143,
  },
  {
    id: 'p7',
    name: 'Pizza Quatro Queijos',
    description: 'Mussarela, gorgonzola, parmesão e catupiry.',
    price: 49.9,
    image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=900',
    categoryId: 'pizzas',
    badges: ['novo'],
    rating: 4.7,
    reviews: 67,
  },
  {
    id: 'p8',
    name: 'Batata Frita Especial',
    description: 'Porção generosa, sal grosso e molho da casa.',
    price: 18.9,
    image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=900',
    categoryId: 'portions',
    badges: ['mais-vendido'],
    rating: 4.9,
    reviews: 401,
    popular: true,
  },
  {
    id: 'p9',
    name: 'Batata com Cheddar e Bacon',
    description: 'Batata frita coberta com cheddar cremoso e bacon crocante.',
    price: 26.0,
    image: 'https://images.pexels.com/photos/4109111/pexels-photo-4109111.jpeg?auto=compress&cs=tinysrgb&w=900',
    categoryId: 'portions',
    badges: ['promocao'],
    rating: 4.8,
    reviews: 176,
  },
  {
    id: 'p10',
    name: 'Onion Rings',
    description: 'Anéis de cebola empanados com molho ranch.',
    price: 21.5,
    image: 'https://images.pexels.com/photos/5848478/pexels-photo-5848478.jpeg?auto=compress&cs=tinysrgb&w=900',
    categoryId: 'portions',
    rating: 4.6,
    reviews: 92,
  },
  {
    id: 'p11',
    name: 'Coca-Cola 2L',
    description: 'Refrigerante gelado, perfeito para acompanhar.',
    price: 12.0,
    image: 'https://images.pexels.com/photos/2983100/pexels-photo-2983100.jpeg?auto=compress&cs=tinysrgb&w=900',
    categoryId: 'drinks',
    rating: 4.9,
    reviews: 510,
    popular: true,
  },
  {
    id: 'p12',
    name: 'Guaraná 350ml',
    description: 'Lata gelada de guaraná tradicional.',
    price: 6.5,
    image: 'https://images.pexels.com/photos/2531188/pexels-photo-2531188.jpeg?auto=compress&cs=tinysrgb&w=900',
    categoryId: 'drinks',
    rating: 4.7,
    reviews: 188,
  },
  {
    id: 'p13',
    name: 'Suco de Laranja',
    description: 'Laranja espremida na hora, 500ml.',
    price: 9.9,
    image: 'https://images.pexels.com/photos/1337825/pexels-photo-1337825.jpeg?auto=compress&cs=tinysrgb&w=900',
    categoryId: 'juices',
    badges: ['novo'],
    rating: 4.8,
    reviews: 73,
  },
  {
    id: 'p14',
    name: 'Suco de Maracujá',
    description: 'Polpa de maracujá com água ou leite, 500ml.',
    price: 9.9,
    image: 'https://images.pexels.com/photos/539414/pexels-photo-539414.jpeg?auto=compress&cs=tinysrgb&w=900',
    categoryId: 'juices',
    rating: 4.7,
    reviews: 64,
  },
  {
    id: 'p15',
    name: 'Petit Gateau',
    description: 'Bolo quente com centro cremoso e sorvete de creme.',
    price: 19.9,
    image: 'https://images.pexels.com/photos/2910285/pexels-photo-2910285.jpeg?auto=compress&cs=tinysrgb&w=900',
    categoryId: 'desserts',
    badges: ['mais-vendido'],
    rating: 4.9,
    reviews: 233,
    popular: true,
  },
  {
    id: 'p16',
    name: 'Sundae de Chocolate',
    description: 'Sorvete de creme com calda quente de chocolate e granulado.',
    price: 14.5,
    image: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=900',
    categoryId: 'desserts',
    rating: 4.8,
    reviews: 119,
  },
  {
    id: 'p17',
    name: 'Cheesecake de Frutas Vermelhas',
    description: 'Cheesecake cremoso com calda de frutas vermelhas.',
    price: 18.0,
    image: 'https://images.pexels.com/photos/4040692/pexels-photo-4040692.jpeg?auto=compress&cs=tinysrgb&w=900',
    categoryId: 'desserts',
    badges: ['novo'],
    rating: 4.9,
    reviews: 58,
  },
];

export const storeConfig = {
  name: 'Burguer & Co.',
  tagline: 'Lanchonete & Quiosque',
  whatsapp: '5541999316134',
  hours: 'Ter a Dom · 18h00 — 23h30',
  deliveryFee: 6.0,
  estimatedDelivery: '30–45 min',
  address: 'Av. Central, 1200 — Centro',
};
