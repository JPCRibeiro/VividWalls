import { useRef, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImage } from '@fortawesome/free-regular-svg-icons';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

export default function NewPost() {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState(""); 
  const [fileSize, setFileSize] = useState("");
  const [caption, setCaption] = useState("");
  const [captionError, setCaptionError] = useState(null); 
  const imageView = useRef(null);
  const inputFile = useRef(null);
  const [imgURL, setImgURL] = useState("");
  const navigate = useNavigate();

  const handleFile = (selectedFile) => {
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name); 
      setFileSize((selectedFile.size / (1024 * 1024)).toFixed(2)); 
      const imgLink = URL.createObjectURL(selectedFile);
      setImgURL(imgLink);
    }
  };

  const dragImage = (e) => {
    e.preventDefault();
  };

  const dropImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files[0];
    handleFile(droppedFile); 
  };

  const fileSelected = (e) => {
    const selectedFile = e.target.files[0];
    handleFile(selectedFile); 
  };

  const handleCaption = (e) => {
    setCaption(e.target.value);
    if (e.target.value.trim() !== "") {
      setCaptionError(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (caption.trim() === "") {
      setCaptionError(true);
    } 
    else if (!file) {
      return;
    } else {
      setCaptionError(false);
      const formData = new FormData();
      formData.append("image", file);
      formData.append("caption", caption.toLowerCase().trim());

      await axios.post("/api/posts", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      navigate("/recentes");
    }
  };

  return(
    <div className="flex flex-col text-center [box-shadow:1px_1px_5px_rgba(0,_0,_0,_.33)] p-[40px] bg-[#222431] rounded-[3px]">
      <h1 className="text-center text-white font-bold text-[46px] title leading-[48px]">VividWalls</h1>
      <h3 className="font-[500] text-[16px] mb-[20px]">Adicione um wallpaper ao nosso site!</h3>
      <div className="flex flex-col items-start w-full mb-[20px] gap-[10px]">
        <label className="text-[18px] flex items-center gap-[10px]">
          Descrição da imagem {captionError && ( <FontAwesomeIcon icon={faTriangleExclamation} className="text-[#ad3e3e]"/> )}
        </label>
        <input id="descricao" value={caption} onChange={handleCaption} type="text" className={`p-[10px] px-[14px] bg-[#333c4b] placeholder:font-[500] border-[2px] w-full rounded-[3px] text-white outline-none ${captionError ? "border-[#ad3e3e] placeholder:text-[#ad3e3e]" : "border-[#1FB3CF]"}`} placeholder="Descrição"/>
      </div>
      <div className="text-center w-[700px] bg-[#30324B] rounded-t-[3px] py-[12px] flex gap-[20px] items-center justify-center shadow-[inset_0_0_.75em_rgba(255,_255,_255,_.02),_0_2px_0_#1c1c1c,_0_3px_4px_-3px_#000,_0_1px_2px_rgba(0,_0,_0,_.2)]">
        <span className="font-[600]">Solte uma imagem abaixo</span>
        <span className="text-[14px]">ou</span>
        <label className="bg-white p-[8px] rounded-[5px] cursor-pointer text-black font-[500] shadow-[0_3px_0_#afafaf] active:shadow-none active:translate-y-[2px]">
          clique aqui
          <input id="input-file" ref={inputFile} onChange={fileSelected} type="file" accept="image/*" hidden/>
        </label>
      </div>
      <label className="w-[700px] h-[250px]" onDragOver={dragImage} onDrop={dropImage}>
        <input id="input-file" ref={inputFile} onChange={fileSelected} type="file" accept="image/*" hidden/>
        <div className="relative bg-[#141618] h-full flex justify-center items-center bg-[repeating-linear-gradient(45deg,_#1a1c23,_#1a1c23_2em,_#16191e_2em,_#16191e_4em)] shadow-[inset_.33em_.33em_1.5em_rgba(0,_0,_0,_.33)]" onChange={fileSelected}>
          <div className="relative rounded-b-[3px] inline-block shadow-[0_0_4px_rgba(0,_0,_0,_.8)] pt-[20px]">
            { imgURL && (
              <>
                <div className="absolute top-0 w-full h-[20px] bg-[#222431] text-[11px] flex items-center justify-between rounded-t-[3px] px-[8px]">
                  <p className="cursor-text">{fileName}</p>
                  <p className="cursor-text">{fileSize} MB</p>
                </div>
                <img ref={imageView} src={imgURL} alt="uploaded-image" className="relative block h-[200px] rounded-b-[3px] select-none"/>
              </>
            )}
          </div>
          { !imgURL && <FontAwesomeIcon icon={faFileImage} className="text-[60px] text-[#2a2c3f] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"/> }
        </div>
      </label>
      <div className="text-center w-[700px] bg-[#30324B] rounded-b-[3px] pt-[8px] pb-[12px] flex gap-[20px] items-center justify-center shadow-[inset_0_0_.75em_rgba(255,_255,_255,_.02),_0_2px_0_#1c1c1c,_0_3px_4px_-3px_#000,_0_1px_2px_rgba(0,_0,_0,_.2)]">
        <button onClick={handleSubmit} className="py-[6px] px-[14px] rounded-[5px] font-[500] text-[#141618] text-[14px] bg-[#1FB3CF] shadow-[0_3px_0_#0072ff] active:shadow-none active:translate-y-[2px]">Submit</button>
      </div>
    </div>
  ) 
}
