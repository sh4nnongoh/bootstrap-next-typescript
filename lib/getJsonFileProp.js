const fs = require("fs");
const getJsonFileProp = (props) => {
  const {
    filePath,
    propsPath
  } = props;
  const file = fs.readFileSync(filePath, { encoding: "utf8" });
  const fileProps = JSON.parse(file);
  const propsPathList = propsPath.split("/").filter(Boolean);
  const value = propsPathList.reduce((acc, property) => fileProps[property], undefined)
  return value;
};
module.exports = {
  getJsonFileProp
};
