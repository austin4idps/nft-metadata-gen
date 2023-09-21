import * as dotenv from "dotenv";
import { writeFileSync } from "fs";
import random from "random";
dotenv.config();

function main() {
  const attributeKey = process.env.ATTRIBUE_KEY;
  const attribueValue = process.env.ATTRIBUE_VALUE!.split(","); // [a,b,c]
  const attributesValueCount = process.env
    .ATTRIBUE_VALUE_COUNT!.split(",")
    .map((count) => Number(count)); // [10, 11, 12]

  // init record counting map
  const attrubeMap: Map<string, number> = new Map();

  // set the map
  for (let i = 0; i < attribueValue.length; i++) {
    attrubeMap.set(attribueValue[i], attributesValueCount[i]);
  }
  const nftCount = Number(process.env.COUNT);

  console.log("nft count:", nftCount);
  let count = 0;

  while (count < nftCount) {
    const metas = `{
      "name" : "${process.env.NAME} #${count}",
      "description" : "${process.env.DESC}",
      "image" : "${process.env.IPFS}/${count}.png",
      "attributes": {
        "trait_type": "${attributeKey}",
        "value": "${randomPickValue(attrubeMap)}"
      }
    }`;

    const json = JSON.parse(metas);
    writeFileSync(
      `genericJson/${count + ".json"}`,
      JSON.stringify(json, null, 2)
    );
    count++;
  }
}

function randomPickValue(map: Map<string, number>) {
  const keys: string[] = Array.from(map.keys());
  const randomInt = random.int(0, keys.length - 1);
  const value = keys[randomInt];
  let count = map.get(value)!;
  if (count - 1 === 0) {
    map.delete(value);
  } else {
    map.set(value, count - 1);
  }
  return value;
}

main();
