const fs = require("fs");
const setJsonFileProps = (props) => {
  const {
    filePath,
    propsPath,
    updatedProps
  } = props;
  const file = fs.readFileSync(filePath, { encoding: "utf8" });
  const fileProps = JSON.parse(file);
  const propsPathList = propsPath.split("/").filter(Boolean);
  const updatedFileProps = {
    ...fileProps,
    ...propsPathList.reduceRight((acc, property) => {
      const currentProps = propsPathList.reduce((prev, prop) => prev[prop], fileProps);
      return {
        [property]: {
          ...currentProps,
          ...acc
        }
      };
    }, updatedProps)
  };
  fs.writeFileSync(filePath, JSON.stringify(updatedFileProps, null, 2));
};
module.exports = {
  setJsonFileProps
};
