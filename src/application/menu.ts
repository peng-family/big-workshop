const WA = window.WA;
export const createMyPengsTab = async (address: string) => {
  WA.ui.registerMenuCommand("My peng team", {
    iframe: `src/iframes/my-nft-collection/myNftCollection.html?accounAddress=${address}`,
    allowApi: true,
  });
};

export const createPengdexTab = (totalSupply: any) => {
  WA.ui.registerMenuCommand("Pengdex", {
    iframe: `src/iframes/collection/collection.html?totalSupply=${totalSupply}`,
    allowApi: true,
  });
};

export const createMyInventoryTab = () => {
  WA.ui.registerMenuCommand("My Inventory", {
    iframe: `src/iframes/my-inventory/myInventory.html`,
    allowApi: true,
  });
};
