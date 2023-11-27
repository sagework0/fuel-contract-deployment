/* Autogenerated file. Do not edit manually. */

/* tslint:disable */
/* eslint-disable */

/*
  Fuels version: 0.60.0
  Forc version: 0.44.0
  Fuel-Core version: 0.20.5
*/

import type {
  BytesLike,
  Contract,
  DecodedValue,
  FunctionFragment,
  Interface,
  InvokeFunction,
} from 'fuels';

interface CounterContractAbiInterface extends Interface {
  functions: {
    test_function: FunctionFragment;
  };

  encodeFunctionData(functionFragment: 'test_function', values: []): Uint8Array;

  decodeFunctionData(functionFragment: 'test_function', data: BytesLike): DecodedValue;
}

export class CounterContractAbi extends Contract {
  interface: CounterContractAbiInterface;
  functions: {
    test_function: InvokeFunction<[], boolean>;
  };
}