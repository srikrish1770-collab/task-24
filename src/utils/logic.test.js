import test from 'node:test';
import assert from 'node:assert/strict';
import {cars} from '../data/cars.js';
import {filterCars,readIds,compareAdd,validate,localToday} from './logic.js';
test('combined search, brand, fuel, category, price and sort',()=>{const p=new URLSearchParams({q:'porsche',brand:'Porsche',fuel:'Petrol',category:'Sports',price:'30000000',transmission:'Automatic',sort:'price-up'});assert.deepEqual(filterCars(cars,p).map(c=>c.id),['porsche-911']);assert.equal(filterCars(cars,new URLSearchParams({q:'no such vehicle'})).length,0);const sorted=filterCars(cars,new URLSearchParams({sort:'price-down'}));assert.ok(sorted.every((c,i)=>!i||sorted[i-1].price>=c.price));});
test('storage rejects corrupt values, stale IDs and duplicates',()=>{assert.deepEqual(readIds('invalid',['a']),[]);assert.deepEqual(readIds('{}',['a']),[]);assert.deepEqual(readIds('["a","a","old",7]',['a']),['a']);});
test('comparison rejects duplicate and fourth vehicle',()=>{assert.deepEqual(compareAdd(['a'],'a').ids,['a']);assert.deepEqual(compareAdd(['a','b','c'],'d').ids,['a','b','c']);assert.deepEqual(compareAdd(['a','b'],'c').ids,['a','b','c']);});
test('form validation uses local dates and rejects past dates',()=>{const v={name:'Sample',email:'sample@example.com',phone:'+91 9876543210',car:'porsche-911',date:localToday(),time:'10:00'};assert.deepEqual(validate(v,true),{});assert.ok(validate({...v,date:'2000-01-01'},true).date);assert.ok(validate({...v,email:'bad'},true).email);assert.ok(validate({...v,phone:'a'},true).phone);assert.ok(validate({...v,car:''},true).car);assert.ok(validate({...v,date:''},true).date);assert.ok(validate(v).message);});

