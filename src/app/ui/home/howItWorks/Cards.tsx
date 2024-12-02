import Card from './Card';
import cardsInfo from './cardsInfo';

export default function Cards() {
  return (
    <div className="flex flex-wrap gap-6 lg:flex-nowrap">
      {cardsInfo.map((item) => (
        <Card key={item.title} title={item.title} description={item.description} image={item.image} step={item.step} />
      ))}
    </div>
  );
}
