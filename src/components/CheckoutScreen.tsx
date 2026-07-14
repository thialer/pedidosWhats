import { useState } from 'react';
import { ArrowLeft, CheckCircle2, Send } from 'lucide-react';
import { useCart, formatBRL } from '../cart/CartContext';
import { storeConfig } from '../data/catalog';
import { buildWhatsAppMessage, whatsappLink, type CheckoutData } from '../cart/whatsapp';

interface Props {
  onBack: () => void;
}

const empty: CheckoutData = {
  name: '',
  phone: '',
  address: '',
  number: '',
  complement: '',
  district: '',
  city: '',
  deliveryMode: 'entrega',
  payment: 'pix',
  changeFor: '',
  notes: '',
};

export function CheckoutScreen({ onBack }: Props) {
  const { items, subtotal, clear } = useCart();
  const [form, setForm] = useState<CheckoutData>(empty);
  const [sent, setSent] = useState(false);

  const set = (k: keyof CheckoutData, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const needsAddress = form.deliveryMode === 'entrega';
  const valid =
    form.name.trim() &&
    form.phone.trim() &&
    (!needsAddress ||
      (form.address.trim() && form.number.trim() && form.district.trim()));

  const total = subtotal + (needsAddress ? storeConfig.deliveryFee : 0);

  const finish = () => {
    if (!valid) return;
    const message = buildWhatsAppMessage(
      items,
      form,
      needsAddress ? storeConfig.deliveryFee : 0,
    );
    window.open(whatsappLink(message), '_blank');
    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <div className="grid h-24 w-24 place-items-center rounded-full bg-brand-100 animate-pop">
          <CheckCircle2 size={52} className="text-brand-600" />
        </div>
        <h2 className="mt-6 text-2xl font-extrabold text-ink-900">Você será encaminhado ao WhatsApp!</h2>
        <p className="mt-2 max-w-xs text-gray-500">
          Envie a mensagem automática do seu pedido para finalizar com a {storeConfig.name}.
        </p>
        <button
          onClick={() => {
            clear();
            onBack();
          }}
          className="mt-8 rounded-2xl bg-brand-600 px-8 py-3.5 font-bold text-white shadow-float transition active:scale-95 hover:bg-brand-700"
        >
          Novo pedido
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-4 pb-32 pt-4">
      <button
        onClick={onBack}
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 transition hover:text-ink-900"
      >
        <ArrowLeft size={16} /> Voltar ao cardápio
      </button>

      <h1 className="text-2xl font-extrabold text-ink-900">Finalizar pedido</h1>
      <p className="mt-1 text-sm text-gray-500">
        Preencha seus dados — o pedido é enviado pelo WhatsApp.
      </p>

      {/* Delivery mode */}
      <Section title="Forma de entrega">
        <div className="grid grid-cols-2 gap-2">
          <Choice
            active={form.deliveryMode === 'entrega'}
            onClick={() => set('deliveryMode', 'entrega')}
            label="Entrega"
            sub={storeConfig.estimatedDelivery}
          />
          <Choice
            active={form.deliveryMode === 'retirada'}
            onClick={() => set('deliveryMode', 'retirada')}
            label="Retirada"
            sub={storeConfig.address}
          />
        </div>
      </Section>

      {/* Contact */}
      <Section title="Seus dados">
        <Field label="Nome *" value={form.name} onChange={(v) => set('name', v)} placeholder="Seu nome" />
        <Field
          label="Telefone *"
          value={form.phone}
          onChange={(v) => set('phone', v.replace(/\D/g, ''))}
          placeholder="(00) 00000-0000"
          type="tel"
          inputMode="numeric"
        />
      </Section>

      {/* Address */}
      {needsAddress && (
        <Section title="Endereço de entrega">
          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-2">
              <Field label="Endereço *" value={form.address} onChange={(v) => set('address', v)} placeholder="Rua / Av." />
            </div>
            <Field label="Número *" value={form.number} onChange={(v) => set('number', v.replace(/\D/g, ''))} placeholder="Nº" inputMode="numeric" />
          </div>
          <Field label="Complemento" value={form.complement} onChange={(v) => set('complement', v)} placeholder="Apto, bloco..." />
          <div className="grid grid-cols-2 gap-2">
            <Field label="Bairro *" value={form.district} onChange={(v) => set('district', v)} placeholder="Bairro" />
            <Field label="Cidade" value={form.city} onChange={(v) => set('city', v)} placeholder="Cidade" />
          </div>
        </Section>
      )}

      {/* Payment */}
      <Section title="Forma de pagamento">
        <div className="grid grid-cols-3 gap-2">
          <PayChoice active={form.payment === 'pix'} onClick={() => set('payment', 'pix')} label="PIX" />
          <PayChoice active={form.payment === 'dinheiro'} onClick={() => set('payment', 'dinheiro')} label="Dinheiro" />
          <PayChoice active={form.payment === 'cartao'} onClick={() => set('payment', 'cartao')} label="Cartão" />
        </div>
        {form.payment === 'dinheiro' && (
          <Field
            label="Troco para quanto?"
            value={form.changeFor || ''}
            onChange={(v) => set('changeFor', v.replace(/\D/g, ''))}
            placeholder="R$ 50,00"
            className="mt-2"
            inputMode="numeric"
          />
        )}
      </Section>

      <Section title="Observações finais">
        <textarea
          value={form.notes}
          onChange={(e) => set('notes', e.target.value)}
          rows={2}
          placeholder="Ex.: Entregar na portaria, sem cebola..."
          className="w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-100"
        />
      </Section>

      {/* Summary */}
      <div className="mt-4 rounded-2xl bg-gray-50 p-4">
        <h3 className="mb-2 text-sm font-bold text-ink-900">Resumo</h3>
        <div className="space-y-1.5">
          {items.map((i) => (
            <div key={i.uid} className="flex justify-between text-sm">
              <span className="text-gray-600">
                {i.quantity}x {i.product.name}
              </span>
              <span className="font-semibold">{formatBRL(i.unitPrice * i.quantity)}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 space-y-1 border-t border-gray-200 pt-3 text-sm">
          <div className="flex justify-between text-gray-500">
            <span>Subtotal</span>
            <span>{formatBRL(subtotal)}</span>
          </div>
          {needsAddress && (
            <div className="flex justify-between text-gray-500">
              <span>Taxa de entrega</span>
              <span>{formatBRL(storeConfig.deliveryFee)}</span>
            </div>
          )}
          <div className="flex justify-between pt-1 text-base font-extrabold text-ink-900">
            <span>Total</span>
            <span className="text-brand-700">{formatBRL(total)}</span>
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 mx-auto max-w-lg border-t border-gray-100 bg-white/95 px-4 py-3 pb-safe backdrop-blur">
        <button
          onClick={finish}
          disabled={!valid}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-600 px-5 py-4 text-base font-bold text-white shadow-float transition active:scale-[0.98] hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
        >
          <Send size={18} />
          Finalizar pedido · {formatBRL(total)}
        </button>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-6">
      <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-400">
        {title}
      </h2>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  className = '',
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  className?: string;
  inputMode?: 'text' | 'numeric' | 'decimal' | 'email' | 'tel' | 'url' | 'search';
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-xs font-semibold text-gray-500">{label}</span>
      <input
        type={type}
        inputMode={inputMode}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-100"
      />
    </label>
  );
}

function Choice({
  active,
  onClick,
  label,
  sub,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  sub: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-2xl border p-4 text-left transition active:scale-[0.98] ${
        active ? 'border-brand-500 bg-brand-50' : 'border-gray-200 bg-white hover:border-gray-300'
      }`}
    >
      <p className="font-bold text-ink-900">{label}</p>
      <p className="mt-0.5 text-xs text-gray-500">{sub}</p>
    </button>
  );
}

function PayChoice({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-2xl border py-3 text-center text-sm font-bold transition active:scale-[0.98] ${
        active ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
      }`}
    >
      {label}
    </button>
  );
}
