import { Link } from 'react-router-dom';

export default function Button({ text, color, as = 'button', to, inputFile, fileSelected, onClick }) {
  const className = `text-black justify-center font-[500] w-full flex py-[6px] px-[18px] rounded-[999px] active:shadow-none active:translate-y-[2px] ${color === 'green' ? 'bg-primary-color shadow-[0_3px_0_#028b71]' : 'bg-white shadow-[0_3px_0_#afafaf]'}`;

  if (as === 'Link') {
    return (
      <Link to={to} className={className}>
        {text}
      </Link>
    );
  } else if (as === 'label') {
    return (
      <label className={`${className} cursor-pointer`}>
        {text}
        <input id="input-file" ref={inputFile} onChange={fileSelected} type="file" accept="image/*" hidden/>
      </label>
    );
  } else {
    return (
      <button className={className} onClick={onClick}>
        {text}
      </button>
    );
  }
}