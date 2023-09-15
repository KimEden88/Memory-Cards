const ButtonStart = ({ ShuffleCards }) => {
  return (
    <button
      onClick={ShuffleCards}
      className="bg-none border-2 rounded-md cursor-pointer py-1 px-2 font-bold hover:bg-pink-600 text-fuchsia-50"
    >
      New Game
    </button>
  );
};

export default ButtonStart;
