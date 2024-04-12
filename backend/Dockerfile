FROM python:3.10-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

COPY Pipfile Pipfile.lock ./
RUN python -m pip install --upgrade pip
RUN pip install pipenv && pipenv install --system --deploy --ignore-pipfile

COPY . /app

EXPOSE 8000

CMD sh -c 'gunicorn core.asgi:application --bind 0.0.0.0:${PORT:-8000}'