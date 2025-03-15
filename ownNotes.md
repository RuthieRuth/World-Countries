testing

there are about 7 types: unit, smoke, functional, end to end, acceptance, performance, integration 
written tests they can be tested by github actions eg: end to end, 

how to test with react using jest and cypress

how to write test follow along:
cd frontend
npm install --save-dev vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
check package.json in frontend


file for test should match the name of the file to be tested.
npm run test: command to test

Cypress Test
on frontend-new branch :  git checkout -b cypress-test

make a cypress directory with : npm run cypress:open

always have the app running when u begin cypress

start the application, supabase, npm run dev.
then make your way to front end and npx run cypress:open?
