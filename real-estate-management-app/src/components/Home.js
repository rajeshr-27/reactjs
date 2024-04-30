import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/esm/Button';
import { useSelector } from 'react-redux';

function Home() {
    const {properties} = useSelector((state)=> state.property)
    const API_IMG_URL = process.env.REACT_APP_API_IMG_URL;
  return (
    <div className='container'>
            <div className='card'>
                <div className='card-body'>
                    <div className='row'>
                        {properties && properties.map((property) => (

                            <div className='col-sm-3'>
                            <div className='card'>
                                <div className='card-header'>
                                    <h4>{property.title}</h4>
                                    <div><b>Description:</b> {property.desc}</div>
                                    <div><b>Contact: </b> {property.contact_no}</div>                            
                                </div>
                                <div className='card-body'>
                                    { ( property.photo) 
                                        ? <Image thumbnail src={API_IMG_URL+"/"+property.photo}   />
                                        :  <Image thumbnail src="/common/sample.jpg"   /> }
                                   
                                    <center><Button variant='primary' size="sm">Contact Owner</Button></center>
                                </div>
                            </div>
                            </div>
                        ))}
                       
                </div>
            </div>
        </div>
    </div>
  )
}

export default  Home;
