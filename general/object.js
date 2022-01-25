
export const isEmptyObject = (object) => !Object.keys(object).length;

export const filterObjectsByProps = (objects, props) => objects.filter((object) => Object.entries(props).every(([key, value]) => object[key] === value));