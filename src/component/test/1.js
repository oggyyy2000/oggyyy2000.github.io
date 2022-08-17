import axios from "axios";

const iop = () => {
  let TBstable = [];
  let TBCTC = [];
  const urlt = "http://10.0.17.28:8000/thietbituyensfilter/tuyen/T4/";

  axios
    .get(urlt)
    .then((res) => {
      console.log(res.data);
      for (const dataObj of res.data) {
        TBstable.push(dataObj.muc_on_dinh);
        TBCTC.push(dataObj.thiet_bi_cong_trinh_cha);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  console.log(TBstable, TBCTC);
};
export default iop;
