# `<alcaeus-entrypoint-menu>`

#### `renders home link where there is nothing else`

```html
<paper-collapse-item
  header="Main menu"
  opened=""
>
  <paper-listbox
    role="listbox"
    tabindex="0"
  >
    <paper-item
      aria-disabled="false"
      aria-selected="false"
      role="option"
      tabindex="-1"
    >
      Home
    </paper-item>
  </paper-listbox>
</paper-collapse-item>

```

#### `lists links as menu items`

```html
<paper-collapse-item
  header="Main menu"
  opened=""
>
  <paper-listbox
    role="listbox"
    tabindex="0"
  >
    <paper-item
      aria-disabled="false"
      aria-selected="false"
      role="option"
      tabindex="-1"
    >
      Home
    </paper-item>
    <paper-item
      aria-disabled="false"
      aria-selected="false"
      role="option"
      tabindex="-1"
    >
      Property 1
    </paper-item>
  </paper-listbox>
</paper-collapse-item>

```

