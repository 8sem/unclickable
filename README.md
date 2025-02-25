# A Reactjs + Vite project 
- This project was to test the automation of a node application using docker and github workflows
for more details see automation.yml in workflows folder
- Its an web application which makes the button change position at random making it unclickable
# Instalation/Running
### Using Docker (recomended)
```bash
docker pull iswnischay/click-app
```
```bash
docker run -p 5173:5173 -it iswnischay/click-app
```
### Runing it locally
```bash
git clone https://www.github.com/8sem/unclickable.git
```
```bash
cd unclickable
npm i
npm run dev
```
