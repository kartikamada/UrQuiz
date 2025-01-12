import css from './OptionButton.module.css';

export default function OptionButton({ selected, onClick, optionText }) {
  return (
    <button
      className={`${css.button}${selected ? ' ' + css.selected : ''}`}
      onClick={onClick}
    >
      <span className={css.text}>{optionText}</span>
    </button>
  );
}
