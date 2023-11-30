# Together NextJS WordPress Template
This repo is intended to be used as a base template for developers at Together to clone and use to build production websites using NextJS for the frontend + WordPress for the CMS.

## Installation
Follow these steps to create a new WP instance on WPEngine and setup the NextJS repo.


### WordPress Setup
1. [Create new site in WPEngine](https://my.wpengine.com/accounts/togetheragency/add_site/)

1. Select "Copy an existing environment to a new site" and use [nextwptemplate](https://my.wpengine.com/installs/nextwptemplate) as the environment to copy

1. Wait for the site to be created

1. Go to `/wp-login.php` and [use nextwptemplate details from 1Password](https://start.1password.com/open/i?a=K45NWMQEJZH3PMKXCZJ422Y56E&v=x6plr36kuwupmjzjg7jiayzz2i&i=jqxeu3p7jr664pvde42gkgyloy&h=togetherteam.1password.com)

1. Update password on your new site for the `together` user and add as new entry to 1Password

1. Go to `/wp-admin/options-permalink.php`
	- Check to see if production site uses trailing slashes / no trailing slashes and update accordingly
	- If production site has a resources area and isn't called `/resources/`, update the permalink to whatever they currently use
	- Don't forget to update resources page slug to match new permalink if changed

1. Go to `/wp-admin/options-general.php`
	- Update `Site Title` to the company name
	- Update `Site Address (URL)` to `http://localhost:3000`


### NextJS Setup
1. [Create new repo](https://github.com/new) using [nextwptemplate](https://github.com/Made-Together/nextwptemplate) repo as the template

1. Clone to your local machine

1. Delete `/.github/actions/deploy-template-to-wordpress.yml` file and commit.

1. Install dependencies
	```sh
	yarn
	```

1. Setup your .env.local file
	- Duplicate `.env.local.example` to `.env.local`
	- Update `NEXT_PUBLIC_WORDPRESS_BASE_URL` value to your WordPress installation url

1. Run the development server
	```sh
	yarn develop
	```


## Going Live
1. Take a backup of the CMS
1. Go to `/wp-admin/options-general.php` and update `Site Address` to the production site URL
1. Do a find and replace of the old `Site Address` and replace with production site URL using WP Migrate DB
1. Ensure robots.txt is set to be indexed
