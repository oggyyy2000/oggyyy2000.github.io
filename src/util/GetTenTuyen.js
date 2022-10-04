//import { optiontuyen } from "./optiontuyen";

export const getTextDisplay = (value, Tuyen) => {
  /*var arr = optiontuyen;
  var res = arr.find((o) => o.value === value);
  var res2 = Tuyen ? Tuyen.find((o) => o.ma_tuyen === value) : null;
  return res ? res.text : res2 ? res2.ten_tuyen : value;*/

  var res = Tuyen ? Tuyen?.find((o) => o.ma_tuyen === value) : null;
  return res ? res?.ten_tuyen : value;
};
