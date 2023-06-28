
import React,{useState} from 'react'


 const PreviewImage = ({file }: any)=> {
    const [preview, setPreview] = useState();
    const reader: any = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = ()=>{
            setPreview(reader.result);
        }
    
    return (
        <div >
            
            {preview ? <img src= {preview} alt='preview' height= '200px' width='200px'/>
            : <>Loading ...</> 
            }
        </div>
    )
}

export default PreviewImage
