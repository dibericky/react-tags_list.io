# react-tags_list

## Renders a List of Tag with Add and Delete feature
```js
const tags = [
    // if closable is rendered a 'x' on the tag, 
    // which triggers onDelete when clicked
    { name: "foo", closable: true, color: "magenta" }, 
    { name: "bar", color: "cyan" },
    { name: "lorem", closable: true, color: "blue" }
  ]
const onAdd = (value) => {
    // your code
    return true // true if added successfull
}
const onDelete = (value) => {
    // your code
}
<TagsViewer tags={tags} onAdd={onAdd} onDelete={onDelete} />
```