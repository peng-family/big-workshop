export const contracts = () => {
  const staging = true;
  if (staging) {
    return {
      totemContract: "0x165F4EF81F3e055ffDE90c0bd51Fc26b7798a164",
      pengContract: "0x393b4e7cDD7aA4B406f4e97876b3A84fAF04D6d8",
    };
  } else {
    return {
      totemContract: "0x165F4EF81F3e055ffDE90c0bd51Fc26b7798a164",
      pengContract: "0x96f020b13f1b8b46d70723c3a3c7b4cc6618e99e",
    };
  }
};
