export type Badge = 'novo' | 'promocao' | 'mais-vendido';
export type OptionType = 'single' | 'multi';

export interface CustomOption { id: string; name: string; price?: number; description?: string }
export interface CustomizationGroup {
  id: string; title: string; type: OptionType; required: boolean;
  min?: number; max?: number; options: CustomOption[]; showTotalPrice?: boolean;
}
export interface Product {
  id: string; name: string; description: string; price: number; image: string;
  categoryId: string; badges?: Badge[]; rating?: number; reviews?: number;
  customizations?: CustomizationGroup[]; popular?: boolean;
}
export interface Category { id: string; name: string; emoji: string }

export const categories: Category[] = [
  { id: 'pizzas', name: 'Pizzas', emoji: '🍕' },
  { id: 'dogs', name: 'Dogs', emoji: '🌭' },
  { id: 'x-burgers', name: 'Cardápio X', emoji: '🍔' },
  { id: 'artisanal', name: 'Artesanais', emoji: '🍔' },
  { id: 'portions', name: 'Porções', emoji: '🍟' },
  { id: 'drinks', name: 'Refrigerantes e bebidas', emoji: '🥤' },
];

const pizzaImage = '/pizza.jpg';
const burgerImage = 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=900';
const dogImage = '/dog.jpg';
const friesImage = 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=900';
const drinkImage = 'https://images.pexels.com/photos/2983100/pexels-photo-2983100.jpeg?auto=compress&cs=tinysrgb&w=900';

const edgeGroup: CustomizationGroup = {
  id: 'edge', title: 'Borda recheada', type: 'single', required: false,
  options: [
    { id: 'catupiry', name: 'Catupiry', price: 7 },
    { id: 'cheddar', name: 'Cheddar', price: 7 },
    { id: 'cream-cheese', name: 'Cream cheese', price: 12 },
    { id: 'chocolate-branco', name: 'Chocolate branco', price: 12 },
    { id: 'chocolate-preto', name: 'Chocolate preto', price: 12 },
  ],
};

let nextId = 0;
function item(name: string, description: string, price: number, categoryId: string, image = burgerImage): Product {
  return { id: `real-${++nextId}`, name, description, price, image, categoryId };
}

const traditional = [
  ['Calabresa', 'Molho, mussarela, calabresa e orégano', 27.9, 35.9],
  ['Calabresa c/ bacon', 'Molho, mussarela, calabresa, bacon e orégano', 29.9, 38.9],
  ['Bacon', 'Molho, mussarela, bacon e orégano', 27.9, 35.9],
  ['Mussarela', 'Molho, mussarela e orégano', 28.9, 36.9],
  ['Portuguesa', 'Molho, mussarela, presunto, cebola, ovo e orégano', 28.9, 38.9],
  ['Milho', 'Molho, mussarela, milho e orégano', 19.9, 32.9],
  ['Frango catupiry', 'Molho, mussarela, frango, catupiry e orégano', 27.9, 35.9],
  ['Frango cheddar', 'Molho, mussarela, frango, cheddar e orégano', 27.9, 35.9],
  ['Frango batata palha', 'Molho, mussarela, frango, batata palha e orégano', 25.9, 34.9],
  ['Frango c/ bacon', 'Molho, mussarela, frango, bacon e orégano', 28.9, 36.9],
  ['Crocante', 'Molho, mussarela, bacon, batata palha e orégano', 27.9, 36.9],
  ['Napolitana', 'Molho, mussarela, tomate, parmesão e orégano', 27.9, 35.9],
  ['Marguerita', 'Molho, mussarela, tomate, manjericão e orégano', 27.9, 35.9],
  ['Frango barbecue', 'Molho, mussarela, frango em cubos, molho barbecue e orégano', 28.9, 36.9],
  ['Calabresa catupiry ou cheddar', 'Molho, mussarela, calabresa, catupiry ou cheddar e orégano', 27.9, 36.9],
  ['Calabresa acebolada', 'Molho, mussarela, calabresa, cebola e orégano', 27.9, 36.9],
  ['Milho bacon', 'Molho, mussarela, milho, bacon e orégano', 24.9, 34.9],
  ['Alho', 'Molho, mussarela, alho e orégano', 28.9, 36.9],
  ['Atum', 'Molho, mussarela, atum, cebola e orégano', 28.9, 37.9],
] as const;

const special = [
  ['Brócolis c/ alho', 'Molho, mussarela, brócolis, alho e orégano', 28.9, 42.9],
  ['Brócolis c/ bacon', 'Molho, mussarela, brócolis, bacon e orégano', 29.9, 43.9],
  ['Rúcula', 'Molho, mussarela, rúcula, tomate seco e orégano', 32.9, 49.9],
  ['Mexicana', 'Molho, mussarela, calabresa moída, pimentão verde, pimenta e orégano', 28.9, 42.9],
  ['Doritos', 'Molho, mussarela, carne moída, molho Billy Jack e orégano', 38.9, 58.9],
  ['Moda da casa', 'Molho, mussarela, calabresa, bacon, lombo, milho, tomate e orégano', 36.9, 55.9],
  ['Palmito', 'Molho, mussarela, palmito, cream cheese e orégano', 42.9, 65.9],
  ['Palmito bacon', 'Molho, mussarela, palmito, bacon e orégano', 43.9, 68.9],
  ['Costela', 'Molho, mussarela, costela, cream cheese e orégano', 48.9, 84.9],
  ['Alcatra c/ alho', 'Molho, mussarela, alcatra, alho e orégano', 51.9, 86.9],
  ['Linguiça Blumenau', 'Molho, mussarela, linguiça Blumenau e orégano', 48.9, 72.9],
  ['Peperoni', 'Molho, mussarela, peperoni e orégano', 45.9, 72.9],
  ['Pernil', 'Molho, mussarela, pernil, barbecue e orégano', 43.9, 68.9],
  ['Strogonoff', 'Molho, mussarela, carne em tiras, batata palha e orégano', 48.9, 82.9],
  ['Provolone', 'Molho, mussarela, provolone e orégano', 42.9, 65.9],
  ['4 queijos', 'Molho, mussarela, queijo prato, parmesão e catupiry', 42.9, 66.9],
  ['5 queijos', 'Molho, mussarela, parmesão, provolone, queijo prato, catupiry e orégano', 45.9, 69.9],
  ['6 queijos', 'Molho, mussarela, parmesão, provolone, queijo prato, catupiry, cheddar e orégano', 49.9, 74.9],
  ['Lombo catupiry', 'Molho, mussarela, lombo, catupiry e orégano', 49.9, 74.9],
  ['Lombo cheddar', 'Molho, mussarela, lombo, cheddar e orégano', 49.9, 74.9],
  ['Lombo cebola crocante', 'Molho, mussarela, lombo, barbecue, cebola crocante e orégano', 43.9, 56.9],
] as const;

const sweetPizzas = [
  ['Chocolate preto com morango', 'Chocolate preto e morango', 28.9, 44.9],
  ['Chocolate branco com morango', 'Chocolate branco e morango', 28.9, 44.9],
  ['Chocolate preto', 'Chocolate preto', 25.9, 41.9],
  ['Chocolate branco', 'Chocolate branco', 25.9, 41.9],
  ['Dois amores', 'Chocolate preto e branco', 28.9, 44.9],
  ['Prestígio', 'Chocolate e coco', 29.9, 44.9],
  ['Brigadeiro', 'Brigadeiro', 27.9, 43.9],
  ['Banana com canela', 'Banana e canela', 23.9, 40.9],
  ['Banana com chocolate branco', 'Banana e chocolate branco', 25.9, 42.9],
] as const;

type PizzaFlavor = readonly [string, string, number, number];
const pizzaFlavors: readonly PizzaFlavor[] = [
  ...traditional,
  ...special,
  ...sweetPizzas,
  ['Mousse de limão', 'Mousse de limão', 30.9, 48.9],
  ['Morangoff', 'Morangoff', 32.9, 50.9],
  ['Sonho de valsa', 'Sonho de Valsa', 32.9, 50.9],
  ['Ouro branco', 'Ouro Branco', 32.9, 50.9],
];

function pizza(size: 'P' | 'G', priceIndex: 2 | 3): Product {
  const lowestPrice = Math.min(...pizzaFlavors.map((flavor) => flavor[priceIndex]));
  const flavorOptions: CustomizationGroup = {
    id: 'flavor',
    title: 'Escolha até 2 sabores',
    type: 'multi',
    required: true,
    min: 1,
    max: 2,
    showTotalPrice: true,
    options: pizzaFlavors.map(([name, description, smallPrice, largePrice], index) => {
      const flavorPrice = priceIndex === 2 ? smallPrice : largePrice;
      const provisional = name === 'Calabresa c/ bacon' ? ' (valor provisório)' : '';
      return {
        id: `flavor-${index}`,
        name: `${name}${provisional}`,
        description,
        price: Number((flavorPrice - lowestPrice).toFixed(2)),
      };
    }),
  };

  return {
    id: `pizza-${size.toLowerCase()}`,
    name: `Pizza ${size}`,
    description: 'Escolha entre sabores tradicionais, especiais e doces.',
    price: lowestPrice,
    image: pizzaImage,
    categoryId: 'pizzas',
    customizations: [flavorOptions, edgeGroup],
  };
}

const dogs = [
  ['Heitor', 'Tradicional. Pão, vina, maionese, tomate, cebola, milho e batata palha', 15],
  ['Crixus', 'Duplo. Pão, vina, maionese, tomate, cebola, milho e batata palha', 17],
  ['Aquiles', 'Frango. Pão, vina, maionese, tomate, cebola, milho, batata palha, frango e catupiry ou cheddar', 17],
  ['Ragnar', 'Bacon. Pão, vina, maionese, tomate, cebola, milho, batata palha e bacon', 17.5],
  ['Ragnarson', 'Bacon com catupiry ou cheddar. Pão, vina, maionese, tomate, cebola, milho, batata palha e bacon', 19],
  ['Bjorn', 'Calabresa. Pão, vina, maionese, tomate, cebola, milho, batata palha e calabresa', 17],
  ['Ubbe', 'Calabresa com catupiry ou cheddar. Pão, vina, maionese, tomate, cebola, milho e batata palha', 20],
  ['Aiwar', 'Calabresa com bacon. Pão, vina, maionese, tomate, cebola, milho e batata palha', 20],
  ['Hvitserk', 'Bacon com frango. Pão, vina, maionese, tomate, cebola, milho e batata palha', 20],
  ['Aegon', '4 queijos. Pão, vina, maionese, tomate, cebola, milho, batata palha, mussarela, queijo prato, provolone e cream cheese', 25],
  ['Gladiador', 'Costela. Pão, 2 vinas, maionese, tomate, cebola, milho, batata palha, costela, cream cheese e mussarela', 30],
  ['Bartolomeo', 'Linguiça Blumenau. Pão, 2 vinas, maionese, tomate, cebola, milho, batata palha, linguiça Blumenau, cream cheese e mussarela', 28],
  ['Helena de Tróia', 'Dog tudo. Pão, 2 vinas, maionese, tomate, cebola, milho, batata palha ou Doritos, calabresa, bacon, frango, catupiry ou cheddar e mussarela', 30],
  ['Leônidas', 'Doritos. Pão, vina, maionese, tomate, cebola, milho, carne moída, queijo prato e Doritos', 25],
  ['Gladiador 2', 'Alcatra. Pão, 2 vinas, maionese, tomate, cebola, milho, batata palha, alcatra, provolone e cream cheese', 36],
  ['Aegon 2', 'Carne moída com purê. Pão, 2 vinas, maionese, tomate, cebola, milho, carne moída e purê', 26],
] as const;

const xs = [
  ['X-burguer', 'Pão, maionese, hambúrguer, presunto e queijo', 14],
  ['X-salada', 'Pão, maionese, hambúrguer, tomate, alface, presunto e queijo', 16],
  ['X-bacon', 'Pão, maionese, hambúrguer, tomate, alface, bacon, presunto e queijo', 18],
  ['X-calabresa', 'Pão, maionese, hambúrguer, tomate, alface, calabresa, presunto e queijo', 18],
  ['X-frango', 'Pão, maionese, hambúrguer, tomate, alface, frango desfiado, cream cheese, presunto e queijo', 18],
  ['X-egg', 'Pão, maionese, hambúrguer, tomate, alface, ovo, presunto e queijo', 17],
  ['X-tudo', 'Pão, maionese, hambúrguer, tomate, alface, calabresa, bacon, ovo, presunto e queijo', 22],
  ['X-Blumenau', 'Pão, maionese, hambúrguer, tomate, alface, linguiça Blumenau, cream cheese, presunto e queijo', 25],
  ['X-costela', 'Pão, maionese, hambúrguer, tomate, alface, costela, cream cheese, presunto e queijo', 28],
  ['X-4 queijos', 'Pão, maionese, 2 hambúrgueres, tomate, alface, presunto, provolone, mussarela, queijo prato e catupiry', 27],
  ['X-Alcatra', 'Pão, maionese, hambúrguer, tomate, alface, alcatra ao alho e óleo, presunto, queijo e provolone', 36],
  ['X-calabresa c/ bacon', 'Pão, maionese, hambúrguer, tomate, alface, calabresa, bacon, presunto e queijo', 21],
  ['X-calabresa c/ frango', 'Pão, maionese, hambúrguer, tomate, alface, calabresa, frango, presunto, queijo e catupiry', 21],
  ['X-frango c/ bacon', 'Pão, maionese, hambúrguer, tomate, alface, frango, bacon, presunto, queijo e catupiry', 21],
  ['X-tudão', 'Pão 23 cm, maionese, 2 hambúrgueres, 2 vinas, 2 ovos, calabresa, bacon, frango, tomate, alface, milho, batata palha, catupiry, cheddar, presunto e queijo', 45],
  ['X-egg c/ bacon', 'Pão, maionese, hambúrguer, tomate, alface, ovo, bacon, presunto e queijo', 24],
] as const;

const artisanal = [
  ['Coração Valente', 'Pão, hambúrguer artesanal, molho, cebola caramelizada, tomate e alface', 17],
  ['300', 'Pão, 2 hambúrgueres artesanais, queijo, molho, cebola caramelizada, tomate e alface', 23],
  ['Cavalo de Tróia', 'Pão, 3 hambúrgueres artesanais, molho, queijo, cebola caramelizada, tomate e alface', 30],
  ['Tróia', 'Pão, hambúrguer artesanal, queijo, bacon, molho, tomate, cebola caramelizada e alface', 22],
  ['Gladiador', 'Pão, hambúrguer artesanal, molho, queijo, costela, cebola, cream cheese e cebola caramelizada', 30],
  ['Cavaleiros', 'Pão, hambúrguer artesanal, alcatra, molho, queijo e cebola caramelizada', 38],
] as const;

const dogImages: Record<string, string> = {
  Crixus: '/crixus.jpg',
  Aquiles: '/aquiles.jpg',
  Ragnar: '/ragnar.jpg',
  Ragnarson: '/ragnarson.jpg',
  Aiwar: '/aiwar.jpg',
  Aegon: '/aegon.jpg',
  Gladiador: '/gladiador.jpg',
  'Gladiador 2': '/gladiador2.jpg',
};

export const products: Product[] = [
  pizza('P', 2),
  pizza('G', 3),
  ...dogs.map(([name, desc, price]) => item(name, desc, price, 'dogs', dogImages[name] ?? dogImage)),
  ...xs.map(([name, desc, price]) => {
    const normalizedName = name.toLowerCase();
    const image = normalizedName.includes('blumenau') ? '/x-blumenau.jpg'
      : normalizedName === 'x-burguer' ? '/x-burguer.jpg'
      : normalizedName.includes('calabresa') ? '/x-calabresa.jpg'
      : normalizedName.includes('egg') ? '/x-egg.jpg'
      : normalizedName.includes('frango') ? '/x-frango.jpg'
      : normalizedName.includes('4 queijos') ? '/x-queijo.jpg'
      : normalizedName.includes('tudão') ? '/x-tudao.jpg'
      : normalizedName.includes('tudo') ? '/x-tudo.jpg'
      : '/x-salada.jpg';
    return item(name, desc, price, 'x-burgers', image);
  }),
  ...artisanal.map(([name, desc, price]) => item(name, desc, price, 'artisanal', '/artesanal.png')),
  item('Batata 500 g', 'Porção de batata frita, 500 g', 28, 'portions', '/batata500g.jpg'),
  item('Batata c/ bacon', 'Porção de batata frita com bacon', 35, 'portions', '/batata-com-bacon.jpg'),
  item('Batata c/ calabresa', 'Porção de batata frita com calabresa', 34, 'portions', '/batata-com-calabresa.jpg'),
  item('Calabresa', 'Porção de calabresa', 30, 'portions', '/calabresa.jpg'),
  item('Coca lata', 'Refrigerante em lata', 7, 'drinks', '/coca-lata.jpg'),
  item('Coca lata zero', 'Refrigerante em lata, sem açúcar', 7, 'drinks', '/coca-lata-zero.jpg'),
  item('Água', 'Água sem gás', 4, 'drinks', '/agua.jpg'),
  item('Água c/ gás', 'Água com gás', 4.5, 'drinks', '/agua.jpg'),
  item('Fanta uva', 'Refrigerante Fanta sabor uva', 6.5, 'drinks', '/fanta-uva.jpg'),
  item('Fanta laranja', 'Refrigerante Fanta sabor laranja', 6.5, 'drinks', '/fanta-laranja.jpg'),
  item('Guaraná', 'Refrigerante Guaraná', 6.5, 'drinks', '/guarana.jpg'),
  item('Suco Dell Vale', 'Suco Dell Vale', 6.5, 'drinks', '/sucos-del-valle.jpg'),
  item('Coca 2 litros', 'Refrigerante Coca-Cola, 2 litros', 16.5, 'drinks', '/coca-2litros.jpg'),
  item('Coca zero 2 litros', 'Refrigerante Coca-Cola sem açúcar, 2 litros', 16.5, 'drinks', '/coca-2litros-zero.jpg'),
  item('Guaraná 2 litros', 'Refrigerante Guaraná, 2 litros', 14.5, 'drinks', '/guarana-2litros.jpg'),
];

export const storeConfig = {
  name: 'GLADIADORES DOG BURGUER',
  tagline: 'Pizzas, Dogs & Burgers',
  whatsapp: '5541999316134',
  hours: 'Ter a Dom · 18h00 — 23h30',
  deliveryFee: 6.0,
  estimatedDelivery: '30–45 min',
  address: 'Av. Brasil, 923 — Eucaliptos, Fazenda Rio Grande - PR',
};
