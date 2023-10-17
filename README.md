# Generate JSON for ERC721 Metadata

## Install  

1. Install Bun 1.0
```bash
curl -fsSL https://bun.sh/install | bash
```

2. Install node depens
```bash 
yarn
```
3. Filling `.env`, Detail is down below section

4. Start
```bash
bun dev
```

## Env
In your configuration, there's a primary key named `KEY_AMOUNT` that determines the number of attribute sets you want to define. 

For instance, if you set:
```
KEY_AMOUNT=3
```
This means you intend to define three sets of attributes.

For each attribute set, you need to define three env variables:
1. `ATTRIBUTE_KEY`: This describes the name of the attribute.
2. `ATTRIBUTE_VALUE`: This is a comma-separated list of the possible values the attribute can take.
3. `ATTRIBUTE_VALUE_COUNT`: This is a comma-separated list representing the number of times each respective value in `ATTRIBUTE_VALUE` appears.

Following the format of the example you've provided:

For the first attribute 
```
ATTRIBUTE_KEY1="Product Name"
ATTRIBUTE_VALUE1="A,B,C,D"
ATTRIBUTE_VALUE_COUNT1="32,22,22,26"
```
This means for the attribute "Product Name", you have values "A", "B", "C", and "D". Furthermore, "A" appears 32 times, "B" 22 times, and so on.

And the pattern continues for as many attribute sets as defined by `KEY_AMOUNT`.



## Support
- Please open the ticket or send me the pull request.



