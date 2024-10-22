import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react"
import { useNavigate, useSearchParams  } from "react-router-dom";

export default function SearchBar({ isHomePage }) {
  const [queryValue, setQueryValue] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const query = searchParams.get("q") || ""; 
    setQueryValue(query);
  }, [searchParams]);

  const handleInput = (e) => {
    setQueryValue(e.target.value);
    console.log(queryValue);
  }

  const handleSubmit = async () => {
    try {
      if (queryValue) {
        navigate(`/search?q=${queryValue}`); 
      }
    } catch (error) {
      console.log(error); 
    }
  };

  return (
    <>
      {isHomePage ? (
        <div className="py-[10px] flex items-center max-w-[400px] w-full flex-grow mb-[36px] bg-[rgba(20,20,20,0.59)] rounded-[5px] shadow-[rgba(0,_0,_0,_0.6)_0px_2px_4px]">
          <input id="queryValue" value={queryValue} onChange={handleInput} placeholder="Buscar Wallpaper" className="w-full flex-grow h-full px-[14px] outline-none text-white text-[16px] bg-transparent"/>
          <div className="w-[1px] h-[35px] bg-[rgba(255,255,255,0.06)]"></div>
          <div className="h-[2.2em] w-full max-w-[3.2em] cursor-pointer flex items-center justify-center">
            <FontAwesomeIcon onClick={handleSubmit} icon={faMagnifyingGlass} className="text-white text-[20px]"/>
          </div>
        </div>
      ) : (
        <div className="flex items-center max-w-[400px] flex-grow h-[2.2em] mx-[20px]">
          <input id="queryValue" value={queryValue} onChange={handleInput} placeholder="Buscar Wallpaper" className="w-full flex-grow h-full px-[14px] rounded-s-[5px] outline-none bg-[#15161A] text-white text-[15px] "/>
          <div className="h-[2.2em] w-full max-w-[2.2em] bg-primary-color cursor-pointer flex items-center justify-center rounded-e-[5px] hover:bg-[#0dc9a5] transition-[200ms]">
            <FontAwesomeIcon onClick={handleSubmit} icon={faMagnifyingGlass} className="text-[#0c0d0e] text-[18px]"/>
          </div>
        </div>
      )}
    </>
  )
}