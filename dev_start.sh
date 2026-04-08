source .venv/bin/activate

pip install --upgrade pip setuptools wheel
pip install -r requirements/development.txt
pip install -e .

export FLASK_APP=superset

superset db upgrade
superset fab create-admin
superset init

superset run -p 8088 --with-threads --reload --debugger --debug
