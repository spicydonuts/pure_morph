# Epimorphism

Epimorphism is a psychedelic virtualization of video feedback.  It is written in `pure_script` and compiles to javascript.  This is a port of the software from a previous version, and is currenty in development.

## Setup

- get setup with purescript http://www.purescript.org/learn/getting-started/
- install purescript dependencies - `bower i`
- start the build system - `scripts/watch.sh`
- start the development server - `scripts/server.sh`
- the project should be visible on http://localhost:8000


## Useful Commands
 - `~` - development panel
 - `|` - show fps
 - `1,2,3,..` - increment various components in component library
 - `q,w,e,..` - decrement various components. for instance, 1 choses the next transformation in the library, while q will chose the previous one
 - `a,s,d,..` - increase value of numerical paramenters
 - `z,x,c,..` - decreaes value of associated paramenter
