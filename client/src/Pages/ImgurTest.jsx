import { useState } from 'react';
import { GreenBtn } from '../Components/Common/Btn';

const ImgurTest = () => {
  const [file, setFile] = useState('');
  const clientId = process.env.REACT_APP_IMGUR_ID;
  const imgurAccess = process.env.REACT_APP_IMGUR_ACCESS;
  const [previewUrl, setPreviewUrl] = useState(null);
  const [imgData, setImgData] = useState(null);

  const handleFileOnChange = (fileBlob) => {
    //이미지 URL 삭제
    // event.preventDefault();
    // let file = event.target.files[0];
    // setFile(file);
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.onload = () => {
      setFile(reader.result);
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    // var data = new FormData();
    // fetch('https://api.imgur.com/3/image', {
    //   method: 'POST',
    //   headers: {
    //     Authorization: `Client-ID ${clientId}`,
    //     Accept: 'application/json',
    //   },
    //   formData: {
    //     image: file,
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
    let data = file.replace(/^data:image\/(png|jpg);base64,/, '');
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Client-ID ${clientId}`);

    var formdata = new FormData();
    formdata.append('image', data);
    formdata.append('type', 'base64');

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    fetch('https://api.imgur.com/3/image', requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setImgData(result.data);
      })
      .then(() => {
        setPreviewUrl(imgData.link);
      })
      .catch((error) => console.log('error', error));
  };

  return (
    <>
      <input type="file" id="upload" multiple="true" onChange={handleFileOnChange} />
      {previewUrl !== null ? <img src={previewUrl} alt="preview" /> : null}
      {GreenBtn({ callback: handleSubmit, text: 'Submit', className: 'submitBtn' })}
    </>
  );
};

export default ImgurTest;
