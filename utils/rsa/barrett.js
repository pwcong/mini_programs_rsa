import * as bigint from './bigint';

export default class BarrettMu {

  constructor(m) {

    this.modulus = bigint.biCopy(m);
    this.k = bigint.biHighIndex(this.modulus) + 1;
    var b2k = new bigint.BigInt();
    b2k.digits[2 * this.k] = 1; // b2k = b^(2k)
    this.mu = bigint.biDivide(b2k, this.modulus);
    this.bkplus1 = new bigint.BigInt();
    this.bkplus1.digits[this.k + 1] = 1; // bkplus1 = b^(k+1)
    

  }

  modulo(x) {
    var q1 = bigint.biDivideByRadixPower(x, this.k - 1);
    var q2 = bigint.biMultiply(q1, this.mu);
    var q3 = bigint.biDivideByRadixPower(q2, this.k + 1);
    var r1 = bigint.biModuloByRadixPower(x, this.k + 1);
    var r2term = bigint.biMultiply(q3, this.modulus);
    var r2 = bigint.biModuloByRadixPower(r2term, this.k + 1);
    var r = bigint.biSubtract(r1, r2);
    if (r.isNeg) {
      r = bigint.biAdd(r, this.bkplus1);
    }
    var rgtem = bigint.biCompare(r, this.modulus) >= 0;
    while (rgtem) {
      r = bigint.biSubtract(r, this.modulus);
      rgtem = bigint.biCompare(r, this.modulus) >= 0;
    }
    return r;
  }

  multiplyMod(x, y) {
    /*
    x = this.modulo(x);
    y = this.modulo(y);
    */
    var xy = bigint.biMultiply(x, y);
    return this.modulo(xy);
  }

  powMod(x, y) {
    var result = new bigint.BigInt();
    result.digits[0] = 1;
    var a = x;
    var k = y;
    while (true) {
      if ((k.digits[0] & 1) != 0) result = this.multiplyMod(result, a);
      k = bigint.biShiftRight(k, 1);
      if (k.digits[0] == 0 && bigint.biHighIndex(k) == 0) break;
      a = this.multiplyMod(a, a);
    }
    return result;
  }


}
