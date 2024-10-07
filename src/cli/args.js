const parseArgs = () => {
  const props = process.argv.slice(2);

  const resArr = [];

  for (let i = 0; i < props.length; i += 2) {
    resArr.push(`${props[i].slice(2)} is ${props[i + 1]}`);
  }

  console.log(resArr.join(", "));
};

parseArgs();
