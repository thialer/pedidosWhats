import type { CartItem } from './CartContext';
import { summarizeSelections, formatBRL } from './CartContext';
import { storeConfig } from '../data/catalog';

export interface CheckoutData {
  name: string;
  phone: string;
  address: string;
  number: string;
  complement: string;
  district: string;
  city: string;
  deliveryMode: 'entrega' | 'retirada';
  payment: 'pix' | 'dinheiro' | 'cartao';
  changeFor?: string;
  notes: string;
}

export function buildWhatsAppMessage(
  items: CartItem[],
  checkout: CheckoutData,
  deliveryFee: number,
): string {
  const lines: string[] = [];
  lines.push('═══════════════════════════════════');
  lines.push('NOVO PEDIDO - ' + storeConfig.name);
  lines.push('═══════════════════════════════════');
  lines.push('');
  lines.push('*DADOS DO CLIENTE*');
  lines.push(`Nome: ${checkout.name}`);
  lines.push(`Telefone: ${checkout.phone}`);
  lines.push('');
  lines.push('*ENTREGA*');
  
  if (checkout.deliveryMode === 'entrega') {
    lines.push('Modo: Entrega');
    lines.push(`Endereço: ${checkout.address}`);
    lines.push(`Número: ${checkout.number}`);
    if (checkout.complement) {
      lines.push(`Complemento: ${checkout.complement}`);
    }
    lines.push(`Bairro: ${checkout.district}`);
    if (checkout.city) {
      lines.push(`Cidade: ${checkout.city}`);
    }
  } else {
    lines.push('Modo: Retirada no local');
  }
  
  lines.push('');
  lines.push('*ITENS DO PEDIDO*');
  
  let total = 0;
  items.forEach((item) => {
    const sum = summarizeSelections(item.selections, item.product.customizations);
    const itemTotal = item.unitPrice * item.quantity;
    total += itemTotal;
    lines.push(`${item.quantity}x ${item.product.name}`);
    if (sum.length > 0) {
      sum.forEach((s) => lines.push(`  • ${s}`));
    }
    if (item.notes) lines.push(`  • Obs: ${item.notes}`);
    lines.push(`  Subtotal: ${formatBRL(itemTotal)}`);
    lines.push('');
  });

  lines.push('*VALORES*');
  lines.push(`Subtotal: ${formatBRL(total)}`);
  if (checkout.deliveryMode === 'entrega') {
    lines.push(`Taxa de entrega: ${formatBRL(deliveryFee)}`);
    total += deliveryFee;
  }
  lines.push(`*Total: ${formatBRL(total)}*`);
  lines.push('');
  lines.push('*PAGAMENTO*');
  lines.push(`Forma: ${paymentLabel(checkout.payment)}`);
  if (checkout.payment === 'dinheiro' && checkout.changeFor) {
    lines.push(`Troco para: R$ ${checkout.changeFor}`);
  }
  lines.push('');
  
  if (checkout.notes) {
    lines.push('*OBSERVAÇÕES*');
    lines.push(checkout.notes);
    lines.push('');
  }

  lines.push('═══════════════════════════════════');
  lines.push('Aguardando confirmação!');
  lines.push('═══════════════════════════════════');

  return lines.join('\n');
}

function paymentLabel(p: CheckoutData['payment']): string {
  return p === 'pix' ? 'PIX' : p === 'dinheiro' ? 'Dinheiro' : 'Cartão';
}

export function whatsappLink(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${storeConfig.whatsapp}?text=${encoded}`;
}
