import {useState} from "react";
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { Modal } from "antd";

const Cropper = () => {

	// Cropper States and Functions
	const [crop, setCrop] = useState({aspect:1/1, width:120, height:120})
	const [src, setFile] = useState(null);
	const [image, setImage] = useState(null);
	const [croppedImage, setCroppedImage] = useState(null);
	const [cricular, setCircular] = useState(false);
	const handleFileChange = (e) => {
		setFile(URL.createObjectURL(e.target.files[0]))
	} 
	const handleImageLoad = (e) => {
		console.log(image);
		setImage(e.target)
	}



	// Modal related states and functions

	const [isModalOpen, setIsModalOpen] = useState(false);
	const showModal = () => {
	  setIsModalOpen(true);
	};
	const handleOk = () => {
	  setIsModalOpen(false);
	  const canvas = document.createElement('canvas');
	  const scaleX = image.naturalWidth / image.width;
	  const scaleY = image.naturalHeight / image.height;
	  canvas.width = crop.width
	  canvas.height = crop.height;
	  const ctx = canvas.getContext('2d');
	  ctx.drawImage(
		image, 
		crop.x * scaleX,
		crop.y * scaleY,
		crop.width * scaleX,
		crop.height * scaleY,
		0,0,
		crop.width,
		crop.height
	  )
	  const base64Image = canvas.toDataURL();
	  setCroppedImage(base64Image);
	};
	const handleCancel = () => {
	  setIsModalOpen(false);
	};

	return (
		<div>
			<button onClick={showModal}>Open Cropper</button>
			<Modal 
				style={{backgroundColor:"yellow", borderRadius:'40px'}}
				title="Basic Modal"
				centered={true} 
				circularCrop={cricular}
				open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
			>
				<input type="file" onChange={handleFileChange} />
				{
					src &&
					<ReactCrop onImageLoaded ruleOfThirds={true} aspect={1} crop={crop} onChange={c => setCrop(c)} >
						<img src={src} onLoad={handleImageLoad} alt="Cropper Image Display" />
					</ReactCrop>
				}
				
      		</Modal>
			{ croppedImage && <img src={croppedImage} alt="Cropped Image"/>}
		</div>
	)
}

export default Cropper;