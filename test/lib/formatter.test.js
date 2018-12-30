import 'jsdom-global/register';
import { expect } from 'chai';

import { formatCurrency, formatCount, formatPercentage } from '@lib/formatter';

describe('formatter.formatCurrency', () => {
 it('should return $11.28 when given 1128', () => {
   expect(formatCurrency(1128)).to.equal('$11.28');
 });

 it('should return $112.18 when given 11218',() => {
   expect(formatCurrency(11218)).to.equal('$112.18');
 });

 it('should return $1.12 when given 112', () => {
   expect(formatCurrency(112)).to.equal('$1.12');
 });

 it('should return $0.12 when given 12', () => {
   expect(formatCurrency(12)).to.equal('$0.12');
 });

 it('should return $0.01 when given 1', () => {
   expect(formatCurrency(1)).to.equal('$0.01');
 });
});

describe('formatter.formatCount string', () => {
  it('should return "0 causes" when given (0, "cause")', () => {
    expect(formatCount(0, 'cause')).to.equal('0 causes');
  });

  it('should return "1 cause" when given (1, "cause")', () => {
    expect(formatCount(1, 'cause')).to.equal('1 cause');
  });

  it('should return "2 causes" when given (2, "cause")', () => {
    expect(formatCount(2, 'cause')).to.equal('2 causes');
  });
});

describe('formatter.formatPercentage', () => {
  it('should return 11% when given (.111, 0)', () => {
    expect(formatPercentage(.111, 0)).to.equal('11%');
  });

  it('should return 11.1% when given (.111, 1)', () => {
    expect(formatPercentage(.111, 1)).to.equal('11.1%');
  });

  it('should return 11.11% when given (.1111, 2)', () => {
    expect(formatPercentage(.1111, 2)).to.equal('11.11%');
  });
});