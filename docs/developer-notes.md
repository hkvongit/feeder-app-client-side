# Developer notes

## How to convert SVG code copied from figma to JSX code ?

- This is crucial in order to avoid the default kebab-case naming of the props like `stroke-width`. So you can use the below online tool to convert it to a JSX element;
- [Playground tool link](https://react-svgr.com/playground/?svgo=false)
- ⚠️ When using the tool don't forget to disable `SVGO` option, otherwise it will not increase the size of the inner shapes when the width or height is changed.
