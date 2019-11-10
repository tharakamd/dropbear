const {
  isLetter,
  isWhitespace,
  isNumber,
  isParenthesis,
  isQuote,
} = require('./identify');

const tokenize = (input) => {
  const tokens = [];
  let cursor =0;

  while( cursor < input.length){
    const character = input[cursor];

    if(isParenthesis(character)){ 
      tokens.push({
        type: 'Parenthesis',
        value: character
      });

      cursor++;
      continue;
    }

    if(isWhitespace(character)){
      cursor++;
      continue;
    }

    if (isNumber(character)) {
      let number = character;

      while(isNumber(input[++cursor])){
        number = number + input[cursor];
      }

      tokens.push({
        type: 'Number',
        value: Number(number)
      });
      continue;
    }

    if( isLetter(character)){
      let symbol = character;

      while (isLetter(input[++cursor])) {
        symbol = symbol + input[cursor];
      }

      tokens.push({
        type: 'Name',
        value: symbol,
      });

      continue;
    }

    if (isQuote(character)) {
      let quote = '';

      while (!isQuote(input[++cursor])) {
        quote += input[cursor];
      }

      tokens.push({
        type: 'String',
        value: quote
      });

      cursor++;
      continue;
    }

    cursor++;
  }

  return tokens;
};

module.exports = { tokenize };
