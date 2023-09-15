import './App.css';
import ButtonStart from './components/ButtonStart';
import instance from './axios/instance';
import { useEffect, useState } from 'react';
import Card from './components/Card';

function App() {
  const [character, setCharacters] = useState([]);
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [wrongChoiceDelay, setWrongChoiceDelay] = useState(false);

  //Get A Random Array Of 8 Numbers
  const randomCherArray = Array(8)
    .fill()
    .map(() => Math.floor(826 * Math.random()));
  //console.log(randomCherArray);

  // Get Our 8 Random chars from the API
  const getCharacters = async () => {
    try {
      const res = await instance.get(`/${randomCherArray}`);
      setCharacters(res.data);
      console.log('char', res.data);
    } catch (error) {
      console.log(error.response);
    }
  };
  //Shuffle cards
  const ShuffleCards = () => {
    getCharacters();
    const shuffledCards = [...character, ...character]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, cardId: Math.random(), matched: false }));
    setCards(shuffledCards);
    setTurns(0);
    console.log('cards:', shuffledCards);
  };
  //Handle choices
  const handleChoice = (card) => {
    if (!wrongChoiceDelay) {
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    }
  };

  //Handle the Turn
  const handleTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    //setTurns((prevTurn) => prevTurn + 1);
  };

  //compere the two cards that were selected
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.name === choiceTwo.name) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.name === choiceOne.name) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });

        handleTurn();
      } else {
        setWrongChoiceDelay(true);
        setTimeout(() => {
          handleTurn();
          setWrongChoiceDelay(false);
        }, 1500);
      }
    }
  }, [choiceOne, choiceTwo]);

  console.log(cards);

  return (
    <div className="max-w-5xl mx-auto my-10 text-center">
      <h1 className="text-4xl text-teal-50 py-6 font-semibold">Memory cards</h1>
      <div className="my-10 grid grid-cols-4 gap-4">
        {cards &&
          cards.map((card) => (
            <Card
              key={card.cardId}
              card={card}
              handleChoice={handleChoice}
              wrongChoiceDelay={wrongChoiceDelay}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
            />
          ))}
      </div>

      <ButtonStart ShuffleCards={ShuffleCards} />
    </div>
  );
}

export default App;
