import React from "react";

export default function Waiting (props) {
    return (<div style={{height:'100%', width:'100%', display:'flex', alignItems:'center', justifyContent:'center', backgroundColor:props.color}}>
        <div>
            {props.icon}
        </div>
    </div>);
}
