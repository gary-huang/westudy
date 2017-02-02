Steps to installing:

1) Install Node.js & npm (node package manager)
run: curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
sudo apt-get install -y nodejs

run: sudo npm install npm -g

2) Install mongodb for local development
run: sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927

for ubuntu 12.04: echo "deb http://repo.mongodb.org/apt/ubuntu precise/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
for ubuntu 14.04: echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
for ubuntu 16.04: echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list

run: sudo apt-get update

run: sudo apt-get install -y mongodb-org

for ubuntu 16.04 only: create a text file at
 '/lib/systemd/system/mongod.service' with the contents:
[Unit]
Description=High-performance, schema-free document-oriented database
After=network.target
Documentation=https://docs.mongodb.org/manual

[Service]
User=mongodb
Group=mongodb
ExecStart=/usr/bin/mongod --quiet --config /etc/mongod.conf

[Install]
WantedBy=multi-user.target

3) Start MongoDB
run: sudo service mongod start
verify that its running, go to /var/log/mongodb/mongod.log read for the last 
line being something like: "waiting for connections on port 1234"

Steps to run web application (running only the node server, with precompiled ember application):
1) node server.js
2) Go to: http://localhost:3000/

Steps to run web application (both processes running, for developement):
1) node server.js (inside the parent directory)
2) ember server --proxy http://127.0.0.1:3000 (inside the ember project folder)
3) Go to: http://localhost:4200/

Postman:
chrome-extension://fdmmgilgnpjigdojojpjoooidkmcomcm/index.html
OR
https://chrome.google.com/webstore/detail/postman-rest-client/fdmmgilgnpjigdojojpjoooidkmcomcm/related?hl=en

HOWEVER:
Make sure the latest ember project has been compiled and placed into the public folder, to do this you need to run this command from inside the ember application folder:
1) ember build --environment=production --output-path=../public/

For mongoose query information look at:
http://mongoosejs.com/docs/queries.html

Color Scheme:
http://www.materialpalette.com/red/orange
