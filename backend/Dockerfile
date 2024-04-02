FROM python:3.10-slim

WORKDIR /app

RUN pip install pipenv

COPY Pipfile Pipfile.lock ./

RUN PIPENV_VENV_IN_PROJECT=1 pipenv install --deploy --ignore-pipfile

COPY . .

ENV PATH="/app/.venv/bin:$PATH"

EXPOSE 8000

CMD sh -c 'gunicorn core.wsgi:application --bind 0.0.0.0:${PORT:-8000}'