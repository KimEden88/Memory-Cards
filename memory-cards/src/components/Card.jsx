import './Card.css';

const Card = ({ card, handleChoice, flipped, wrongChoiceDelay }) => {
  const handleClick = () => {
    handleChoice(card);
  };
  console.log('!', wrongChoiceDelay);
  return (
    <div
      className="card relative"
      key={card.cardId}
    >
      <div className={flipped ? 'flipped' : ''}>
        <img
          className="front w-[100%] block rounded-md border-2 border-slate-200 absolute "
          src={card.image}
          alt={card.name}
        />
        <img
          onClick={handleClick}
          className={`back w-[100%] block rounded-md bg-gray-800 border-2 border-slate-200 ${
            wrongChoiceDelay ? 'cursor-not-allowed' : 'cursor-pointer'
          }`}
          src="../src/assets/cover.png"
          alt="card back"
        />
      </div>
    </div>
  );
};

export default Card;
