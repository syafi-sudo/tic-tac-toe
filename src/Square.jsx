function Square({ value, onSquareClick }) {
  return (
    <button className={`square ${value}`} onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default Square;
