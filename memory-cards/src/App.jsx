import './App.css';
import ButtonStart from './components/ButtonStart';
import instance from './axios/instance';
import { useEffect, useState } from 'react';
import Card from './components/Card';
import cover from './public/images/cover.png';
import dance from './public/images/dance.gif';
import congrats from './components/endText';

function App() {
  const [character, setCharacters] = useState([]);
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [wrongChoiceDelay, setWrongChoiceDelay] = useState(false);
  const [cardsAmount, setCardsAmount] = useState(8);
  const [endGame, setEndGame] = useState(0);

  const handleAddition = () => {
    setCardsAmount((pre) => {
      if (pre === 12) {
        return setCardsAmount(12);
      } else {
        return pre + 1;
      }
    });
  };
  const handleSubtraction = () => {
    setCardsAmount((pre) => {
      if (pre === 4) {
        return setCardsAmount(4);
      } else {
        return pre - 1;
      }
    });
  };

  //Get A Random Array Of 8 Numbers
  const randomCherArray = Array(cardsAmount !== 8 ? cardsAmount : 8)
    .fill()
    .map(() => Math.ceil(826 * Math.random()));

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
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(0);
    setEndGame(0);
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
    setTurns((prevTurn) => prevTurn + 1);
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
        setTimeout(() => {
          setEndGame((prev) => prev + 1);
          console.log('endGame:', endGame);
        }, 1500);
      } else {
        setWrongChoiceDelay(true);
        setTimeout(() => {
          handleTurn();
          setWrongChoiceDelay(false);
        }, 1500);
      }
    }
  }, [choiceOne, choiceTwo, cardsAmount]);

  console.log(cards);

  useEffect(() => {
    ShuffleCards();
  }, []);

  return (
    <div className="max-w-4xl max-h-screen mx-auto my-10 text-center">
      <h1 className="text-4xl text-teal-50 py-4 font-semibold">Memory cards</h1>
      <h3 className="text-2xl text-teal-50 py-2 font-semibold">{`Steps: ${turns}`}</h3>
      {endGame === cardsAmount ? (
        <div>
          <h1 className="text-white text-2xl py-3">
            {`${congrats[Math.floor(11 * Math.random())]}`}
          </h1>
          <img
            src={dance}
            alt="rick Dance"
            className="m-auto bg-white rounded-sm"
          />
        </div>
      ) : (
        <div className="my-5 grid grid-cols-4 gap-4">
          {cards &&
            cards.map((card) => (
              <Card
                key={card.cardId}
                card={card}
                cover={cover}
                handleChoice={handleChoice}
                wrongChoiceDelay={wrongChoiceDelay}
                flipped={
                  card === choiceOne || card === choiceTwo || card.matched
                }
              />
            ))}
        </div>
      )}

      <div>
        <div className="flex align-middle justify-center items-center gap-2">
          <button
            className="text-2xl"
            onClick={handleSubtraction}
          >
            ⬅️
          </button>
          <h3 className="text-2xl text-teal-50 py-6 font-semibold">
            Amount:{cardsAmount}
          </h3>
          <button
            className="text-2xl"
            onClick={handleAddition}
          >
            ➡️
          </button>
        </div>
        <ButtonStart ShuffleCards={ShuffleCards} />
      </div>
    </div>
  );
}

export default App;
