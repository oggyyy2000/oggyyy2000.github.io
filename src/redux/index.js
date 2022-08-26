import { combineReducers } from "redux";
import cot from "./reducers/cot";
import currentVideo from "./reducers/currentVideo";
import detectVideo from "./reducers/detectVideo";
import tuyen from "./reducers/tuyen";
import idvideo from "./reducers/idvideo";
import imginfo from "./reducers/imginfo";
import modeshowvideo from "./reducers/modeshowvideo";
import wstoado from "./reducers/wsToaDo";
import wstoado2 from "./reducers/wsToaDo2";
import dbauto from "./reducers/dbauto";
import dbtc from "./reducers/dbtc";
import listtuyen from "./reducers/listuyen";
import showinfoerror from "./reducers/showinfoerror";
import tuyengs from "./reducers/tuyengs";
import typewsdata from "./reducers/typewsdata";
import dialogimage from "./reducers/dialogimage";
import slideIndex from "./reducers/slideindex";
import SlideImgShow from "./reducers/SlideImgShow";
import AllSlideShowData from "./reducers/AllSlideShowData";
import currentVideoNormal from "./reducers/currentVideoNormal";
import currentVideoImage from "./reducers/currentVideoImage";
import SlideVideoShow from "./reducers/SlideVideoShow";
import sizeResize from "./reducers/sizeResize";
import pageSize from "./reducers/pageSize";
import anhthietbiloi from "./reducers/anhthietbiloi";
import idtuyen from "./reducers/idtuyen";
import idthietbi from "./reducers/idthietbi";
import idanh from "./reducers/idanh";

const myReducer = combineReducers({
  cot,
  currentVideo,
  detectVideo,
  tuyen,
  idvideo,
  imginfo,
  modeshowvideo,
  wstoado,
  wstoado2,
  dbauto,
  dbtc,
  listtuyen,
  showinfoerror,
  tuyengs,
  typewsdata,
  dialogimage,
  slideIndex,
  SlideImgShow,
  AllSlideShowData,
  currentVideoNormal,
  currentVideoImage,
  SlideVideoShow,
  sizeResize,
  pageSize,
  anhthietbiloi,
  idtuyen,
  idthietbi,
  idanh,
});
export default myReducer;
