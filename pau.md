 # Pau Anketleri otomatik doldurma

5 li çoktan seçmeli sorular
```js
document.querySelectorAll(".RadRadioButton").forEach((el) => el.click());
```

4 lü puanlama sorularu
```js
document.querySelectorAll("input[type='radio'").forEach((el) => el.click());
```

Zaman Dağılım
0 - 190 arası random 
```js
document.querySelectorAll(".riTextBox").forEach((el) => el.value = Math.ceil(Math.random() * 190));
```
100 - 190 arası random
```js
document.querySelectorAll(".riTextBox").forEach((el) => el.value = Math.ceil(Math.random() * 90) + 100);
```
