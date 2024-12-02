import Card from './Card';
import cardsInfo from './cardsInfo';

export default function Cards() {
  return (
    <div className="mt-10 flex flex-wrap gap-20 md:gap-12 lg:flex-nowrap">
      {cardsInfo.map((card, index) => (
        <Card key={index} {...card} />
      ))}
    </div>
  );
}
