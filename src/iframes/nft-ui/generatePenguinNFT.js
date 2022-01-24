const { web3, pengFamilyContractERC720 } = useWeb3();
simpleWeb3 = web3;

const generatePenguinNFT = (id) => {
  return pengFamilyContractERC720.methods
    .tokenURI(id)
    .call()
    .then(getMetaData)
    .then((metadata) => buildNFTElement(metadata, id))
    .catch((error) => console.log("error", error));
};

const buildNFTElement = (metadata, id) => {
  const nameNftElement = buildIdNftElement(metadata.name);
  const idNftElement = buildIdNftElement(id);
  const imgElement = buildImgElement(metadata.image, metadata.tokenId);
  const imgContainer = buildImgContainer(
    nameNftElement,
    idNftElement,
    imgElement
  );
  imgContainer.onclick = () => {
    buildSummary(metadata, imgContainer, id);
  };
  return { htmlElement: imgContainer, metadata, id };
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
  idNft.style = "color: white;";
  return idNft;
};

const buildImgContainer = (nameNftElement, idNftElement, imgContainer) => {
  const penguinContainer = document.createElement("div");
  penguinContainer.style =
    "margin-bottom: 25px;  padding: 10px; border-radius: 3px;";
  imgContainer.className = "background--custom";
  imgContainer.style =
    "width: 10vw; height: auto; min-height: 10vw; padding: 5px; cursor: pointer;";
  penguinContainer.appendChild(idNftElement);
  penguinContainer.appendChild(imgContainer);
  penguinContainer.appendChild(nameNftElement);
  return penguinContainer;
};

const buildSummary = (metadata, imgContainer, id) => {
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
  const kalaoContainer = document.getElementById("metadatas");
  const contents = document.getElementById("content");
  const header = document.getElementById("header");

  kalaoContainer.appendChild(buildKalaoContainer(id));

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

const buildKalaoContainer = (id) => {
  const info = document.createElement("div");
  info.style =
    "background-color: #ffffff; border-radius: 4px; color: initial; padding: 10px; margin: 20px; width: 40%";

  const content = document.createElement("a");
  const kalaoLogo = document.createElement("img");
  kalaoLogo.src = "../../assets/kalao-logo-default-light.svg";
  kalaoLogo.style = "width: 100px; height: 50px;";
  kalaoLogo.height = "50px";
  kalaoLogo.width = "100px";

  content.href = `https://marketplace.kalao.io/token/0x96f020b13f1b8b46d70723c3a3c7b4cc6618e99e/${id}`;
  content.target = "_blank";
  content.appendChild(kalaoLogo);
  info.appendChild(content);
  return info;
};
