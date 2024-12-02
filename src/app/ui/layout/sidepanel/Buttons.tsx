import Button from './Button';
import { buttonsArray } from './buttonsInfo';

export default function Buttons() {
  return (
    <div>
      {buttonsArray.map((button) => (
        <Button key={button.name} {...button} />
      ))}
    </div>
  );
}
