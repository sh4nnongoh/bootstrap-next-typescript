const getMetaDescription = (index: number, collection: HTMLMetaElement[]): string => {
  if (!collection[index]) {
    return "";
  }
  if (collection[index].getAttribute("name") === "description") {
    return collection[index].getAttribute("content") || "";
  }
  return getMetaDescription(index + 1, collection);
};
export default getMetaDescription;
