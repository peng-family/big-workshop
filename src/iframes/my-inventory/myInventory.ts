const { totemsContract } = useWeb3();
const buildKeyItemList = async () => {
  const listItemsButton = document.getElementById("key-items-button");
  if (listItemsButton) {
    listItemsButton.classList.add("selected");
  }
  //@ts-ignore
  window.parent[0].player.inventory.keyItems.forEach((_totem) =>
    generateItem(_totem.metadata, _totem.id)
  );
};

const generateItem = (metadata: any, id: number) => {
  const listItems = document.getElementById("list-items");
  const imgContainer = buildImageElement(metadata.animation_url, metadata.name);
  const itemContainer = buildItemContainer(metadata.name, id, imgContainer);

  const rowContainer = document.createElement("div");
  rowContainer.classList.add("row-container");
  const descriptionContainer = document.createElement("div");
  const informationContainer = document.createElement("div");
  rowContainer.appendChild(itemContainer);
  const nameContainer = document.createElement("div");
  nameContainer.textContent = metadata.name;

  informationContainer.classList.add("information-container");
  informationContainer.appendChild(nameContainer);
  informationContainer.appendChild(descriptionContainer);
  descriptionContainer.textContent = metadata.description;
  descriptionContainer.classList.add("description");
  itemContainer.appendChild(informationContainer);

  listItems?.appendChild(rowContainer);
};

const buildItemContainer = (
  nameNftElement: string,
  idNftElement: number,
  imgContainer: HTMLImageElement
) => {
  const penguinContainer = document.createElement("div");
  penguinContainer.className = "item-container";
  imgContainer.className = "item-image";
  penguinContainer.appendChild(imgContainer);
  return penguinContainer;
};

const buildImageElement = (url: string, name: string) => {
  const img = document.createElement("img");
  img.src = url;
  img.id = `nft-${name}`;
  return img;
};

buildKeyItemList();
