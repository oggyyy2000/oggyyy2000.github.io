export const FormatDate = (value) => {
  var date = value ? new Date(value) : "";
  var newdate =
    typeof date.getMonth === "function"
      ? (date.getDate() > 9 ? date.getDate() : "0" + date.getDate()) +
        "/" +
        (date.getMonth() > 8
          ? date.getMonth() + 1
          : "0" + (date.getMonth() + 1)) +
        "/" +
        date.getFullYear()
      : "";
  return newdate;
};
