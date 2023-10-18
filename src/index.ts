import * as dotenv from 'dotenv';
import { writeFileSync } from 'fs';
dotenv.config();

function generateMetadata() {
  const keyAmount = Number(process.env.KEY_AMOUNT) || 0;
  const attributeKeys: string[] = [];
  const attributeValues: string[][] = [];

  for (let i = 1; i <= keyAmount; i++) {
    const currentKey = process.env[`ATTRIBUTE_KEY${i}`];
    if (currentKey) {
      const values = process.env[`ATTRIBUTE_VALUE${i}`]?.split(',');
      const counts = process.env[`ATTRIBUTE_VALUE_COUNT${i}`]?.split(',');
      const combinedValues: string[] = [];

      if (values && counts) {
        values.forEach((value, index) => {
          combinedValues.push(...new Array(Number(counts[index])).fill(value));
        });
      }

      attributeKeys.push(currentKey);
      attributeValues.push(combinedValues);
    }
  }

  const nftCount = Number(process.env.COUNT) || 0;
  for (let tokenId = 0; tokenId < nftCount; tokenId++) {
    const metadata = {
      name: `${process.env.NAME} #${tokenId}`,
      description: process.env.DESC,
      image: `${process.env.IPFS}/${tokenId}.png`,
      attributes: generateAttributes(tokenId, attributeKeys, attributeValues),
    };

    writeFileSync(
      `genericJson/${tokenId}.json`,
      JSON.stringify(metadata, null, 2),
    );
  }
}

function generateAttributes(
  id: number,
  keys: string[],
  values: string[][],
): any[] {
  return keys
    .map((key, index) => ({
      trait_type: key,
      value: values[index][id],
    }))
    .filter((attribute) => attribute.value !== undefined);
}

generateMetadata();
