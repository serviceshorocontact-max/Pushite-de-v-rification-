'use client';

interface ProductCardProps {
  title: string;
  price: string;
  description: string;
  popular?: boolean;
  onSelect?: () => void;
}

const ProductCard = ({ title, price, description, popular = false, onSelect }: ProductCardProps) => {
  return (
    <div
      className={`bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 border ${
        popular
          ? 'border-custom-yellow ring-2 ring-custom-yellow/20'
          : 'border-gray-100'
      } hover:-translate-y-2`}
    >
      {popular && (
        <div className="text-center mb-4">
          <span className="bg-custom-yellow text-custom-green text-sm font-semibold px-4 py-1 rounded-full">
            ⭐ Populaire
          </span>
        </div>
      )}
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
        {title}
      </h2>
      <p className="text-4xl font-extrabold text-custom-green text-center mb-4">
        {price}
      </p>
      <p className="text-gray-600 text-center mb-6 leading-relaxed">
        {description}
      </p>
      <button
        onClick={onSelect}
        className="w-full bg-custom-green text-white font-semibold py-3 px-6 rounded-xl hover:bg-custom-light-green transition-colors duration-200 shadow-md hover:shadow-lg"
      >
        Choisir cette offre
      </button>
    </div>
  );
};

const ProductCards = () => {
  const offers = [
    {
      title: 'Offre Découverte',
      price: '19€',
      description: 'Parfait pour tester nos services. Code valable 1 mois.',
      popular: false,
    },
    {
      title: 'Offre Standard',
      price: '49€',
      description: 'Le meilleur rapport qualité-prix. Code valable 6 mois.',
      popular: true,
    },
    {
      title: 'Offre Premium',
      price: '99€',
      description: 'Accès complet et prioritaire. Code valable 1 an.',
      popular: false,
    },
  ];

  const handleSelect = (title: string) => {
    // Redirige vers le formulaire de demande
    window.location.href = '/formulaire';
    // Ou affiche une alerte :
    // alert(`Vous avez sélectionné : ${title}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {offers.map((offer, index) => (
        <ProductCard
          key={index}
          title={offer.title}
          price={offer.price}
          description={offer.description}
          popular={offer.popular}
          onSelect={() => handleSelect(offer.title)}
        />
      ))}
    </div>
  );
};

export default ProductCards;
