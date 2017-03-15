'use strict';

/* eslint-env node, mocha */

const parsePlainAddress = require('lib/DevAPI/Util/URIParser/parsePlainAddress');
const expect = require('chai').expect;

describe('parsePlainAddress', () => {
    it('should parse a full valid IPv6 address', () => {
        expect(parsePlainAddress('[2001:0db8:85a3:0000:0000:8a2e:0370:7334]:33060')).to.deep.equal({ host: '2001:0db8:85a3:0000:0000:8a2e:0370:7334', port: 33060 });
    });

    it('should parse an IPv6 address without a port', () => {
        expect(parsePlainAddress('[::]')).to.deep.equal({ host: '::', port: undefined });
    });

    it('should parse a full valid IPv4 address', () => {
        expect(parsePlainAddress('127.0.0.1:33060')).to.deep.equal({ host: '127.0.0.1', port: 33060 });
    });

    it('should parse a valid IPv4 address without a port', () => {
        expect(parsePlainAddress('0.0.0.0')).to.deep.equal({ host: '0.0.0.0', port: undefined });
    });

    it('should parse a valid full common name address', () => {
        expect(parsePlainAddress('prod-01.example.com:33060')).to.deep.equal({ host: 'prod-01.example.com', port: 33060 });
    });

    it('should parse a a valid common name address without a port', () => {
        expect(parsePlainAddress('localhost')).to.deep.equal({ host: 'localhost', port: undefined });
    });

    it('should throw an error if the address is not valid', () => {
        ['prod 01.example.com', '[01:23:45:67:89:ab]'].forEach(invalid => {
            expect(() => parsePlainAddress(invalid)).to.throw('Invalid URI');
        });
    });
});