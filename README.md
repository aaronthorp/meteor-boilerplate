# meteor-boilerplate

**Last Updated:** 2014-01-07

### Installation

Install by cloning the repository using `git clone https://github.com/aaronthorp/meteor-boilerplate.git` and `mrt` or `./dev` to launch the boilerplate.

If you are running in a development environment, you can use the `dev` program to launch the application with custom parameters.

The default port for the `dev` script is `4000` and the default MongoDB is `mongodb://localhost/boiler`. You may need to `chmod 777 dev` in order to run `./dev`.

### Packages

- **File Structure**
- accounts-entry
- accounts-facebook
- coffeescript
- LESS
- iron-router
- accounts-entry
- bootstrap3
- bootstrap3-wysihtml5
- font-awesome4
- peerdb
- moment
- nprogress
- user-sessions *(internal script in `lib/`)*

### File Structure

```
.meteor
client
  └── subscriptions.js
  └── lib
    └── router
      └── route-config.js
      └── route-controller.js
    └── accounts
      └── accounts.js
  └── stylesheets
    └── global.less
    └── variables.less
  └── views
    └── dashboard
      ├── dashboard.html
      ├── dashboard.less
      └── dashboard.coffee
    └── home
      ├── home.html
      ├── home.less
      └── home.coffee
    └── index.html
    └── header.html
    └── footer.html
collections
  └── collections.coffee
lib
  └── user-sessions.js
packages
public
  ├── fonts
  └── img
server
  └── publish
    └── publish.js
  └── methods
```