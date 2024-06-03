import { HttpException, HttpStatus } from '@nestjs/common';

export const calcualtePriceOfInputs = (values_coeff, pricePerUnit: number) => {
  // We need to get an object like a hashmap to use it in further calculations.
  const valuesAndPrices =
    values_coeff && values_coeff.length
      ? values_coeff.map((value_coeff) => {
          const coeff = value_coeff.split(':')[1];
          const value = value_coeff.split(':')[0];
          if (!coeff) {
            throw new HttpException(
              'Values must be "value:coeff"',
              HttpStatus.BAD_REQUEST,
            );
          }
          if (!+coeff) {
            throw new HttpException(
              'Values_string must be "value1:coeff\nvalue2:coeff"',
              HttpStatus.BAD_REQUEST,
            );
          }
          //calculate final price for each value
          const price = +coeff * pricePerUnit;
          return { value, price };
        })
      : null;

  const values_price_object = valuesAndPrices
    ? valuesAndPrices.reduce((acc, { value, price }) => {
        acc[value] = price;
        return acc;
      }, {})
    : null;

  const values_price = JSON.stringify(values_price_object);
  const values = valuesAndPrices ? valuesAndPrices.map((vp) => vp.value) : null;
  return { values, values_price };
};
