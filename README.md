# Material

Docs: https://kyouha2020.github.io/Material/docs/


## The next-generation Web Component library

* Based on [Material Design](https://material.io/).
* a11y and i18n
* Use [CSS Houdini](https://ishoudinireadyyet.com/).

## Browser compatibility ##

**Recommended:** Chrome 80+ (with Enable experimental Web Platform features preference)
 Edge 80+ Firefox 73+ Opera 66+ Safari 13+

**CSS Variables:** Don't support IE 11

**Paint API & Typed OM:** Chrome 66+ Edge 79+ Opera 53+ Samsung Internet 9.2+

## Example

```html
  <button class="mtrl-button">Text Button</button></code>
  <button class="mtrl-button mtrl-button--float">Float</button>
  <button class="mtrl-button mtrl-button--raised">Raised</button>
  <button class="mtrl-button" disabled>Disabled</button>
```

### This is v0, what will v1 be like?

```html
  <button mtrl>Text Button</button>
  <button mtrl float>Float</button>
  <button mtrl raised>Raised</button>
  <button mtrl disabled>Disabled</button>
```

### v2?

```html
  <m-button>Text Button</m-button>
  <m-button float>Float</m-button>
  <m-button raised>Raised</m-button>
  <m-button disabled>Disabled</m-button>
```
