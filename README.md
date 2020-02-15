The perfect way to serialize data into valid JSON for the masochist you are.

## 3SymJSON

Used symbols - `[`, `]`, `,`

Stringifies the input object into JSON, and then converts the JSON string into empty arrays.

## 8SymJSON

Used symbols - `[`, `]`, `,`, `{`, `}`, `:`, `"`

Preserves the structure of the input object.

Converts the values of the object into arrays of empty arrays.
Converts the keys of the object into an array of more empty arrays which is then converted into a string.
