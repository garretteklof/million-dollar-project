const generateUniqueFrag = num => {
  const possible =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let frag = [];
  for (let i = 0; i <= 3; i++)
    frag.push(possible.charAt(Math.floor(Math.random() * possible.length)));
  frag.splice(2, 0, num);
  return "-" + frag.join("");
};

module.exports = { generateUniqueFrag };
