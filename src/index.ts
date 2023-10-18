import * as dotenv from 'dotenv';
import { writeFileSync } from 'fs';
dotenv.config();

function main() {
  const attributeKeyArray: string[] = [];
  const attributeValueArray: string[][] = [];
  const keyAmount = Number(process.env.KEY_AMOUNT) || 0;
  function genMetadata() {
    // start from 1
    for (let nums = 1; nums <= keyAmount; nums++) {
      const currentKey = process.env[`ATTRIBUTE_KEY${nums}`];
      if (!!currentKey) {
        const values = process.env[`ATTRIBUTE_VALUE${nums}`]?.split(',');
        const count4Values =
          process.env[`ATTRIBUTE_VALUE_COUNT${nums}`]?.split(',');
        const valueArray = [];

        if (values?.length && count4Values?.length) {
          for (let j = 0; j < values.length; j++) {
            const arraySegment = new Array(Number(count4Values[j])).fill(
              values[j],
            );
            valueArray.push(...arraySegment);
          }
        }
        attributeKeyArray.push(currentKey);
        attributeValueArray.push(valueArray);
      }
    }

    const nftCount = Number(process.env.COUNT) || 0;

    console.log('NFT count:', nftCount);
    // token Id will start from 0
    let tokenId = 0;

    while (tokenId < nftCount) {
      const metas = `{
        "name" : "${process.env.NAME} #${tokenId}",
        "description" : "${process.env.DESC}",
        "image" : "${process.env.IPFS}/${tokenId}.png",
        "attributes": ${genAttributes(tokenId)}
        }`;

      console.log(`${tokenId}:`, metas);
      const json = JSON.parse(metas);

      writeFileSync(
        `genericJson/${tokenId + '.json'}`,
        JSON.stringify(json, null, 2), // parse json with neat padding
      );
      tokenId++;
    }
  }

  function genAttributes(count: number) {
    let result = ``;
    let attrCount = 0; // counting attrbuites  inside result
    for (let i = 0; i < attributeKeyArray.length; i++) {
      if (!!attributeValueArray[i][count]) {
        result += `${attrCount > 0 ? ',' : ''}{
        "trait_type": "${attributeKeyArray[i]}",
        "value": "${attributeValueArray[i][count]}"
      }`;

        attrCount++;
      }
    }
    if (attrCount >= 2) {
      return `[${result}]`;
    } else {
      return result;
    }
  }

  genMetadata();
}

main();
