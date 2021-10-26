interface Cookie {
  [key: string]: string;
}

const cookieParser = (cookies = ""): Cookie => {
  return cookies.split(/;\s/gi).reduce((acc: Cookie, item) => {
    const [key, value] = item.split("=");
    acc[key] = value;
    return acc;
  }, {});
};

export default cookieParser;
