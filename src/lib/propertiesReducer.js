// @flow

const propertiesReducer = (fileName: string, value?: mixed) => {
  if (typeof value === 'string' || typeof value === 'number') {
    return fileName + (fileName.length > 0 ? '-' : '') + value;
  }
  if (value instanceof Object) {
    return Object.values(value).reduce(propertiesReducer, fileName);
  }
  return fileName;
};

export default propertiesReducer;
