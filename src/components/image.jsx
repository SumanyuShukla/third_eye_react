import React, { useState } from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./global.css";

const Image = (props) =>{

    const [file,setFile]=useState();
    
    const showImage =async (e) =>{
        if(e.target.files.length>0){
            props.callback(e.target.files[0]);
            setFile(URL.createObjectURL(e.target.files[0]));
            let imageDiv = ReactDOM.findDOMNode(document.getElementById('imageDiv'))
            let img=document.getElementById("image");
            img.onload=(e)=>{
                let height=document.getElementById("image").height;
                let width=document.getElementById("image").width
                if(height>imageDiv.style.height.replace("px","") || width>imageDiv.style.width.replace("px","")){
                    imageDiv.style.display = 'block'
                }else{
                    imageDiv.style.display = 'flex'
                }
            };
        }
    }

    

    return(
        <>
        <div className="row">
            <div className="col-md-12">
                <div id='imageDiv' style={{width:'500px',height:'500px',border:'1px dashed black',marginTop: '40px', marginBottom: '40px', overflow: 'auto', padding: '0px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <img src={file} id='image'></img>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-md-12">
                <div className="upload-btn-wrapper">
                    <button className="btn">Upload a Photo</button>
                    <input type="file" name="file" onChange={showImage} accept="image/png,image/jpg,image/jpeg"/>
                </div>
            </div>
        </div>
        </>
    )
}


export default Image;