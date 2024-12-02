import Card from './Card';
import cardsInfo from './cardsInfo';

export default function Cards() {
  return (
    <div className="flex flex-wrap gap-8 md:gap-12 lg:flex-nowrap">
      {cardsInfo.map((card) => (
        <Card key={card.title} {...card} />
      ))}
    </div>
  );
}
