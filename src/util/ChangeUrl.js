export const ChangerUrl = (value) => {
  try {
    const local_url = "http://127.0.0.1:8000/";
    const local_url_2 = "http://10.0.17.28:8000/";
    const isurl = "http://";
    const isurls = "https://";
    const new_url = process.env.REACT_APP_API_URL;
    let text = value ? value : "";
    var a =
      text.search(local_url) !== -1 ? text.replace(local_url, new_url) : text;
    a =
      text.search(local_url_2) !== -1 ? text.replace(local_url_2, new_url) : a;

    var b =
      a.search(isurl) === -1 && a.search(isurls) === -1
        ? "data:image/png;base64," + a
        : a;
    return b;
  } catch (e) {
    console.log(e);
  }
};
