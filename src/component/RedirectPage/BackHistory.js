import React, {useEffect} from "react";
import { Navigate, useNavigate } from 'react-router-dom';

export default function BackHistory() {
  const navigate = useNavigate();

  useEffect(() => {
    var Domain = window.location.hostname;
    var DomainWithPort = window.location.host
    if(navigate(-2)){
      navigate(-2, {replace:true })
    }
    else{
      navigate('/app/trangchu', {replace:true })
    }    
  }, [])

  return (
    <>
    </>
  );
}