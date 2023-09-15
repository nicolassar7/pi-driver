import Card from "../card/card";
import './cards.css'

function Cards({ drivers }) {
    
    return (
<div className='cards'>
  {drivers?.map((driver) => (
    <Card
      key={driver.id} 
      driver={driver}
    />
  ))}
</div>

    );
}

export default Cards;
