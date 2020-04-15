# Autocart

## How to run

```
# create virtual environment
pip3 install pipenv
pipenv --three

# enter virtual environment
pipenv shell

# backend dependencies
pipenv install

# frontend dependencies 
npm install

# loaddata
cd Autocart
python manage.py loaddata db.json

# run serve on localhost:8000
python Autocart/manage.py runserver

# run webpack for dev, 'npm run build' for production
npm run dev
```