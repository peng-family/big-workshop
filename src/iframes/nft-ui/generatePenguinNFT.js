const { web3, pengFamilyContractERC720 } = useWeb3();
simpleWeb3 = web3;

const generatePenguinNFT = (id) => {
  return pengFamilyContractERC720.methods
    .tokenURI(id)
    .call()
    .then(getMetaData)
    .then(buildNFTElement)
    .catch((error) => console.log("error", error));
};

const buildIpfsUrl = (tokenUri) => {
  const tmpUrl = tokenUri.substring("ipfs://".length);
  return "https://ipfs.io/ipfs/".concat(tmpUrl);
};

const buildNFTElement = (metadata) => {
  const idNftElement = buildIdNftElement(metadata.tokenId);
  const imgElement = buildImgElement(metadata.image, metadata.tokenId);
  const imgContainer = buildImgContainer(idNftElement, metadata.tokenId);
  imgContainer.appendChild(imgElement);
  imgContainer.onclick = () => {
    buildSummary(metadata, imgContainer);
  };
  return { htmlElement: imgContainer, metadata };
};

const getMetaData = (tokenUri) => {
  return makeRequest("GET", buildIpfsUrl(tokenUri));
};

const buildImgElement = (url, id) => {
  const img = document.createElement("img");
  img.src = url;
  img.style = "height: 100%; width: 100%;";
  img.id = `nft-${id}`;
  return img;
};

const buildIdNftElement = (id) => {
  const idNft = document.createElement("div");
  idNft.textContent = `${id}.`;
  idNft.style = "position: absolute; top: 10px; left: 16px;";
  return idNft;
};

const buildImgContainer = (idNftElement) => {
  const imgContainer = document.createElement("div");
  imgContainer.className = "background--custom";
  imgContainer.style =
    "width: 20vw; height: auto; min-height: 20vw;  padding: 5px; margin-bottom: 25px; position: relative; cursor: pointer;";
  imgContainer.appendChild(idNftElement);
  return imgContainer;
};

const buildSummary = (metadata, imgContainer) => {
  const backContainer = document.createElement("div");
  backContainer.style = "width: 100%;";
  const backLabel = document.createElement("h3");
  backLabel.textContent = "< back to the list";
  backContainer.appendChild(backLabel);

  const cloneImgContainer = imgContainer.cloneNode(true);
  cloneImgContainer.classList.add("portrait");

  const summary = document.getElementById("summary");
  // summary.appendChild(backContainer);
  const summaryPortrait = document.getElementById("summaryportrait");

  const metadatas = document.getElementById("metadatas");
  const contents = document.getElementById("content");
  const header = document.getElementById("header");

  Object.values(metadata.attributes).forEach((meta) => {
    const infoContainer = buildInfoContainer(meta.value, meta.trait_type);
    metadatas.appendChild(infoContainer);
  });

  summaryPortrait.appendChild(cloneImgContainer);
  summary.classList.remove("hidden");
  contents.classList.add("hidden");
  header.classList.add("hidden");
};

const leaveSummary = () => {
  const summary = document.getElementById("summary");
  const contents = document.getElementById("content");
  const header = document.getElementById("header");

  const summaryPortrait = document.getElementById("summaryportrait");
  const metadatas = document.getElementById("metadatas");

  metadatas.innerHTML = "";
  summaryPortrait.innerHTML = "";
  summary.classList.add("hidden");
  contents.classList.remove("hidden");
  header.classList.remove("hidden");
};

const buildInfoContainer = (metaInfo, metaTitle) => {
  const info = document.createElement("div");
  info.style =
    "background-color: #ffffff; border-radius: 4px; color: initial; padding: 10px; margin: 20px; width: 40%";
  const title = document.createElement("h2");
  title.textContent = metaTitle;
  title.style = "text-transform: capitalize;";
  const content = document.createElement("h4");
  content.style = "text-transform: capitalize;";
  content.textContent = metaInfo;
  info.appendChild(title);
  info.appendChild(content);
  return info;
};
