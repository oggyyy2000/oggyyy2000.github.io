import React, { useRef } from "react";
import BC from "./BC";
import PrintIcon from "@material-ui/icons/Print";
import ReactToPrint from "react-to-print";
import { Button } from "@material-ui/core";

export default function BtnPrint(props) {
  const componentRef = useRef();
  class ComponentToPrint extends React.PureComponent {
    render() {
      return <BC data={props.post} />;
    }
  }

  return (
    <>
      <ReactToPrint
        trigger={() => (
          <Button component={"C"} style={{color: 'white'}}>
            In Báo Cáo
            <PrintIcon />
          </Button>
        )}
        content={() => componentRef.current}
      />
      <div style={{ display: "none" }}>
        <ComponentToPrint ref={componentRef} props={props.post} />
      </div>
    </>
  );
}
