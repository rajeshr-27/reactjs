import React,{useState, useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate,useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addProperty,updateProperty,clearMessage } from '../redux/features/propertySlice';
function PropertyFrm() {
  const navigate =useNavigate();
  const dispatch = useDispatch();
  const {id} = useParams();
  const {message, properties} = useSelector((state)=> state.property);
   const [frmData, setFrmData] = useState({
    title:"",
    desc:"",
    contact_no:"",
    photo:"",
  })

  useEffect(()=> {
    if(id){
      const propertyInfo = properties.find((property) => property._id == id);
      setFrmData({
        title:propertyInfo.title,
        desc:propertyInfo.desc,
        contact_no:propertyInfo.contact_no,
        photo:"",
      })

    }
  },[])

  const handleChange = (e) => {
    const {name,value,files} = e.target
    setFrmData({
      ...frmData,
      [name]:files ? files[0] : value
    })

    console.log(frmData);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(frmData)
    let postData = new FormData();
    postData.append("photo", frmData.photo);
    delete frmData.photo
    postData.append("data",JSON.stringify(frmData))
    if(id){
      dispatch(updateProperty({id, postData}))
    }else {
      dispatch(addProperty(postData))
    }
   
  }

  if(message){
    alert(message);
    dispatch(clearMessage())
    navigate('/properties',{replace:true})
  }
  return (
    <div className='container'>
        <div className='card'>
            <div className='card-header'>
                <h4>Property Form <Link to="/properties" className='btn btn-sm btn-success float-end'>Back</Link></h4>
            </div>
            <div className='card-body'>
              <Form encType='mutipart/from-data' onSubmit={handleSubmit}>
                <Form.Group className="mb-3" >
                  <Form.Label>Title</Form.Label>
                  <Form.Control type="text" value={frmData.title} name="title" onChange={handleChange} placeholder="Enter title" />
                </Form.Group>
                <Form.Group className="mb-3" >
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" value={frmData.desc} name="desc" onChange={handleChange}  rows={3} />
                </Form.Group>
                <Form.Group className="mb-3" >
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control type="text" value={frmData.contact_no} name="contact_no" onChange={handleChange} placeholder="Enter title" />
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Default file input example</Form.Label>
                  <Form.Control type="file"   name="photo" onChange={handleChange}  />
                </Form.Group>
                <Form.Group className="mb-3" >
                <Button type="submit" variant="primary" className='float-end'>Submit</Button> 
                </Form.Group>
                
              </Form>
            </div>
        </div>        
      </div>
  );
}

export default PropertyFrm;