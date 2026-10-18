'use strict';
const cv = document.getElementById('c'); let ctx = cv.getContext('2d');
const W = 960, H = 540; let SC = 1, DPR = 1, ROT = false;
const FD = 'Lalezar, Cairo, Tahoma, sans-serif', FB = 'Cairo, Tahoma, sans-serif';
const OLC = '#1c120c';
// language: Arabic by default, English with ?lang=en or the settings button (remembered on the device)
let LANG = 'ar'; try { const q = new URLSearchParams(location.search).get('lang'), o = JSON.parse(localStorage.getItem('rahma-cart-v4-opt') || 'null'); LANG = q === 'en' || q === 'ar' ? q : (o && o.lang) || 'ar'; } catch (e) { }
let ENG = LANG === 'en';
const ar = n => ENG ? String(n) : String(n).replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
const cnt = (n, sg, pl, du) => n === 2 && du ? du : ar(n) + ' ' + (n >= 3 && n <= 10 ? pl : sg);   // Arabic counted noun: dual for 2, plural for 3-10, singular from 11 up
