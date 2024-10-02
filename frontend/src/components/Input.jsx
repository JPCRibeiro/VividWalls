import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

export default function InputComponent({ isLoginPage, id, type, autocomplete, label, icon, title, setTitle, error, setError }) {
  const handleText = (e) => {
    setTitle(e.target.value);
    if (e.target.value.trim() !== "") {
      setError(false);
    }
  };

  return (
    <>
      {isLoginPage ? (
        <div className="mb-[20px]">
          <div className="input-box login-input-box">
            <FontAwesomeIcon icon={icon} />
            <input
              id={id}
              value={title}
              onChange={handleText}
              type={type}
              placeholder=""
              autoComplete={autocomplete}
              className={`border-[2px] ${error ? 'border-[#ad3e3e] focus:border-[#ad3e3e]' : 'border-[#7f858d] focus:border-primary-color'}`}
            />
            <label htmlFor={id} className={error ? 'input-error' : ''}>{label}</label>
          </div>
          {error && (
            <div className="text-[#ad3e3e] text-[15px] pt-[6px] font-[500] flex items-center gap-[6px]">
              {error}
              <FontAwesomeIcon icon={faTriangleExclamation}/>
            </div>
          )}
        </div>
      ) : (
        <div className="mb-[20px] w-full">
          <div className="input-box register-input-box w-full">
            <input
              id={id}
              value={title}
              onChange={handleText}
              type={type}
              placeholder=""
              autoComplete={autocomplete}
              className={`border-[2px] input-pad ${error ? 'border-[#ad3e3e] focus:border-[#ad3e3e]' : 'border-[#7f858d] focus:border-primary-color'}`}
            />
            <label htmlFor={id} className={`text-[15px] ${error ? 'input-error' : ''}`}>
              {label}
            </label>
          </div>
          {error && (
            <div className="text-[#ad3e3e] text-[15px] pt-[6px] font-[500] flex items-center gap-[6px]">
              {error}
              <FontAwesomeIcon icon={faTriangleExclamation}/>
            </div>
          )}
        </div>
      )}
    </>
  );
}
