
// Set by site generator

window.env = '{{generator.env}}';
window.meta = {{{json this}}}

console.styles = {
    terminal: `
        font-weight: light; 
        font-family: monospace;
        text-shadow: 1px 1px 0 rgb(0,255,0);
        background-color: black;
        color: green;
        padding: 5px;
        
        width: 100%;
        
        font-size: 14px;
    `,
}
setTimeout( ()=>{
    console.clear();
    console.log(`
%cLast Login: ${ new Date().toLocaleString()} from xxx.xxx.xxx.xxx on pty/1
Welcome to Lunar ${meta.package.version} ${window.env}
 * Source: https://github.com/beepsdev/personal.website
 * Feel free to poke around and discover things!`, console.styles.terminal);
},800)
